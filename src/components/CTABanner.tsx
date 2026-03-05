'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CTABanner() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(100, 255, 218, 0.07) 0%, transparent 70%)',
        }} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-aqua/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-aqua/8 rounded-full"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles size={14} className="text-aqua" />
            <span className="font-mono text-xs text-aqua uppercase tracking-widest">
              Free Consultation
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-6 leading-tight">
            {t('home.cta_banner.headline')}
          </h2>
          <p className="text-slate-text text-lg font-body mb-10 max-w-2xl mx-auto">
            {t('home.cta_banner.sub')}
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-aqua to-aqua-electric text-navy font-display font-bold text-lg px-10 py-5 rounded-2xl hover:shadow-aqua-lg transition-all duration-300"
            >
              {t('home.cta_banner.cta')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
