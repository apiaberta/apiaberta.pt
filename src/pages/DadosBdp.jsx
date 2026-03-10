import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, ArrowLeft, RefreshCw, AlertTriangle, Percent } from 'lucide-react'

const API_BASE = 'https://api.apiaberta.pt/v1/bdp'

function RateCard({ item }) {
  const isStale = item.ref_date && new Date() - new Date(item.ref_date) > 7 * 24 * 3600 * 1000
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>
          {item.label_pt || item.label}
        </div>
        {item.frequency === 'daily' ? (
          <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '1rem', whiteSpace: 'nowrap' }}>DIÁRIO</span>
        ) : (
          <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '1rem', whiteSpace: 'nowrap' }}>MENSAL</span>
        )}
      </div>
      <div style={{ fontWeight: 800, fontSize: '2rem', color: '#0F172A', lineHeight: 1 }}>
        {item.value !== null ? `${item.value}%` : '—'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.72rem' }}>
        <span>Referência: {item.ref_date || '—'}</span>
        {isStale && <span title="Dados podem não ser actuais">⚠️</span>}
      </div>
    </div>
  )
}

export default function DadosBdp() {
  const [ecbRates, setEcbRates] = useState(null)
  const [lendingRates, setLendingRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const [ratesRes, lendingRes] = await Promise.all([
        fetch(`${API_BASE}/rates`),
        fetch(`${API_BASE}/lending-rates`)
      ])
      if (!ratesRes.ok || !lendingRes.ok) throw new Error('Erro ao carregar dados')
      const ratesData = await ratesRes.json()
      const lendingData = await lendingRes.json()
      setEcbRates(ratesData)
      setLendingRates(lendingData)
      setLastUpdate(new Date().toLocaleTimeString('pt-PT'))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/dados" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748B', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '1rem' }}>
            <ArrowLeft size={14} /> Todos os dados
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <TrendingUp size={28} color="#1D4ED8" />
                Taxas de Juro
              </h1>
              <p style={{ color: '#64748B', marginTop: '0.3rem', fontSize: '0.95rem' }}>
                Taxas BCE, €STR e taxas de crédito em Portugal. Fonte: Banco de Portugal BPstat.
              </p>
            </div>
            <button
              onClick={load}
              disabled={loading}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#1D4ED8', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem', opacity: loading ? 0.6 : 1 }}
            >
              <RefreshCw size={14} className={loading ? 'spinning' : ''} />
              Actualizar
            </button>
          </div>
          {lastUpdate && <p style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '0.5rem' }}>Última actualização: {lastUpdate}</p>}
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#DC2626' }}>
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {loading && !ecbRates && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>A carregar taxas...</div>
        )}

        {ecbRates && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🏦 Taxas BCE + €STR
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.82rem', marginBottom: '1rem' }}>
              Taxas de referência do Banco Central Europeu e taxa overnight (€STR). Actualizadas diariamente.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
              {ecbRates.data?.map(item => <RateCard key={item.key} item={item} />)}
            </div>
          </div>
        )}

        {lendingRates && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🏠 Crédito e Depósitos em Portugal
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.82rem', marginBottom: '1rem' }}>
              Taxas médias praticadas pelos bancos em Portugal para novas operações. Dados mensais do Banco de Portugal (BPstat).
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
              {lendingRates.data?.map(item => <RateCard key={item.key} item={item} />)}
            </div>
          </div>
        )}

        {/* API box */}
        <div style={{ background: '#0F172A', borderRadius: '1rem', padding: '1.5rem', color: '#E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Percent size={16} color="#4ADE80" />
            <span style={{ fontWeight: 700, color: '#F8FAFC' }}>API — Integra no teu projecto</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['Taxas BCE', 'GET https://api.apiaberta.pt/v1/bdp/rates'],
              ['Crédito PT', 'GET https://api.apiaberta.pt/v1/bdp/lending-rates'],
              ['Metadados', 'GET https://api.apiaberta.pt/v1/bdp/meta']
            ].map(([label, url]) => (
              <div key={label}>
                <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{label}</span>
                <pre style={{ background: '#1E293B', borderRadius: '0.4rem', padding: '0.5rem 0.75rem', margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#4ADE80', overflowX: 'auto' }}>{url}</pre>
              </div>
            ))}
          </div>
          <p style={{ color: '#64748B', fontSize: '0.75rem', marginTop: '0.75rem', marginBottom: 0 }}>
            Fonte: <a href="https://bpstat.bportugal.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA' }}>Banco de Portugal BPstat</a>
          </p>
        </div>

      </div>
    </div>
  )
}
