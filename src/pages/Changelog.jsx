import { Link } from 'react-router-dom'
import { ArrowLeft, GitCommit, Star, Shield, Zap, Database, ShieldAlert, BarChart2 } from 'lucide-react'

const RELEASES = [
  {
    date: '2026-03-09',
    version: 'Sprint 5 — SDKs & Developer Experience',
    tag: 'Novo',
    tagColor: '#16A34A',
    tagBg: '#F0FDF4',
    items: [
      {
        icon: Code,
        color: '#6366F1',
        title: 'JavaScript SDK — apiaberta-js',
        desc: 'SDK oficial para Node.js e browsers. ESM + CommonJS, TypeScript types incluídos. Cobertura total de endpoints com tratamento de erros e timeout configurável.',
        endpoints: ['npm install apiaberta-js']
      },
      {
        icon: Code,
        color: '#3B82F6',
        title: 'Python SDK — apiaberta-py',
        desc: 'SDK oficial para Python 3.8+. Wrapper completo sobre a API REST com docstrings detalhadas e suporte a variável de ambiente APIABERTA_KEY.',
        endpoints: ['pip install apiaberta']
      },
      {
        icon: Zap,
        color: '#F59E0B',
        title: 'Página de documentação SDK',
        desc: 'Nova página /sdk com exemplos de código interactivos, referência de métodos e selector de linguagem (JavaScript / Python).',
        endpoints: ['/sdk']
      }
    ]
  },

  {
    date: '2026-03-07',
    version: 'Sprint 3 — Crescimento',
    tag: 'Novo',
    tagColor: '#16A34A',
    tagBg: '#F0FDF4',
    items: [
      {
        icon: BarChart2,
        color: '#6366F1',
        title: 'connector-ine — Estatísticas de Portugal',
        desc: 'Indicadores económicos e demográficos via Eurostat: população, PIB, desemprego, inflação, natalidade e mortalidade. Série histórica desde 1960.',
        endpoints: ['/v1/ine/latest', '/v1/ine/stats', '/v1/ine/indicators']
      },
      {
        icon: ShieldAlert,
        color: '#DC2626',
        title: 'connector-anpc — Proteção Civil em tempo real',
        desc: 'Ocorrências activas da ANEPC (incêndios, cheias, operações de socorro) actualizadas a cada 5 minutos via fogos.pt.',
        endpoints: ['/v1/anpc/incidents/active', '/v1/anpc/incidents', '/v1/anpc/summary']
      }
    ]
  },
  {
    date: '2026-03-06',
    version: 'Sprint 2 — Features',
    tag: 'Estável',
    tagColor: '#1D4ED8',
    tagBg: '#EFF6FF',
    items: [
      {
        icon: Database,
        color: '#1D4ED8',
        title: 'Dashboard de usage no Dev Portal',
        desc: 'Gráficos SVG de chamadas por dia e top endpoints. Acessível em app.apiaberta.pt.',
        endpoints: ['/v1/auth/usage']
      },
      {
        icon: Star,
        color: '#8B5CF6',
        title: 'Meta endpoint padronizado',
        desc: 'Todos os connectors expõem /meta com fonte, frequência de actualização e contagem de registos.',
        endpoints: ['/v1/{svc}/meta']
      },
      {
        icon: Database,
        color: '#0891B2',
        title: 'connector-base — sync automático',
        desc: 'Contratos públicos sincronizados diariamente às 03:00 com indexação de texto para pesquisa.',
        endpoints: ['/v1/base/contracts']
      }
    ]
  },
  {
    date: '2026-03-05',
    version: 'Sprint 1 — Solidez',
    tag: 'Estável',
    tagColor: '#1D4ED8',
    tagBg: '#EFF6FF',
    items: [
      {
        icon: Shield,
        color: '#10B981',
        title: 'Security headers + rate limiting por IP',
        desc: 'fastify-helmet em todos os serviços. Rate limit por IP além de por API key.',
        endpoints: []
      },
      {
        icon: Zap,
        color: '#F59E0B',
        title: 'GitHub Actions CI/CD',
        desc: 'Pipeline de CI com testes Playwright para todos os repos principais. Deploy automático a cada push.',
        endpoints: []
      },
      {
        icon: Database,
        color: '#6366F1',
        title: 'connector-base activado',
        desc: 'Contratos públicos do BASE.gov.pt disponíveis em /v1/base/contracts.',
        endpoints: ['/v1/base/contracts']
      }
    ]
  }
]

export default function Changelog() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> Início
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#16A34A', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <GitCommit size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Changelog
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6 }}>
            O historial de o que mudou na plataforma API Aberta.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {RELEASES.map((release, i) => (
          <div key={i} style={{ marginBottom: '3rem' }}>
            {/* Release header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ background: release.tagBg, color: release.tagColor, border: `1px solid ${release.tagColor}33`, borderRadius: '2rem', padding: '0.25rem 0.875rem', fontSize: '0.78rem', fontWeight: 700 }}>
                {release.tag}
              </div>
              <div>
                <h2 style={{ fontWeight: 800, fontSize: '1.15rem', color: '#0F172A', margin: 0 }}>
                  {release.version}
                </h2>
                <time style={{ color: '#64748B', fontSize: '0.82rem' }}>{release.date}</time>
              </div>
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', paddingLeft: '0.5rem', borderLeft: '2px solid #E2E8F0' }}>
              {release.items.map((item, j) => {
                const Icon = item.icon
                return (
                  <div key={j} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem', padding: '1.25rem 1.5rem', marginLeft: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                      <div style={{ background: `${item.color}15`, borderRadius: '0.5rem', padding: '0.5rem', display: 'flex', flexShrink: 0 }}>
                        <Icon size={16} color={item.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                          {item.title}
                        </div>
                        <div style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: item.endpoints.length ? '0.75rem' : 0 }}>
                          {item.desc}
                        </div>
                        {item.endpoints.length > 0 && (
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {item.endpoints.map(ep => (
                              <code key={ep} style={{ background: '#F1F5F9', color: '#475569', borderRadius: '0.35rem', padding: '0.15rem 0.5rem', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                {ep}
                              </code>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem', paddingTop: '2rem', borderTop: '1px solid #E2E8F0' }}>
          Código aberto em{' '}
          <a href="https://github.com/apiaberta" style={{ color: '#6366F1', textDecoration: 'none' }}>github.com/apiaberta</a>
        </div>
      </div>
    </div>
  )
}
