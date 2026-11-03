import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { API_BASE, SITE_URL, SERVICES, countEndpoints } from '../src/data/endpoints.js'
import { buildServiceMarkdown, buildSkillMarkdown } from '../src/lib/llmSkill.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

async function write(relPath, contents) {
    const abs = join(publicDir, relPath)
    await mkdir(dirname(abs), { recursive: true })
    await writeFile(abs, contents.endsWith('\n') ? contents : contents + '\n', 'utf8')
}

function buildLlmsTxt() {
    const lines = [
        '# API Aberta',
        '',
        '> API REST unificada para dados públicos portugueses. Gratuita. Endpoints públicos sem autenticação.',
        '',
        `Base URL: ${API_BASE}`,
        `${countEndpoints()} endpoints públicos catalogados a partir de GET /v1/status e do código dos conectores.`,
        '',
        '## Documentação (HTML e Markdown)',
        '',
        `- [Documentação](${SITE_URL}/docs): índice para developers e LLMs`,
        `- [Documentação (Markdown)](${SITE_URL}/docs.md)`,
        `- [Endpoints](${SITE_URL}/docs/endpoints): catálogo completo`,
        `- [Endpoints (Markdown)](${SITE_URL}/docs/endpoints.md)`,
        `- [MCP](${SITE_URL}/docs/mcp): servidor MCP para Claude e Cursor`,
        `- [MCP (Markdown)](${SITE_URL}/docs/mcp.md)`,
        `- [SDKs](${SITE_URL}/sdk): JavaScript e Python`,
        `- [SDKs (Markdown)](${SITE_URL}/sdk.md)`,
        `- [Dados abertos](${SITE_URL}/dados)`,
        `- [Dados abertos (Markdown)](${SITE_URL}/dados.md)`,
        `- [Documentação completa](${SITE_URL}/llms-full.txt)`,
        '',
        '## Serviços públicos',
        '',
    ]

    for (const service of SERVICES) {
        const mdPath = service.docsPath === '/docs/endpoints'
            ? `${SITE_URL}/docs/endpoints.md#${service.id}`
            : `${SITE_URL}${service.docsPath}.md`
        const serviceUrl = service.id === 'platform'
            ? `${API_BASE}/v1/status`
            : `${API_BASE}${service.prefix}/meta`
        lines.push(`- [${service.name}](${serviceUrl}) — ${service.description} Docs: ${mdPath}`)
        for (const endpoint of service.endpoints) {
            lines.push(`  - [${endpoint.method} ${endpoint.path}](${API_BASE}${endpoint.path.replace(/:[^/]+/g, 'x')}) — ${endpoint.description}`)
        }
    }

    lines.push('')
    lines.push('## Ligações')
    lines.push('')
    lines.push(`- [Portal do developer](https://app.apiaberta.pt)`)
    lines.push(`- [Estado dos serviços](https://status.apiaberta.pt)`)
    lines.push(`- [GitHub](https://github.com/apiaberta)`)
    lines.push(`- [MCP no repositório](https://github.com/apiaberta/apiaberta.pt/tree/main/mcp)`)
    lines.push('')
    lines.push('## Licença')
    lines.push('')
    lines.push('Dados abertos. Gratuito para uso não-comercial e comercial com atribuição.')
    lines.push('')
    return lines.join('\n')
}

function buildDocsIndexMarkdown() {
    return [
        '# Documentação API Aberta',
        '',
        `Base URL: \`${API_BASE}\``,
        '',
        'Os endpoints públicos de dados não exigem API key (30 req/min por IP). Com `X-API-Key` o limite sobe para 300 req/min.',
        '',
        '## Páginas',
        '',
        `- [Catálogo de endpoints](${SITE_URL}/docs/endpoints) ([.md](${SITE_URL}/docs/endpoints.md))`,
        `- [Servidor MCP](${SITE_URL}/docs/mcp) ([.md](${SITE_URL}/docs/mcp.md))`,
        `- [SDKs JavaScript e Python](${SITE_URL}/sdk) ([.md](${SITE_URL}/sdk.md))`,
        `- [Dados abertos (UI)](${SITE_URL}/dados) ([.md](${SITE_URL}/dados.md))`,
        `- [/llms.txt](${SITE_URL}/llms.txt)`,
        `- [/llms-full.txt](${SITE_URL}/llms-full.txt)`,
        '',
        'Cola o conteúdo do botão **Copiar para LLM** (na página HTML) num ficheiro `SKILL.md` do teu agente.',
        '',
        '## Serviços',
        '',
        ...SERVICES.map((service) => {
            const href = service.docsPath === '/docs/endpoints'
                ? `${SITE_URL}/docs/endpoints.md#${service.id}`
                : `${SITE_URL}${service.docsPath}.md`
            return `- [${service.name}](${href}) — \`${service.prefix}\` — ${service.description}`
        }),
        '',
    ].join('\n')
}

function buildEndpointsMarkdown() {
    const parts = [
        '# Endpoints públicos',
        '',
        `> ${countEndpoints()} endpoints GET em \`${API_BASE}\`, listados a partir de \`GET /v1/status\` e do código dos conectores.`,
        '',
        'Sem autenticação para dados. Alias: `/v1/contracts` → `/v1/base`. `/v1/pt2030` partilha o conector `/v1/prr`.',
        '',
        `[HTML](${SITE_URL}/docs/endpoints) · [Skill SKILL.md](${SITE_URL}/docs/endpoints.md)`,
        '',
    ]
    for (const service of SERVICES) {
        parts.push(buildServiceMarkdown(service))
    }
    return parts.join('\n')
}

function buildMcpMarkdown() {
    return [
        '# MCP — API Aberta',
        '',
        'Não existia um servidor MCP em nenhum repositório da organização [apiaberta](https://github.com/apiaberta). Este site inclui `@apiaberta/mcp` em [`mcp/`](https://github.com/apiaberta/apiaberta.pt/tree/main/mcp): um servidor stdio em Node ESM, uma ferramenta por endpoint público, a chamar `https://api.apiaberta.pt`.',
        '',
        'Não está publicado no npm. Corre a partir do repositório.',
        '',
        '## Claude Desktop',
        '',
        'Edita `claude_desktop_config.json`:',
        '',
        '```json',
        '{',
        '  "mcpServers": {',
        '    "apiaberta": {',
        '      "command": "node",',
        '      "args": ["/caminho/para/apiaberta.pt/mcp/src/index.js"]',
        '    }',
        '  }',
        '}',
        '```',
        '',
        '## Claude Code',
        '',
        '```bash',
        'claude mcp add apiaberta -- node /caminho/para/apiaberta.pt/mcp/src/index.js',
        '```',
        '',
        '## Cursor',
        '',
        'Em `.cursor/mcp.json` (projecto) ou `~/.cursor/mcp.json`:',
        '',
        '```json',
        '{',
        '  "mcpServers": {',
        '    "apiaberta": {',
        '      "command": "node",',
        '      "args": ["/caminho/para/apiaberta.pt/mcp/src/index.js"]',
        '    }',
        '  }',
        '}',
        '```',
        '',
        'Depois de `npm install` dentro de `mcp/`. Quando o pacote for publicado: `npx -y @apiaberta/mcp`.',
        '',
        `[README do pacote](https://github.com/apiaberta/apiaberta.pt/blob/main/mcp/README.md) · [HTML](${SITE_URL}/docs/mcp)`,
        '',
    ].join('\n')
}

function buildDadosIndexMarkdown() {
    const dataServices = SERVICES.filter((service) => service.docsPath.startsWith('/dados/'))
    return [
        '# Dados abertos',
        '',
        'Acesso directo a dados públicos portugueses, em JSON e em Markdown.',
        '',
        ...dataServices.map((service) => `- [${service.name}](${SITE_URL}${service.docsPath}.md) — ${service.description}`),
        '',
        `Catálogo completo: ${SITE_URL}/docs/endpoints.md`,
        '',
    ].join('\n')
}

function buildSdkMarkdown() {
    return [
        '# SDKs API Aberta',
        '',
        'Integra dados públicos portugueses com os SDKs oficiais.',
        '',
        '## JavaScript / Node.js',
        '',
        '```bash',
        'npm install apiaberta-js',
        '```',
        '',
        '```js',
        "import ApiAberta from 'apiaberta-js'",
        '',
        "const api = new ApiAberta({ apiKey: 'your-key' })",
        "const prices = await api.fuel({ district: 'Lisboa' })",
        '```',
        '',
        '## Python',
        '',
        '```bash',
        'pip install apiaberta',
        '```',
        '',
        '```python',
        'from apiaberta import ApiAberta',
        '',
        'api = ApiAberta(api_key="your-key")',
        'prices = api.fuel(district="Lisboa")',
        '```',
        '',
        `- [apiaberta-js](https://github.com/apiaberta/apiaberta-js)`,
        `- [apiaberta-py](https://github.com/apiaberta/apiaberta-py)`,
        `- [HTML](${SITE_URL}/sdk)`,
        '',
        'Os endpoints REST públicos funcionam sem SDK nem chave. Ver [endpoints.md](./docs/endpoints.md).',
        '',
    ].join('\n')
}

function buildLlmsFull() {
    return [
        buildLlmsTxt(),
        '',
        '---',
        '',
        buildDocsIndexMarkdown(),
        '',
        '---',
        '',
        buildEndpointsMarkdown(),
        '',
        '---',
        '',
        buildMcpMarkdown(),
        '',
        '---',
        '',
        buildDadosIndexMarkdown(),
        '',
        '---',
        '',
        buildSdkMarkdown(),
        '',
        '---',
        '',
        '# Skill SKILL.md',
        '',
        buildSkillMarkdown(),
        '',
    ].join('\n')
}

const pages = {
    'llms.txt': buildLlmsTxt(),
    'llms-full.txt': buildLlmsFull(),
    'docs.md': buildDocsIndexMarkdown(),
    'docs/endpoints.md': buildEndpointsMarkdown(),
    'docs/mcp.md': buildMcpMarkdown(),
    'dados.md': buildDadosIndexMarkdown(),
    'sdk.md': buildSdkMarkdown(),
}

for (const service of SERVICES) {
    if (service.docsPath.startsWith('/dados/')) {
        const rel = service.docsPath.replace(/^\//, '') + '.md'
        pages[rel] = buildServiceMarkdown(service)
    }
}

for (const [rel, contents] of Object.entries(pages)) {
    await write(rel, contents)
}

const mcpCatalog = `// Generated by scripts/generate-llm-docs.js — do not edit by hand.\nexport const API_BASE = ${JSON.stringify(API_BASE)}\n\nexport const SERVICES = ${JSON.stringify(SERVICES, null, 4)}\n`
await mkdir(join(root, 'mcp/src'), { recursive: true })
await writeFile(join(root, 'mcp/src/catalog.js'), mcpCatalog, 'utf8')

console.log(`Wrote ${Object.keys(pages).length} public files and mcp/src/catalog.js (${countEndpoints()} endpoints)`)
