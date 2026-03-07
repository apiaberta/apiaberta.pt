import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart2, ArrowLeft, RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react'

const API_BASE = 'https://api.apiaberta.pt/v1/ine'

const INDICATOR_LABELS = {
  population:        { label: 'População Residente', unit: 'pessoas', emoji: '👥', format: (v) => v?.toLocaleString('pt-PT') },
  gdp:               { label: 'PIB (preços correntes)', unit: 'M€', emoji: '💶', format: (v) => `${(v/1000).toFixed(1)}B€` },
  gdp_per_capita:    { label: 'PIB per capita', unit: '€/hab', emoji: '💰', format: (v) => `${v?.toLocaleString('pt-PT')}€` },
  unemployment_rate: { label: 'Taxa de Desemprego', unit: '%', emoji: '📉', format: (v) => `${v?.toFixed(1)}%` },
  inflation:         { label: 'Inflação (IHPC)', unit: '%', emoji: '📈', format: (v) => `${v?.toFixed(1)}%` },
  birth_rate:        { label: 'Taxa de Natalidade', unit: '/1000 hab', emoji: '👶', format: (v) => `${v?.toFixed(1)}‰` },
  death_rate:        { label: 'Taxa de Mortalidade', unit: '/1000 hab', emoji: '📊', format: (v) => `${v?.toFixed(1)}‰` },
}

function StatCard({ item }) {
  const meta = INDICATOR_LABELS[item.indicator] || { label: item.indicator, emoji: '📊', format: (v) => v }
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '1rem',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.75rem' }}>{meta.emoji}</span>
        <div>
          <div style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {meta.label}
          </div>
          <div style={{ color: '#94A3B8', fontSize: '0.72rem' }}>
            {item.year}
          </div>
        </div>
      </div>
      <div style={{ fontWeight: 800, fontSize: '1.6rem', color: '#0F172A', lineHeight: 1.1 }}>
        {meta.format ? meta.format(item.value) : item.value}
      </div>
      <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
        Fonte: Eurostat
      </div>
    </div>
  )
}

export default function DadosINE() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/latest`, {
        headers: { 'X-API-Key': 'public' }
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json.data || [])
      setLastUpdate(new Date().toLocaleTimeString('pt-PT'))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link to="/dados" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> Dados Abertos
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#6366F1', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <BarChart2 size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Estatísticas de Portugal
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6 }}>
            Indicadores económicos e demográficos de Portugal via Eurostat. Dados oficiais actualizados semanalmente.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: '#16A34A22', color: '#16A34A', border: '1px solid #16A34A44', borderRadius: '2rem', padding: '0.25rem 0.75rem', fontSize: '0.78rem', fontWeight: 600 }}>
              EUROSTAT
            </span>
            {lastUpdate && (
              <span style={{ color: '#475569', fontSize: '0.8rem' }}>
                Actualizado às {lastUpdate}
              </span>
            )}
            <button onClick={load} disabled={loading} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
              <RefreshCw size={13} className={loading ? 'spin' : ''} /> Actualizar
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {loading && !data && (
          <div style={{ textAlign: 'center', color: '#64748B', padding: '3rem' }}>
            <RefreshCw size={24} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }} />
            A carregar dados...
          </div>
        )}
        {error && !data && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', gap: '0.75rem', color: '#991B1B' }}>
            <AlertTriangle size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Erro ao carregar dados</strong>
              <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{error}</div>
            </div>
          </div>
        )}
        {data && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
              {data.map(item => <StatCard key={item.indicator} item={item} />)}
            </div>

            {/* API box */}
            <div style={{ background: '#0F172A', borderRadius: '1rem', padding: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <TrendingUp size={18} color="#818CF8" />
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Acesso via API</span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Acede aos dados históricos desde 1960 com filtros por indicador e ano.
              </p>
              <div style={{ background: '#1E293B', borderRadius: '0.5rem', padding: '1rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#94A3B8', overflowX: 'auto' }}>
                <div style={{ color: '#64748B', marginBottom: '0.5rem' }}># Últimos valores de todos os indicadores</div>
                <div>GET <span style={{ color: '#818CF8' }}>https://api.apiaberta.pt/v1/ine/latest</span></div>
                <div style={{ marginTop: '0.75rem', color: '#64748B' }}># Série histórica de população e PIB</div>
                <div>GET <span style={{ color: '#818CF8' }}>https://api.apiaberta.pt/v1/ine/stats?indicator=population,gdp&from=2000</span></div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <a href="https://app.apiaberta.pt" style={{ color: '#818CF8', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Obter API key gratuita →
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
