'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Tag, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ContactForm from '@/components/ContactForm';
import { getAllPosts, getAllCategories, urlFor } from '@/lib/sanity';

const gradients = [
  'from-aqua/20 to-navy',
  'from-aqua-electric/20 to-navy',
  'from-pink-500/20 to-navy',
  'from-amber-500/20 to-navy',
  'from-green-500/20 to-navy',
  'from-blue-500/20 to-navy',
];

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mainImage?: object;
  category?: string;
  readTime?: string;
}

interface Category {
  _id: string;
  title: string;
}

export default function BlogPageClient() {
  const { t, locale } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedPosts, fetchedCategories] = await Promise.all([
          getAllPosts(),
          getAllCategories(),
        ]);
        setPosts(fetchedPosts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const allLabel = locale === 'sk' ? 'Všetko' : 'All';

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'sk' ? 'sk-SK' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              <motion.button
                onClick={() => setActiveCategory('all')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2 rounded-full text-sm font-body border transition-all duration-200 ${
                  activeCategory === 'all'
                    ? 'bg-aqua text-navy border-aqua font-semibold'
                    : 'border-white/10 text-slate-text hover:border-aqua/30 hover:text-aqua'
                }`}
              >
                {allLabel}
              </motion.button>
              {categories.map((cat) => (
                <motion.button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat.title)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-2 rounded-full text-sm font-body border transition-all duration-200 ${
                    activeCategory === cat.title
                      ? 'bg-aqua text-navy border-aqua font-semibold'
                      : 'border-white/10 text-slate-text hover:border-aqua/30 hover:text-aqua'
                  }`}
                >
                  {cat.title}
                </motion.button>
              ))}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="text-aqua animate-spin" />
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-slate-text font-body text-lg">
                {locale === 'sk' ? 'Žiadne články zatiaľ.' : 'No posts yet.'}
              </p>
              <p className="text-slate-text/60 font-body text-sm mt-2">
                {locale === 'sk'
                  ? 'Prvý článok čoskoro pribudne.'
                  : 'The first post is coming soon.'}
              </p>
            </div>
          )}

          {/* Posts grid */}
          {!loading && filteredPosts.length > 0 && (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, i) => (
                  <motion.article
                    key={post._id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group rounded-2xl bg-navy border border-white/5 overflow-hidden hover:border-aqua/25 transition-all duration-300 card-hover flex flex-col"
                    style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                  >
                    {/* Image */}
                    <div className={`h-44 relative overflow-hidden ${!post.mainImage ? `bg-gradient-to-br ${gradients[i % gradients.length]}` : ''}`}>
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(300).url()}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 grid-bg opacity-30" />
                      )}
                      {post.category && (
                        <div className="absolute bottom-4 left-4 z-10">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border text-aqua bg-aqua/10 border-aqua/20">
                            <Tag size={10} />
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-slate-text font-mono mb-3">
                        <span>{formatDate(post.publishedAt)}</span>
                        {post.readTime && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {post.readTime}
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="font-display font-bold text-slate-lightest text-lg leading-snug mb-3 group-hover:text-aqua transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-slate-text text-sm font-body leading-relaxed mb-5 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <Link
                        href={`/blog/${post.slug.current}`}
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
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(100, 255, 218, 0.06) 0%, transparent 70%)',
        }} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-slate-lightest mb-3">
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