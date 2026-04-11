import type { Metadata } from 'next';
import AboutPage from './AboutPage';

export const metadata: Metadata = {
  title: 'O nás | Dunajmedia — Marketingová Agentúra Bratislava',
  description:
    'Spoznajte tím Dunajmedia — skúsení digitálni experti z Bratislavy špecializovaní na tvorbu web stránok, SEO a growth marketing pre slovenské firmy.',
};

export default function Page() {
  return <AboutPage />;
}
