import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Grand Apartman — Prípadová štúdia | Dunajmedia',
  description: 'Prípadová štúdia: prezentačná webstránka pre Grand Apartman — luxusné apartmánové ubytovanie v Bratislave.',
  robots: { index: false },
};

export default function GrandApartmanPage() {
  return (
    <main className="min-h-screen bg-navy pt-32 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-slate-text hover:text-aqua font-mono text-xs uppercase tracking-widest mb-12 transition-colors"
        >
          <ArrowLeft size={14} />
          Späť na prácu / Back to work
        </Link>

        {/* Badge */}
        <span className="inline-block font-mono text-xs text-navy bg-aqua/90 uppercase tracking-widest px-3 py-1 rounded-full font-bold mb-6">
          Klient / Client
        </span>

        <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
          Grand Apartman
        </h1>

        <p className="text-slate-text text-xl font-body leading-relaxed mb-4">
          Prezentačná stránka pre luxusné apartmánové ubytovanie s galériou, opisom priestorov a priamou rezerváciou.
        </p>
        <p className="text-slate-text text-xl font-body leading-relaxed mb-12">
          Showcase website for luxury apartment accommodation with gallery, room descriptions and direct booking.
        </p>

        {/* Live link */}
        <a
          href="https://grandapartman.sk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-6 py-3 rounded-xl hover:bg-aqua-electric transition-all duration-300 mb-16"
        >
          <ExternalLink size={16} />
          grandapartman.sk
        </a>

        {/* Placeholder */}
        <div className="border border-white/8 rounded-2xl p-12 text-center bg-navy-light">
          <p className="font-mono text-xs text-aqua uppercase tracking-widest mb-3">
            Prípadová štúdia / Case Study
          </p>
          <p className="font-display text-2xl font-bold text-slate-lightest mb-4">
            Podrobná prípadová štúdia čoskoro
          </p>
          <p className="text-slate-text font-body">
            Detailed case study coming soon · Detailed case study coming soon
          </p>
        </div>
      </div>
    </main>
  );
}
