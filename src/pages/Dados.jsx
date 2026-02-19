import { Link } from 'react-router-dom'
import { Cloud, Fuel, FileText, ArrowRight, ArrowLeft, Database } from 'lucide-react'

const CATEGORIES = [
  {
    slug: 'tempo',
    icon: Cloud,
    color: '#3B82F6',
    bg: '#EFF6FF',
    title: 'Meteorologia',
    subtitle: 'Previsão do tempo',
    description: 'Previsões meteorológicas para as principais cidades portuguesas. Dados oficiais do IPMA, actualizados a cada 6 horas.',
    badge: 'IPMA',
    path: '/dados/tempo'
  },
  {
    slug: 'combustivel',
    icon: Fuel,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Combustíveis',
    subtitle: 'Preços nas bombas',
    description: 'Preços actuais de combustíveis em postos de todo o país. Dados da DGEG actualizados diariamente.',
    badge: 'DGEG',
    path: '/dados/combustivel'
  },
  {
    slug: 'contratos',
    icon: FileText,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    title: 'Contratos Públicos',
    subtitle: 'Portal BASE',
    description: 'Contratos públicos do portal BASE.gov.pt. Ajustes directos e concursos públicos actualizados diariamente.',
    badge: 'BASE',
    path: '/dados/contratos',
    soon: false
  }
]

export default function Dados() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: '#0F172A', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem'
            }}
          >
            <ArrowLeft size={16} />
            Início
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#16A34A', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <Database size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Dados Abertos
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            Acesso directo a dados públicos portugueses, em formato legível por humanos e máquinas.
          </p>
        </div>
      </div>

      {/* Categories grid */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.slug}
                to={cat.path}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card"
                  style={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ background: cat.bg, borderRadius: '0.75rem', padding: '0.75rem', display: 'flex' }}>
                      <Icon size={24} color={cat.color} />
                    </div>
                    <span style={{
                      background: '#F1F5F9', color: '#475569', fontSize: '0.75rem',
                      fontWeight: 600, padding: '0.25rem 0.625rem', borderRadius: '999px'
                    }}>
                      {cat.badge}
                    </span>
                  </div>
                  <h2 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0F172A', marginBottom: '0.25rem' }}>
                    {cat.title}
                  </h2>
                  <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    {cat.subtitle}
                  </p>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {cat.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#16A34A', fontSize: '0.9rem', fontWeight: 600 }}>
                    Ver dados
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* API note */}
        <div style={{
          marginTop: '3rem', background: '#0F172A', borderRadius: '1rem',
          padding: '1.75rem 2rem', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '0.25rem' }}>Acesso via API</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
              Todos estes dados estão disponíveis em JSON via <code style={{ color: '#4ADE80' }}>api.apiaberta.pt</code>
            </p>
          </div>
          <a
            href="https://api.apiaberta.pt/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
          >
            Ver documentação
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
