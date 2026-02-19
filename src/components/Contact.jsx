import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            {t('nav.contact')}
          </span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>

        {status === 'success' ? (
          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '1rem',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <CheckCircle size={48} color="#16A34A" style={{ margin: '0 auto 1rem' }} />
            <p style={{ fontWeight: 700, fontSize: '1.125rem', color: '#15803D' }}>
              {t('contact.success')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'white',
              borderRadius: '1.25rem',
              padding: '2.5rem',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>{t('contact.name')}</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="João Silva"
                />
              </div>
              <div>
                <label style={labelStyle}>{t('contact.email')}</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="joao@exemplo.pt"
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>{t('contact.subject')}</label>
              <select
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">{t('contact.subject.placeholder')}</option>
                <option value="developer">{t('contact.subject.developer')}</option>
                <option value="government">{t('contact.subject.government')}</option>
                <option value="legal">{t('contact.subject.legal')}</option>
                <option value="press">{t('contact.subject.press')}</option>
                <option value="other">{t('contact.subject.other')}</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>{t('contact.message')}</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
              />
            </div>

            {status === 'error' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#DC2626',
                  fontSize: '0.875rem',
                }}
              >
                <AlertCircle size={16} />
                {t('contact.error')}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                opacity: status === 'sending' ? 0.7 : 1,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              }}
            >
              <Send size={18} />
              {status === 'sending' ? t('contact.sending') : t('contact.submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '0.5rem',
}

const inputStyle = {
  width: '100%',
  padding: '0.625rem 0.875rem',
  border: '1.5px solid #E2E8F0',
  borderRadius: '0.5rem',
  fontSize: '0.9375rem',
  color: '#0F172A',
  background: '#FAFAFA',
  outline: 'none',
  transition: 'border-color 0.15s',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}
