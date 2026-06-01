'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('dunajmedia-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dunajmedia-cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('dunajmedia-cookie-consent', 'rejected');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          // Mobile: full-width bar pinned to bottom edge
          // Desktop (md+): floating card anchored bottom-right
          className="fixed bottom-0 inset-x-0 z-50 md:bottom-4 md:inset-x-auto md:right-4 md:w-full md:max-w-sm"
        >
          <div className="bg-navy-light border border-white/10 rounded-t-2xl md:rounded-2xl p-5 shadow-navy backdrop-blur-xl">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-aqua/10 border border-aqua/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Cookie size={16} className="text-aqua" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-slate-lightest text-sm mb-1">
                  Táto stránka používa cookies
                </p>
                <p className="text-slate-text text-xs font-body leading-relaxed">
                  Používame cookies na zlepšenie vášho zážitku. Viac informácií nájdete v našich{' '}
                  <Link href="/ochrana-udajov" className="text-aqua hover:underline">
                    Zásadách ochrany osobných údajov
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Buttons — stacked on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-4 sm:justify-end">
              <button
                onClick={handleReject}
                className="min-h-[44px] px-5 py-2.5 text-xs font-display font-semibold text-slate-text border border-white/10 rounded-lg hover:border-white/20 hover:text-slate-lightest transition-all duration-200"
              >
                Odmietnuť
              </button>
              <button
                onClick={handleAccept}
                className="min-h-[44px] px-5 py-2.5 text-xs font-display font-semibold bg-aqua text-navy rounded-lg hover:bg-aqua-electric transition-all duration-200"
              >
                Prijať všetky
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
