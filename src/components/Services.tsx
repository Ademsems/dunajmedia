'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Brain, Share2, TrendingUp, Palette, BarChart3, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import KineticHeading from '@/components/KineticHeading';

const iconMap: Record<string, React.ElementType> = {
  Code2, Brain, Share2, TrendingUp, Palette, BarChart3,
};

const slugToHref: Record<string, string> = {
  'web-development': '/services/tvorba-web-stranok',
  'seo-ai': '/services/seo-optimalizacia',
  'social-media': '/services/sprava-socialnych-sieti',
};

interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  short: string;
}

export default function Services() {
  const { t, tArray } = useLanguage();
  const services = tArray<ServiceItem>('services.items');

  return (
    <section className="py-28 bg-navy-light relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-14"
        >
          <div className="lg:col-span-7">
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('home.services_snippet.label')}
            </span>
            <KineticHeading
              accent={t('home.accents.services')}
              className="font-display text-4xl lg:text-6xl font-bold text-slate-lightest leading-[1.05]"
            >
              {t('home.services_snippet.headline')}
            </KineticHeading>
          </div>
          <p className="lg:col-span-5 text-slate-text text-lg font-body leading-relaxed">
            {t('home.services_snippet.sub')}
          </p>
        </motion.div>

        {/* Oversized editorial rows, hairline-separated */}
        <ul className="border-t border-white/10">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.li
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
                className="border-b border-white/10"
              >
                <Link
                  href={slugToHref[service.slug] ?? '/services'}
                  className="group relative grid grid-cols-12 items-center gap-x-4 gap-y-3 py-7 sm:py-9 lg:py-10"
                >
                  {/* Hover wash */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-aqua/[0.06] via-aqua/[0.02] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-expo pointer-events-none"
                  />
                  <Icon
                    aria-hidden="true"
                    size={110}
                    strokeWidth={0.6}
                    className="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2 text-aqua opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                  />
                  <span
                    className="relative col-span-2 lg:col-span-1 font-mono text-xs sm:text-sm text-aqua tracking-widest"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="relative col-span-10 lg:col-span-6 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-lightest leading-[1.05] tracking-tight transition-all duration-700 ease-expo group-hover:text-aqua lg:group-hover:translate-x-3">
                    {service.title}
                  </h3>
                  <p className="relative col-span-12 lg:col-span-4 pl-[16.666%] lg:pl-0 text-slate-text text-sm sm:text-base font-body leading-relaxed">
                    {service.short}
                  </p>
                  <span className="relative hidden lg:flex col-span-1 justify-end">
                    <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-aqua transition-all duration-500 ease-expo group-hover:border-aqua/60 group-hover:bg-aqua/10 group-hover:-rotate-45">
                      <ArrowRight size={16} />
                    </span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Link
            href="/services"
            className="btn-kinetic group inline-flex items-center gap-2 border border-aqua/30 text-aqua font-display font-semibold px-8 py-4 rounded-xl hover:bg-aqua/10"
          >
            {t('home.services_snippet.all')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
