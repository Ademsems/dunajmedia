import type { Metadata } from 'next';
import HowWeWorkPageClient from './HowWeWorkPageClient';

export const metadata: Metadata = {
  title: 'Ako pracujeme | Dunajmedia — Digitálna Agentúra Bratislava',
  description:
    'Transparentný proces, jasná komunikácia a merateľné výsledky. Zistite, ako Dunajmedia pracuje s každým klientom od prvého hovoru po dlhodobú podporu.',
};

export default function HowWeWorkPage() {
  return <HowWeWorkPageClient />;
}
