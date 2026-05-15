import type { Metadata } from 'next';
import WebDesignPageClient from './WebDesignPageClient';

export const metadata: Metadata = {
  title: 'Tvorba Web Stránok Bratislava | Moderné Weby na Mieru | Dunajmedia',
  description:
    'Profesionálna tvorba web stránok Bratislava. Rýchle, výkonné a SEO optimalizované weby na mieru postavené na Next.js. Dvojjazyčnosť SK/EN. Bezplatná konzultácia.',
};

export default function WebDesignPage() {
  return <WebDesignPageClient />;
}
