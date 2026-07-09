import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations, defaultLanguage } from './translations'

const STORAGE_KEY = 'lenext-lang'

const LanguageContext = createContext(null)

function getInitialLanguage() {
  if (typeof window === 'undefined') return defaultLanguage
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && translations[saved]) return saved
  return defaultLanguage
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  return ctx
}
