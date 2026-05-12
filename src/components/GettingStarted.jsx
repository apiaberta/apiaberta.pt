import { useLanguage } from '../contexts/LanguageContext'

const errorExamples = [
  { code: '429', color: '#F59E0B', bg: '#451A03', label: 'Rate limit exceeded', body: '{ "error": "rate_limit_exceeded", "retry_after": 60 }' },
  { code: '401', color: '#EF4444', bg: '#450A0A', label: 'Unauthorized', body: '{ "error": "invalid_api_key" }' },
  { code: '500', color: '#94A3B8', bg: '#1E293B', label: 'Server error', body: '{ "error": "internal_server_error" }' },
]

function CodeBlock({ children, lang }) {
  return (
    <pre style={{
      margin: 0,
      padding: '1rem 1.25rem',
      background: '#0F172A',
      borderRadius: '0.625rem',
      overflowX: 'auto',
      fontSize: '0.8125rem',
      lineHeight: 1.7,
      color: '#E2E8F0',
      fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
      border: '1px solid #1E293B',
    }}>
      <code>{children}</code>
    </pre>
  )
}

function StepCard({ number, title, children }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      border: '1px solid #E2E8F0',
      padding: '1.75rem',
      display: 'flex',
      gap: '1.25rem',
    }}>
      <div style={{
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        background: '#EFF6FF',
        border: '2px solid #3B82F6',
        color: '#2563EB',
        fontWeight: 800,
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {number}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ margin: '0 0 0.75rem', color: '#0F172A', fontSize: '1.0625rem', fontWeight: 700 }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}

export default function GettingStarted() {
  const { t } = useLanguage()

  return (
    <section style={{ padding: '5rem 1.5rem', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            display: 'inline-block',
            background: '#EFF6FF',
            color: '#3B82F6',
            padding: '0.25rem 0.875rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Integração
          </span>
          <h2 className="section-title">{t('gs.title')}</h2>
          <p className="section-subtitle">{t('gs.subtitle')}</p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Step 1 */}
          <StepCard number="1" title={t('gs.step1.title')}>
            <p style={{ color: '#475569', margin: '0 0 1rem', fontSize: '0.9375rem' }}>
              {t('gs.step1.body')}
            </p>
            <CodeBlock>{`const res = await fetch('https://api.apiaberta.pt/v1/fuel/prices?limit=3');
const data = await res.json();
console.log(data); // Funciona — sem API key`}</CodeBlock>
          </StepCard>

          {/* Step 2 */}
          <StepCard number="2" title={t('gs.step2.title')}>
            <p style={{ color: '#475569', margin: '0 0 1rem', fontSize: '0.9375rem' }}>
              {t('gs.step2.body')}
            </p>
            <CodeBlock>{`const res = await fetch('https://api.apiaberta.pt/v1/fuel/prices', {
  headers: {
    'x-api-key': 'ak_xxxx'   // Obténs em app.apiaberta.pt
  }
});`}</CodeBlock>
            <a
              href="https://app.apiaberta.pt/register"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                marginTop: '1rem',
                padding: '0.5rem 1.125rem',
                background: '#2563EB',
                color: 'white',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
            >
              {t('gs.step2.cta')} →
            </a>
          </StepCard>

          {/* Step 3 */}
          <StepCard number="3" title={t('gs.step3.title')}>
            <p style={{ color: '#475569', margin: '0 0 1rem', fontSize: '0.9375rem' }}>
              {t('gs.step3.body')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {errorExamples.map(err => (
                <div key={err.code} style={{
                  borderRadius: '0.625rem',
                  border: `1px solid ${err.color}40`,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.5rem 1rem',
                    background: err.bg,
                  }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: err.color,
                    }}>HTTP {err.code}</span>
                    <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{err.label}</span>
                  </div>
                  <pre style={{
                    margin: 0,
                    padding: '0.625rem 1rem',
                    background: '#0F172A',
                    color: '#86EFAC',
                    fontSize: '0.8rem',
                    fontFamily: '"Fira Code", monospace',
                  }}>
                    <code>{err.body}</code>
                  </pre>
                </div>
              ))}
            </div>
          </StepCard>

          {/* Step 4 */}
          <StepCard number="4" title={t('gs.step4.title')}>
            <p style={{ color: '#475569', margin: '0 0 1.25rem', fontSize: '0.9375rem' }}>
              {t('gs.step4.body')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href="https://docs.apiaberta.pt"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 1.125rem',
                  background: '#F1F5F9',
                  color: '#334155',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                📖 {t('gs.step4.docs')}
              </a>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
              }}>
                <code style={{ color: '#2563EB', fontWeight: 700, fontSize: '0.875rem' }}>
                  npm install apiaberta
                </code>
                <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>→ {t('gs.step4.sdk')}</span>
              </div>
            </div>
          </StepCard>

        </div>
      </div>
    </section>
  )
}
