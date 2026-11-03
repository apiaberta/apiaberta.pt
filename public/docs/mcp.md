# MCP — API Aberta

Não existia um servidor MCP em nenhum repositório da organização [apiaberta](https://github.com/apiaberta). Este site inclui `@apiaberta/mcp` em [`mcp/`](https://github.com/apiaberta/apiaberta.pt/tree/main/mcp): um servidor stdio em Node ESM, uma ferramenta por endpoint público, a chamar `https://api.apiaberta.pt`.

Não está publicado no npm. Corre a partir do repositório.

## Claude Desktop

Edita `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "apiaberta": {
      "command": "node",
      "args": ["/caminho/para/apiaberta.pt/mcp/src/index.js"]
    }
  }
}
```

## Claude Code

```bash
claude mcp add apiaberta -- node /caminho/para/apiaberta.pt/mcp/src/index.js
```

## Cursor

Em `.cursor/mcp.json` (projecto) ou `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "apiaberta": {
      "command": "node",
      "args": ["/caminho/para/apiaberta.pt/mcp/src/index.js"]
    }
  }
}
```

Depois de `npm install` dentro de `mcp/`. Quando o pacote for publicado: `npx -y @apiaberta/mcp`.

[README do pacote](https://github.com/apiaberta/apiaberta.pt/blob/main/mcp/README.md) · [HTML](https://apiaberta.pt/docs/mcp)
