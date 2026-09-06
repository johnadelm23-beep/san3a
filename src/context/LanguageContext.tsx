'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, translations, TranslationStructure } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationStructure
  dir: 'ltr' | 'rtl'
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('san3a_lang') as Language
    if (savedLang === 'en' || savedLang === 'ar') {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('san3a_lang', lang)
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr'
  const isRTL = language === 'ar'

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = dir
    if (isRTL) {
      document.documentElement.classList.add('rtl-mode')
    } else {
      document.documentElement.classList.remove('rtl-mode')
    }
  }, [language, dir, isRTL])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        dir,
        isRTL,
      }}
    >
      <div dir={dir} className={isRTL ? 'font-sans rtl' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return fallback if used outside provider during SSR / hydration
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: translations.en,
      dir: 'ltr' as const,
      isRTL: false,
    }
  }
  return context
}
