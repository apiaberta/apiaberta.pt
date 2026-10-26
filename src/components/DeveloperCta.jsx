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
        padding: '3.5rem 1.5rem',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2
          id="developer-cta-heading"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.02em',
            margin: '0 0 0.75rem',
            lineHeight: 1.25,
          }}
        >
          {t('cta.bottom.title')}
        </h2>
        <p
          style={{
            fontSize: '0.9375rem',
            color: '#94A3B8',
            maxWidth: '32rem',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}
        >
          {t('hero.cta.supporting')}
        </p>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#16A34A',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: 700,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#15803D'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#16A34A'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = '2px solid #4ADE80'
            e.currentTarget.style.outlineOffset = '3px'
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
          }}
        >
          {t('hero.cta.primary')}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
