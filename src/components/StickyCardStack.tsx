'use client';

import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface StickyCardStackProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderCard: (item: T, index: number) => ReactNode;
  /** Distance from the viewport top where the first card pins, in px. */
  topOffset?: number;
  /** Extra offset added per card so the deck edges stay visible, in px. */
  step?: number;
  className?: string;
  cardClassName?: string;
}

const COVERED_SCALE = 0.96;
const COVERED_DIM = 0.55;

interface StackCardProps {
  children: ReactNode;
  isLast: boolean;
  sticky: boolean;
  animate: boolean;
  top: number;
  /** Pin point of the next card, in px from the viewport top. */
  nextTop: number;
  cardClassName: string;
  /** The wrapper of the NEXT card — its approach drives this card's depth. */
  nextRef: RefObject<HTMLDivElement>;
  setRef: (el: HTMLDivElement | null) => void;
}

function StackCard({ children, isLast, sticky, animate, top, nextTop, cardClassName, nextRef, setRef }: StackCardProps) {
  // 0 when the next card enters the viewport bottom → 1 when it lands on its
  // own pin point (one `step` below this card's).
  const { scrollYProgress } = useScroll({
    target: nextRef,
    offset: ['start end', `start ${nextTop}px`],
  });
  const scale = useTransform(scrollYProgress, [0.2, 1], [1, COVERED_SCALE], { clamp: true });
  const dim = useTransform(scrollYProgress, [0.2, 1], [0, COVERED_DIM], { clamp: true });

  const depth = sticky && animate && !isLast;

  return (
    <div
      ref={setRef}
      className={sticky ? 'sticky' : 'relative'}
      style={sticky ? { top } : undefined}
    >
      <motion.div
        className={`relative overflow-hidden ${cardClassName}`}
        style={depth ? { scale, transformOrigin: 'center top' } : undefined}
      >
        {children}
        {depth && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-navy pointer-events-none"
            style={{ opacity: dim }}
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Sticky stacking card deck. Each card pins a little lower than the previous
 * one (`position: sticky` + progressive `top`), so the next card slides up and
 * covers it; covered cards scale to 0.96 and dim for depth.
 *
 * Safety: if any card is taller than the space available under its pin point
 * (small phones, large text), pinning is switched off and the deck falls back
 * to a normal vertical list — content is never clipped.
 *
 * The parent <section> must not use `overflow: hidden` (it breaks sticky).
 */
export default function StickyCardStack<T>({
  items,
  getKey,
  renderCard,
  topOffset = 96,
  step = 14,
  className = '',
  cardClassName = '',
}: StickyCardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // One stable ref object per slot so children can target their next sibling.
  const refObjects = useRef<{ current: HTMLDivElement | null }[]>([]);
  const [sticky, setSticky] = useState(true);

  if (refObjects.current.length !== items.length) {
    refObjects.current = items.map((_, i) => refObjects.current[i] ?? { current: null });
  }

  useEffect(() => {
    const measure = () => {
      const viewport = window.innerHeight;
      const fits = cardRefs.current.every((el, i) => {
        if (!el) return true;
        return el.offsetHeight + topOffset + i * step <= viewport - 12;
      });
      setSticky(fits);
    };

    measure();
    const observer = new ResizeObserver(measure);
    cardRefs.current.forEach((el) => el && observer.observe(el));
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [items.length, topOffset, step]);

  return (
    <div className={`relative flex flex-col gap-6 sm:gap-8 ${className}`} data-sticky={sticky}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <StackCard
            key={getKey(item, i)}
            isLast={isLast}
            sticky={sticky}
            animate={!reduceMotion}
            top={topOffset + i * step}
            nextTop={topOffset + (i + 1) * step}
            cardClassName={cardClassName}
            nextRef={(refObjects.current[isLast ? i : i + 1]) as RefObject<HTMLDivElement>}
            setRef={(el) => {
              cardRefs.current[i] = el;
              refObjects.current[i].current = el;
            }}
          >
            {renderCard(item, i)}
          </StackCard>
        );
      })}
    </div>
  );
}
