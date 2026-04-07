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
      // Small delay so it doesn't flash immediately on load
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
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
        >
          <div className="bg-navy-light border border-white/10 rounded-2xl p-5 shadow-navy backdrop-blur-xl">
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

            {/* Buttons */}
            <div className="flex items-center gap-3 mt-4 justify-end">
              <button
                onClick={handleReject}
                className="px-5 py-2 text-xs font-display font-semibold text-slate-text border border-white/10 rounded-lg hover:border-white/20 hover:text-slate-lightest transition-all duration-200"
              >
                Odmietnuť
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 text-xs font-display font-semibold bg-aqua text-navy rounded-lg hover:bg-aqua-electric transition-all duration-200"
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
