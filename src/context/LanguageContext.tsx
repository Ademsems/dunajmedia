'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import sk from '@/messages/sk.json';
import en from '@/messages/en.json';

export type Locale = 'sk' | 'en';

type DictionaryValue = string | DictionaryObject | DictionaryArray | null;
type DictionaryObject = { [key: string]: DictionaryValue };
type DictionaryArray = DictionaryValue[];

const dictionaries: Record<Locale, DictionaryObject> = {
  sk: sk as unknown as DictionaryObject,
  en: en as unknown as DictionaryObject,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, fallback?: string) => string;
  tArray: <T = DictionaryObject>(path: string) => T[];
  tObj: <T = DictionaryObject>(path: string) => T;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getNestedValue(obj: DictionaryObject, path: string): DictionaryValue | undefined {
  const keys = path.split('.');
  let current: DictionaryValue = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      const index = parseInt(key, 10);
      if (isNaN(index)) return undefined;
      current = (current as DictionaryArray)[index];
    } else if (typeof current === 'object') {
      current = (current as DictionaryObject)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('sk');

  useEffect(() => {
    const saved = localStorage.getItem('dunajmedia-locale') as Locale | null;
    if (saved && (saved === 'sk' || saved === 'en')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('dunajmedia-locale', newLocale);
  }, []);

  const t = useCallback(
    (path: string, fallback = ''): string => {
      const dict = dictionaries[locale];
      const value = getNestedValue(dict, path);
      if (typeof value === 'string') return value;
      // Gracefully handle null
      if (value === null) return fallback || '';
      // Fallback to other locale
      const fallbackDict = dictionaries[locale === 'sk' ? 'en' : 'sk'];
      const fallbackValue = getNestedValue(fallbackDict, path);
      if (typeof fallbackValue === 'string') return fallbackValue;
      return fallback || path;
    },
    [locale]
  );

  const tArray = useCallback(
    <T = DictionaryObject>(path: string): T[] => {
      const dict = dictionaries[locale];
      const value = getNestedValue(dict, path);
      if (Array.isArray(value)) return value as unknown as T[];
      return [];
    },
    [locale]
  );

  const tObj = useCallback(
    <T = DictionaryObject>(path: string): T => {
      const dict = dictionaries[locale];
      const value = getNestedValue(dict, path);
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value as unknown as T;
      }
      return {} as T;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tArray, tObj }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
