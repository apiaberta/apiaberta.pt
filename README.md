# apiaberta.pt - Landing Page

Landing page oficial do projecto [API Aberta](https://github.com/apiaberta) - uma iniciativa open-source para unificar e disponibilizar dados públicos portugueses numa única API REST moderna.

## Tech Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)
- Custom i18n (PT/EN)

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Estrutura

```
src/
  components/     # Componentes reutilizáveis
  contexts/       # React Context (Language, API)
  data/           # Catálogo de endpoints públicos
  i18n/           # Traduções PT/EN
  pages/          # Páginas da aplicação
  App.jsx
  main.jsx
mcp/              # Servidor MCP (@apiaberta/mcp)
public/llms.txt   # Índice para LLMs
```

## Páginas

- `/` - Home (todas as secções)
- `/docs` - Documentação (HTML + `.md`)
- `/docs/endpoints` - Catálogo de endpoints
- `/docs/mcp` - Servidor MCP
- `/dados` - Dados abertos
- `/sdk` - SDKs
- `/contribute` - Guia de contribuição
- `/contact` - Formulário de contacto
- `/llms.txt` e `/llms-full.txt` - documentação para modelos

Cada página de docs/endpoints (e as de dados) tem uma versão Markdown no mesmo path com `.md`.

## MCP

Não existia servidor MCP na org [apiaberta](https://github.com/apiaberta). O pacote novo está em [`mcp/`](./mcp) (`@apiaberta/mcp`, stdio, Node ESM). Não está publicado no npm — ver `mcp/README.md`.

## Contribuir

Contribuições são bem-vindas! Lê o [guia de contribuição](https://github.com/apiaberta/apiaberta/blob/main/CONTRIBUTING.md) e abre um Pull Request.

## Licença

MIT - ver [LICENSE](LICENSE)
