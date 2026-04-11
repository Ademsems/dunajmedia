import type { Metadata } from 'next';
import { Syne, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

const ViewportMeta = () => (
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
);

const SchemaOrg = () => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Dunajmedia",
          "image": "https://dunajmedia.sk/og-image.jpg",
          "url": "https://dunajmedia.sk",
          "telephone": "+421949123456",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Digitalna 1",
            "addressLocality": "Bratislava",
            "postalCode": "841 01",
            "addressCountry": "SK"
          },
          "hasMap": "https://www.google.com/maps/search/Dunajmedia", // Replace with actual map URL
          "openingHours": "Mo-Fr 09:00-17:00",
          "pricerange": "$$$",
          "makesOffer": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tvorba Web Stránok"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Správa Sociálnych Sietí"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI-driven SEO"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Growth Marketing"
              }
            }
          ]
        })
      }}
    />
);

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
      <head>
        <ViewportMeta />
        <SchemaOrg />
      </head>
      <body className="bg-navy text-slate-light font-body antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <TopBar />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}