'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Section {
  title: string;
  content: string;
  list?: string[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  sections: Section[];
}

export default function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  return (
    <section className="py-20 bg-navy relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-text hover:text-aqua text-sm font-body transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Späť na hlavnú stránku
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
            Právne informácie
          </span>
          <h1 className="font-display text-4xl font-bold text-slate-lightest mb-3">
            {title}
          </h1>
          <p className="text-slate-text text-sm font-mono">
            Posledná aktualizácia: {lastUpdated}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="p-6 rounded-2xl bg-navy-light border border-white/5"
            >
              <h2 className="font-display font-bold text-slate-lightest text-lg mb-3">
                {section.title}
              </h2>
              <p className="text-slate-text font-body text-sm leading-relaxed">
                {section.content}
              </p>
              {section.list && (
                <ul className="mt-3 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-text text-sm font-body">
                      <span className="text-aqua mt-1.5 flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl border border-aqua/15 bg-aqua/5 text-center"
        >
          <p className="text-slate-text text-sm font-body">
            Otázky ohľadom ochrany údajov:{' '}
            <a href="mailto:info@dunajmedia.sk" className="text-aqua hover:underline">
              info@dunajmedia.sk
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
