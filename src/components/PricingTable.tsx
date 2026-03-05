'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Zap, Star, Crown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  currency: string;
  badge: string | null;
  desc: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const tierIcons = [Zap, Star, Crown];
const tierColors = ['text-slate-light', 'text-aqua', 'text-amber-400'];

export default function PricingTable({ compact = false }: { compact?: boolean }) {
  const { t, tArray } = useLanguage();
  const tiers = tArray<PricingTier>('pricing.tiers');

  return (
    <section className={`${compact ? 'py-0' : 'py-28'} relative`}>
      {!compact && (
        <div className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
            {t('pricing.hero.label')}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-5">
            {t('pricing.hero.headline')}
          </h2>
          <p className="text-slate-text text-lg max-w-2xl mx-auto font-body">
            {t('pricing.hero.sub')}
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => {
            const Icon = tierIcons[i];
            const colorClass = tierColors[i];
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl p-7 flex flex-col h-full ${
                  tier.highlighted
                    ? 'bg-gradient-to-b from-aqua/10 to-navy-light border border-aqua/40 shadow-aqua-lg scale-[1.02]'
                    : 'bg-navy-light border border-white/6 hover:border-white/15 transition-colors duration-300'
                }`}
                style={{ borderColor: tier.highlighted ? undefined : 'rgba(255,255,255,0.06)' }}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-gradient-to-r from-aqua to-aqua-electric text-navy font-mono font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4`}>
                    <Icon size={20} className={colorClass} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-lightest mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-slate-text text-sm font-body leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-7 pb-7 border-b border-white/6">
                  <div className="flex items-end gap-1">
                    <span className="font-display font-bold text-5xl text-slate-lightest leading-none">
                      {tier.currency}{tier.price}
                    </span>
                  </div>
                  <p className="text-slate-text text-xs font-mono mt-1 uppercase tracking-wider">
                    {t('pricing.toggle.one_time')}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={14}
                        className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-aqua' : 'text-aqua/60'}`}
                      />
                      <span className="text-slate-text text-sm font-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`block text-center font-display font-bold text-sm py-4 rounded-xl transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-aqua text-navy hover:bg-aqua-electric shadow-aqua'
                      : 'border border-aqua/30 text-aqua hover:bg-aqua/10'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
