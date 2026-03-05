import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Kontakt | Dunajmedia — Digitálna Agentúra Bratislava',
  description:
    'Kontaktujte Dunajmedia — info@dunajmedia.sk, +421 952 049 119. Obchodná 12, 811 06 Bratislava. Odpovedáme do 24 hodín.',
};

export default function Page() {
  return <ContactPageClient />;
}
