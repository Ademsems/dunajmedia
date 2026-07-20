'use client';

import { useLanguage } from '@/context/LanguageContext';
import PricingTable from '@/components/PricingTable';

export default function HomePricingTeaser() {
  const { locale } = useLanguage();
  const isSk = locale === 'sk';

  return (
    <section className="py-28 bg-navy-light relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
          {isSk ? 'Cenník' : 'Pricing'}
        </span>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-5">
          {isSk ? 'Transparentné ceny pre každý biznis' : 'Transparent pricing for every business'}
        </h2>
        <p className="text-slate-text text-lg max-w-2xl mx-auto font-body">
          {isSk
            ? 'Fixné ceny bez skrytých poplatkov. Od €349 po €999 — nájdite balíček pre váš rast.'
            : 'Fixed prices, no hidden fees. From €349 to €999 — find the package for your growth.'}
        </p>
      </div>
      <PricingTable compact />
    </section>
  );
}
