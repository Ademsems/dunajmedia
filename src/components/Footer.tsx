'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const serviceLinks = [
  { label_sk: 'Tvorba webov', label_en: 'Web Development', href: '/services' },
  { label_sk: 'SEO & AI', label_en: 'SEO & AI', href: '/services' },
  { label_sk: 'Social Media', label_en: 'Social Media', href: '/services' },
  { label_sk: 'Growth Marketing', label_en: 'Growth Marketing', href: '/services' },
];

const companyLinks = [
  { label_sk: 'O nás', label_en: 'About', href: '/about' },
  { label_sk: 'Blog', label_en: 'Blog', href: '/blog' },
  { label_sk: 'Cenník', label_en: 'Pricing', href: '/pricing' },
  { label_sk: 'Kontakt', label_en: 'Contact', href: '/contact' },
];

const socials = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'X / Twitter' },
];

export default function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer className="bg-navy-light border-t border-white/5 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-aqua/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-slate-lightest">dunaj</span>
              <span className="font-display text-2xl font-bold text-aqua">media</span>
            </Link>
            <p className="text-slate-text text-sm leading-relaxed mb-6 font-body">
              {t('footer.tagline')}
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-slate-text hover:text-aqua hover:border-aqua/30 transition-all duration-200 bg-navy/50"
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-slate-lightest uppercase tracking-wider mb-5">
              {t('footer.links.company')}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(({ label_sk, label_en, href }) => (
                <li key={href + (locale === 'sk' ? label_sk : label_en)}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1 text-slate-text hover:text-aqua text-sm font-body transition-colors duration-200"
                  >
                    <span className="hover-underline">{locale === 'sk' ? label_sk : label_en}</span>
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-slate-lightest uppercase tracking-wider mb-5">
              {t('footer.links.services')}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map(({ label_sk, label_en, href }) => (
                <li key={label_sk}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1 text-slate-text hover:text-aqua text-sm font-body transition-colors duration-200"
                  >
                    <span className="hover-underline">{locale === 'sk' ? label_sk : label_en}</span>
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-sm font-semibold text-slate-lightest uppercase tracking-wider mb-5">
              {t('nav.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-text font-body">
                <MapPin size={14} className="text-aqua mt-0.5 flex-shrink-0" />
                <span>{t('contact.info.address')}</span>
              </li>
              <li>
                <a
                  href="mailto:info@dunajmedia.sk"
                  className="flex items-center gap-3 text-sm text-slate-text hover:text-aqua transition-colors font-body"
                >
                  <Mail size={14} className="text-aqua flex-shrink-0" />
                  <span>{t('contact.info.email')}</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+421952049119"
                  className="flex items-center gap-3 text-sm text-slate-text hover:text-aqua transition-colors font-body"
                >
                  <Phone size={14} className="text-aqua flex-shrink-0" />
                  <span>{t('contact.info.phone')}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-text font-body">
                <Clock size={14} className="text-aqua flex-shrink-0" />
                <span>{t('contact.info.hours')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-text text-xs font-body">{t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            {['Ochrana osobných údajov', 'Podmienky', 'Cookies'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-slate-text hover:text-aqua text-xs font-body transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
