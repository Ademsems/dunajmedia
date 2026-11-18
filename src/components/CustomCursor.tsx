'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const INTERACTIVE = 'a, button, [role="button"], summary, label, select, [data-cursor="hover"]';

/**
 * Sharp aqua arrow cursor for fine pointers. The arrow itself is a native CSS
 * cursor (see `html.has-custom-cursor` in globals.css) so it tracks with zero
 * lag; this component only toggles classes: `has-custom-cursor` while active
 * and `cursor-hover` over clickable elements (larger, brighter arrow).
 * Renders nothing. Disabled on touch / coarse pointers, with reduced motion,
 * and in /studio.
 */
export default function CustomCursor() {
  const pathname = usePathname();
  const inStudio = pathname?.startsWith('/studio') ?? false;

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    let onMove: ((e: PointerEvent) => void) | null = null;

    const teardown = () => {
      if (onMove) window.removeEventListener('pointermove', onMove);
      onMove = null;
      root.classList.remove('has-custom-cursor', 'cursor-hover');
    };

    const apply = () => {
      teardown();
      if (!fine.matches || reduced.matches || inStudio) return;
      root.classList.add('has-custom-cursor');
      let hovering = false;
      onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const next = Boolean((e.target as Element | null)?.closest?.(INTERACTIVE));
        if (next !== hovering) {
          hovering = next;
          root.classList.toggle('cursor-hover', next);
        }
      };
      window.addEventListener('pointermove', onMove, { passive: true });
    };

    apply();
    fine.addEventListener('change', apply);
    reduced.addEventListener('change', apply);
    return () => {
      fine.removeEventListener('change', apply);
      reduced.removeEventListener('change', apply);
      teardown();
    };
  }, [inStudio]);

  return null;
}
