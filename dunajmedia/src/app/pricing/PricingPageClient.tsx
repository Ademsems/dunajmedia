'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import PricingTable from '@/components/PricingTable';
import ContactForm from '@/components/ContactForm';

interface FaqItem {
  q: string;
  a: string;
}

function FaqAccordion({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        open ? 'border-aqua/30 bg-aqua/5' : 'border-white/6 bg-navy-light hover:border-white/12'
      }`}
      style={{ borderColor: open ? undefined : 'rgba(255,255,255,0.06)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className={`font-display font-semibold text-sm transition-colors ${open ? 'text-aqua' : 'text-slate-lightest'}`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 ml-4 ${open ? 'text-aqua' : 'text-slate-text'}`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-slate-text text-sm font-body leading-relaxed border-t border-white/5">
              <div className="pt-4">{item.a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingPageClient() {
  const { t, tArray } = useLanguage();
  const faqItems = tArray<FaqItem>('pricing.faq.items');

  return (
    <>
      {/* Hero */}
      <section className="relative py-28 bg-navy overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-aqua/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('pricing.hero.label')}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
              {t('pricing.hero.headline')}
            </h1>
            <p className="text-slate-text text-xl font-body leading-relaxed max-w-2xl mx-auto">
              {t('pricing.hero.sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-12 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <PricingTable compact />
      </section>

      {/* Comparison note */}
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center text-xs font-mono">
            {[
              { label: 'Expres Start', delivery: '48h', pages: '1', lang: 'SK+EN' },
              { label: 'Business Pro', delivery: '72h', pages: '10', lang: 'SK+EN' },
              { label: 'Agency Elite', delivery: '2+ týž.', pages: '∞', lang: 'Multi' },
            ].map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-navy-light border border-white/5"
              >
                <p className="text-aqua font-bold mb-3">{tier.label}</p>
                <div className="space-y-2 text-slate-text">
                  <p>⏱ {tier.delivery}</p>
                  <p>📄 {tier.pages}</p>
                  <p>🌍 {tier.lang}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-slate-lightest">
              {t('pricing.faq.headline')}
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FaqAccordion key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 70%)',
        }} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-slate-lightest mb-4">
              {t('pricing.cta.headline')}
            </h2>
            <p className="text-slate-text font-body mb-8">{t('pricing.cta.sub')}</p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-aqua to-aqua-electric text-navy font-display font-bold px-8 py-4 rounded-xl hover:shadow-aqua-lg transition-all"
            >
              {t('pricing.cta.cta')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
