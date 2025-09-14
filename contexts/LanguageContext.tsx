import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
// FIX: Import from TypeScript modules instead of JSON files to ensure browser compatibility.
import arTranslations from '../locales/ar';
import enTranslations from '../locales/en';

type Language = 'en' | 'ar';
type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
  dir: 'ltr' | 'rtl';
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  en: enTranslations,
  ar: arTranslations,
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const contextValue = useMemo((): LanguageContextType => ({
    language,
    setLanguage,
    translations: translations[language],
    dir: language === 'ar' ? 'rtl' : 'ltr',
  }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};