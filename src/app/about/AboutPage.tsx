'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ContactForm from '@/components/ContactForm';
import CTABanner from '@/components/CTABanner';

const stats = [
  { value: '11+', labelSk: 'Rokov v marketingu', labelEn: 'Years in Marketing' },
  { value: '48h', labelSk: 'Najrýchlejšie doručenie webu', labelEn: 'Fastest Website Delivery' },
  { value: '100%', labelSk: 'Moderný tech-stack', labelEn: 'Modern Tech Stack' },
];

const values = [
  {
    titleSk: 'Kvalita bez kompromisov',
    titleEn: 'Quality without compromise',
    descSk: 'Mohli by sme dodávať rýchlejšie. Rozhodujeme sa inak, ak by to znamenalo kompromis v kvalite. Každý pixel, každý riadok kódu musí byť zámerný.',
    descEn: 'We could deliver faster. We choose not to if it means compromising quality. Every pixel, every line of code must be intentional.',
  },
  {
    titleSk: 'Technológia, ktorá funguje',
    titleEn: 'Technology that performs',
    descSk: 'Stavíme na modernom tech-stacku — Next.js, AI-driven SEO, Framer Motion. Pretože rýchlosť a spoľahlivosť vášho webu priamo ovplyvňujú váš biznis.',
    descEn: 'We build on a modern tech stack — Next.js, AI-driven SEO, Framer Motion. Because your website\'s speed and reliability directly impact your business.',
  },
  {
    titleSk: 'Váš úspech je náš štandard',
    titleEn: 'Your success is our standard',
    descSk: 'Nepracujeme na projekte a nezmiznem. Váš digitálny úspech je dlhodobý záväzok. Keď váš biznis rastie, naša práca má zmysel.',
    descEn: 'We don\'t finish a project and disappear. Your digital success is a long-term commitment. When your business grows, our work has meaning.',
  },
];

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const isSk = locale === 'sk';

  return (
    <>
      {/* Hero */}
      <section className="relative py-28 bg-navy overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aqua/4 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Náš príbeh' : 'Our Story'}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
              {isSk
                ? 'Bratislava si zaslúžila lepšie. Tak sme to postavili.'
                : 'Bratislava deserved better. So we built it.'}
            </h1>
            <p className="text-slate-text text-xl font-body leading-relaxed">
              {isSk
                ? 'Dunajmedia vznikla z frustrácie so štandardom digitálnych služieb na Slovensku. Videli sme, čo firmy dostávajú za svoje peniaze — a vedeli sme, že to môže byť oveľa lepšie.'
                : 'Dunajmedia was born from frustration with the standard of digital services in Slovakia. We saw what businesses were getting for their money — and we knew it could be so much better.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-light border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {stats.map(({ value, labelSk, labelEn }, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-navy-light px-8 py-10 text-center"
              >
                <p className="font-display font-bold text-4xl text-aqua mb-2">{value}</p>
                <p className="text-slate-text text-sm font-mono uppercase tracking-wider">
                  {isSk ? labelSk : labelEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest sticky top-28">
                {isSk ? 'Prečo vznikla Dunajmedia' : 'Why Dunajmedia exists'}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 text-slate-text font-body leading-relaxed text-lg"
            >
              {isSk ? (
                <>
                  <p>Slovenský trh digitálnych agentúr nás šokoval. Firmy platili za webstránky, ktoré nereflektovali ich skutočnú hodnotu — generické dizajny, pomalé weby postavené na zastaralých technológiách, agentúry, ktoré zmizli po vystavení faktúry.</p>
                  <p>Vedeli sme, že to môže byť inak. Moderný tech-stack, precízny dizajn, AI-riadené SEO a skutočná dedikácia každému projektu — to je štandard, ktorý Bratislava a celé Slovensko zaslúži.</p>
                  <p>Dunajmedia existuje s jednou misiou: posunúť štandard digitálnych služieb na Slovensku. Každý projekt, ktorý opustí naše štúdio, musí byť lepší než čokoľvek, čo klient videl predtým.</p>
                </>
              ) : (
                <>
                  <p>The Slovak digital agency market shocked us. Businesses were paying for websites that did not reflect their true value — generic designs, slow sites built on outdated technology, agencies that disappeared after sending the invoice.</p>
                  <p>We knew it could be different. A modern tech stack, precise design, AI-driven SEO and genuine dedication to every project — that is the standard that Bratislava and all of Slovakia deserves.</p>
                  <p>Dunajmedia exists with one mission: to raise the standard of digital services in Slovakia. Every project that leaves our studio must be better than anything the client has seen before.</p>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Naše hodnoty' : 'Our Values'}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mt-2">
              {isSk ? 'Princípy, ktoré nás definujú' : 'The principles that define us'}
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
                className="p-7 rounded-2xl bg-navy border border-white/8 hover:border-aqua/25 transition-all duration-300 group"
              >
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

      {/* Founder line */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="border-l-2 border-aqua pl-8 py-4">
            <p className="font-display text-xl lg:text-2xl text-slate-lightest leading-relaxed">
              {isSk
                ? 'Dunajmedia bola založená Ademom Semsom Ashou v Bratislave s jednou víziou — priniesť slovenským firmám digitálne služby na svetovej úrovni.'
                : 'Dunajmedia was founded by Adem Sems Asha in Bratislava with one vision — to bring world-class digital services to Slovak businesses.'}
            </p>
            <p className="font-mono text-xs text-aqua uppercase tracking-widest mt-4">
              Adem Sems Asha — Founder, Dunajmedia
            </p>
          </div>
        </motion.div>
      </section>

      <CTABanner />
      <ContactForm />
    </>
  );
}
