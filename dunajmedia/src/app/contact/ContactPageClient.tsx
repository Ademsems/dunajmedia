'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ContactForm from '@/components/ContactForm';

const contactItems = [
  {
    icon: Mail,
    key: 'contact.info.email',
    value: 'info@dunajmedia.sk',
    href: 'mailto:info@dunajmedia.sk',
    label_sk: 'Email',
    label_en: 'Email',
  },
  {
    icon: Phone,
    key: 'contact.info.phone',
    value: '+421 952 049 119',
    href: 'tel:+421952049119',
    label_sk: 'Telefón',
    label_en: 'Phone',
  },
  {
    icon: MapPin,
    key: 'contact.info.address',
    value: 'Obchodná 12, 811 06 Bratislava',
    href: 'https://maps.google.com',
    label_sk: 'Adresa',
    label_en: 'Address',
  },
  {
    icon: Clock,
    key: 'contact.info.hours',
    value: 'Po–Pi: 9:00 – 18:00',
    href: null,
    label_sk: 'Pracovná doba',
    label_en: 'Business Hours',
  },
];

export default function ContactPageClient() {
  const { t, locale } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative py-28 bg-navy overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-aqua/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
                {t('contact.hero.label')}
              </span>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
                {t('contact.hero.headline')}
              </h1>
              <p className="text-slate-text text-xl font-body leading-relaxed">
                {t('contact.hero.sub')}
              </p>
            </motion.div>

            {/* Contact info cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {contactItems.map(({ icon: Icon, key, label_sk, label_en, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-2xl bg-navy-light border border-white/5 hover:border-aqua/30 transition-all duration-300 h-full"
                    >
                      <div className="w-10 h-10 rounded-xl bg-aqua/10 border border-aqua/20 flex items-center justify-center mb-3 group-hover:bg-aqua/20 transition-colors">
                        <Icon size={16} className="text-aqua" />
                      </div>
                      <p className="text-xs font-mono text-aqua/70 uppercase tracking-wider mb-1">
                        {locale === 'sk' ? label_sk : label_en}
                      </p>
                      <p className="text-slate-light text-sm font-body leading-snug">{t(key)}</p>
                    </a>
                  ) : (
                    <div className="block p-5 rounded-2xl bg-navy-light border border-white/5 h-full">
                      <div className="w-10 h-10 rounded-xl bg-aqua/10 border border-aqua/20 flex items-center justify-center mb-3">
                        <Icon size={16} className="text-aqua" />
                      </div>
                      <p className="text-xs font-mono text-aqua/70 uppercase tracking-wider mb-1">
                        {locale === 'sk' ? label_sk : label_en}
                      </p>
                      <p className="text-slate-light text-sm font-body leading-snug">{t(key)}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-72 bg-navy-light relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-aqua/20 border border-aqua/40 flex items-center justify-center mx-auto mb-3 animate-pulse">
              <MapPin size={20} className="text-aqua" />
            </div>
            <p className="font-mono text-xs text-aqua uppercase tracking-widest">{t('contact.map_label')}</p>
            <p className="text-slate-text text-sm font-body mt-1">{t('contact.info.address')}</p>
            <a
              href="https://maps.google.com/?q=Obchodná+12+Bratislava"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-aqua text-xs font-mono mt-3 hover:underline"
            >
              Google Maps
              <ArrowRight size={11} />
            </a>
          </div>
        </div>
        {/* Decorative dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-aqua/20"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
          />
        ))}
      </section>

      {/* Quick response promise */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: locale === 'sk' ? 'Rýchla odpoveď' : 'Quick Response', desc: locale === 'sk' ? 'Odpovedáme do 24 hodín' : 'We respond within 24 hours' },
              { icon: Phone, title: locale === 'sk' ? 'Konzultácia zadarmo' : 'Free Consultation', desc: locale === 'sk' ? 'Bezplatná stratégia pre váš biznis' : 'Free strategy for your business' },
              { icon: Clock, title: locale === 'sk' ? 'Pracovná doba' : 'Business Hours', desc: locale === 'sk' ? 'Po–Pi: 9:00 – 18:00' : 'Mon–Fri: 9:00 AM – 6:00 PM' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-navy-light border border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-aqua/10 border border-aqua/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-aqua" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-lightest text-sm mb-1">{title}</h3>
                  <p className="text-slate-text text-xs font-body">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
