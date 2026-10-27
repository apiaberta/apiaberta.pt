import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import HeroCodeCard from './HeroCodeCard'

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

  const stats = [
    { value: '100%', label: t('hero.stat.opensource') },
    { value: '0€', label: t('hero.stat.free') },
    { value: 'REST', label: t('hero.stat.rest') },
  ]

  return (
    <section className="hero-pattern hero">
      {/* Decorative grid lines (faded at the edges) and soft glow */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">
            <HighlightedHeadline text={t('hero.headline')} />
          </h1>

          <p className="hero__lead">{t('hero.subheadline')}</p>

          <div className="hero__actions">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              {t('hero.cta.primary')}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="cta-secondary">
              {t('hero.cta.secondary')}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <dl className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.value}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual">
          <HeroCodeCard />
        </div>
      </div>
    </section>
  )
}
