import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import AboutSnippet from '@/components/AboutSnippet';
import Services from '@/components/Services';
import WorkShowcaseSection from '@/components/WorkShowcaseSection';
import HomePricingTeaser from '@/components/HomePricingTeaser';
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
      <WorkShowcaseSection />
      <HomePricingTeaser />
      <CTABanner />
      <ContactForm />
    </>
  );
}
