import { useEffect, useState } from 'react'

function AnimatedNumber({ value, duration = 1500 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value === null) return
    let start = 0
    const end = value
    if (end === 0) { setDisplay(0); return }
    const stepTime = Math.max(Math.floor(duration / end), 10)
    const step = Math.max(1, Math.floor(end / (duration / stepTime)))
    const timer = setInterval(() => {
      start = Math.min(start + step, end)
      setDisplay(start)
      if (start >= end) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [value, duration])

  return <>{display.toLocaleString('pt-PT')}</>
}

const cards = [
  {
    key: 'api_calls_total',
    label: 'Chamadas à API',
    suffix: '+',
    icon: '⚡',
  },
  {
    key: 'developers_registered',
    label: 'Developers registados',
    suffix: '',
    icon: '👨‍💻',
  },
  {
    key: 'connectors_active',
    label: 'Conectores activos',
    suffix: '',
    icon: '🔌',
  },
]

export default function StatsCounter() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://api.apiaberta.pt/v1/stats')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => setError(true))
  }, [])

  if (error) return null

  return (
    <section
      style={{
        background: '#0F172A',
        padding: '4rem 1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            color: '#4ADE80',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
          }}
        >
          Plataforma em números
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {cards.map(({ key, label, suffix, icon }) => (
            <div
              key={key}
              style={{
                flex: '1 1 200px',
                maxWidth: '280px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                padding: '2rem 1.5rem',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(74,222,128,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
              <div
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 900,
                  color: 'white',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  marginBottom: '0.5rem',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {stats ? (
                  <><AnimatedNumber value={stats[key]} />{suffix}</>
                ) : (
                  <span style={{ opacity: 0.3 }}>—</span>
                )}
              </div>
              <div
                style={{
                  color: '#94A3B8',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {stats && (
          <p
            style={{
              color: '#475569',
              fontSize: '0.75rem',
              marginTop: '1.5rem',
            }}
          >
            Atualizado em {new Date(stats.updated_at).toLocaleTimeString('pt-PT')}
          </p>
        )}
      </div>
    </section>
  )
}
