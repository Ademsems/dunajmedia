'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import WorkShowcase from '@/components/WorkShowcase';

export default function WorkShowcaseSection() {
  const { locale } = useLanguage();
  const isSk = locale === 'sk';

  return (
    <section className="py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
            {isSk ? 'Naše ukážky' : 'Our Work'}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-5">
            {isSk ? 'Pozrite si naše živé ukážky' : 'See our live demos'}
          </h2>
        </motion.div>

        <WorkShowcase compact />
      </div>
    </section>
  );
}
