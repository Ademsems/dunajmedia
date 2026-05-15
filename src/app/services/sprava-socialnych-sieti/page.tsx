import type { Metadata } from 'next';
import SocialMediaPageClient from './SocialMediaPageClient';

export const metadata: Metadata = {
  title: 'Správa Sociálnych Sietí Bratislava | Social Media Marketing | Dunajmedia',
  description:
    'Profesionálna správa sociálnych sietí Bratislava. Tvorba obsahu, community management, platená reklama a AI tvorba príspevkov. Premieňame sledovateľov na zákazníkov.',
};

export default function SocialMediaPage() {
  return <SocialMediaPageClient />;
}
