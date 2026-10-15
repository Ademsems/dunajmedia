'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Globe2, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WeAreGlocalSection() {
  const { t } = useLanguage();
  const points = ['point1', 'point2', 'point3'];

  return (
    <section className="py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(100,255,218,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('home.weareglocal.label')}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-6 leading-tight">
              {t('home.weareglocal.headline')}
            </h2>
            <p className="text-slate-light text-lg font-body leading-relaxed mb-4">
              {t('home.weareglocal.body1')}
            </p>
            <p className="text-slate-text font-body leading-relaxed mb-8">
              {t('home.weareglocal.body2')}
            </p>
            <a
              href="https://weareglocal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-6 py-3 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua"
            >
              {t('home.weareglocal.cta')}
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl border border-aqua/20 bg-navy-light p-8 lg:p-10 shadow-[0_0_40px_rgba(100,255,218,0.08)]"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-aqua/10 border border-aqua/20 flex items-center justify-center">
                <Globe2 size={26} className="text-aqua" />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-slate-lightest">WeAreGlocal</p>
                <p className="font-mono text-xs text-aqua uppercase tracking-widest mt-1">
                  {t('home.weareglocal.badge')}
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-light font-body text-sm leading-relaxed">
                  <Check size={16} className="text-aqua mt-0.5 flex-shrink-0" />
                  <span>{t(`home.weareglocal.${p}`)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
