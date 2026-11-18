'use client';

import { createContext, useCallback, useContext, useRef, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type ToastKind = 'success' | 'error';
interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

type ToastFn = (message: string, kind?: ToastKind) => void;

const ToastContext = createContext<ToastFn | null>(null);

const DURATION_MS = 3800;
const MAX_VISIBLE = 3;

export function ToastProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback<ToastFn>(
    (message, kind = 'success') => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, message, kind }].slice(-MAX_VISIBLE));
      setTimeout(() => dismiss(id), DURATION_MS);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        role="region"
        aria-label={t('toast.region')}
        aria-live="polite"
        className="fixed z-[9300] bottom-5 sm:bottom-6 inset-x-4 flex flex-col items-center gap-2 pointer-events-none"
      >
        <AnimatePresence initial={false}>
          {toasts.map(({ id, message, kind }) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              className="pointer-events-auto flex items-center gap-3 w-full sm:w-auto sm:max-w-sm pl-3.5 pr-2 py-2.5 rounded-xl border border-white/10 bg-[#0B1626]/85 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
            >
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center border ${
                  kind === 'success'
                    ? 'bg-aqua/10 border-aqua/30 text-aqua'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {kind === 'success' ? <Check size={13} /> : <AlertCircle size={13} />}
              </span>
              <p className="flex-1 text-sm font-body text-slate-lightest leading-snug">{message}</p>
              <button
                type="button"
                onClick={() => dismiss(id)}
                aria-label={t('toast.dismiss')}
                className="flex-shrink-0 p-1.5 rounded-md text-slate-text hover:text-slate-lightest hover:bg-white/5 transition-colors"
              >
                <X size={13} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastFn {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
