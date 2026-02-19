import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import Contact from '../components/Contact'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAFAFA' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#64748B',
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}
        >
          <ArrowLeft size={16} />
          {t('contribute.back')}
        </Link>
      </div>
      <Contact />
    </div>
  )
}
