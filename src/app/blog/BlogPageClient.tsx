'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Tag, Send } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ContactForm from '@/components/ContactForm';

const categoryColors: Record<string, string> = {
  'SEO': 'text-green-400 bg-green-400/10 border-green-400/20',
  'Web Dizajn': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Web Design': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Social Media': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  'AI & Tech': 'text-aqua bg-aqua/10 border-aqua/20',
  'Growth': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
};

const gradients = [
  'from-aqua/20 to-navy',
  'from-aqua-electric/20 to-navy',
  'from-pink-500/20 to-navy',
  'from-amber-500/20 to-navy',
  'from-green-500/20 to-navy',
  'from-blue-500/20 to-navy',
];

interface Post {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export default function BlogPageClient() {
  const { t, tArray } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = tArray<string>('blog.categories');
  const allPosts = tArray<Post>('blog.posts');

  const filteredPosts = activeCategory === 0
    ? allPosts
    : allPosts.filter(p => {
        const cat = categories[activeCategory];
        return p.category === cat;
      });

  return (
    <>
      {/* Hero */}
      <section className="relative py-28 bg-navy overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aqua/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {t('blog.hero.label')}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
              {t('blog.hero.headline')}
            </h1>
            <p className="text-slate-text text-xl font-body leading-relaxed max-w-2xl mx-auto">
              {t('blog.hero.sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Posts */}
      <section className="py-16 bg-navy-light relative">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2 rounded-full text-sm font-body border transition-all duration-200 ${
                  activeCategory === i
                    ? 'bg-aqua text-navy border-aqua font-semibold'
                    : 'border-white/10 text-slate-text hover:border-aqua/30 hover:text-aqua'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Posts grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group rounded-2xl bg-navy border border-white/5 overflow-hidden hover:border-aqua/25 transition-all duration-300 card-hover flex flex-col"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  {/* Image placeholder */}
                  <div className={`h-44 bg-gradient-to-br ${gradients[i % gradients.length]} relative overflow-hidden`}>
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute bottom-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border ${categoryColors[post.category] || 'text-slate-text bg-white/5 border-white/10'}`}>
                        <Tag size={10} />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-slate-text font-mono mb-3">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-slate-lightest text-lg leading-snug mb-3 group-hover:text-aqua transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-text text-sm font-body leading-relaxed mb-5 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-aqua text-xs font-mono uppercase tracking-wider hover:gap-2.5 transition-all group/link"
                    >
                      {t('blog.readMore')}
                      <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(100, 255, 218, 0.06) 0%, transparent 70%)',
        }} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl font-bold text-slate-lightest mb-3">
              {t('blog.newsletter.headline')}
            </h2>
            <p className="text-slate-text font-body mb-8">{t('blog.newsletter.sub')}</p>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 text-aqua font-body"
              >
                ✓ {t('contact.form.success')}
              </motion.div>
            ) : (
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('blog.newsletter.placeholder')}
                  className="flex-1 bg-navy-light border border-white/10 text-slate-lightest placeholder-slate-text/50 rounded-xl px-5 py-3.5 text-sm font-body outline-none focus:border-aqua/40 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { if (email) setSubscribed(true); }}
                  className="flex items-center gap-2 bg-aqua text-navy font-display font-bold px-5 py-3.5 rounded-xl hover:bg-aqua-electric transition-all text-sm whitespace-nowrap"
                >
                  <Send size={14} />
                  {t('blog.newsletter.cta')}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
