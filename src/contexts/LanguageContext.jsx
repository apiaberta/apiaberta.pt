import { createContext, useContext, useState, useCallback } from 'react'
import translations from '../i18n/translations'

const LanguageContext = createContext(null)

const DEFAULT_LANG = 'pt'

function getInitialLang() {
  try {
    const stored = localStorage.getItem('apiaberta_lang')
    if (stored && translations[stored]) return stored
  } catch {}
  return DEFAULT_LANG
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((newLang) => {
    if (!translations[newLang]) return
    setLangState(newLang)
    try {
      localStorage.setItem('apiaberta_lang', newLang)
    } catch {}
  }, [])

  const t = useCallback(
    (key) => {
      const dict = translations[lang] || translations[DEFAULT_LANG]
      return dict[key] ?? key
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
