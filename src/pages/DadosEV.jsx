import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ArrowLeft, RefreshCw, AlertTriangle, TrendingDown } from 'lucide-react'

const API_URL = 'https://api.apiaberta.pt/v1/ev/tariffs'

const PERIODS = {
  'peak': { label: 'Ponta', emoji: '🔴' },
  'full': { label: 'Cheia', emoji: '🟡' },
  'valley': { label: 'Vazio', emoji: '🟢' }
}

function TariffRow({ operator, tariff, currentPeriod }) {
  const current = tariff[currentPeriod] || 0
  const cost40kWh = current * 40

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
      <div style={{ minWidth: '140px' }}>
        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>{operator}</div>
        <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.2rem' }}>
          {PERIODS[currentPeriod]?.emoji} {PERIODS[currentPeriod]?.label}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '0.2rem' }}>€/kWh</div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0F172A' }}>
            {current.toFixed(4)}€
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '0.2rem' }}>40 kWh</div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#16A34A' }}>
            {cost40kWh.toFixed(2)}€
          </div>
        </div>
        {tariff.green && (
          <div style={{
            background: '#F0FDF4',
            color: '#16A34A',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.25rem 0.625rem',
            borderRadius: '999px'
          }}>
            ♻️ Verde
          </div>
        )}
      </div>
    </div>
  )
}

export default function DadosEV() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPeriod, setCurrentPeriod] = useState('full')
  const [kWh, setKWh] = useState(40)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
      if (json.current_period) {
        setCurrentPeriod(json.current_period)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const operators = data?.data || []
  const sorted = [...operators].sort((a, b) => {
    const priceA = a.tariff?.[currentPeriod] || 999
    const priceB = b.tariff?.[currentPeriod] || 999
    return priceA - priceB
  })

  const cheapest = sorted[0]
  const cheapestCost = cheapest ? (cheapest.tariff[currentPeriod] * kWh).toFixed(2) : null

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
            <div style={{ background: '#10B981', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <Zap size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              Carregamento Eléctrico
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Tarifas actuais dos principais operadores de carregamento em Portugal
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
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Este conjunto de dados estará disponível em breve.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Period selector */}
            <div style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '0.875rem',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                Período horário actual
              </div>
              <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                {Object.entries(PERIODS).map(([key, meta]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentPeriod(key)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      border: '2px solid',
                      borderColor: currentPeriod === key ? '#10B981' : '#E2E8F0',
                      background: currentPeriod === key ? '#ECFDF5' : 'white',
                      color: currentPeriod === key ? '#059669' : '#475569',
                      fontWeight: currentPeriod === key ? 700 : 500,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem'
                    }}
                  >
                    {meta.emoji} {meta.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cheapest highlight */}
            {cheapest && (
              <div style={{
                background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
                border: '2px solid #10B981',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <TrendingDown size={20} color="#059669" />
                  <h3 style={{ fontWeight: 700, color: '#059669', fontSize: '1rem' }}>
                    Operador mais barato agora
                  </h3>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.25rem' }}>
                  {cheapest.operator}
                </div>
                <div style={{ color: '#059669', fontSize: '1.1rem', fontWeight: 600 }}>
                  {cheapestCost}€ por {kWh} kWh
                  <span style={{ color: '#64748B', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                    ({cheapest.tariff[currentPeriod].toFixed(4)}€/kWh)
                  </span>
                </div>
              </div>
            )}

            {/* Calculator */}
            <div style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '0.875rem',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <label style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.9rem', display: 'block', marginBottom: '0.625rem' }}>
                Quantos kWh precisas de carregar?
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={kWh}
                onChange={(e) => setKWh(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '2px solid #E2E8F0',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#0F172A'
                }}
              />
              <div style={{ color: '#64748B', fontSize: '0.78rem', marginTop: '0.375rem' }}>
                Típico: 40 kWh ~ 250 km de autonomia
              </div>
            </div>

            {/* Ranking */}
            <h2 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem', marginBottom: '1rem' }}>
              ⚡ Ranking de operadores ({PERIODS[currentPeriod]?.label})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {sorted.map(op => (
                <TariffRow key={op.operator} operator={op.operator} tariff={op.tariff} currentPeriod={currentPeriod} />
              ))}
            </div>

            {sorted.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                <p>Sem dados disponíveis. Este serviço estará activo em breve.</p>
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
                  GET https://api.apiaberta.pt/v1/ev/tariffs
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
