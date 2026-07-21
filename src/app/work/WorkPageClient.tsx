'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WorkShowcase from '@/components/WorkShowcase';
import CTABanner from '@/components/CTABanner';
import ContactForm from '@/components/ContactForm';

const clientProjects = [
  {
    image: '/our-work/advancednavigation.png',
    href: '/work/rkc-technology',
    liveUrl: 'https://advancednavigation.sk',
    titleSk: 'RKC Technology',
    titleEn: 'RKC Technology',
    categorySk: 'Technológie & B2B',
    categoryEn: 'Technology & B2B',
    descSk: 'Dvojjazyčná korporátna webstránka pre slovenského distribútora navigačných technológií s kontaktným formulárom a plne responzívnym dizajnom.',
    descEn: 'Bilingual corporate website for a Slovak navigation technology distributor with a contact form and fully responsive design.',
    tagsSk: ['Next.js', 'Dvojjazyčný', 'Kontaktný formulár'],
    tagsEn: ['Next.js', 'Bilingual', 'Contact Form'],
  },
  {
    image: '/our-work/grandapartman.png',
    href: '/work/grand-apartman',
    liveUrl: 'https://grandapartman.sk',
    titleSk: 'Grand Apartman',
    titleEn: 'Grand Apartman',
    categorySk: 'Ubytovanie & Cestovný ruch',
    categoryEn: 'Accommodation & Tourism',
    descSk: 'Prezentačná stránka pre luxusné apartmánové ubytovanie s galériou, opisom priestorov a priamou rezerváciou.',
    descEn: 'Showcase website for luxury apartment accommodation with gallery, room descriptions and direct booking.',
    tagsSk: ['Next.js', 'Galéria', 'Rezervačný systém'],
    tagsEn: ['Next.js', 'Gallery', 'Booking System'],
  },
];

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
              {isSk ? 'Naša práca' : 'Our Work'}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest mb-6 leading-tight">
              {isSk ? 'Klienti a ukážky toho, čo vieme vytvoriť' : 'Client work and demos of what we build'}
            </h1>
            <p className="text-slate-text text-lg max-w-2xl mx-auto font-body leading-relaxed">
              {isSk
                ? 'Skutočné projekty pre reálnych klientov — a funkčné demo stránky, ktoré ilustrujú ďalšie možnosti pre váš biznis.'
                : 'Real projects for real clients — and functional demo sites showing what else we can build for your business.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Group A: Real client work */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-3 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Naša práca' : 'Our Work'}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-lightest mt-2">
              {isSk ? 'Projekty pre klientov' : 'Client Projects'}
            </h2>
            <p className="text-slate-text font-body mt-3 max-w-xl">
              {isSk
                ? 'Weby, ktoré sme navrhli a vyvinuli pre skutočné slovenské firmy.'
                : 'Websites we designed and developed for real Slovak businesses.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {clientProjects.map((project, i) => {
              const tags = isSk ? project.tagsSk : project.tagsEn;
              const title = isSk ? project.titleSk : project.titleEn;

              return (
                <motion.div
                  key={project.titleEn}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-[#0d1a2e] border border-white/8 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-aqua/20 transition-all duration-300"
                >
                  {/* Image */}
                  <Link href={project.href} className="block relative h-56 overflow-hidden bg-navy-light">
                    <Image
                      src={project.image}
                      alt={title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Client badge */}
                    <div className="absolute top-3 left-3 bg-aqua/90 text-navy font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full z-10 font-bold">
                      {isSk ? 'Klient' : 'Client'}
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="font-display font-bold text-white text-lg">
                        {isSk ? 'Zobraziť prípadovú štúdiu' : 'View Case Study'}
                      </span>
                    </div>
                  </Link>

                  {/* Card body */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="font-display text-lg font-bold text-slate-lightest leading-snug">{title}</h3>
                      <p className="font-mono text-xs text-aqua uppercase tracking-widest mt-1">
                        {isSk ? project.categorySk : project.categoryEn}
                      </p>
                    </div>
                    <p className="text-slate-text text-sm font-body leading-relaxed mb-4">
                      {isSk ? project.descSk : project.descEn}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono uppercase tracking-wide text-slate-text border border-white/10 bg-white/5 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <Link
                        href={project.href}
                        className="group/link inline-flex items-center gap-1.5 text-aqua font-display font-semibold text-sm hover:gap-2.5 transition-all duration-200"
                      >
                        {isSk ? 'Prípadová štúdia' : 'Case Study'}
                        <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-text hover:text-slate-lightest text-sm font-body transition-colors"
                      >
                        <ExternalLink size={13} />
                        {isSk ? 'Live web' : 'Live site'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Group B: Sample demos */}
      <section className="py-20 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-3 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Ukážky' : 'Sample Projects'}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-lightest mt-2">
              {isSk ? 'Live demo stránky' : 'Live Demo Sites'}
            </h2>
            <p className="text-slate-text font-body mt-3 max-w-xl">
              {isSk
                ? 'Funkčné demo stránky pre rôzne odvetvia — ukážka toho, čo vieme vytvoriť pre váš biznis.'
                : 'Functional demo sites across industries — showing what we can build for your business.'}
            </p>
          </motion.div>

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
                <div className="col-span-2 lg:col-span-1 flex items-start pt-1">
                  <span className="font-mono text-sm font-bold text-aqua tracking-widest">
                    {step.number}
                  </span>
                </div>
                <div className="col-span-10 lg:col-span-4 flex items-start">
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-slate-lightest group-hover:text-aqua transition-colors duration-300">
                    {isSk ? step.titleSk : step.titleEn}
                  </h3>
                </div>
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

      {/* CTA */}
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
