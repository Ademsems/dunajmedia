'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { INTRO_STORAGE_KEY } from '@/lib/intro';

const COUNT_MS = 1000;
const CURTAIN_MS = 900;

type Phase = 'counting' | 'leaving' | 'done';

export default function Preloader() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>('counting');
  const [count, setCount] = useState(1);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute('data-intro') === 'skip') {
      setPhase('done');
      return;
    }
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    } catch {
      /* private mode — intro simply replays next load */
    }

    let raf = 0;
    let finished = false;
    let leaveTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;
    const start = performance.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setCount(100);
      if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)';
      leaveTimer = setTimeout(() => setPhase('leaving'), 180);
      doneTimer = setTimeout(() => {
        setPhase('done');
        root.setAttribute('data-intro', 'skip');
      }, 180 + CURTAIN_MS);
    };

    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_MS, 1);
      // ease-out so the counter decelerates into 100
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.max(1, Math.round(eased * 100)));
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    // Timers still fire when frames are not being produced (background tab),
    // so the cover can never get stuck waiting on requestAnimationFrame.
    const guard = setTimeout(finish, COUNT_MS + 500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(guard);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className="preloader fixed inset-0 z-[9400] bg-navy"
      role="status"
      aria-label={t('common.loading')}
      style={{
        transform: phase === 'leaving' ? 'translateY(-100%)' : 'translateY(0)',
        transition: `transform ${CURTAIN_MS}ms cubic-bezier(0.19, 1, 0.22, 1)`,
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute left-5 sm:left-10 bottom-8 sm:bottom-10 font-display font-bold text-slate-lightest leading-none text-[22vw] sm:text-[14vw] lg:text-[11rem]"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {String(count).padStart(3, '0')}
      </span>
      <div
        ref={lineRef}
        aria-hidden="true"
        className="absolute left-0 bottom-0 h-px w-full bg-aqua origin-left"
        style={{ transform: 'scaleX(0)', boxShadow: '0 0 12px rgba(100,255,218,0.9), 0 0 2px rgba(100,255,218,1)' }}
      />
    </div>
  );
}
