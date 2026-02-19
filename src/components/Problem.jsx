import { Zap, Puzzle, FileX } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const cards = [
  { icon: Zap, colorKey: 'red', key: 'card1', iconColor: '#EF4444', iconBg: '#FEF2F2' },
  { icon: Puzzle, colorKey: 'orange', key: 'card2', iconColor: '#F97316', iconBg: '#FFF7ED' },
  { icon: FileX, colorKey: 'red2', key: 'card3', iconColor: '#DC2626', iconBg: '#FFF1F2' },
]

export default function Problem() {
  const { t } = useLanguage()

  return (
    <section id="problem" style={{ padding: '6rem 1.5rem', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              background: '#FEF2F2',
              color: '#EF4444',
              padding: '0.25rem 0.875rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            {t('nav.problem')}
          </span>
          <h2 className="section-title">{t('problem.title')}</h2>
          <p className="section-subtitle">{t('problem.subtitle')}</p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {cards.map(({ icon: Icon, key, iconColor, iconBg }) => (
            <div key={key} className="card">
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  background: iconBg,
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Icon size={24} color={iconColor} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                {t(`problem.${key}.title`)}
              </h3>
              <p style={{ color: '#64748B', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                {t(`problem.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
