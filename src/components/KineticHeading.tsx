'use client';

import { createElement, Fragment, ReactNode } from 'react';
import Link from 'next/link';
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
  /** Makes the heading a link; hovering draws a left-to-right aqua underline. */
  href?: string;
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
 * SEO-safe heading with a one-time bottom-up reveal.
 *
 * Renders exactly ONE heading element and the text exists exactly once in the
 * DOM. Each word slides up out of a clipped line the first time the heading
 * scrolls into view; there is no hover animation. With `href`, the heading is
 * a link and hovering draws an aqua underline left to right.
 */
export default function KineticHeading({
  children,
  accent,
  as = 'h2',
  className = '',
  delay = 0,
  href,
}: KineticHeadingProps) {
  const reduceMotion = useReducedMotion();

  const wrap = (content: ReactNode) =>
    href ? (
      <Link href={href} className="heading-link">
        {content}
      </Link>
    ) : (
      content
    );

  // Non-string content (or reduced motion): plain semantic heading.
  if (typeof children !== 'string') {
    return createElement(as, { className }, wrap(children));
  }

  const words = toWords(children, accent);

  if (reduceMotion) {
    return createElement(
      as,
      { className },
      wrap(
        words.map((word, i) => (
          <Fragment key={i}>
            <span className={word.accent ? 'accent-serif' : undefined}>{word.text}</span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))
      )
    );
  }

  const MotionTag = motion[as];

  return (
    // key = text: switching SK/EN remounts the words so none can linger
    <MotionTag
      key={children}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {wrap(
        words.map((word, i) => (
          <Fragment key={i}>
            <span className="kinetic-word">
              <motion.span
                className={`inline-block ${word.accent ? 'accent-serif' : ''}`}
                variants={{
                  hidden: { y: '115%' },
                  visible: { y: '0%', transition: { duration: 0.9, ease: EASE_EXPO } },
                }}
              >
                {word.text}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))
      )}
    </MotionTag>
  );
}
