import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted')
    if (!accepted) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#0F172A',
        color: '#CBD5E1',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        zIndex: 1000,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Cookie size={20} style={{ color: '#4ADE80', flexShrink: 0 }} />
        <span style={{ fontSize: '0.9rem' }}>
          Este site usa cookies essenciais e analytics (Umami) para funcionar correctamente.{' '}
          <Link to="/privacidade" style={{ color: '#4ADE80', textDecoration: 'underline' }}>
            Saber mais
          </Link>
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={handleAccept}
          style={{
            background: '#16A34A',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Aceitar
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: 'transparent',
            color: '#94A3B8',
            border: 'none',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
