'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/Toaster';

interface CopyButtonProps {
  value: string;
  kind: 'email' | 'phone';
  className?: string;
}

/** Small icon button: copies an email / phone number and confirms with a toast. */
export default function CopyButton({ value, kind, className = '' }: CopyButtonProps) {
  const { t } = useLanguage();
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast(t(kind === 'email' ? 'toast.copied_email' : 'toast.copied_phone'));
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast(t('toast.copy_failed'), 'error');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={t(kind === 'email' ? 'toast.copy_email' : 'toast.copy_phone')}
      title={t(kind === 'email' ? 'toast.copy_email' : 'toast.copy_phone')}
      className={`btn-kinetic inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-navy/70 text-slate-text hover:text-aqua hover:border-aqua/40 ${className}`}
    >
      {copied ? <Check size={13} className="text-aqua" /> : <Copy size={13} />}
    </button>
  );
}
