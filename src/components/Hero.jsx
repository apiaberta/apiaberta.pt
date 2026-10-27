import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const REGISTER_URL = 'https://app.apiaberta.pt/register'
const DOCS_URL = 'https://docs.apiaberta.pt'

// Highlight the last two words of the headline ("API moderna" / "modern API")
function HighlightedHeadline({ text }) {
  const words = text.split(' ')
  if (words.length < 4) return text
  const head = words.slice(0, -2).join(' ')
  const tail = words.slice(-2).join(' ')
  return (
    <>
      {head} <span className="text-gradient">{tail}</span>
    </>
  )
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      className="hero-pattern"
      style={{
        paddingTop: '8.5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative grid lines (faded at the edges) and soft glow */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div
        style={{
          maxWidth: '60rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div style={{ marginBottom: '1.75rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(22, 163, 74, 0.12)',
              border: '1px solid rgba(74, 222, 128, 0.25)',
              color: '#86EFAC',
              padding: '0.375rem 0.875rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '0.375rem',
                height: '0.375rem',
                borderRadius: '50%',
                background: '#4ADE80',
                boxShadow: '0 0 0 0.25rem rgba(74, 222, 128, 0.18)',
                display: 'inline-block',
              }}
            />
            {t('hero.badge')}
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            maxWidth: '18ch',
            margin: '0 auto 1.5rem',
          }}
        >
          <HighlightedHeadline text={t('hero.headline')} />
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
            color: '#A3B1C6',
            maxWidth: '40rem',
            margin: '0 auto 2.5rem',
            lineHeight: 1.65,
          }}
        >
          {t('hero.subheadline')}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '0.875rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="hero-cta-supporting"
              className="cta-primary"
            >
              {t('hero.cta.primary')}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              {t('hero.cta.secondary')}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <p
            id="hero-cta-supporting"
            style={{
              fontSize: '0.9375rem',
              color: '#94A3B8',
              maxWidth: '32rem',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {t('hero.cta.supporting')}
          </p>
        </div>

        {/* Stats row */}
        <div className="hero-stats">
          {[
            { value: '100%', label: 'Open Source' },
            { value: '0€', label: 'Para developers' },
            { value: 'REST', label: 'API moderna' },
          ].map((stat) => (
            <div key={stat.value}>
              <div
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#4ADE80',
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
