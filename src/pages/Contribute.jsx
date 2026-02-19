import { Link } from 'react-router-dom'
import { Github, ArrowLeft, GitFork, Code2, FileText, CheckSquare } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Contribute() {
  const { t } = useLanguage()

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <div
        style={{
          background: '#0F172A',
          padding: '4rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#64748B',
              textDecoration: 'none',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
            }}
          >
            <ArrowLeft size={16} />
            {t('contribute.back')}
          </Link>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}
          >
            {t('contribute.title')}
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            {t('contribute.subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* GitHub section */}
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              background: '#0F172A',
              borderRadius: '1rem',
              padding: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Github size={32} color="#4ADE80" />
              <div>
                <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>
                  {t('contribute.github.title')}
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                  {t('contribute.github.body')}
                </p>
              </div>
            </div>
            <a
              href="https://github.com/apiaberta/apiaberta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <GitFork size={16} />
              Fork
            </a>
          </div>
        </section>

        {/* Getting started */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  background: '#F0FDF4',
                  borderRadius: '0.625rem',
                  padding: '0.5rem',
                  display: 'flex',
                }}
              >
                <CheckSquare size={22} color="#16A34A" />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                {t('contribute.start.title')}
              </h2>
            </div>
            <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.875rem',
                  }}
                >
                  <span
                    style={{
                      width: '1.75rem',
                      height: '1.75rem',
                      background: '#16A34A',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i}
                  </span>
                  <p style={{ color: '#475569', lineHeight: 1.6, paddingTop: '0.125rem' }}>
                    {t(`contribute.start.step${i}`)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Creating a connector */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  background: '#EFF6FF',
                  borderRadius: '0.625rem',
                  padding: '0.5rem',
                  display: 'flex',
                }}
              >
                <Code2 size={22} color="#3B82F6" />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                {t('contribute.connector.title')}
              </h2>
            </div>
            <p style={{ color: '#64748B', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              {t('contribute.connector.body')}
            </p>
            <div
              style={{
                background: '#0F172A',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                marginBottom: '1.25rem',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                color: '#4ADE80',
                overflowX: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>{`// Example connector interface
export interface Connector {
  name: string
  source: string
  fetch(): Promise<DataRecord[]>
  normalize(raw: unknown): DataRecord
}`}</pre>
            </div>
            <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569' }}
                >
                  <span style={{ color: '#16A34A', fontWeight: 700 }}>{i}.</span>
                  {t(`contribute.connector.step${i}`)}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Documentation */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  background: '#F5F3FF',
                  borderRadius: '0.625rem',
                  padding: '0.5rem',
                  display: 'flex',
                }}
              >
                <FileText size={22} color="#8B5CF6" />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                {t('contribute.docs.title')}
              </h2>
            </div>
            <p style={{ color: '#64748B', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              {t('contribute.docs.body')}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569' }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      background: '#8B5CF6',
                      borderRadius: '50%',
                      flexShrink: 0,
                    }}
                  />
                  {t(`contribute.docs.item${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://github.com/apiaberta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              padding: '0.875rem 2rem',
            }}
          >
            <Github size={18} />
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </div>
  )
}
