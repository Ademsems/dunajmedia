'use client';

import { Mail, Phone, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function TopBar() {
  const { t, locale, setLocale } = useLanguage();

  return (
    <div className="bg-navy-light border-b border-white/5 text-xs font-body z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          {/* Left: tagline */}
          <p className="text-slate-text hidden sm:block tracking-wider uppercase text-[10px] font-mono">
            {t('topbar.tagline')}
          </p>

          {/* Right: contact + lang */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`mailto:${t('topbar.email')}`}
              className="flex items-center gap-1.5 text-slate-text hover:text-aqua transition-colors duration-200"
            >
              <Mail size={11} />
              <span className="hidden sm:inline">{t('topbar.email')}</span>
            </a>

            <span className="text-white/10">|</span>

            <a
              href={`tel:${t('topbar.phone').replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-slate-text hover:text-aqua transition-colors duration-200"
            >
              <Phone size={11} />
              <span>{t('topbar.phone')}</span>
            </a>

            <span className="text-white/10">|</span>

            {/* Language toggle */}
            <div className="flex items-center gap-1">
              <Globe size={11} className="text-slate-text" />
              <button
                onClick={() => setLocale('sk')}
                className={`text-[11px] px-1.5 py-0.5 rounded transition-all duration-200 font-mono ${
                  locale === 'sk'
                    ? 'text-aqua bg-aqua/10'
                    : 'text-slate-text hover:text-slate-light'
                }`}
              >
                SK
              </button>
              <span className="text-white/20 text-[10px]">/</span>
              <button
                onClick={() => setLocale('en')}
                className={`text-[11px] px-1.5 py-0.5 rounded transition-all duration-200 font-mono ${
                  locale === 'en'
                    ? 'text-aqua bg-aqua/10'
                    : 'text-slate-text hover:text-slate-light'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
