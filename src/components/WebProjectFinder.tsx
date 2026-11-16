'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/Toaster';
import KineticHeading from '@/components/KineticHeading';
import { CONTACT_FORM_ID, CONTACT_PREFILL_EVENT, ContactPrefillDetail } from '@/lib/contactPrefill';

type TierId = 'expres' | 'business' | 'elite';

interface FinderOption {
  id: string;
  label: string;
}
interface FinderQuestion {
  id: string;
  short: string;
  title: string;
  options: FinderOption[];
}
interface PricingTier {
  id: string;
  name: string;
  price: string;
  currency: string;
}

/** Points per answer: [Expres Start, Business Pro, Agency Elite]. */
const SCORES: Record<string, Record<string, [number, number, number]>> = {
  business: { solo: [2, 1, 0], local: [1, 2, 0], company: [0, 2, 1], complex: [0, 0, 3] },
  status: { none: [2, 1, 0], outdated: [0, 2, 1], noresults: [0, 2, 1], complex: [0, 0, 3] },
  goal: { presence: [2, 1, 0], leads: [1, 2, 0], seo: [0, 2, 1], scale: [0, 0, 3] },
  size: { one: [3, 0, 0], multi: [0, 3, 0], large: [0, 0, 4] },
  timeline: { asap: [2, 1, 0], week: [1, 2, 0], flexible: [0, 1, 2] },
};

const TIER_ORDER: TierId[] = ['expres', 'business', 'elite'];

export function recommendTier(answers: Record<string, string>): TierId {
  const totals: [number, number, number] = [0, 0, 0];
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const points = SCORES[questionId]?.[optionId];
    if (points) points.forEach((value, i) => (totals[i] += value));
  });

  // Ties resolve toward Business Pro, then Expres Start.
  let winner: TierId = 'business';
  let best = totals[1];
  if (totals[0] > best) { winner = 'expres'; best = totals[0]; }
  if (totals[2] > best) { winner = 'elite'; }

  // Page count is a hard constraint of the packages themselves.
  if (answers.size === 'large') return 'elite';
  if (answers.size === 'multi' && winner === 'expres') return 'business';
  return winner;
}

const EASE_EXPO = [0.19, 1, 0.22, 1] as const;

/**
 * 30-second package quiz for /services/tvorba-web-stranok. Recommends one of
 * the three web packages and can pre-fill the page's ContactForm (via a
 * window CustomEvent) with the answers and the recommended tier.
 */
export default function WebProjectFinder() {
  const { t, tArray } = useLanguage();
  const toast = useToast();
  const questions = tArray<FinderQuestion>('finder.questions');
  const tiers = tArray<PricingTier>('pricing.tiers');

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = questions.length;
  const finished = total > 0 && step >= total;
  const question = questions[Math.min(step, total - 1)];

  const tierId = finished ? recommendTier(answers) : null;
  const tier = tierId ? tiers.find((item) => item.id === tierId) : undefined;

  const choose = (questionId: string, optionId: string) => {
    // Ignore clicks on a question that is already animating out.
    if (questions[step]?.id !== questionId) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setStep(step + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const answerLabel = (q: FinderQuestion) =>
    q.options.find((option) => option.id === answers[q.id])?.label ?? '';

  const prefill = () => {
    if (!tier) return;
    const lines = [
      t('finder.result.message_intro'),
      '',
      `${t('finder.result.message_recommended')}: ${tier.name} (${tier.currency}${tier.price})`,
      ...questions.map((q) => `• ${q.short}: ${answerLabel(q)}`),
      '',
      t('finder.result.message_outro'),
    ];
    const detail: ContactPrefillDetail = {
      // First entry of contact.form.services is always web design.
      service: tArray<string>('contact.form.services')[0] ?? '',
      message: lines.join('\n'),
    };
    window.dispatchEvent(new CustomEvent<ContactPrefillDetail>(CONTACT_PREFILL_EVENT, { detail }));
    document.getElementById(CONTACT_FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast(t('toast.prefilled'));
  };

  if (total === 0) return null;

  const progress = finished ? 1 : step / total;

  return (
    <section className="py-24 bg-navy-light relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(100,255,218,0.07) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
            <Sparkles size={12} />
            {t('finder.label')}
          </span>
          <KineticHeading
            accent={t('finder.accent')}
            className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest leading-tight mb-4"
          >
            {t('finder.headline')}
          </KineticHeading>
          <p className="text-slate-text text-lg font-body max-w-xl mx-auto">{t('finder.sub')}</p>
        </div>

        <div className="rounded-3xl border border-white/8 bg-navy/80 backdrop-blur-sm overflow-hidden">
          {/* Progress hairline */}
          <div className="h-px bg-white/8">
            <motion.div
              className="h-px bg-aqua origin-left shadow-[0_0_8px_rgba(100,255,218,0.8)]"
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
            />
          </div>

          {/* min-height keeps the card from jumping between steps */}
          <div className="p-6 sm:p-10 min-h-[430px] sm:min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
              {!finished ? (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: EASE_EXPO }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-mono text-xs text-aqua uppercase tracking-widest" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {t('finder.step')} {String(step + 1).padStart(2, '0')} {t('finder.of')} {String(total).padStart(2, '0')}
                    </p>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        className="group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-text hover:text-aqua transition-colors"
                      >
                        <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                        {t('finder.back')}
                      </button>
                    )}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-lightest mb-6 leading-snug">
                    {question.title}
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => {
                      const selected = answers[question.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => choose(question.id, option.id)}
                          aria-pressed={selected}
                          className={`btn-kinetic group flex items-center justify-between gap-3 text-left px-5 py-4 rounded-xl border font-body text-sm sm:text-base ${
                            selected
                              ? 'border-aqua/60 bg-aqua/10 text-slate-lightest shadow-aqua'
                              : 'border-white/10 bg-navy-light/60 text-slate-light hover:border-aqua/40 hover:bg-aqua/5 hover:text-slate-lightest'
                          }`}
                        >
                          <span>{option.label}</span>
                          <ArrowRight size={15} className="flex-shrink-0 text-aqua/60 group-hover:text-aqua group-hover:translate-x-1 transition-all duration-300" />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: EASE_EXPO }}
                  className="flex-1 flex flex-col"
                  aria-live="polite"
                >
                  <p className="font-mono text-xs text-aqua uppercase tracking-widest mb-3">
                    {t('finder.result.label')}
                  </p>
                  {tier && tierId && (
                    <>
                      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pb-6 mb-6 border-b border-white/8">
                        <div>
                          <p className="text-slate-text text-sm font-body mb-1">{t('finder.result.headline')}</p>
                          <h3 className="font-display text-3xl sm:text-4xl font-bold text-slate-lightest leading-none">
                            {tier.name}
                          </h3>
                        </div>
                        <p className="font-display font-bold text-4xl sm:text-5xl text-aqua leading-none text-glow">
                          {tier.currency}{tier.price}
                          <span className="ml-2 font-mono font-normal text-xs text-slate-text uppercase tracking-wider align-middle [text-shadow:none]">
                            {t('finder.result.one_time')}
                          </span>
                        </p>
                      </div>

                      <p className="text-slate-light font-body leading-relaxed mb-6">
                        {t(`finder.result.reasons.${tierId}`)}
                      </p>

                      <p className="font-mono text-[11px] text-slate-text uppercase tracking-widest mb-3">
                        {t('finder.result.answers')}
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
                        {questions.map((q) => (
                          <li key={q.id} className="text-sm font-body text-slate-text">
                            <span className="text-slate-light">{q.short}:</span> {answerLabel(q)}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-4">
                        <button
                          type="button"
                          onClick={prefill}
                          className="btn-kinetic group inline-flex items-center justify-center gap-2 bg-aqua text-navy font-display font-bold px-7 py-4 rounded-xl hover:bg-aqua-electric shadow-aqua"
                        >
                          {t('finder.result.cta')}
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                          type="button"
                          onClick={restart}
                          className="inline-flex items-center justify-center gap-2 text-sm font-body text-slate-text hover:text-aqua transition-colors"
                        >
                          <RotateCcw size={13} />
                          {t('finder.restart')}
                        </button>
                      </div>
                      <p className="text-slate-text/80 text-xs font-body mt-5">{t('finder.result.note')}</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
