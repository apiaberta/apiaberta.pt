import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setLang('pt')}
        style={{
          padding: '0.25rem 0.6rem',
          borderRadius: '0.375rem',
          fontWeight: lang === 'pt' ? '700' : '400',
          fontSize: '0.875rem',
          background: lang === 'pt' ? '#16A34A' : 'transparent',
          color: lang === 'pt' ? 'white' : '#64748b',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        aria-label="Português"
      >
        PT
      </button>
      <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>|</span>
      <button
        onClick={() => setLang('en')}
        style={{
          padding: '0.25rem 0.6rem',
          borderRadius: '0.375rem',
          fontWeight: lang === 'en' ? '700' : '400',
          fontSize: '0.875rem',
          background: lang === 'en' ? '#16A34A' : 'transparent',
          color: lang === 'en' ? 'white' : '#64748b',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
