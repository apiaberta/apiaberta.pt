#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { API_BASE, SERVICES } from './catalog.js'

const USER_AGENT = 'apiaberta-mcp/1.0.0'

function zodType(param) {
    let schema
    if (param.type === 'integer') {
        schema = z.coerce.number().int()
    } else if (param.type === 'number') {
        schema = z.coerce.number()
    } else if (param.type === 'boolean') {
        schema = z.coerce.boolean()
    } else {
        schema = z.string()
    }
    schema = schema.describe(param.description || param.name)
    return param.required ? schema : schema.optional()
}

function buildUrl(endpoint, args) {
    let path = endpoint.path
    for (const param of endpoint.params.filter((item) => item.in === 'path')) {
        const value = args[param.name]
        if (value === undefined || value === null || value === '') {
            throw new Error(`Missing path parameter: ${param.name}`)
        }
        path = path.replace(`:${param.name}`, encodeURIComponent(String(value)))
    }
    const url = new URL(API_BASE + path)
    for (const param of endpoint.params.filter((item) => item.in === 'query')) {
        const value = args[param.name]
        if (value === undefined || value === null || value === '') continue
        url.searchParams.set(param.name, String(value))
    }
    return url
}

async function callEndpoint(endpoint, args) {
    const url = buildUrl(endpoint, args)
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            'User-Agent': USER_AGENT,
        },
    })
    const text = await response.text()
    return {
        content: [{
            type: 'text',
            text: `${endpoint.method} ${url}\nHTTP ${response.status}\n\n${text}`,
        }],
        isError: !response.ok,
    }
}

const server = new McpServer({
    name: 'apiaberta',
    version: '1.0.0',
})

for (const service of SERVICES) {
    for (const endpoint of service.endpoints) {
        const shape = {}
        for (const param of endpoint.params) {
            shape[param.name] = zodType(param)
        }

        server.registerTool(
            endpoint.id,
            {
                title: `${endpoint.method} ${endpoint.path}`,
                description: `${endpoint.description} ${service.name} (${service.source}). ${endpoint.method} ${API_BASE}${endpoint.path}`,
                inputSchema: shape,
            },
            async (args) => callEndpoint(endpoint, args || {})
        )
    }
}

const transport = new StdioServerTransport()
await server.connect(transport)
