'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, User, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ContactForm from '@/components/ContactForm';

const processSteps = [
  {
    number: '01',
    titleSk: 'Bezplatná konzultácia',
    titleEn: 'Free Consultation',
    descSk: 'Začíname rozhovorom. Spoznáme váš biznis, ciele a výzvy. Žiadne záväzky, žiadny predaj — len otvorená diskusia o tom, ako vám vieme pomôcť.',
    descEn: 'We start with a conversation. We learn about your business, goals and challenges. No commitments, no sales pitch — just an open discussion about how we can help.',
  },
  {
    number: '02',
    titleSk: 'Stratégia & Plán',
    titleEn: 'Strategy & Plan',
    descSk: 'Pripravíme konkrétny plán — štruktúru stránky, obsah, technické riešenia a časový harmonogram. Všetko transparentne a pred podpisom čohokoľvek.',
    descEn: 'We prepare a concrete plan — site structure, content, technical solutions and timeline. Everything transparently, before signing anything.',
  },
  {
    number: '03',
    titleSk: 'Dizajn na mieru',
    titleEn: 'Custom Design',
    descSk: 'Každý dizajn tvoríme od nuly podľa vašej značky a cieľovej skupiny. Predložíme návrh na schválenie — váš feedback formuje výsledok.',
    descEn: 'Every design is created from scratch based on your brand and audience. We present a proposal for approval — your feedback shapes the result.',
  },
  {
    number: '04',
    titleSk: 'Vývoj & Implementácia',
    titleEn: 'Development & Implementation',
    descSk: 'Rýchly, výkonný a bezpečný vývoj s moderným tech-stackom. Počas celého procesu vás informujeme o postupe. Pred spustením testujeme každý detail.',
    descEn: 'Fast, performant and secure development with a modern tech stack. We keep you informed throughout. Before launch, we test every detail.',
  },
  {
    number: '05',
    titleSk: 'SEO & Spustenie',
    titleEn: 'SEO & Launch',
    descSk: 'Optimalizujeme pre vyhľadávače od základov — nie ako dodatočný krok. Stránka ide live, sledujeme výsledky a sme k dispozícii po spustení.',
    descEn: 'We optimize for search engines from the ground up — not as an afterthought. The site goes live, we track results and we remain available after launch.',
  },
  {
    number: '06',
    titleSk: 'Dlhodobá podpora',
    titleEn: 'Long-term Support',
    descSk: 'Nepracujeme na projekte a nezmizneme. Sme dostupní pre aktualizácie, otázky a ďalší rast vášho digitálneho projektu.',
    descEn: 'We don\'t finish a project and disappear. We are available for updates, questions and the continued growth of your digital project.',
  },
];

const valueIcons = [
  <Shield key="shield" className="w-5 h-5 text-aqua" />,
  <User key="user" className="w-5 h-5 text-aqua" />,
  <TrendingUp key="trending" className="w-5 h-5 text-aqua" />,
];

const values = [
  {
    titleSk: 'Transparentnosť',
    titleEn: 'Transparency',
    descSk: 'Jasná komunikácia v každom kroku. Viete presne čo, kedy a prečo. Žiadne prekvapenia.',
    descEn: 'Clear communication at every step. You always know exactly what, when and why. No surprises.',
  },
  {
    titleSk: 'Osobná zodpovednosť',
    titleEn: 'Personal Accountability',
    descSk: 'Váš projekt je vždy v rukách toho istého človeka — od prvého hovoru po spustenie.',
    descEn: 'Your project is always in the same hands — from the first call to launch.',
  },
  {
    titleSk: 'Merateľné výsledky',
    titleEn: 'Measurable Results',
    descSk: 'Každé rozhodnutie je podložené dátami a stratégiou. Marketing bez merania je len hádanie.',
    descEn: 'Every decision is backed by data and strategy. Marketing without measurement is just guessing.',
  },
];

export default function HowWeWorkPageClient() {
  const { locale } = useLanguage();
  const isSk = locale === 'sk';

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(100,255,218,0.07) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Náš prístup' : 'Our Approach'}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
              {isSk ? 'Ako pracujeme s každým klientom' : 'How we work with every client'}
            </h1>
            <p className="text-slate-text text-xl font-body leading-relaxed">
              {isSk
                ? 'Transparentný proces, jasná komunikácia a merateľné výsledky. Bez prekvapení na faktúre, bez zmiznutia po spustení.'
                : 'Transparent process, clear communication and measurable results. No surprises on the invoice, no disappearing after launch.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Krok za krokom' : 'Step by step'}
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
                transition={{ duration: 0.5, delay: i * 0.08 }}
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

      {/* Values */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Čo od nás môžete očakávať' : 'What you can expect from us'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl bg-navy-light border border-white/8 hover:border-aqua/25 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-aqua/10 border border-aqua/20 flex items-center justify-center mb-4 group-hover:bg-aqua/15 transition-colors">
                  {valueIcons[i]}
                </div>
                <div className="w-8 h-0.5 bg-aqua mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-display font-bold text-slate-lightest text-lg mb-3">
                  {isSk ? val.titleSk : val.titleEn}
                </h3>
                <p className="text-slate-text text-sm font-body leading-relaxed">
                  {isSk ? val.descSk : val.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-4">
            {isSk ? 'Začnime váš projekt' : "Let's start your project"}
          </h2>
          <p className="text-slate-text text-lg font-body mb-10">
            {isSk ? 'Prvý hovor je bezplatný. Bez záväzkov.' : 'The first call is free. No commitments.'}
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

      <ContactForm />
    </>
  );
}
