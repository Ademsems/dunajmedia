'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeTestimonial() {
  const { locale } = useLanguage();
  const isSk = locale === 'sk';

  return (
    <section className="py-28 bg-navy-light relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(100,255,218,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
            {isSk ? 'Referencie' : 'Testimonials'}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
            {isSk ? 'Čo hovoria naši klienti' : 'What our clients say'}
          </h2>
        </motion.div>

        {/* Testimonial block — desktop: side by side, mobile: stacked */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Left: quote — always English (client's real words) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="block font-display text-8xl text-aqua/30 leading-none mb-2 select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="font-display italic text-xl lg:text-2xl text-slate-lightest leading-relaxed mb-6 -mt-4">
              One person took the time to read what we wanted, arranged a meeting, and now we have the perfect site. Adem listened to what we wanted and our budget. As he designed the website, he contributed with some excellent ideas. I cannot recommend him enough — professional, easy to contact, communication was superb, and he delivered what we wanted. If you are looking for help with your web idea, Adem is your perfect partner.
            </blockquote>
            <p className="font-mono text-xs text-aqua uppercase tracking-widest mb-8">
              Simon Wheeler, Grand Apartman
            </p>
            <Link
              href="/work/grand-apartman"
              className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-6 py-3 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua"
            >
              {isSk ? 'Prečítať prípadovú štúdiu' : 'Read the case study'}
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: clickable Facebook screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-2"
          >
            <a
              href="https://www.facebook.com/groups/InBratislava/permalink/10162693095791820/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden border border-white/10 hover:border-aqua/30 shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Image
                src="/our-work/grandapartman-testimonial.png"
                alt="Facebook testimonial from Simon Wheeler about Grand Apartman website"
                width={600}
                height={400}
                className="w-full h-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                <span className="font-mono text-xs text-white bg-navy/80 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                  <ExternalLink size={11} />
                  {isSk ? 'Pozrieť pôvodný príspevok' : 'View the original post'}
                </span>
              </div>
            </a>
            <p className="text-slate-text/60 text-xs font-mono text-center flex items-center justify-center gap-1 mt-1">
              <ExternalLink size={10} />
              {isSk ? 'Pozrieť pôvodný príspevok' : 'View the original post'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
