import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, List, Plug, Code, FileText } from 'lucide-react'
import CopyForLlm from '../components/CopyForLlm'
import { countEndpoints } from '../data/endpoints.js'

const CARDS = [
  {
    to: '/docs/endpoints',
    md: '/docs/endpoints.md',
    icon: List,
    color: '#16A34A',
    bg: '#F0FDF4',
    title: 'Endpoints',
    body: 'Catálogo de todos os GET públicos, parâmetros e exemplos curl.',
  },
  {
    to: '/docs/mcp',
    md: '/docs/mcp.md',
    icon: Plug,
    color: '#6366F1',
    bg: '#EEF2FF',
    title: 'MCP',
    body: 'Servidor stdio @apiaberta/mcp para Claude Desktop, Claude Code e Cursor.',
  },
  {
    to: '/sdk',
    md: '/sdk.md',
    icon: Code,
    color: '#0EA5E9',
    bg: '#F0F9FF',
    title: 'SDKs',
    body: 'Clientes oficiais JavaScript e Python.',
  },
  {
    to: '/dados',
    md: '/dados.md',
    icon: FileText,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Dados abertos',
    body: 'Páginas humanas com dados em directo e a respectiva versão Markdown.',
  },
]

export default function Docs() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> Início
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#16A34A', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <BookOpen size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Documentação
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {countEndpoints()} endpoints públicos em <code style={{ color: '#4ADE80' }}>api.apiaberta.pt</code>.
            Cada página tem uma versão <code style={{ color: '#93C5FD' }}>.md</code> para LLMs.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CopyForLlm />
            <a href="/docs.md" style={{ color: '#94A3B8', fontSize: '0.875rem', alignSelf: 'center' }}>
              Ver docs.md
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.to} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem', padding: '1.25rem' }}>
                <div style={{ background: card.bg, width: '2.5rem', height: '2.5rem', borderRadius: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                  <Icon size={20} color={card.color} />
                </div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>{card.title}</h2>
                <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1rem' }}>{card.body}</p>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Link to={card.to} style={{ color: '#16A34A', textDecoration: 'none' }}>Abrir</Link>
                  <a href={card.md} style={{ color: '#64748B', textDecoration: 'none' }}>.md</a>
                </div>
              </div>
            )
          })}
        </div>

        <section style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem', padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', marginBottom: '0.5rem' }}>Para LLMs</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '0.75rem' }}>
            <strong>Copiar para LLM</strong> coloca na área de transferência um skill em formato SKILL.md
            (quando usar, base URL, endpoints, parâmetros e exemplos curl). Também podes apontar o modelo para:
          </p>
          <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li><a href="/llms.txt" style={{ color: '#16A34A' }}>/llms.txt</a> — índice</li>
            <li><a href="/llms-full.txt" style={{ color: '#16A34A' }}>/llms-full.txt</a> — documentação completa</li>
            <li>Qualquer página de docs ou dados com o sufixo <code>.md</code></li>
          </ul>
        </section>

        <section style={{ background: '#0F172A', borderRadius: '0.875rem', padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'white', marginBottom: '0.5rem' }}>MCP para developers</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '0.85rem' }}>
            Nenhum repositório da org apiaberta tinha um servidor MCP. Criámos <code style={{ color: '#A5B4FC' }}>@apiaberta/mcp</code> nesta pasta
            <code style={{ color: '#86EFAC' }}> mcp/</code> — stdio, Node ESM, uma ferramenta por endpoint público.
          </p>
          <Link to="/docs/mcp" style={{ color: '#4ADE80', fontWeight: 700, textDecoration: 'none' }}>
            Configurar Claude Desktop, Claude Code e Cursor →
          </Link>
        </section>
      </div>
    </div>
  )
}
