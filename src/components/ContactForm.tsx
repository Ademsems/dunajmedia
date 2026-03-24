'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, User, Mail, Building2, MessageSquare, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
};

export default function ContactForm() {
  const { t, tArray } = useLanguage();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const services = tArray<string>('contact.form.services');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('success');
        setForm(initialState);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputBase =
    'w-full bg-navy/60 border text-slate-lightest placeholder-slate-text/50 rounded-lg px-4 py-3 text-sm font-body outline-none transition-all duration-200 focus:border-aqua/60 focus:bg-navy/80 focus:shadow-[0_0_0_3px_rgba(100,255,218,0.1)]';

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aqua/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('contact.hero.label')}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest leading-tight mb-6">
              {t('contact.form.headline')}
            </h2>
            <p className="text-slate-text text-lg font-body leading-relaxed mb-10">
              {t('contact.hero.sub')}
            </p>

            <div className="space-y-4">
              {[
                { label: t('contact.info.email'), value: 'info@dunajmedia.sk', href: 'mailto:info@dunajmedia.sk' },
                { label: t('contact.info.phone'), value: '+421 952 049 119', href: 'tel:+421952049119' },
              ].map(({ label, value, href }) => (
                <motion.a
                  key={value}
                  href={href}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-navy-light/60 hover:border-aqua/30 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-aqua/10 border border-aqua/20 flex items-center justify-center group-hover:bg-aqua/20 transition-colors">
                    <Mail size={16} className="text-aqua" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-text font-mono uppercase tracking-wider">{label}</p>
                    <p className="text-slate-lightest font-body text-sm mt-0.5">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl border border-aqua/10 bg-gradient-to-br from-aqua/5 to-aqua-electric/5">
              <p className="text-slate-text text-sm font-body leading-relaxed">
                <span className="text-aqua font-semibold">💡 </span>
                {t('contact.info.hours')} — {t('nav.contact')}
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-navy-light rounded-2xl border border-white/5 p-8"
          >
            <div className="space-y-5">

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-text uppercase tracking-wider mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/60 pointer-events-none" />
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder={t('contact.form.name')}
                      className={`${inputBase} pl-9 ${focused === 'name' ? 'border-aqua/60' : 'border-white/8'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-text uppercase tracking-wider mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/60 pointer-events-none" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder={t('contact.form.email')}
                      className={`${inputBase} pl-9 ${focused === 'email' ? 'border-aqua/60' : 'border-white/8'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-mono text-slate-text uppercase tracking-wider mb-2">
                  {t('contact.form.company')}
                </label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/60 pointer-events-none" />
                  <input
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    onFocus={() => setFocused('company')}
                    onBlur={() => setFocused(null)}
                    placeholder={t('contact.form.company')}
                    className={`${inputBase} pl-9 ${focused === 'company' ? 'border-aqua/60' : 'border-white/8'}`}
                  />
                </div>
              </div>

              {/* Service select */}
              <div>
                <label className="block text-xs font-mono text-slate-text uppercase tracking-wider mb-2">
                  {t('contact.form.service')}
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onFocus={() => setFocused('service')}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} appearance-none pr-10 ${focused === 'service' ? 'border-aqua/60' : 'border-white/8'}`}
                  >
                    <option value="">{t('contact.form.service')}</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-text/60 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-text uppercase tracking-wider mb-2">
                  {t('contact.form.message')} *
                </label>
                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3 top-3.5 text-slate-text/60 pointer-events-none" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    placeholder={t('contact.form.message')}
                    className={`${inputBase} pl-9 resize-none ${focused === 'message' ? 'border-aqua/60' : 'border-white/8'}`}
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2 bg-aqua text-navy font-display font-bold text-sm py-4 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full"
                    />
                    {t('common.loading')}
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    {t('contact.form.submit')}
                  </>
                )}
              </motion.button>

              {/* Status messages */}
              <AnimatePresence>
                {(status === 'success' || status === 'error') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-3 p-4 rounded-lg text-sm font-body ${
                      status === 'success'
                        ? 'bg-aqua/10 border border-aqua/30 text-aqua'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {status === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    {status === 'success' ? t('contact.form.success') : t('contact.form.error')}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
