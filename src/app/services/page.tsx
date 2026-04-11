import type { Metadata } from 'next';
import ServicesPage from './ServicesPage';

export const metadata: Metadata = {
  title: 'Služby | Tvorba Web Stránok, SEO, Social Media — Dunajmedia',
  description:
    'Kompletné digitálne služby: tvorba web stránok, AI-driven SEO, správa sociálnych sietí, growth marketing a branding. Digitálna agentúra Bratislava.',
};

export default function Page() {
  return <ServicesPage />;
}
