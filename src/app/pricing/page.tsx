import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Cenník | Webové Služby od €299 — Dunajmedia',
  description:
    'Transparentné ceny za tvorbu web stránok a digitálny marketing. Expres Start €299, Business Pro €549, Agency Elite €999. Žiadne skryté poplatky.',
};

export default function Page() {
  return <PricingPageClient />;
}
