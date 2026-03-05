'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Brain, Share2, TrendingUp, Palette, BarChart3, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, React.ElementType> = {
  Code2, Brain, Share2, TrendingUp, Palette, BarChart3,
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
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
            {t('home.services_snippet.label')}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-5 leading-tight">
            {t('home.services_snippet.headline')}
          </h2>
          <p className="text-slate-text text-lg max-w-2xl mx-auto font-body leading-relaxed">
            {t('home.services_snippet.sub')}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href="/services"
                  className="group block h-full p-7 rounded-2xl border border-white/6 bg-navy/60 card-hover"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-aqua/10 border border-aqua/20 flex items-center justify-center mb-5 group-hover:bg-aqua/20 group-hover:border-aqua/40 transition-all duration-300">
                    <Icon size={22} className="text-aqua" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-lg text-slate-lightest mb-3 group-hover:text-aqua transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-slate-text text-sm font-body leading-relaxed mb-5">
                    {service.short}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-1 text-aqua/60 text-xs font-mono uppercase tracking-wider group-hover:text-aqua transition-colors duration-200">
                    <span>{t('common.learn_more')}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 border border-aqua/30 text-aqua font-display font-semibold px-8 py-4 rounded-xl hover:bg-aqua/10 transition-all duration-300"
          >
            {t('common.learn_more')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
