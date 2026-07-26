'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ContactForm from '@/components/ContactForm';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const sk = {
  category: 'Prenájom apartmánov · Cestovný ruch',
  h1: 'Dvojjazyčná prezentačná stránka, ktorá z ponuky na Booking.com robí značku',
  sub: 'Vytvorili sme rýchlu a elegantnú webovú stránku, ktorá dáva apartmánom v Podhájskej vlastný priestor online — v angličtine a slovenčine — bez toho, aby narušila rezervácie, na ktorých firma stojí.',
  visitBtn: 'Navštíviť stránku',
  backBtn: 'Späť na ukážky',
  challengeLabel: 'Výzva',
  challenge:
    'Grand Apartman prevádzkuje tri luxusné apartmány v kúpeľnom mestečku Podhájska, pričom všetky rezervácie prebiehajú cez Booking.com. Majitelia si na platforme vybudovali výbornú povesť, no nemali vlastnú webovú stránku — žiadnu nezávislú prezentáciu, na ktorú by mohli hostí nasmerovať, žiadny značkový priestor pre svoje fotografie a príbeh a žiadnu možnosť, ako ich nájsť mimo rezervačného portálu. Potrebovali stránku, ktorá bude pôsobiť rovnako premyslene ako ich apartmány a bude fungovať pre medzinárodné publikum hovoriace prevažne po anglicky a po slovensky.',
  approachLabel: 'Prístup',
  approach:
    'Odporučili sme prehľadnú prezentačnú stránku, ktorá privádza rezervácie na Booking.com, namiesto duplikovania rezervačného systému — čo bol správny rozsah pre ich podnikanie aj rozpočet. Dizajnový smer vychádzal priamo zo zadania a značky klienta: čistý, prehľadný, postavený na fotografiách, v krémových a kávových tónoch ich zlatého loga. Stránku sme od základu postavili ako plne dvojjazyčnú, aby anglicky aj slovensky hovoriaci hostia získali rovnocenný zážitok, a každú časť sme navrhli tak, aby pôsobila elegantne ešte predtým, než boli k dispozícii všetky fotografie a údaje.',
  builtLabel: 'Čo sme vytvorili',
  builtItems: [
    'Dvojjazyčná (anglicko-slovenská) prezentačná stránka s domovskou stránkou, kompletným prehľadom apartmánov a samostatnou stránkou pre každý z troch apartmánov.',
    'Interaktívna galéria na stránke každého apartmánu — veľká hlavná fotografia s pásom náhľadov a celoobrazovkový režim so šípkami, potiahnutím prstom, náhľadmi a počítadlom.',
    'Priame odkazy „Rezervovať na Booking.com" z každého apartmánu na jeho konkrétnu ponuku, zachovávajúce rezervačný postup, ktorému klient už dôveruje.',
    'Funkčný kontaktný formulár s povinným poľom pre telefónne číslo, ktorý doručuje dopyty priamo do schránky majiteľov.',
    'Stránka „O nás", sekcia s lokalitou a mapou, súhlas s cookies a stránky Ochrana súkromia a Obchodné podmienky — základ pre dôveryhodnú stránku v súlade s GDPR.',
  ],
  testimonialLabel: 'Referencia',
  viewPost: 'Pozrieť pôvodný príspevok',
  techLabel: 'Technológie',
  languages: 'angličtina a slovenčina',
  ctaText:
    'Prevádzkujete apartmány, penzión alebo ubytovanie, ktoré žije len na Booking.com či Airbnb? Dáme vášmu podnikaniu vlastný priestor — rýchlu, dvojjazyčnú stránku, ktorá buduje dôveru a približuje hostí. Ozvite sa nám.',
  ctaBtn: 'Kontaktujte nás',
  backLink: 'Späť na ukážky',
};

const en = {
  category: 'Vacation rental · Hospitality',
  h1: 'A bilingual showcase site that turns Booking.com listings into a brand',
  sub: 'We built a fast, elegant website that gives a Podhájska apartment business its own home online — in English and Slovak — without disrupting the bookings it already relies on.',
  visitBtn: 'Visit the site',
  backBtn: 'Back to our work',
  challengeLabel: 'The Challenge',
  challenge:
    'Grand Apartman runs three luxury apartments in the spa town of Podhájska, with all bookings flowing through Booking.com. The owners had built an excellent reputation on the platform but had no website of their own — no independent presence to point guests to, no branded home for their photos and story, and no way to be found outside the walls of a booking portal. They needed a site that looked as considered as their apartments and worked for an international, largely English- and Slovak-speaking audience.',
  approachLabel: 'The Approach',
  approach:
    'We recommended a clean showcase site that drives bookings to Booking.com rather than duplicating a reservation system — the right scope for their business and budget. The design direction came straight from the client\'s brief and brand: crisp, uncluttered, image-led, in the cream and cappuccino tones of their gold logo. We built it fully bilingual from the ground up, so English- and Slovak-speaking guests get an equal experience, and engineered every part to stay elegant even before all the photos and details were in place.',
  builtLabel: 'What We Built',
  builtItems: [
    'A bilingual (English/Slovak) showcase website with a home page, a full apartments overview, and a dedicated page for each of the three apartments.',
    'An interactive gallery on each apartment page — a large main image with a thumbnail strip, plus a full-screen lightbox with arrows, swipe, thumbnails and a counter.',
    'Direct \'Book on Booking.com\' links from each apartment through to its specific listing, keeping the booking flow the client already trusts.',
    'A working contact form with a required phone field, delivering enquiries straight to the owners\' inbox.',
    'An About page, a location section with a map, cookie consent, and Privacy and Terms pages — the essentials for a credible, GDPR-appropriate site.',
  ],
  testimonialLabel: 'Testimonial',
  viewPost: 'View the original post',
  techLabel: 'Tech & Details',
  languages: 'English & Slovak',
  ctaText:
    'Do you run apartments, a guesthouse, or a rental that lives only on Booking.com or Airbnb? We\'ll give your business a home of its own — a fast, bilingual site that builds trust and brings guests closer. Let\'s talk.',
  ctaBtn: 'Get in touch',
  backLink: 'Back to our work',
};

const techItems = [
  { label: 'Stack', value: 'Next.js, TypeScript, Tailwind CSS, Framer Motion' },
  { labelSk: 'E-mail', labelEn: 'Email', value: 'Resend' },
  { label: 'Hosting', value: 'Vercel' },
];

export default function GrandApartmanClient() {
  const { locale } = useLanguage();
  const isSk = locale === 'sk';
  const c = isSk ? sk : en;

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(100,255,218,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Breadcrumb */}
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-slate-text hover:text-aqua font-mono text-xs uppercase tracking-widest mb-8 transition-colors group"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                {c.backBtn}
              </Link>

              <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
                {c.category}
              </span>

              <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest leading-tight mb-6">
                {c.h1}
              </h1>

              <p className="text-slate-text text-lg font-body leading-relaxed mb-10">
                {c.sub}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://grandapartman.sk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-6 py-3 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua"
                >
                  <ExternalLink size={15} />
                  {c.visitBtn}
                </a>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 border border-aqua/30 text-aqua font-display font-semibold px-6 py-3 rounded-xl hover:bg-aqua/10 transition-all duration-300"
                >
                  {c.backBtn}
                </Link>
              </div>
            </motion.div>

            {/* Right — square mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-aqua/20 shadow-[0_0_50px_rgba(100,255,218,0.08)]">
                <Image
                  src="/our-work/grandapartman-mockup.PNG"
                  alt="Grand Apartman website mockup"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 90vw, 448px"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE ────────────────────────────────────── */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {c.challengeLabel}
            </span>
            <p className="text-slate-text text-lg font-body leading-relaxed">
              {c.challenge}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE APPROACH ─────────────────────────────────────── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {c.approachLabel}
            </span>
            <p className="text-slate-text text-lg font-body leading-relaxed">
              {c.approach}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE BUILT ────────────────────────────────────── */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-10">
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {c.builtLabel}
            </span>
          </motion.div>

          <ul className="space-y-5">
            {c.builtItems.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4"
              >
                <CheckCircle2 className="w-5 h-5 text-aqua flex-shrink-0 mt-0.5" />
                <p className="text-slate-text font-body leading-relaxed">{item}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {c.testimonialLabel}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Quote — always English */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <span className="block font-display text-8xl text-aqua/30 leading-none mb-2 select-none" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="font-display italic text-xl lg:text-2xl text-slate-lightest leading-relaxed mb-6 -mt-4">
                One person took the time to read what we wanted, arranged a meeting, and now we have the perfect site. Adem listened to what we wanted and our budget. As he designed the website, he contributed with some excellent ideas. I cannot recommend him enough — professional, easy to contact, communication was superb, and he delivered what we wanted. If you are looking for help with your web idea, Adem is your perfect partner.
              </blockquote>
              <p className="font-mono text-xs text-aqua uppercase tracking-widest">
                Simon Wheeler, Grand Apartman
              </p>
            </motion.div>

            {/* Testimonial screenshot — clickable */}
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
                  className="w-full h-auto object-contain group-hover:opacity-90 transition-opacity"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <span className="font-mono text-xs text-white bg-navy/80 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                    <ExternalLink size={11} />
                    {c.viewPost}
                  </span>
                </div>
              </a>
              <p className="text-slate-text/60 text-xs font-mono text-center flex items-center justify-center gap-1">
                <ExternalLink size={10} />
                {c.viewPost}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TECH & DETAILS ───────────────────────────────────── */}
      <section className="py-20 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-10">
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {c.techLabel}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="divide-y divide-white/8"
          >
            {/* Stack */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <span className="font-mono text-xs text-slate-text uppercase tracking-widest">Stack</span>
              <span className="font-body text-slate-lightest text-sm">Next.js, TypeScript, Tailwind CSS, Framer Motion</span>
            </div>
            {/* Email */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <span className="font-mono text-xs text-slate-text uppercase tracking-widest">
                {isSk ? 'E-mail' : 'Email'}
              </span>
              <span className="font-body text-slate-lightest text-sm">Resend</span>
            </div>
            {/* Hosting */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <span className="font-mono text-xs text-slate-text uppercase tracking-widest">Hosting</span>
              <span className="font-body text-slate-lightest text-sm">Vercel</span>
            </div>
            {/* Languages */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <span className="font-mono text-xs text-slate-text uppercase tracking-widest">
                {isSk ? 'Jazyky' : 'Languages'}
              </span>
              <span className="font-body text-slate-lightest text-sm">{c.languages}</span>
            </div>
            {/* Live site */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <span className="font-mono text-xs text-slate-text uppercase tracking-widest">
                {isSk ? 'Stránka' : 'Live site'}
              </span>
              <a
                href="https://grandapartman.sk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-aqua text-sm hover:underline inline-flex items-center gap-1"
              >
                grandapartman.sk
                <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(100,255,218,0.05) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <p className="font-display text-2xl lg:text-3xl font-bold text-slate-lightest mb-8 leading-snug">
              {c.ctaText}
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-8 py-4 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua"
            >
              {c.ctaBtn}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────── */}
      <ContactForm />

      {/* ── BACK LINK ────────────────────────────────────────── */}
      <div className="bg-navy-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-slate-text hover:text-aqua font-mono text-xs uppercase tracking-widest transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            {c.backLink}
          </Link>
        </div>
      </div>
    </>
  );
}
