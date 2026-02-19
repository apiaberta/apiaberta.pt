import { useLanguage } from '../contexts/LanguageContext'

const roadmapItems = [
  { key: 1, status: 'done' },
  { key: 2, status: 'in-progress' },
  { key: 3, status: 'todo' },
  { key: 4, status: 'todo' },
  { key: 5, status: 'todo' },
]

const statusConfig = {
  done: {
    emoji: '✅',
    label: 'Concluído / Done',
    dotColor: '#16A34A',
    dotBg: '#F0FDF4',
    lineColor: '#16A34A',
  },
  'in-progress': {
    emoji: '🔄',
    label: 'Em progresso / In progress',
    dotColor: '#F59E0B',
    dotBg: '#FFFBEB',
    lineColor: '#F59E0B',
  },
  todo: {
    emoji: '⬜',
    label: 'Por fazer / To do',
    dotColor: '#CBD5E1',
    dotBg: '#F8FAFC',
    lineColor: '#E2E8F0',
  },
}

export default function Roadmap() {
  const { t } = useLanguage()

  return (
    <section id="roadmap" style={{ padding: '6rem 1.5rem', background: '#FAFAFA' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
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
            }}
          >
            Roadmap
          </span>
          <h2 className="section-title">{t('roadmap.title')}</h2>
          <p className="section-subtitle">{t('roadmap.subtitle')}</p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '1.375rem',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #16A34A, #F59E0B 40%, #E2E8F0)',
            }}
          />

          {roadmapItems.map(({ key, status }) => {
            const cfg = statusConfig[status]
            return (
              <div
                key={key}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  padding: '1rem 0',
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: '50%',
                    background: cfg.dotBg,
                    border: `2px solid ${cfg.dotColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '1rem',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {cfg.emoji}
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    background: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.75rem',
                    padding: '1rem 1.25rem',
                    marginTop: '0.25rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: status === 'todo' ? '#94A3B8' : '#0F172A', fontSize: '0.9375rem' }}>
                      {t(`roadmap.item${key}`)}
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: cfg.dotColor,
                        background: cfg.dotBg,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                      }}
                    >
                      {t(`roadmap.date${key}`)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
