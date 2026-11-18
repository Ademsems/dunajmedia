'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { gaEvent } from '@/lib/gtag';
import DunajShowreel from '@/components/DunajShowreel';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const stats = [
  { value: '11+', key: 'home.stats.marketing_years' },
  { value: '48h', key: 'home.stats.delivery' },
  { value: '100%', key: 'home.stats.techstack' },
];

/**
 * Homepage top: the framed showreel (the visual hero) followed by a dedicated
 * intro section that holds the page's <h1>, description, CTAs and trust stats.
 */
export default function Hero() {
  const { t } = useLanguage();

  return (
    <>
      {/* Showreel stage */}
      <section className="relative bg-navy pt-2 sm:pt-4 pb-10 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-aqua rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 -right-32 w-96 h-96 bg-aqua-electric rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <DunajShowreel />
          </motion.div>

          {/* Scroll cue — 1px aqua hairline, scaleY 0 → 1 → 0 loop */}
          <div className="mt-8 flex flex-col items-center gap-3" aria-hidden="true">
            <span className="text-slate-text text-[10px] font-mono tracking-[0.3em] uppercase">
              {t('home.hero.scroll')}
            </span>
            <span className="scroll-cue" />
          </div>
        </div>
      </section>

      {/* Intro: headline, description, CTAs, trust metrics */}
      <section className="relative bg-navy pb-20 sm:pb-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-aqua uppercase tracking-widest border border-aqua/30 bg-aqua/5 backdrop-blur-sm px-4 py-2 rounded-full mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 bg-aqua rounded-full animate-pulse" />
                {t('home.hero.badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold leading-[1.1] sm:leading-[0.95] mb-6"
            >
              <span className="block text-4xl min-[400px]:text-5xl sm:text-7xl lg:text-8xl text-slate-lightest">
                {t('home.hero.headline1')}
              </span>
              <span
                className="block w-fit font-serif italic font-normal pr-[0.12em] text-[2.6rem] min-[400px]:text-[3.3rem] sm:text-[5rem] lg:text-[6.6rem] leading-[0.95]"
                style={{
                  background: 'linear-gradient(135deg, #64FFDA 0%, #00E5FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('home.hero.headline2')}
              </span>
              <span className="block text-4xl min-[400px]:text-5xl sm:text-7xl lg:text-8xl text-slate-lightest">
                {t('home.hero.headline3')}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-slate-light text-lg sm:text-xl max-w-2xl font-body leading-relaxed mb-10"
            >
              {t('home.hero.sub')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link
                href="/contact"
                onClick={() => gaEvent('cta_click', {
                  event_category: 'engagement',
                  event_label: 'cta_button_click',
                })}
                className="btn-kinetic group flex items-center justify-center gap-2 bg-aqua text-navy font-display font-bold px-8 py-4 rounded-xl hover:bg-aqua-electric shadow-aqua-lg text-base"
              >
                {t('home.hero.cta_primary')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/work"
                className="btn-kinetic group flex items-center justify-center gap-2 border border-white/20 backdrop-blur-sm text-slate-lightest font-display font-semibold px-8 py-4 rounded-xl hover:border-aqua/40 hover:bg-white/5 hover:shadow-aqua text-base"
              >
                <Play size={14} className="text-aqua" />
                {t('home.hero.cta_secondary')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
          >
            {stats.map(({ value, key }) => (
              <div key={key} className="bg-navy-light/60 backdrop-blur-sm px-6 py-5 text-center">
                <p className="font-display font-bold text-2xl sm:text-3xl text-aqua mb-1">{value}</p>
                <p className="text-slate-text text-xs font-mono uppercase tracking-wider">{t(key)}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
