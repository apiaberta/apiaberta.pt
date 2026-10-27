import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const REGISTER_URL = 'https://app.apiaberta.pt/register'

export default function DeveloperCta() {
  const { t } = useLanguage()

  return (
    <section
      aria-labelledby="developer-cta-heading"
      className="hero-pattern"
      style={{
        padding: '5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" style={{ top: '-2rem', height: '20rem' }} />
      <div
        style={{
          maxWidth: '40rem',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2
          id="developer-cta-heading"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.03em',
            margin: '0 0 0.875rem',
            lineHeight: 1.15,
          }}
        >
          {t('cta.bottom.title')}
        </h2>
        <p
          style={{
            fontSize: '1.0625rem',
            color: '#A3B1C6',
            maxWidth: '32rem',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}
        >
          {t('hero.cta.supporting')}
        </p>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary"
        >
          {t('hero.cta.primary')}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
