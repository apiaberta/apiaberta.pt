import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Code2, Menu, X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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
