import { Shield, Zap, Key, BookOpen, ArrowRight } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const featureCards = [
  { icon: Shield, key: 'card1', iconColor: '#16A34A', iconBg: '#F0FDF4' },
  { icon: Zap, key: 'card2', iconColor: '#F59E0B', iconBg: '#FFFBEB' },
  { icon: Key, key: 'card3', iconColor: '#3B82F6', iconBg: '#EFF6FF' },
  { icon: BookOpen, key: 'card4', iconColor: '#8B5CF6', iconBg: '#F5F3FF' },
]

const flowSteps = [
  'solution.flow.source',
  'solution.flow.connector',
  'solution.flow.ingest',
  'solution.flow.database',
  'solution.flow.api',
]

export default function Solution() {
  const { t } = useLanguage()

  return (
    <section id="solution" style={{ padding: '6rem 1.5rem', background: '#FAFAFA' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              background: '#F0FDF4',
              color: '#16A34A',
              padding: '0.25rem 0.875rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            {t('nav.solution')}
          </span>
          <h2 className="section-title">{t('solution.title')}</h2>
          <p className="section-subtitle">{t('solution.subtitle')}</p>
        </div>

        {/* Flow diagram */}
        <div
          style={{
            background: '#0F172A',
            borderRadius: '1.25rem',
            padding: '2rem 1.5rem',
            marginBottom: '3rem',
            overflowX: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              minWidth: 'fit-content',
              margin: '0 auto',
            }}
          >
            {flowSteps.map((key, i) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    background: i === flowSteps.length - 1
                      ? 'linear-gradient(135deg, #16A34A, #15803D)'
                      : 'rgba(255,255,255,0.07)',
                    border: i === flowSteps.length - 1
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '0.625rem',
                    padding: '0.625rem 1.25rem',
                    color: i === flowSteps.length - 1 ? 'white' : '#94A3B8',
                    fontWeight: i === flowSteps.length - 1 ? 700 : 500,
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                  }}
                >
                  {t(key)}
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight size={18} color="#475569" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {featureCards.map(({ icon: Icon, key, iconColor, iconBg }) => (
            <div key={key} className="card" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  background: iconBg,
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <Icon size={24} color={iconColor} />
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                {t(`solution.${key}.title`)}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {t(`solution.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
