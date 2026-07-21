'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, Award, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface WhyItem {
  title: string;
  desc: string;
}

const whyIcons = [
  <svg key="ai" className="w-5 h-5 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  <svg key="speed" className="w-5 h-5 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  <Globe key="globe" className="w-5 h-5 text-aqua" />,
  <Award key="award" className="w-5 h-5 text-aqua" />,
];

export default function AboutSnippet() {
  const { t, tArray, locale } = useLanguage();
  const whyItems = tArray<WhyItem>('home.why.items');

  return (
    <section className="py-28 bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aqua/3 to-transparent pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: text left + mockup image right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('home.about_snippet.label')}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest leading-tight mb-6">
              {t('home.about_snippet.headline')}
            </h2>
            <p className="text-slate-text text-lg font-body leading-relaxed mb-8">
              {t('home.about_snippet.body')}
            </p>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-aqua font-display font-semibold hover:gap-3 transition-all duration-200"
            >
              {t('home.about_snippet.cta')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-aqua" />
                <span className="text-slate-light text-sm font-body">11+ {locale === 'sk' ? 'rokov v marketingu' : 'years in marketing'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-aqua" />
                <span className="text-slate-light text-sm font-body">48h {locale === 'sk' ? 'doručenie webu' : 'website delivery'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-aqua" />
                <span className="text-slate-light text-sm font-body">100% {locale === 'sk' ? 'moderný tech-stack' : 'modern tech-stack'}</span>
              </div>
            </div>
          </motion.div>

          {/* Mockup image — no border/frame, blends with dark navy bg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Image
              src="/mockup.PNG"
              alt={locale === 'sk' ? 'Ukážka webu vytvoreného Dunajmedia' : 'Website mockup created by Dunajmedia'}
              width={700}
              height={500}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Row 2: 4 feature cards as full-width strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-navy-light border border-white/5 hover:border-aqua/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-aqua/10 border border-aqua/20 flex items-center justify-center mb-4 group-hover:bg-aqua/15 transition-colors">
                {whyIcons[i]}
              </div>
              <h3 className="font-display font-bold text-slate-lightest text-sm mb-2">
                {item.title}
              </h3>
              <p className="text-slate-text text-xs font-body leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
