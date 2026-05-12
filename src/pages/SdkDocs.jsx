import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Code, Terminal, Package, Zap, CheckCircle } from 'lucide-react'

const JS_EXAMPLES = {
  install: `npm install apiaberta-js`,
  basic: `import ApiAberta from 'apiaberta-js'

const api = new ApiAberta({ apiKey: 'your-key' })

// Preços de combustível em Lisboa
const prices = await api.fuel({ district: 'Lisboa' })
console.log(prices.data)

// Previsão do tempo para todas as cidades
const weather = await api.weather({ days: 3 })
console.log(weather.data[0])

// Ocorrências de proteção civil activas
const incidents = await api.activeIncidents()
console.log(\`\${incidents.count} ocorrências activas\`)

// Taxas de juro BCE + €STR (Banco de Portugal)
const rates = await api.bdpRates()
console.log(rates.data)`,
  errors: `import { ApiAberta, ApiAbertaError } from 'apiaberta-js'

const api = new ApiAberta({ apiKey: 'your-key' })

try {
  const data = await api.fuel()
} catch (err) {
  if (err instanceof ApiAbertaError) {
    console.error(\`Erro \${err.statusCode}: \${err.message}\`)
  }
}`,
}

const PY_EXAMPLES = {
  install: `pip install apiaberta`,
  basic: `from apiaberta import ApiAberta

api = ApiAberta(api_key="your-key")

# Preços de combustível em Lisboa
prices = api.fuel(district="Lisboa")
print(prices["data"])

# Previsão do tempo
weather = api.weather(days=3)
print(weather["data"][0])

# Ocorrências activas
incidents = api.active_incidents()
print(f"{incidents['count']} ocorrências activas")

# Taxas de juro BCE + €STR
rates = api.bdp_rates()
print(rates["data"])`,
  errors: `from apiaberta import ApiAberta, ApiAbertaError

api = ApiAberta(api_key="your-key")

try:
    data = api.fuel()
except ApiAbertaError as e:
    print(f"Erro {e.status_code}: {e}")`,
}

const CODE_METHODS = [
  { method: 'fuel()', desc: 'Preços de combustível (DGEG)', endpoint: '/v1/fuel/prices' },
  { method: 'fuelStations()', desc: 'Postos de abastecimento', endpoint: '/v1/fuel/stations' },
  { method: 'weather()', desc: 'Previsão do tempo — todas as cidades (IPMA)', endpoint: '/v1/ipma/forecasts' },
  { method: 'weatherCity(cityId)', desc: 'Previsão para uma cidade específica', endpoint: '/v1/ipma/forecasts/:id' },
  { method: 'weatherWarnings()', desc: 'Avisos meteorológicos activos', endpoint: '/v1/ipma/warnings' },
  { method: 'incidents()', desc: 'Ocorrências de proteção civil (ANPC)', endpoint: '/v1/anpc/incidents' },
  { method: 'activeIncidents()', desc: 'Ocorrências activas agora', endpoint: '/v1/anpc/incidents/active' },
  { method: 'stats()', desc: 'Estatísticas nacionais (INE/Eurostat)', endpoint: '/v1/ine/stats' },
  { method: 'ev()', desc: 'Tarifas de carregamento elétrico', endpoint: '/v1/ev/tariffs' },
  { method: 'contracts()', desc: 'Contratos públicos (BASE.gov)', endpoint: '/v1/base/contracts' },
  { method: 'bdpRates()', desc: 'Taxas de juro BCE + €STR (Banco de Portugal)', endpoint: '/v1/bdp/rates' },
  { method: 'bdpLendingRates()', desc: 'Crédito habitação, consumo e depósitos a prazo', endpoint: '/v1/bdp/lending-rates' },
  { method: 'bdpMeta()', desc: 'Metadados e catálogo de séries BdP', endpoint: '/v1/bdp/meta' },
  { method: 'status()', desc: 'Estado da plataforma', endpoint: '/v1/status' },
  { method: 'usage()', desc: 'Consumo da tua API key', endpoint: '/v1/auth/usage' },
]

function CodeBlock({ code, language = 'js' }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ position: 'relative', margin: '0.75rem 0' }}>
      <pre style={{
        background: '#0F172A',
        color: '#E2E8F0',
        borderRadius: '0.75rem',
        padding: '1.25rem 1.5rem',
        fontSize: '0.82rem',
        lineHeight: 1.7,
        overflowX: 'auto',
        margin: 0,
        fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", monospace',
      }}>
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: copied ? '#16A34A' : '#334155',
          color: 'white', border: 'none', borderRadius: '0.4rem',
          padding: '0.3rem 0.65rem', fontSize: '0.72rem', cursor: 'pointer',
          fontWeight: 600, transition: 'background 0.2s',
        }}
      >
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
    </div>
  )
}

export default function SdkDocs() {
  const [lang, setLang] = useState('js')
  const examples = lang === 'js' ? JS_EXAMPLES : PY_EXAMPLES
  const methodSuffix = lang === 'py' ? (m) => m.replace('fuelStations', 'fuel_stations').replace('weatherCity', 'weather_city').replace('weatherWarnings', 'weather_warnings').replace('activeIncidents', 'active_incidents').replace('bdpRates', 'bdp_rates').replace('bdpLendingRates', 'bdp_lending_rates').replace('bdpMeta', 'bdp_meta') : (m) => m

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Hero */}
      <div style={{ background: '#0F172A', padding: '3rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> Início
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#6366F1', borderRadius: '0.75rem', padding: '0.625rem', display: 'flex' }}>
              <Code size={24} color="white" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
              SDKs
            </h1>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Integra dados públicos portugueses em minutos — com SDK oficial para JavaScript e Python.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/apiaberta/apiaberta-js" target="_blank" rel="noreferrer"
              style={{ background: '#1E293B', color: '#E2E8F0', border: '1px solid #334155', borderRadius: '0.5rem', padding: '0.5rem 1.25rem', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>
              📦 apiaberta-js
            </a>
            <a href="https://github.com/apiaberta/apiaberta-py" target="_blank" rel="noreferrer"
              style={{ background: '#1E293B', color: '#E2E8F0', border: '1px solid #334155', borderRadius: '0.5rem', padding: '0.5rem 1.25rem', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>
              🐍 apiaberta-py
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Language switcher */}
        <div style={{ display: 'flex', background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '0.35rem', marginBottom: '2.5rem', width: 'fit-content' }}>
          {[
            { id: 'js', label: 'JavaScript / Node.js', emoji: '📦' },
            { id: 'py', label: 'Python', emoji: '🐍' },
          ].map(({ id, label, emoji }) => (
            <button key={id} onClick={() => setLang(id)}
              style={{
                background: lang === id ? '#6366F1' : 'transparent',
                color: lang === id ? 'white' : '#64748B',
                border: 'none', borderRadius: '0.5rem',
                padding: '0.5rem 1.25rem', cursor: 'pointer',
                fontWeight: 700, fontSize: '0.88rem', transition: 'all 0.15s',
              }}>
              {emoji} {label}
            </button>
          ))}
        </div>

        {/* Install */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Terminal size={18} color="#6366F1" />
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', margin: 0 }}>Instalação</h2>
          </div>
          <CodeBlock code={examples.install} />
        </section>

        {/* Quick start */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Zap size={18} color="#F59E0B" />
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', margin: 0 }}>Começo rápido</h2>
          </div>
          <CodeBlock code={examples.basic} />
        </section>

        {/* Error handling */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <CheckCircle size={18} color="#10B981" />
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', margin: 0 }}>Tratamento de erros</h2>
          </div>
          <CodeBlock code={examples.errors} />
        </section>

        {/* Method reference */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Package size={18} color="#8B5CF6" />
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', margin: 0 }}>Referência de métodos</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {CODE_METHODS.map(({ method, desc, endpoint }) => (
              <div key={method} style={{
                background: 'white', border: '1px solid #E2E8F0',
                borderRadius: '0.75rem', padding: '0.875rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
              }}>
                <code style={{ background: '#EEF2FF', color: '#4F46E5', borderRadius: '0.4rem', padding: '0.2rem 0.6rem', fontSize: '0.82rem', fontFamily: 'ui-monospace, monospace', whiteSpace: 'nowrap', fontWeight: 600 }}>
                  {lang === 'py'
                    ? method.replace('fuelStations', 'fuel_stations').replace('weatherCity', 'weather_city').replace('weatherWarnings', 'weather_warnings').replace('activeIncidents', 'active_incidents').replace('bdpRates', 'bdp_rates').replace('bdpLendingRates', 'bdp_lending_rates').replace('bdpMeta', 'bdp_meta')
                    : method}
                </code>
                <span style={{ color: '#475569', fontSize: '0.88rem', flex: 1, minWidth: '160px' }}>{desc}</span>
                <code style={{ background: '#F1F5F9', color: '#64748B', borderRadius: '0.35rem', padding: '0.15rem 0.5rem', fontSize: '0.75rem', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                  {endpoint}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Env var */}
        <section style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '0.875rem', padding: '1.5rem', marginBottom: '2.5rem' }}>
          <h3 style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            Variável de ambiente
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
            Podes passar a API key como variável de ambiente em vez de a colocar no código:
          </p>
          <CodeBlock code="APIABERTA_KEY=tk_a1b2c3... node app.js" />
          <CodeBlock code="APIABERTA_KEY=tk_a1b2c3... python app.py" />
        </section>

        {/* Links */}
        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem', paddingTop: '2rem', borderTop: '1px solid #E2E8F0' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Código aberto em{' '}
            <a href="https://github.com/apiaberta/apiaberta-js" style={{ color: '#6366F1', textDecoration: 'none' }}>apiaberta-js</a>
            {' '}e{' '}
            <a href="https://github.com/apiaberta/apiaberta-py" style={{ color: '#6366F1', textDecoration: 'none' }}>apiaberta-py</a>
          </p>
          <p>
            Sem chave?{' '}
            <Link to="/" style={{ color: '#6366F1', textDecoration: 'none' }}>Regista-te gratuitamente</Link>
            {' '}em apiaberta.pt
          </p>
        </div>
      </div>
    </div>
  )
}
