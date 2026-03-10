import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const connectors = [
  {
    id: 'fuel',
    label: '⛽ Combustíveis',
    labelEn: '⛽ Fuel',
    url: 'https://api.apiaberta.pt/v1/fuel/prices?limit=3',
    node: { url: `'https://api.apiaberta.pt/v1/fuel/prices?limit=3'` },
    curl: `curl https://api.apiaberta.pt/v1/fuel/prices?limit=3`,
    python: `import httpx\nr = httpx.get("https://api.apiaberta.pt/v1/fuel/prices",\n              params={"limit": 3})\nprint(r.json())`,
  },
  {
    id: 'ipma',
    label: '🌤 Tempo',
    labelEn: '🌤 Weather',
    url: 'https://api.apiaberta.pt/v1/ipma/forecasts',
    node: { url: `'https://api.apiaberta.pt/v1/ipma/forecasts'` },
    curl: `curl https://api.apiaberta.pt/v1/ipma/forecasts`,
    python: `import httpx\nr = httpx.get("https://api.apiaberta.pt/v1/ipma/forecasts")\nprint(r.json())`,
  },
  {
    id: 'ev',
    label: '⚡ EV',
    labelEn: '⚡ EV',
    url: 'https://api.apiaberta.pt/v1/ev/tariffs?limit=3',
    node: { url: `'https://api.apiaberta.pt/v1/ev/tariffs?limit=3'` },
    curl: `curl https://api.apiaberta.pt/v1/ev/tariffs?limit=3`,
    python: `import httpx\nr = httpx.get("https://api.apiaberta.pt/v1/ev/tariffs",\n              params={"limit": 3})\nprint(r.json())`,
  },
  {
    id: 'ine',
    label: '📊 Stats',
    labelEn: '📊 Stats',
    url: 'https://api.apiaberta.pt/v1/ine/latest',
    node: { url: `'https://api.apiaberta.pt/v1/ine/latest'` },
    curl: `curl https://api.apiaberta.pt/v1/ine/latest`,
    python: `import httpx\nr = httpx.get("https://api.apiaberta.pt/v1/ine/latest")\nprint(r.json())`,
  },
  {
    id: 'anpc',
    label: '🚨 ANPC',
    labelEn: '🚨 ANPC',
    url: 'https://api.apiaberta.pt/v1/anpc/incidents/active',
    node: { url: `'https://api.apiaberta.pt/v1/anpc/incidents/active'` },
    curl: `curl https://api.apiaberta.pt/v1/anpc/incidents/active`,
    python: `import httpx\nr = httpx.get("https://api.apiaberta.pt/v1/anpc/incidents/active")\nprint(r.json())`,
  },
  {
    id: 'bdp',
    label: '🏦 BdP',
    labelEn: '🏦 BdP',
    url: 'https://api.apiaberta.pt/v1/bdp/rates',
    node: { url: `'https://api.apiaberta.pt/v1/bdp/rates'` },
    curl: `curl https://api.apiaberta.pt/v1/bdp/rates`,
    python: `import httpx\nr = httpx.get("https://api.apiaberta.pt/v1/bdp/rates")\nprint(r.json())`,
  },
]

const tabs = ['Node.js', 'cURL', 'Python']

function getSnippet(connector, tab) {
  if (tab === 'Node.js') {
    return `const res = await fetch(\n  ${connector.node.url}\n);\nconst data = await res.json();\nconsole.log(data);`
  }
  if (tab === 'cURL') return connector.curl
  return connector.python
}

function truncateData(data) {
  if (!data) return null
  if (Array.isArray(data)) return data.slice(0, 5)
  if (typeof data === 'object') {
    const entries = Object.entries(data)
    if (entries.length > 5) {
      return Object.fromEntries([...entries.slice(0, 5), ['...', '(truncated)']])
    }
    // Check if there's an array value
    for (const [k, v] of entries) {
      if (Array.isArray(v)) {
        return { ...data, [k]: v.slice(0, 5) }
      }
    }
  }
  return data
}

export default function QuickStart() {
  const { t, language } = useLanguage()
  const [activeConnector, setActiveConnector] = useState('fuel')
  const [activeTab, setActiveTab] = useState('Node.js')
  const [copied, setCopied] = useState(false)
  const [liveData, setLiveData] = useState({})
  const [loading, setLoading] = useState({})

  const connector = connectors.find(c => c.id === activeConnector)
  const snippet = getSnippet(connector, activeTab)

  const fetchLive = useCallback(async (id) => {
    if (liveData[id] !== undefined) return
    setLoading(prev => ({ ...prev, [id]: true }))
    try {
      const c = connectors.find(c => c.id === id)
      const res = await fetch(c.url)
      const raw = await res.json()
      const truncated = truncateData(raw)
      setLiveData(prev => ({ ...prev, [id]: truncated }))
    } catch (e) {
      setLiveData(prev => ({ ...prev, [id]: { error: 'Failed to fetch' } }))
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }))
    }
  }, [liveData])

  useEffect(() => {
    fetchLive(activeConnector)
  }, [activeConnector])

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section style={{ padding: '5rem 1.5rem', background: '#0F172A' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(59,130,246,0.15)',
            color: '#60A5FA',
            padding: '0.25rem 0.875rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Quick Start
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#F8FAFC', margin: '0 0 0.75rem' }}>
            {t('quickstart.title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.125rem', margin: 0 }}>
            {t('quickstart.subtitle')}
          </p>
        </div>

        {/* Connector pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
          {connectors.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveConnector(c.id)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                border: activeConnector === c.id ? '2px solid #3B82F6' : '2px solid #334155',
                background: activeConnector === c.id ? '#1E3A5F' : '#1E293B',
                color: activeConnector === c.id ? '#93C5FD' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {language === 'en' ? c.labelEn : c.label}
            </button>
          ))}
        </div>

        {/* Main panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
          className="quickstart-grid"
        >
          {/* Code panel */}
          <div style={{ background: '#1E293B', borderRadius: '1rem', border: '1px solid #334155', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Tab bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab ? '2px solid #3B82F6' : '2px solid transparent',
                    color: activeTab === tab ? '#93C5FD' : '#64748B',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    marginBottom: '-1px',
                  }}
                >
                  {tab}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button
                onClick={handleCopy}
                style={{
                  padding: '0.5rem 1rem',
                  margin: '0.375rem 0.75rem 0.375rem 0',
                  background: copied ? '#166534' : '#334155',
                  color: copied ? '#86EFAC' : '#94A3B8',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {copied ? t('quickstart.copied') : t('quickstart.copy')}
              </button>
            </div>
            {/* Code block */}
            <pre style={{
              margin: 0,
              padding: '1.5rem',
              flex: 1,
              overflowX: 'auto',
              color: '#E2E8F0',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
            }}>
              <code>{snippet}</code>
            </pre>
          </div>

          {/* Live response panel */}
          <div style={{ background: '#1E293B', borderRadius: '1rem', border: '1px solid #334155', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: loading[activeConnector] ? '#F59E0B' : '#22C55E',
                display: 'inline-block',
                boxShadow: loading[activeConnector] ? '0 0 6px #F59E0B' : '0 0 6px #22C55E',
              }} />
              <span style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
                {t('quickstart.live')}
              </span>
            </div>
            <pre style={{
              margin: 0,
              padding: '1.5rem',
              flex: 1,
              overflowX: 'auto',
              overflowY: 'auto',
              color: loading[activeConnector] ? '#64748B' : '#86EFAC',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
              maxHeight: '320px',
            }}>
              {loading[activeConnector]
                ? t('quickstart.loading')
                : liveData[activeConnector] !== undefined
                  ? JSON.stringify(liveData[activeConnector], null, 2)
                  : ''}
            </pre>
          </div>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .quickstart-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
