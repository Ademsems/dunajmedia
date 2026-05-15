import type { Metadata } from 'next';
import SEOPageClient from './SEOPageClient';

export const metadata: Metadata = {
  title: 'SEO Optimalizácia Bratislava | AI-Driven SEO pre Slovenské Firmy | Dunajmedia',
  description:
    'Profesionálna SEO optimalizácia Bratislava. Technické SEO, lokálne SEO, AI SEO optimalizácia a link building. Bezplatný SEO audit. Dostaňte sa na prvú stránku Google.',
};

export default function SEOPage() {
  return <SEOPageClient />;
}
