import { API_BASE, SITE_URL, SERVICES, listEndpoints } from '../data/endpoints.js'

export function buildSkillMarkdown() {
    const endpoints = listEndpoints()
    const lines = [
        '---',
        'name: apiaberta',
        'description: Consulta dados públicos portugueses via API Aberta — combustíveis, meteorologia, contratos, INE, ANPC, BdP, geo, NIF, PRR, DRE, NASA FIRMS, Carris, GTFS, parlamento e SNS. Usa quando o utilizador pedir dados de Portugal ou api.apiaberta.pt.',
        '---',
        '',
        '# API Aberta',
        '',
        '## Quando usar',
        '',
        'Usa esta skill para responder com dados públicos portugueses em tempo real ou com a documentação correcta da API. Não inventes números: chama `https://api.apiaberta.pt`.',
        '',
        '## Base URL',
        '',
        API_BASE,
        '',
        'Documentação humana: ' + SITE_URL + '/docs',
        'Catálogo de endpoints: ' + SITE_URL + '/docs/endpoints',
        'Versão Markdown: ' + SITE_URL + '/docs/endpoints.md',
        'Índice para LLMs: ' + SITE_URL + '/llms.txt',
        'Documentação completa: ' + SITE_URL + '/llms-full.txt',
        '',
        '## Autenticação e limites',
        '',
        '- Os endpoints públicos de dados **não exigem API key**.',
        '- Sem chave: 30 pedidos / minuto por IP.',
        '- Com `X-API-Key`: 300 pedidos / minuto. Chave grátis em https://app.apiaberta.pt',
        '- Erros comuns: `401` chave inválida, `429` rate limit, `502` conector em baixo.',
        '',
        '## Serviços',
        '',
    ]

    for (const service of SERVICES) {
        lines.push(`### ${service.name} (\`${service.prefix}\`)`)
        lines.push('')
        lines.push(`${service.description} Fonte: ${service.source}.`)
        lines.push('')
        for (const endpoint of service.endpoints) {
            lines.push(`#### ${endpoint.method} ${endpoint.path}`)
            lines.push('')
            lines.push(endpoint.description)
            if (endpoint.params.length) {
                lines.push('')
                lines.push('Parâmetros:')
                for (const param of endpoint.params) {
                    const req = param.required ? ', obrigatório' : ''
                    lines.push(`- \`${param.name}\` (${param.in}, ${param.type}${req}) — ${param.description}`)
                }
            }
            lines.push('')
            lines.push('```bash')
            lines.push(endpoint.example)
            lines.push('```')
            lines.push('')
        }
    }

    lines.push('## Notas')
    lines.push('')
    lines.push(`- Há ${endpoints.length} endpoints públicos catalogados a partir de \`GET /v1/status\` e do código dos conectores.`)
    lines.push('- `/v1/contracts` é um alias de `/v1/base` (os mesmos contratos públicos).')
    lines.push('- `/v1/pt2030` partilha o conector com `/v1/prr`.')
    lines.push('- Preferir JSON. Respostas paginadas usam `page`/`limit` ou `limit`/`offset`.')
    lines.push('')

    return lines.join('\n')
}

export function buildServiceMarkdown(service) {
    const lines = [
        `# ${service.name}`,
        '',
        `> ${service.description}`,
        '',
        `- Fonte: ${service.source}`,
        `- Prefixo: \`${API_BASE}${service.prefix}\``,
        `- HTML: ${SITE_URL}${service.docsPath}`,
        `- Markdown: ${SITE_URL}${service.docsPath}.md`,
        '',
        '## Endpoints',
        '',
    ]

    for (const endpoint of service.endpoints) {
        lines.push(`### ${endpoint.method} \`${endpoint.path}\``)
        lines.push('')
        lines.push(endpoint.description)
        lines.push('')
        if (endpoint.params.length) {
            lines.push('| Parâmetro | Onde | Tipo | Descrição |')
            lines.push('|---|---|---|---|')
            for (const param of endpoint.params) {
                const req = param.required ? ' (obrigatório)' : ''
                lines.push(`| \`${param.name}\` | ${param.in} | ${param.type}${req} | ${param.description} |`)
            }
            lines.push('')
        }
        lines.push('```bash')
        lines.push(endpoint.example)
        lines.push('```')
        lines.push('')
    }

    return lines.join('\n')
}
