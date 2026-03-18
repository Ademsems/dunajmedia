import type { Metadata } from 'next';
import { Syne, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dunajmedia.sk'),
  title: {
    default: 'Dunajmedia | Digitálna Agentúra Bratislava | Tvorba Web Stránok & SEO',
    template: '%s | Dunajmedia',
  },
  description:
    'Dunajmedia je prémiová marketingová agentúra Bratislava. Poskytujeme tvorbu web stránok, správu sociálnych sietí, AI-driven SEO a growth marketing pre slovenské firmy.',
  keywords: [
    'digitálna agentúra Bratislava',
    'tvorba web stránok',
    'správa sociálnych sietí',
    'marketingová agentúra Bratislava',
    'optimalizácia pre AI',
    'digital marketing agency Slovakia',
    'web development services',
    'social media management',
    'growth marketing Bratislava',
    'AI-driven SEO',
  ],
  authors: [{ name: 'Dunajmedia s.r.o.' }],
  creator: 'Dunajmedia',
  publisher: 'Dunajmedia s.r.o.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    alternateLocale: 'en_US',
    url: 'https://dunajmedia.sk',
    siteName: 'Dunajmedia',
    title: 'Dunajmedia | Prémiová Digitálna Agentúra Bratislava',
    description: 'Tvorba web stránok, správa sociálnych sietí, AI-SEO a growth marketing. Vaša úspešná digitálna prítomnosť začína tu.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Dunajmedia Digital Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dunajmedia | Digital Marketing Agency Slovakia',
    description: 'Premium web development, AI-driven SEO, and growth marketing from Bratislava.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="sk"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-navy text-slate-light font-body antialiased">
        <LanguageProvider>
          <TopBar />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
