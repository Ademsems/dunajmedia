'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, [role="button"], summary, label, select, [data-cursor="hover"]';

/**
 * Hybrid cursor for fine pointers:
 *  - the sharp aqua arrow is a native CSS cursor (see `html.has-custom-cursor`
 *    in globals.css) so it tracks with zero lag;
 *  - this component adds the trailing diamond reticle on spring physics, which
 *    snaps to a rotated, larger chevron frame over interactive elements.
 * Disabled on touch / coarse pointers, with reduced motion, and in /studio.
 */
export default function CustomCursor() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  const inStudio = pathname?.startsWith('/studio') ?? false;

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fine.matches && !reduced.matches && !inStudio);
    update();
    fine.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, [inStudio]);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[9500] pointer-events-none"
      style={{ x: sx, y: sy }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <motion.svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          initial={false}
          animate={{
            rotate: hovering ? 45 : 0,
            scale: pressed ? 0.7 : hovering ? 1.55 : 1,
          }}
          transition={{ type: 'spring', stiffness: 520, damping: 22, mass: 0.5 }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(100,255,218,0.55))' }}
        >
          {/* Diamond reticle: four chevron corners, open in the middle */}
          <path d="M17 3 L24 10" stroke="#64FFDA" strokeWidth="1.25" strokeLinecap="square" />
          <path d="M17 3 L10 10" stroke="#64FFDA" strokeWidth="1.25" strokeLinecap="square" />
          <path d="M17 31 L24 24" stroke="#64FFDA" strokeWidth="1.25" strokeLinecap="square" />
          <path d="M17 31 L10 24" stroke="#64FFDA" strokeWidth="1.25" strokeLinecap="square" />
          <motion.path
            d="M3 17 L10 10 M3 17 L10 24 M31 17 L24 10 M31 17 L24 24"
            stroke="#64FFDA"
            strokeWidth="1.25"
            strokeLinecap="square"
            initial={false}
            animate={{ opacity: hovering ? 1 : 0.35 }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}
