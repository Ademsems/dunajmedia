import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import AboutSnippet from '@/components/AboutSnippet';
import Services from '@/components/Services';
import PricingTable from '@/components/PricingTable';
import ContactForm from '@/components/ContactForm';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = {
  title: 'Domov | Dunajmedia — Digitálna Agentúra Bratislava',
  description:
    'Prémiová digitálna agentúra Bratislava. Tvorba web stránok, správa sociálnych sietí, AI-driven SEO a growth marketing pre úspešné slovenské firmy.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <Services />
      {/* Pricing teaser */}
      <section className="py-28 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
            Cenník
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-5">
            Transparentné ceny pre každý biznis
          </h2>
          <p className="text-slate-text text-lg max-w-2xl mx-auto font-body">
            Fixné ceny bez skrytých poplatkov. Od €299 po €999 — nájdite balíček pre váš rast.
          </p>
        </div>
        <PricingTable compact />
      </section>
      <CTABanner />
      <ContactForm />
    </>
  );
}
