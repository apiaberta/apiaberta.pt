import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, List, Search } from 'lucide-react'
import CopyForLlm from '../components/CopyForLlm'
import { SERVICES, countEndpoints } from '../data/endpoints.js'

export default function DocsEndpoints() {
  const [query, setQuery] = useState('')
  const total = countEndpoints()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SERVICES
    return SERVICES.map((service) => ({
      ...service,
      endpoints: service.endpoints.filter((endpoint) => {
        const hay = [service.name, service.prefix, service.source, endpoint.path, endpoint.description, endpoint.id]
          .join(' ')
          .toLowerCase()
        return hay.includes(q)
      }),
    })).filter((service) => service.endpoints.length)
  }, [query])

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Link to="/docs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> Documentação
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#16A34A', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <List size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Endpoints
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {total} GET públicos em <code style={{ color: '#4ADE80' }}>https://api.apiaberta.pt</code>,
            obtidos de <code style={{ color: '#93C5FD' }}>/v1/status</code> e do código dos conectores.
            Sem chave para dados (30 req/min).
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <CopyForLlm />
            <a href="/docs/endpoints.md" style={{ color: '#94A3B8', fontSize: '0.875rem', alignSelf: 'center' }}>
              endpoints.md
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <div style={{ position: 'relative', marginBottom: '1.75rem' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '0.9rem', top: '0.85rem' }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por serviço, path ou descrição…"
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.4rem',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              fontSize: '0.92rem',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Alias: <code>/v1/contracts</code> → <code>/v1/base</code>. <code>/v1/pt2030</code> partilha o conector <code>/v1/prr</code>.
        </p>

        {filtered.map((service) => (
          <section key={service.id} id={service.id} style={{ marginBottom: '2.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
              <div>
                <h2 style={{ fontWeight: 800, fontSize: '1.15rem', color: '#0F172A', margin: 0 }}>{service.name}</h2>
                <p style={{ color: '#64748B', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                  {service.description} · {service.source}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', fontSize: '0.8rem' }}>
                <code style={{ background: '#F1F5F9', color: '#475569', padding: '0.2rem 0.45rem', borderRadius: '0.35rem' }}>{service.prefix}</code>
                {service.docsPath.startsWith('/dados/') && (
                  <Link to={service.docsPath} style={{ color: '#16A34A', textDecoration: 'none', fontWeight: 600 }}>UI</Link>
                )}
                <a href={`${service.docsPath}.md`} style={{ color: '#64748B', textDecoration: 'none' }}>.md</a>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {service.endpoints.map((endpoint) => (
                <article key={endpoint.id} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '0.95rem 1.15rem' }}>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ background: '#ECFDF5', color: '#15803D', fontWeight: 800, fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '0.3rem' }}>
                      {endpoint.method}
                    </span>
                    <code style={{ color: '#0F172A', fontSize: '0.88rem', fontWeight: 600 }}>{endpoint.path}</code>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0 0 0.55rem' }}>{endpoint.description}</p>
                  {endpoint.params.length > 0 && (
                    <ul style={{ margin: '0 0 0.65rem', paddingLeft: '1.1rem', color: '#64748B', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      {endpoint.params.map((param) => (
                        <li key={param.name}>
                          <code>{param.name}</code> ({param.in}{param.required ? ', obrigatório' : ''}) — {param.description}
                        </li>
                      ))}
                    </ul>
                  )}
                  <pre style={{
                    margin: 0,
                    background: '#0F172A',
                    color: '#E2E8F0',
                    borderRadius: '0.5rem',
                    padding: '0.7rem 0.9rem',
                    fontSize: '0.75rem',
                    overflowX: 'auto',
                    fontFamily: 'ui-monospace, monospace',
                  }}>
                    <code>{endpoint.example}</code>
                  </pre>
                </article>
              ))}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <p style={{ color: '#64748B', textAlign: 'center', padding: '2rem' }}>Nenhum endpoint corresponde à pesquisa.</p>
        )}
      </div>
    </div>
  )
}
