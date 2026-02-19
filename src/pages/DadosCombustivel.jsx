import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Fuel, ArrowLeft, RefreshCw, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'

const API_URL = 'https://api.apiaberta.pt/v1/fuel/prices'

const FUEL_LABELS = {
  'gasoline_95':      { label: 'Gasolina 95',        emoji: '⛽' },
  'gasoline_98':      { label: 'Gasolina 98',        emoji: '⛽' },
  'diesel':           { label: 'Gasóleo simples',    emoji: '🚗' },
  'diesel_plus':      { label: 'Gasóleo especial',   emoji: '🚗' },
  'gpl_auto':         { label: 'GPL Auto',            emoji: '💨' },
  'gasoline_95_plus': { label: 'Gasolina 95 Esp.',   emoji: '⛽' },
  'diesel_colored':   { label: 'Gasóleo colorido',   emoji: '🔴' },
  'diesel_heating':   { label: 'Gasóleo aquecimento', emoji: '🔥' },
}

function PriceRow({ item }) {
  const meta = FUEL_LABELS[item.fuel_slug] || { label: item.fuel_name, emoji: '⛽' }
  const spread = item.max_price_eur - item.min_price_eur

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '0.875rem',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '160px' }}>
        <span style={{ fontSize: '1.25rem' }}>{meta.emoji}</span>
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem' }}>{meta.label}</div>
          <div style={{ color: '#64748B', fontSize: '0.78rem' }}>{item.station_count?.toLocaleString()} postos</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '0.2rem' }}>MÉDIA</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0F172A' }}>
            {item.avg_price_eur?.toFixed(3)}€
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <TrendingDown size={11} color="#16A34A" /> MÍN
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#16A34A' }}>
            {item.min_price_eur?.toFixed(3)}€
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <TrendingUp size={11} color="#EF4444" /> MÁX
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#EF4444' }}>
            {item.max_price_eur?.toFixed(3)}€
          </div>
        </div>
        {spread > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '0.2rem' }}>SPREAD</div>
            <div style={{ fontWeight: 500, fontSize: '0.85rem', color: '#F59E0B' }}>
              {spread.toFixed(3)}€
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DadosCombustivel() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // Road fuel types first
  const all = data?.data || []
  const road  = all.filter(f => f.road_vehicle)
  const other = all.filter(f => !f.road_vehicle)
  const visible = showAll ? all : road

  const lastUpdate = all[0]?.updated_at
    ? new Date(all[0].updated_at).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link
            to="/dados"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem'
            }}
          >
            <ArrowLeft size={16} />
            Dados abertos
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ background: '#F59E0B', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <Fuel size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Preços de Combustível
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Médias nacionais por tipo · Fonte: DGEG
            {lastUpdate && ` · Atualizado em ${lastUpdate}`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
            <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <p>A carregar dados...</p>
          </div>
        )}

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.875rem',
            padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#DC2626'
          }}>
            <AlertTriangle size={20} />
            <div>
              <strong>Não foi possível carregar os dados</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {road.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <h2 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem', marginBottom: '1rem' }}>
                  ⛽ Combustíveis rodoviários
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {road.map(f => <PriceRow key={f.fuel_slug} item={f} />)}
                </div>
              </div>
            )}

            {other.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <button
                  onClick={() => setShowAll(v => !v)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#16A34A', fontWeight: 600, fontSize: '0.9rem',
                    padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.375rem'
                  }}
                >
                  {showAll ? '▲ Esconder' : `▼ Ver também: ${other.length} combustíveis não-rodoviários`}
                </button>
                {showAll && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: '0.75rem' }}>
                    {other.map(f => <PriceRow key={f.fuel_slug} item={f} />)}
                  </div>
                )}
              </div>
            )}

            {all.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                <p>Sem dados disponíveis para hoje. O sync corre às 07:30.</p>
              </div>
            )}

            {/* API note */}
            <div style={{
              marginTop: '2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0',
              borderRadius: '0.875rem', padding: '1.25rem 1.5rem'
            }}>
              <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0 }}>
                <strong>API:</strong>{' '}
                <code style={{ color: '#16A34A', background: '#F0FDF4', padding: '0.15rem 0.375rem', borderRadius: '0.25rem' }}>
                  GET https://api.apiaberta.pt/v1/fuel/prices
                </code>
              </p>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
