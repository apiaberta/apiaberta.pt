import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Droplets, Wind, Thermometer, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react'

const API_URL = 'https://api.apiaberta.pt/v1/ipma/forecasts'

const CITY_ICONS = {
  'Lisboa': '🏛️',
  'Porto': '🌉',
  'Faro': '☀️',
  'Braga': '⛪',
  'Coimbra': '🎓'
}

function WeatherCard({ day }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '0.875rem',
      padding: '1rem 1.25rem',
      border: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ minWidth: '90px' }}>
        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.9rem' }}>
          {formatDate(day.date)}
        </div>
        <div style={{ color: '#64748B', fontSize: '0.78rem', marginTop: '0.2rem' }}>
          {day.description}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Thermometer size={15} color="#EF4444" />
          <span style={{ color: '#EF4444', fontWeight: 700, fontSize: '0.9rem' }}>
            {day.tMax != null ? `${Math.round(day.tMax)}°` : '—'}
          </span>
          <span style={{ color: '#64748B', fontSize: '0.85rem' }}>
            / {day.tMin != null ? `${Math.round(day.tMin)}°` : '—'}
          </span>
        </div>
        {day.precipProb != null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Droplets size={15} color="#3B82F6" />
            <span style={{ color: '#3B82F6', fontSize: '0.85rem', fontWeight: 600 }}>
              {Math.round(day.precipProb)}%
            </span>
          </div>
        )}
        {day.windDir && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Wind size={15} color="#64748B" />
            <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{day.windDir}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function DadosTempo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
      if (!selectedCity && json.data?.length) {
        setSelectedCity(json.data[0].cityId)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const cities = data?.data || []
  const active = cities.find(c => c.cityId === selectedCity) || cities[0]

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
            <div style={{ background: '#3B82F6', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <Cloud size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Meteorologia
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Previsão para 5 dias · Fonte: IPMA · Atualizado de 6 em 6 horas
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>

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
            {/* City selector */}
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              {cities.map(city => (
                <button
                  key={city.cityId}
                  onClick={() => setSelectedCity(city.cityId)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    border: '2px solid',
                    borderColor: selectedCity === city.cityId ? '#3B82F6' : '#E2E8F0',
                    background: selectedCity === city.cityId ? '#EFF6FF' : 'white',
                    color: selectedCity === city.cityId ? '#1D4ED8' : '#475569',
                    fontWeight: selectedCity === city.cityId ? 700 : 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem'
                  }}
                >
                  {CITY_ICONS[city.cityName] || '🏙️'} {city.cityName}
                </button>
              ))}
            </div>

            {/* Forecast cards */}
            {active && (
              <div>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0F172A', marginBottom: '1rem' }}>
                  {CITY_ICONS[active.cityName] || '🏙️'} {active.cityName}
                  <span style={{ color: '#64748B', fontWeight: 400, fontSize: '0.85rem', marginLeft: '0.625rem' }}>
                    — próximos {active.forecasts?.length || 0} dias
                  </span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {(active.forecasts || []).map((day, i) => (
                    <WeatherCard key={day.date || i} day={day} />
                  ))}
                </div>
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
                  GET https://api.apiaberta.pt/v1/ipma/forecasts
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
