import { Code2, Github, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const dadosLinks = [
  { label: 'Combustíveis', path: '/dados/combustivel' },
  { label: 'Meteorologia', path: '/dados/tempo' },
  { label: 'Carregamento EV', path: '/dados/ev' },
  { label: 'Contratos Públicos', path: '/dados/contratos-publicos' },
  { label: 'Estatísticas', path: '/dados/estatisticas' },
  { label: 'Proteção Civil', path: '/dados/protecao-civil' },
  { label: 'Taxas de Juro', path: '/dados/taxas-juro' },
]

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { label: t('footer.github'), href: 'https://github.com/apiaberta' },
    { label: t('footer.repo'), href: 'https://github.com/apiaberta/apiaberta' },
    { label: t('footer.issues'), href: 'https://github.com/apiaberta/apiaberta/issues' },
    { label: t('footer.license'), href: 'https://github.com/apiaberta/apiaberta/blob/main/LICENSE' },
  ]

  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span
                style={{
                  background: '#16A34A',
                  color: 'white',
                  borderRadius: '0.5rem',
                  padding: '0.375rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Code2 size={18} />
              </span>
              <span style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'white', letterSpacing: '-0.02em' }}>
                API Aberta
              </span>
              <span>🇵🇹</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '220px', lineHeight: 1.6 }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Dados column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Dados
            </p>
            {dadosLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: '#94A3B8',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#4ADE80')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  color: '#94A3B8',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.15s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#4ADE80')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <Github size={14} />
                {link.label}
              </a>
            ))}
            <Link
              to="/changelog"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: '#94A3B8',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.15s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#4ADE80')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              <List size={14} />
              Changelog
            </Link>
          </div>

          {/* Language switcher */}
          <div>
            <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Language / Idioma
            </p>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.875rem', color: '#475569' }}>
            {t('footer.rights')}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#475569' }}>
            {t('footer.built')}
          </p>
        </div>
      </div>
    </footer>
  )
}
