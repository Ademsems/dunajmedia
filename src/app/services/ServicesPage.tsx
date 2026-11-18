'use client';

import { motion } from 'framer-motion';
import { Code2, Brain, Share2, TrendingUp, Palette, BarChart3, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import StickyCardStack from '@/components/StickyCardStack';
import KineticHeading from '@/components/KineticHeading';
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

      {/* Services — sticky stacking deck. No overflow-hidden here: it would break position: sticky */}
      <section className="py-20 bg-navy-light relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StickyCardStack
            items={services}
            getKey={(service) => service.slug}
            cardClassName="rounded-3xl border border-white/10 bg-navy shadow-[0_-18px_50px_rgba(2,8,20,0.5)]"
            renderCard={(service, i) => {
              const Icon = iconMap[service.icon] || Code2;
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 p-7 sm:p-10 lg:p-14">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-aqua/10 border border-aqua/25 flex items-center justify-center">
                        <Icon size={22} className="text-aqua" />
                      </div>
                      <span className="font-mono text-xs text-aqua tracking-widest" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl lg:text-5xl font-bold text-slate-lightest leading-tight mb-4">
                      {service.title}
                    </h2>
                    <p className="text-slate-text font-body leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <Link
                      href="/contact"
                      className="link-underline group inline-flex items-center gap-2 text-aqua font-display font-semibold text-sm"
                    >
                      {t('common.contact_us')}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="border-t lg:border-t-0 lg:border-l border-white/8 pt-7 lg:pt-0 lg:pl-14">
                    <h3 className="font-display font-bold text-slate-lightest text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                      <span className="w-4 h-px bg-aqua" />
                      {t('stack.included')}
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
                </div>
              );
            }}
          />
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
            <KineticHeading className="font-display text-4xl font-bold text-slate-lightest">
              {t('services.process.headline')}
            </KineticHeading>
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
