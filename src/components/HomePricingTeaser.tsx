'use client';

import { useLanguage } from '@/context/LanguageContext';
import PricingTable from '@/components/PricingTable';
import KineticHeading from '@/components/KineticHeading';
import PricingPromise from '@/components/PricingPromise';

export default function HomePricingTeaser() {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-navy-light relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
          {t('home.pricing_teaser.label')}
        </span>
        <KineticHeading
          accent={t('home.pricing_teaser.accent')}
          className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-6"
        >
          {t('home.pricing_teaser.headline')}
        </KineticHeading>
        <PricingPromise className="text-slate-text text-lg max-w-2xl mx-auto font-body leading-loose" />
      </div>
      <PricingTable compact />
    </section>
  );
}
