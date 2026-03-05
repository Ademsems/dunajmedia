'use client';

import { motion } from 'framer-motion';
import { Code2, Brain, Share2, TrendingUp, Palette, BarChart3, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ContactForm from '@/components/ContactForm';
import CTABanner from '@/components/CTABanner';

const iconMap: Record<string, React.ElementType> = {
  Code2, Brain, Share2, TrendingUp, Palette, BarChart3,
};

interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  short: string;
  desc: string;
  features: string[];
}

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

export default function ServicesPage() {
  const { t, tArray } = useLanguage();
  const services = tArray<ServiceItem>('services.items');
  const steps = tArray<ProcessStep>('services.process.steps');

  return (
    <>
      {/* Hero */}
      <section className="relative py-28 bg-navy overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-aqua/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('services.hero.label')}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6 max-w-3xl mx-auto">
              {t('services.hero.headline')}
            </h1>
            <p className="text-slate-text text-xl font-body leading-relaxed max-w-2xl mx-auto">
              {t('services.hero.sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-20 bg-navy-light relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Content */}
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <div className="w-14 h-14 rounded-2xl bg-aqua/10 border border-aqua/25 flex items-center justify-center mb-6">
                    <Icon size={26} className="text-aqua" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-slate-lightest mb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate-text font-body leading-relaxed mb-7">
                    {service.desc}
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-aqua font-display font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {t('common.contact_us')}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Features card */}
                <div className={`p-8 rounded-2xl bg-navy border border-white/6 ${!isEven ? 'lg:col-start-1' : ''}`}
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <h3 className="font-display font-bold text-slate-lightest text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span className="w-4 h-px bg-aqua" />
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check size={14} className="text-aqua flex-shrink-0 mt-0.5" />
                        <span className="text-slate-text text-sm font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('services.process.label')}
            </span>
            <h2 className="font-display text-4xl font-bold text-slate-lightest">
              {t('services.process.headline')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-aqua/30 to-transparent hidden lg:block" />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative text-center p-6 rounded-2xl bg-navy-light border border-white/5"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aqua/15 to-aqua-electric/10 border border-aqua/25 flex items-center justify-center mx-auto mb-5">
                  <span className="font-mono font-bold text-aqua text-xl">{step.number}</span>
                </div>
                <h3 className="font-display font-bold text-slate-lightest text-lg mb-2">{step.title}</h3>
                <p className="text-slate-text text-sm font-body leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <ContactForm />
    </>
  );
}
