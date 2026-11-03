# @apiaberta/mcp

Servidor [MCP](https://modelcontextprotocol.io) (stdio, Node ESM) para a [API Aberta](https://apiaberta.pt).

Uma ferramenta por endpoint público de `https://api.apiaberta.pt`. Os pedidos vão directamente para a API; não é necessária chave para os endpoints de dados (30 req/min por IP).

O pacote está pronto a publicar como `@apiaberta/mcp`. **Não está no npm** — corre a partir deste repositório.

## Instalação

```bash
cd mcp
npm install
```

Binário: `src/index.js` (`apiaberta-mcp` quando publicado).

## Claude Desktop

Edita `claude_desktop_config.json`:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
    "mcpServers": {
        "apiaberta": {
            "command": "node",
            "args": ["/caminho/absoluto/para/apiaberta.pt/mcp/src/index.js"]
        }
    }
}
```

Reinicia o Claude Desktop.

## Claude Code

```bash
claude mcp add apiaberta -- node /caminho/absoluto/para/apiaberta.pt/mcp/src/index.js
```

## Cursor

Projecto (`.cursor/mcp.json`) ou global (`~/.cursor/mcp.json`):

```json
{
    "mcpServers": {
        "apiaberta": {
            "command": "node",
            "args": ["/caminho/absoluto/para/apiaberta.pt/mcp/src/index.js"]
        }
    }
}
```

## Depois de publicado no npm

```json
{
    "mcpServers": {
        "apiaberta": {
            "command": "npx",
            "args": ["-y", "@apiaberta/mcp"]
        }
    }
}
```

## Ferramentas

O catálogo em `src/catalog.js` é gerado a partir de `src/data/endpoints.js` no site (script `scripts/generate-llm-docs.js`). Cobre o estado da plataforma (`status`, `stats`) e todos os conectores públicos listados em `GET /v1/status`.

## Requisitos

- Node.js 20+
- Rede até `https://api.apiaberta.pt`
