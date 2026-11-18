'use client';

import { useLanguage } from '@/context/LanguageContext';
import HandDrawn from '@/components/HandDrawn';

/**
 * One-line pricing promise with hand-drawn aqua ink: circles the entry price
 * (€349) and underlines the multi-page delivery time (72 hours).
 */
export default function PricingPromise({ className = '' }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <p className={className}>
      {t('promise.before')}{' '}
      <HandDrawn variant="circle" className="mx-1 font-semibold text-slate-lightest">
        {t('promise.price')}
      </HandDrawn>
      {t('promise.mid')}{' '}
      <HandDrawn variant="underline" delay={0.9} className="font-semibold text-slate-lightest">
        {t('promise.hours')}
      </HandDrawn>
      {t('promise.after')}
    </p>
  );
}
