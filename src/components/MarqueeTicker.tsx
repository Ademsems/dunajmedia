'use client';

import { useLanguage } from '@/context/LanguageContext';

interface MarqueeTickerProps {
  className?: string;
}

/**
 * Seamless infinite ticker: alternating hollow (text-stroke) and solid phrases
 * separated by ◆. The track holds two identical groups and slides by -50%, so
 * the loop has no seam. Pauses on hover/focus; static under reduced motion.
 * The second group is aria-hidden so each phrase is announced once.
 */
export default function MarqueeTicker({ className = '' }: MarqueeTickerProps) {
  const { t, tArray } = useLanguage();
  const items = tArray<string>('marquee.items');

  if (items.length === 0) return null;

  // Four identical lists: two per half, so one half always out-spans wide
  // viewports and the -50% slide loops without a seam. Only the first list is
  // exposed to assistive tech.
  const renderList = (listIndex: number) => (
    <ul
      key={listIndex}
      className="flex items-center flex-shrink-0"
      aria-hidden={listIndex > 0 ? 'true' : undefined}
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center flex-shrink-0">
          <span
            className={`font-display font-bold uppercase tracking-tight whitespace-nowrap text-3xl sm:text-5xl lg:text-6xl leading-none ${
              (listIndex * items.length + i) % 2 === 0 ? 'text-outline' : 'text-slate-lightest'
            }`}
          >
            {item}
          </span>
          <span aria-hidden="true" className="mx-6 sm:mx-10 text-aqua text-base sm:text-xl">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={t('marquee.label')}
      className={`marquee relative overflow-hidden bg-navy border-y border-white/8 py-7 sm:py-10 ${className}`}
    >
      <div className="marquee-track">
        {[0, 1, 2, 3].map(renderList)}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-navy to-transparent" />
    </section>
  );
}
