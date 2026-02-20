import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ArrowLeft, RefreshCw, AlertTriangle, TrendingDown } from 'lucide-react'

const API_URL = 'https://api.apiaberta.pt/v1/ev/tariffs'

const PERIODS = {
  'vazio': { label: 'Vazio', emoji: '🟢' },
  'normal': { label: 'Fora Vazio', emoji: '🟡' },
  'ponta': { label: 'Ponta', emoji: '🔴' }
}

function TariffRow({ tariff, kWh }) {
  const current = tariff.current_price_eur_kwh || 0
  const costTotal = current * kWh

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
        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>{tariff.ceme}</div>
        <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.2rem' }}>
          {tariff.period_type ? `${PERIODS[tariff.period_type]?.emoji || ''} ${PERIODS[tariff.period_type]?.label || tariff.period_type}` : 'Simples'}
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
          <div style={{ color: '#64748B', fontSize: '0.72rem', marginBottom: '0.2rem' }}>{kWh} kWh</div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#16A34A' }}>
            {costTotal.toFixed(2)}€
          </div>
        </div>
        {tariff.activation_fee_eur > 0 && (
          <div style={{
            background: '#FEF2F2',
            color: '#DC2626',
            fontSize: '0.7rem',
            fontWeight: 600,
            padding: '0.25rem 0.625rem',
            borderRadius: '999px'
          }}>
            +{tariff.activation_fee_eur.toFixed(2)}€ ativação
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
  const [kWh, setKWh] = useState(40)

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

  const tariffs = data?.data || []
  const sorted = [...tariffs].sort((a, b) => {
    const priceA = (a.current_price_eur_kwh || 999) + (a.activation_fee_eur || 0) / kWh
    const priceB = (b.current_price_eur_kwh || 999) + (b.activation_fee_eur || 0) / kWh
    return priceA - priceB
  })

  const cheapest = sorted[0]
  const cheapestCost = cheapest ? ((cheapest.current_price_eur_kwh * kWh) + (cheapest.activation_fee_eur || 0)).toFixed(2) : null

  const currentHour = data?.meta?.current_hour || new Date().getHours()
  const currentPeriod = currentHour >= 9 && currentHour < 18 ? 'normal' : 'vazio'

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
            Tarifas actuais dos principais operadores CEME em Portugal
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
            {/* Current period indicator */}
            <div style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '0.875rem',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.9rem' }}>
                  Período actual
                </div>
                <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                  {new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                background: currentPeriod === 'vazio' ? '#ECFDF5' : '#FEF3C7',
                color: currentPeriod === 'vazio' ? '#059669' : '#D97706',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                {PERIODS[currentPeriod]?.emoji} {PERIODS[currentPeriod]?.label}
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
                  {cheapest.ceme}
                </div>
                <div style={{ color: '#059669', fontSize: '1.1rem', fontWeight: 600 }}>
                  {cheapestCost}€ por {kWh} kWh
                  <span style={{ color: '#64748B', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                    ({cheapest.current_price_eur_kwh.toFixed(4)}€/kWh)
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
                Típico: 40 kWh ≈ 250 km de autonomia
              </div>
            </div>

            {/* Ranking */}
            <h2 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem', marginBottom: '1rem' }}>
              ⚡ Ranking de operadores CEME
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {sorted.map((tariff, idx) => (
                <TariffRow key={idx} tariff={tariff} kWh={kWh} />
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
