'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface ServiceFAQProps {
  items: FAQItem[];
}

export default function ServiceFAQ({ items }: ServiceFAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-white/8 border border-white/8 rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className="bg-navy-light">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
          >
            <span className="font-display font-semibold text-slate-lightest text-base group-hover:text-aqua transition-colors duration-200">
              {item.q}
            </span>
            <ChevronDown
              size={18}
              className={`text-aqua flex-shrink-0 transition-transform duration-300 ${
                open === i ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-slate-text font-body text-sm leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
