'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HandDrawnProps {
  children: ReactNode;
  variant?: 'circle' | 'underline';
  /** Seconds to wait after entering the viewport before the ink draws. */
  delay?: number;
  className?: string;
}

// Hand-drawn paths in a 0–100 box, stretched over the wrapped phrase.
const PATHS = {
  circle:
    'M 8 52 C 6 22, 34 6, 58 8 C 82 10, 97 26, 95 50 C 93 76, 66 93, 42 91 C 18 89, 3 74, 7 46 C 9 30, 22 16, 40 11',
  underline: 'M 2 62 C 22 38, 38 82, 58 56 C 72 40, 86 70, 98 50',
};

/**
 * Wraps a short phrase and draws a glowing aqua circle or underline around it
 * when it scrolls into view (pathLength → stroke-dashoffset animating to 0).
 */
export default function HandDrawn({
  children,
  variant = 'circle',
  delay = 0.2,
  className = '',
}: HandDrawnProps) {
  const reduceMotion = useReducedMotion();
  const isCircle = variant === 'circle';

  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`ink-glow pointer-events-none absolute overflow-visible ${
          isCircle
            ? '-inset-x-[0.45em] -inset-y-[0.3em] w-[calc(100%+0.9em)] h-[calc(100%+0.6em)]'
            : 'inset-x-0 -bottom-[0.3em] w-full h-[0.55em]'
        }`}
      >
        <motion.path
          d={PATHS[variant]}
          fill="none"
          stroke="#64FFDA"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{
            pathLength: { duration: isCircle ? 1.1 : 0.8, delay, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.01, delay },
          }}
        />
      </svg>
    </span>
  );
}
