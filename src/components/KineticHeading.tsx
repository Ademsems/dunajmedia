'use client';

import { createElement, Fragment, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type HeadingTag = 'h1' | 'h2' | 'h3';

interface KineticHeadingProps {
  /** The heading text. Must be a plain string to get the kinetic treatment. */
  children: ReactNode;
  /** Exact phrase inside the text to set in the italic serif accent face. */
  accent?: string;
  as?: HeadingTag;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
}

interface Word {
  text: string;
  accent: boolean;
}

function toWords(text: string, accent?: string): Word[] {
  const split = (part: string, isAccent: boolean): Word[] =>
    part
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ text: word, accent: isAccent }));

  const at = accent ? text.indexOf(accent) : -1;
  if (!accent || at === -1) return split(text, false);
  return [
    ...split(text.slice(0, at), false),
    ...split(accent, true),
    ...split(text.slice(at + accent.length), false),
  ];
}

const EASE_EXPO = [0.19, 1, 0.22, 1] as const;

/**
 * SEO-safe rolling heading.
 *
 * Renders exactly ONE heading element whose real text appears exactly once in
 * the DOM. Each word slides up out of a clipped line on scroll (slot reveal),
 * and rolls again on hover. The hover "duplicate" is an aria-hidden span whose
 * glyphs are painted from a data attribute via CSS — so there is no second
 * copy of the text for crawlers or screen readers.
 */
export default function KineticHeading({
  children,
  accent,
  as = 'h2',
  className = '',
  delay = 0,
}: KineticHeadingProps) {
  const reduceMotion = useReducedMotion();

  // Non-string content (or reduced motion): plain semantic heading.
  if (typeof children !== 'string') {
    return createElement(as, { className }, children);
  }

  const words = toWords(children, accent);

  if (reduceMotion) {
    return createElement(
      as,
      { className },
      words.map((word, i) => (
        <Fragment key={i}>
          <span className={word.accent ? 'accent-serif' : undefined}>{word.text}</span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))
    );
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={`kinetic ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="kinetic-word">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '115%' },
                visible: { y: '0%', transition: { duration: 0.9, ease: EASE_EXPO } },
              }}
            >
              <span className={`kinetic-inner ${word.accent ? 'accent-serif' : ''}`}>
                {word.text}
                <span className="kinetic-roll" aria-hidden="true" data-text={word.text} />
              </span>
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
