import { Code2, Building2, Scale, PenLine, Database, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const cards = [
  { icon: Code2, key: 'card1', iconColor: '#16A34A', iconBg: '#F0FDF4' },
  { icon: Building2, key: 'card2', iconColor: '#3B82F6', iconBg: '#EFF6FF' },
  { icon: Scale, key: 'card3', iconColor: '#8B5CF6', iconBg: '#F5F3FF' },
  { icon: PenLine, key: 'card4', iconColor: '#F59E0B', iconBg: '#FFFBEB' },
  { icon: Database, key: 'card5', iconColor: '#EF4444', iconBg: '#FEF2F2' },
  { icon: Users, key: 'card6', iconColor: '#0EA5E9', iconBg: '#F0F9FF' },
]

export default function WhoWeNeed() {
  const { t } = useLanguage()

  return (
    <section id="contribute" style={{ padding: '6rem 1.5rem', background: '#F8FAFC' }}>
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
            {t('nav.contribute')}
          </span>
          <h2 className="section-title">{t('who.title')}</h2>
          <p className="section-subtitle">{t('who.subtitle')}</p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {cards.map(({ icon: Icon, key, iconColor, iconBg }) => (
            <div key={key} className="card">
              <div
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  background: iconBg,
                  borderRadius: '0.625rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Icon size={22} color={iconColor} />
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                {t(`who.${key}.title`)}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {t(`who.${key}.body`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/contribute"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.875rem 2rem',
            }}
          >
            {t('who.cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
