import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog | Digitálny Marketing, SEO, AI Trendy — Dunajmedia',
  description:
    'Blog Dunajmedia: aktuálne insights o tvorbe web stránok, správe sociálnych sietí, AI-driven SEO a growth marketingu na Slovensku.',
};

export default function Page() {
  return <BlogPageClient />;
}
