import type { Metadata } from 'next';
import WorkPageClient from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Naše ukážky | Dunajmedia — Digitálna Agentúra Bratislava',
  description:
    'Pozrite si živé ukážky webových stránok vytvorených od Dunajmedia. Každý projekt je navrhnutý od nuly — žiadne šablóny.',
};

export default function WorkPage() {
  return <WorkPageClient />;
}
