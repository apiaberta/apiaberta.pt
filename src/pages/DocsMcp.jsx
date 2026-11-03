import { Link } from 'react-router-dom'
import { ArrowLeft, Plug } from 'lucide-react'
import CopyForLlm from '../components/CopyForLlm'
import { countEndpoints } from '../data/endpoints.js'

function CodeBlock({ children }) {
  return (
    <pre style={{
      margin: '0.75rem 0 0',
      background: '#0F172A',
      color: '#E2E8F0',
      borderRadius: '0.75rem',
      padding: '1rem 1.15rem',
      fontSize: '0.8rem',
      lineHeight: 1.65,
      overflowX: 'auto',
      fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace',
    }}>
      <code>{children}</code>
    </pre>
  )
}

export default function DocsMcp() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/docs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> Documentação
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#6366F1', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <Plug size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              MCP
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Servidor Model Context Protocol em Node ESM. Uma ferramenta por cada um dos {countEndpoints()} endpoints públicos.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CopyForLlm />
            <a href="/docs/mcp.md" style={{ color: '#94A3B8', fontSize: '0.875rem', alignSelf: 'center' }}>mcp.md</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <section style={{ marginBottom: '2.25rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Já existia um MCP?</h2>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7 }}>
            Não. Percorremos os repositórios públicos da organização{' '}
            <a href="https://github.com/apiaberta" style={{ color: '#16A34A' }}>apiaberta</a>{' '}
            no GitHub (landing, gateway, conectores, SDKs, CLI, portal e testes). Nenhum tinha
            servidor MCP nem dependência <code>@modelcontextprotocol/sdk</code>.
            Por isso o pacote novo vive em <code>mcp/</code> neste repositório, pronto a publicar
            como <code>@apiaberta/mcp</code> — sem publicação no npm neste momento.
          </p>
        </section>

        <section style={{ marginBottom: '2.25rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Instalação local</h2>
          <CodeBlock>{`git clone https://github.com/apiaberta/apiaberta.pt.git
cd apiaberta.pt/mcp
npm install`}</CodeBlock>
        </section>

        <section style={{ marginBottom: '2.25rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Claude Desktop</h2>
          <p style={{ color: '#64748B', fontSize: '0.88rem' }}>
            Ficheiro <code>claude_desktop_config.json</code> (macOS: <code>~/Library/Application Support/Claude/</code>).
          </p>
          <CodeBlock>{`{
  "mcpServers": {
    "apiaberta": {
      "command": "node",
      "args": ["/caminho/para/apiaberta.pt/mcp/src/index.js"]
    }
  }
}`}</CodeBlock>
        </section>

        <section style={{ marginBottom: '2.25rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Claude Code</h2>
          <CodeBlock>{`claude mcp add apiaberta -- node /caminho/para/apiaberta.pt/mcp/src/index.js`}</CodeBlock>
        </section>

        <section style={{ marginBottom: '2.25rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>Cursor</h2>
          <p style={{ color: '#64748B', fontSize: '0.88rem' }}>
            Projecto: <code>.cursor/mcp.json</code>. Global: <code>~/.cursor/mcp.json</code>.
          </p>
          <CodeBlock>{`{
  "mcpServers": {
    "apiaberta": {
      "command": "node",
      "args": ["/caminho/para/apiaberta.pt/mcp/src/index.js"]
    }
  }
}`}</CodeBlock>
        </section>

        <section style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem', padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', marginTop: 0 }}>Quando estiver no npm</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.65 }}>
            O <code>package.json</code> já declara o binário <code>apiaberta-mcp</code>. Depois de publicado:
          </p>
          <CodeBlock>{`{
  "mcpServers": {
    "apiaberta": {
      "command": "npx",
      "args": ["-y", "@apiaberta/mcp"]
    }
  }
}`}</CodeBlock>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '1rem' }}>
            Código:{' '}
            <a href="https://github.com/apiaberta/apiaberta.pt/tree/main/mcp" style={{ color: '#16A34A' }}>
              github.com/apiaberta/apiaberta.pt/mcp
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
