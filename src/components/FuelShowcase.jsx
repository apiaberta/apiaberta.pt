import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { ArrowRight, Loader2, RefreshCw, Zap } from 'lucide-react'

const API_URL = 'https://api.apiaberta.pt/v1/fuel/prices'

// Only road vehicle fuels for cleaner showcase
const SHOWCASE_FUELS = [
  'gasoline_95',
  'gasoline_98',
  'diesel',
  'diesel_plus',
  'gpl_auto',
]

export default function FuelShowcase() {
  const { t, lang } = useLanguage()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const fuels = (json.data || []).filter(f => SHOWCASE_FUELS.includes(f.fuel_slug))
      setData(fuels)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const isPt = lang !== 'en'

  const labels = {
    title: isPt ? 'Experimenta agora' : 'Try it live',
    subtitle: isPt
      ? 'Dados de combustível em tempo real de mais de 3 000 postos em Portugal — sem API key, grátis.'
      : 'Real-time fuel prices from 3 000+ stations in Portugal — no API key required, free.',
    fuel: isPt ? 'Combustível' : 'Fuel',
    avgPrice: isPt ? 'Preço médio' : 'Avg. price',
    min: 'Min',
    max: 'Max',
    stations: isPt ? 'Postos' : 'Stations',
    loading: isPt ? 'A carregar dados…' : 'Loading data…',
    error: isPt ? 'Erro ao carregar dados.' : 'Failed to load data.',
    retry: isPt ? 'Tentar novamente' : 'Retry',
    footer: isPt
      ? 'Dados actualizados diariamente pela DGEG'
      : 'Data updated daily by DGEG',
    cta: isPt ? 'Obter API Key gratuita' : 'Get a free API Key',
    endpoint: isPt ? 'Endpoint público:' : 'Public endpoint:',
    refresh: isPt ? 'Actualizar' : 'Refresh',
  }

  return (
    <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #111827 100%)', padding: '6rem 0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(22, 163, 74, 0.12)',
              border: '1px solid rgba(22, 163, 74, 0.3)',
              borderRadius: '9999px',
              padding: '0.25rem 0.875rem',
              marginBottom: '1.25rem',
            }}
          >
            <Zap size={13} style={{ color: '#4ade80' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4ade80', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Live API
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem', lineHeight: 1.2 }}>
            {labels.title}
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            {labels.subtitle}
          </p>
        </div>

        {/* Endpoint pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{labels.endpoint}</span>
          <code style={{
            fontSize: '0.82rem',
            padding: '0.3rem 0.85rem',
            borderRadius: '0.5rem',
            background: '#1e293b',
            color: '#4ade80',
            border: '1px solid #334155',
            fontFamily: 'monospace',
          }}>
            GET https://api.apiaberta.pt/v1/fuel/prices
          </code>
          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8',
              background: '#1e293b', border: '1px solid #334155',
              borderRadius: '0.5rem', padding: '0.3rem 0.75rem',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1,
            }}
          >
            <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
            {labels.refresh}
          </button>
        </div>

        {/* Card */}
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '1.25rem',
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr repeat(4, auto)',
            gap: '0.5rem',
            padding: '0.875rem 1.5rem',
            background: '#0f172a',
            borderBottom: '1px solid #334155',
          }}>
            {[labels.fuel, labels.avgPrice, labels.min, labels.max, labels.stations].map(h => (
              <span key={h} style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: h === labels.fuel ? 'left' : 'right' }}>
                {h}
              </span>
            ))}
          </div>

          {/* State: loading */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '3rem' }}>
              <Loader2 size={22} style={{ color: '#16a34a', animation: 'spin 1s linear infinite' }} />
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{labels.loading}</span>
            </div>
          )}

          {/* State: error */}
          {!loading && error && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>{labels.error}</p>
              <button
                onClick={fetchData}
                style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                {labels.retry}
              </button>
            </div>
          )}

          {/* State: data */}
          {!loading && data && data.map((fuel, idx) => (
            <div
              key={fuel.fuel_slug}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr repeat(4, auto)',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                borderBottom: idx < data.length - 1 ? '1px solid #1e293b' : 'none',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{fuel.fuel_name}</span>
              <span style={{ textAlign: 'right', fontWeight: 700, color: '#4ade80', fontSize: '1rem', fontVariantNumeric: 'tabular-nums' }}>
                {fuel.avg_price_eur.toFixed(3)}€
              </span>
              <span style={{ textAlign: 'right', color: '#94a3b8', fontSize: '0.85rem', fontVariantNumeric: 'tabular-nums' }}>
                {fuel.min_price_eur.toFixed(3)}€
              </span>
              <span style={{ textAlign: 'right', color: '#94a3b8', fontSize: '0.85rem', fontVariantNumeric: 'tabular-nums' }}>
                {fuel.max_price_eur.toFixed(3)}€
              </span>
              <span style={{ textAlign: 'right', color: '#64748b', fontSize: '0.82rem', fontVariantNumeric: 'tabular-nums' }}>
                {fuel.station_count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#475569' }}>
            {labels.footer}
            {lastUpdated && (
              <span style={{ marginLeft: '0.5rem', color: '#334155' }}>
                · {lastUpdated.toLocaleTimeString(lang === 'en' ? 'en-GB' : 'pt-PT', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </p>
          <a
            href="https://app.apiaberta.pt/register"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#16a34a', color: '#fff',
              padding: '0.625rem 1.375rem', borderRadius: '0.625rem',
              fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
              transition: 'background 0.15s',
              boxShadow: '0 0 0 0 rgba(22,163,74,0.4)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#15803d'}
            onMouseLeave={e => e.currentTarget.style.background = '#16a34a'}
          >
            {labels.cta}
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
