'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const stats = [
  { value: '250+', key: 'home.stats.projects' },
  { value: '98%', key: 'home.stats.clients' },
  { value: '6', key: 'home.stats.years' },
  { value: '8+', key: 'home.stats.countries' },
];

export default function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 video-overlay" />
        <div className="absolute inset-0 bg-navy/40" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-aqua rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-aqua-electric rounded-full blur-[140px] pointer-events-none z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-aqua uppercase tracking-widest border border-aqua/30 bg-aqua/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-aqua rounded-full animate-pulse" />
              {t('home.hero.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold leading-[0.95] mb-6"
          >
            <span className="block text-6xl sm:text-7xl lg:text-8xl text-slate-lightest">
              {t('home.hero.headline1')}
            </span>
            <span
              className="block text-6xl sm:text-7xl lg:text-8xl"
              style={{
                background: 'linear-gradient(135deg, #64FFDA 0%, #00E5FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('home.hero.headline2')}
            </span>
            <span className="block text-6xl sm:text-7xl lg:text-8xl text-slate-lightest">
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
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2 bg-aqua text-navy font-display font-bold px-8 py-4 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua-lg text-base"
            >
              {t('home.hero.cta_primary')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="group flex items-center gap-2 border border-white/20 backdrop-blur-sm text-slate-lightest font-display font-semibold px-8 py-4 rounded-xl hover:border-aqua/40 hover:bg-white/5 transition-all duration-300 text-base"
            >
              <Play size={14} className="text-aqua" />
              {t('home.hero.cta_secondary')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {stats.map(({ value, key }) => (
            <div key={key} className="bg-navy/60 backdrop-blur-sm px-6 py-5 text-center">
              <p className="font-display font-bold text-2xl sm:text-3xl text-aqua mb-1">{value}</p>
              <p className="text-slate-text text-xs font-mono uppercase tracking-wider">{t(key)}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-slate-text text-xs font-mono tracking-widest uppercase">
          {t('home.hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-aqua" />
        </motion.div>
      </motion.div>
    </section>
  );
}
