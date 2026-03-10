import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Code2, Menu, X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const dadosLinks = [
  { icon: '⛽', label: 'Combustíveis', path: '/dados/combustivel', desc: 'Preços DGEG actualizados diariamente' },
  { icon: '🌤', label: 'Meteorologia', path: '/dados/tempo', desc: 'Previsões e avisos IPMA' },
  { icon: '⚡', label: 'Carregamento EV', path: '/dados/ev', desc: 'Tarifas CEME e preços spot OMIE' },
  { icon: '📋', label: 'Contratos Públicos', path: '/dados/contratos-publicos', desc: 'Portal Base — contratos do Estado' },
  { icon: '📊', label: 'Estatísticas', path: '/dados/estatisticas', desc: 'Indicadores INE e Eurostat' },
  { icon: '🚨', label: 'Proteção Civil', path: '/dados/protecao-civil', desc: 'Ocorrências activas ANEPC' },
  { icon: '🏦', label: 'Taxas de Juro', path: '/dados/taxas-juro', desc: 'BCE, €STR e Banco de Portugal' },
]

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dadosOpen, setDadosOpen] = useState(false)
  const [mobileDadosOpen, setMobileDadosOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on navigate
  useEffect(() => {
    setDadosOpen(false)
    setMenuOpen(false)
    setMobileDadosOpen(false)
  }, [location.pathname])

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDadosOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on ESC
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setDadosOpen(false)
        setMenuOpen(false)
        setMobileDadosOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (isHome) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
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
              <Code2 size={20} />
            </span>
            <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#0F172A', letterSpacing: '-0.02em' }}>
              API Aberta
            </span>
            <span style={{ fontSize: '1rem' }}>🇵🇹</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            {/* Dados dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                className="nav-link"
                onClick={() => setDadosOpen(!dadosOpen)}
                onMouseEnter={() => setDadosOpen(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                aria-expanded={dadosOpen}
              >
                Dados <span style={{ fontSize: '0.7em', marginTop: '1px' }}>▾</span>
              </button>
              {dadosOpen && (
                <div
                  onMouseLeave={() => setDadosOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.75rem)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '520px',
                    background: 'white',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #E2E8F0',
                    padding: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    zIndex: 100,
                  }}
                >
                  {dadosLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.625rem',
                          padding: '0.625rem 0.75rem',
                          borderRadius: '0.5rem',
                          transition: 'background 0.15s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = '#F0FDF4')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{item.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>{item.label}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>{item.desc}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => scrollTo('problem')} className="nav-link">
              {t('nav.problem')}
            </button>
            <button onClick={() => scrollTo('solution')} className="nav-link">
              {t('nav.solution')}
            </button>
            <button onClick={() => scrollTo('contribute')} className="nav-link">
              {t('nav.contribute')}
            </button>
            <button onClick={() => scrollTo('contact')} className="nav-link">
              {t('nav.contact')}
            </button>
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageSwitcher />
            <a
              href="https://github.com/apiaberta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', display: 'none' }}
              id="nav-cta"
            >
              {t('nav.cta')}
            </a>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#0F172A',
                padding: '0.25rem',
              }}
              id="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              padding: '1rem 0',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {/* Mobile Dados expandable */}
            <button
              onClick={() => setMobileDadosOpen(!mobileDadosOpen)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                padding: '0.625rem 0.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#334155',
                cursor: 'pointer',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              Dados <span style={{ fontSize: '0.7em' }}>{mobileDadosOpen ? '▴' : '▾'}</span>
            </button>
            {mobileDadosOpen && (
              <div style={{ paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {dadosLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => { setMenuOpen(false); setMobileDadosOpen(false) }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.5rem',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: '#334155',
                      textDecoration: 'none',
                      borderRadius: '0.375rem',
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
            {[
              ['problem', t('nav.problem')],
              ['solution', t('nav.solution')],
              ['contribute', t('nav.contribute')],
              ['contact', t('nav.contact')],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '0.625rem 0.5rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#334155',
                  cursor: 'pointer',
                  borderRadius: '0.375rem',
                }}
              >
                {label}
              </button>
            ))}
            <a
              href="https://github.com/apiaberta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textAlign: 'center', marginTop: '0.5rem' }}
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.cta')}
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          #nav-cta { display: inline-block !important; }
          #mobile-menu-btn { display: none !important; }
        }
        .nav-link {
          background: none;
          border: none;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: color 0.15s;
          padding: 0;
          font-family: inherit;
        }
        .nav-link:hover { color: #16A34A; }
      `}</style>
    </nav>
  )
}
