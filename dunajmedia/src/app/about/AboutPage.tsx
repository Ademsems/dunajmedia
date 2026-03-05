'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, Lightbulb, Shield } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ContactForm from '@/components/ContactForm';
import CTABanner from '@/components/CTABanner';

const valueIcons = [Lightbulb, Shield, Users, Target];

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface ValueItem {
  title: string;
  desc: string;
}

interface NumberItem {
  value: string;
  label: string;
}

export default function AboutPage() {
  const { t, tArray } = useLanguage();
  const teamMembers = tArray<TeamMember>('about.team.members');
  const values = tArray<ValueItem>('about.values.items');
  const numbers = tArray<NumberItem>('about.numbers.items');

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
              {t('about.hero.label')}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
              {t('about.hero.headline')}
            </h1>
            <p className="text-slate-text text-xl font-body leading-relaxed">
              {t('about.hero.sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16 bg-navy-light border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {numbers.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-navy-light px-8 py-8 text-center"
              >
                <p className="font-display font-bold text-4xl text-aqua mb-2">{value}</p>
                <p className="text-slate-text text-sm font-mono uppercase tracking-wider">{label}</p>
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
              <h2 className="font-display text-4xl font-bold text-slate-lightest mb-8">
                {t('about.story.headline')}
              </h2>
              <div className="space-y-5 text-slate-text font-body leading-relaxed">
                <p>{t('about.story.body1')}</p>
                <p>{t('about.story.body2')}</p>
                <p>{t('about.story.body3')}</p>
              </div>
            </motion.div>

            {/* Values grid */}
            <div>
              <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-6 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
                {t('about.values.label')}
              </span>
              <h3 className="font-display text-2xl font-bold text-slate-lightest mb-8">
                {t('about.values.headline')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {values.map((val, i) => {
                  const Icon = valueIcons[i];
                  return (
                    <motion.div
                      key={val.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-xl bg-navy-light border border-white/5 hover:border-aqua/20 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-aqua/10 border border-aqua/20 flex items-center justify-center mb-3">
                        <Icon size={16} className="text-aqua" />
                      </div>
                      <h4 className="font-display font-bold text-slate-lightest text-sm mb-1">{val.title}</h4>
                      <p className="text-slate-text text-xs font-body leading-relaxed">{val.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-28 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('about.team.label')}
            </span>
            <h2 className="font-display text-4xl font-bold text-slate-lightest">
              {t('about.team.headline')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-navy border border-white/5 hover:border-aqua/25 transition-all duration-300 text-center"
              >
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-aqua/20 to-aqua-electric/20 border border-aqua/30 flex items-center justify-center mx-auto mb-5 group-hover:border-aqua/50 transition-colors">
                  <span className="font-display font-bold text-2xl text-aqua">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-slate-lightest text-base mb-1">{member.name}</h3>
                <p className="text-aqua text-xs font-mono mb-3">{member.role}</p>
                <p className="text-slate-text text-xs font-body leading-relaxed">{member.bio}</p>
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
