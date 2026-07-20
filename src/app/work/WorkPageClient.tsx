'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WorkShowcase from '@/components/WorkShowcase';
import CTABanner from '@/components/CTABanner';
import ContactForm from '@/components/ContactForm';

const processSteps = [
  {
    number: '01',
    titleSk: 'Analýza & Stratégia',
    titleEn: 'Discovery & Strategy',
    descSk: 'Spoznáme váš biznis, cieľovú skupinu a konkurenciu. Navrhneme štruktúru a obsah stránky.',
    descEn: 'We get to know your business, audience and competition. We design the structure and content of your site.',
  },
  {
    number: '02',
    titleSk: 'Dizajn na mieru',
    titleEn: 'Custom Design',
    descSk: 'Každý dizajn tvoríme od nuly — podľa vašej značky, cieľov a trhu. Žiadne šablóny.',
    descEn: 'Every design is built from scratch — based on your brand, goals and market. No templates.',
  },
  {
    number: '03',
    titleSk: 'Vývoj & Implementácia',
    titleEn: 'Development & Implementation',
    descSk: 'Rýchly, výkonný a bezpečný vývoj. Vaša stránka je technicky spoľahlivá a pripravená na rast.',
    descEn: 'Fast, performant and secure development. Your site is technically solid and ready to scale.',
  },
  {
    number: '04',
    titleSk: 'SEO & Spustenie',
    titleEn: 'SEO & Launch',
    descSk: 'Optimalizujeme pre vyhľadávače od základov — nie dodatočne. Spúšťame a sledujeme výsledky.',
    descEn: 'We optimize for search engines from the ground up — not as an afterthought. We launch and track results.',
  },
];

export default function WorkPageClient() {
  const { locale } = useLanguage();
  const isSk = locale === 'sk';

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(100,255,218,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Naše ukážky' : 'Our Work'}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest mb-6 leading-tight">
              {isSk ? 'Pozrite si, čo vieme vytvoriť' : 'See what we can build'}
            </h1>
            <p className="text-slate-text text-lg max-w-2xl mx-auto font-body leading-relaxed">
              {isSk
                ? 'Každý projekt je navrhnutý od nuly — žiadne šablóny. Toto sú funkčné demo stránky, ktoré ilustrujú, čo vieme vytvoriť pre váš biznis.'
                : 'Every project is designed from scratch — no templates. These are functional demo sites that show what we can build for your business.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Showcase cards */}
      <section className="py-20 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkShowcase />
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Ako pracujeme' : 'How we work'}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mt-2">
              {isSk ? 'Náš proces' : 'Our Process'}
            </h2>
          </motion.div>

          <div className="divide-y divide-white/8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="grid grid-cols-12 gap-6 py-8 lg:py-10 group"
              >
                {/* Step number */}
                <div className="col-span-2 lg:col-span-1 flex items-start pt-1">
                  <span className="font-mono text-sm font-bold text-aqua tracking-widest">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 lg:col-span-4 flex items-start">
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-slate-lightest group-hover:text-aqua transition-colors duration-300">
                    {isSk ? step.titleSk : step.titleEn}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 lg:col-span-7 pl-8 lg:pl-0">
                  <p className="text-slate-text font-body text-base leading-relaxed">
                    {isSk ? step.descSk : step.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <p className="font-display text-2xl lg:text-3xl font-bold text-slate-lightest mb-8 leading-snug">
            {isSk
              ? 'Chcete niečo podobné pre váš biznis? Spojte sa s nami.'
              : 'Want something like this for your business? Get in touch.'}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-8 py-4 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua"
          >
            {isSk ? 'Kontaktujte nás' : 'Contact Us'}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <CTABanner />
      <ContactForm />
    </>
  );
}
