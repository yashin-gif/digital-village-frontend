import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import bn from '../locales/bn.js'
import en from '../locales/en.js'
import bnPages from '../locales/bn.pages.js'
import enPages from '../locales/en.pages.js'
import bnMembers from '../locales/bn.members.js'
import enMembers from '../locales/en.members.js'
import bnAdmin from '../locales/bn.admin.js'
import enAdmin from '../locales/en.admin.js'
import bnFeatures from '../locales/bn.features.js'
import enFeatures from '../locales/en.features.js'
import { STORAGE_KEYS } from '../utils/constants'


function mergeDeep(base, extra) {
  const result = { ...base }

  for (const [key, value] of Object.entries(extra)) {
    const isObject = value && typeof value === 'object' && !Array.isArray(value)
    const baseValue = base[key]

    result[key] =
      isObject && baseValue && typeof baseValue === 'object'
        ? mergeDeep(baseValue, value)
        : value
  }

  return result
}

const dictionaries = {
  bn: [bnPages, bnMembers, bnAdmin, bnFeatures].reduce(mergeDeep, bn),
  en: [enPages, enMembers, enAdmin, enFeatures].reduce(mergeDeep, en),
}

export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.language)
    return saved === 'en' || saved === 'bn' ? saved : 'bn'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, language)
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'))
  }, [])

  const value = useMemo(
    () => ({ language, t: dictionaries[language], toggleLanguage }),
    [language, toggleLanguage],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}