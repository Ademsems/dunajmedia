import React from 'react';
import { getPostBySlug, getAllPosts, urlFor } from '@/lib/sanity';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    if (!posts || posts.length === 0) return [];
    return posts.map((post: { slug: { current: string } }) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error('generateStaticParams error:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    return {
      title: post?.title ? `${post.title} | Dunajmedia Blog` : 'Blog | Dunajmedia',
      description: post?.excerpt || '',
    };
  } catch {
    return { title: 'Blog | Dunajmedia' };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const portableTextComponents: Record<string, any> = {
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      React.createElement('h1', { className: 'font-display text-3xl font-bold text-slate-lightest mt-10 mb-4' }, children)
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      React.createElement('h2', { className: 'font-display text-2xl font-bold text-slate-lightest mt-8 mb-3' }, children)
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      React.createElement('h3', { className: 'font-display text-xl font-bold text-slate-lightest mt-6 mb-2' }, children)
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      React.createElement('p', { className: 'text-slate-text font-body leading-relaxed mb-5' }, children)
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      React.createElement('blockquote', { className: 'border-l-2 border-aqua pl-6 my-6 text-slate-light italic font-body' }, children)
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      React.createElement('strong', { className: 'text-slate-lightest font-semibold' }, children)
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      React.createElement('em', { className: 'text-slate-light italic' }, children)
    ),
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => {
      const href = value && value.href ? value.href : '#';
      return React.createElement(
        'a',
        { href: href, target: '_blank', rel: 'noopener noreferrer', className: 'text-aqua hover:underline' },
        children
      );
    },
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      React.createElement('ul', { className: 'list-none space-y-2 mb-5 text-slate-text font-body' }, children)
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      React.createElement('ol', { className: 'list-decimal list-inside space-y-2 mb-5 text-slate-text font-body' }, children)
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      React.createElement('li', { className: 'flex items-start gap-2' },
        React.createElement('span', { className: 'text-aqua mt-2 flex-shrink-0' }, '\u2014'),
        React.createElement('span', null, children)
      )
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  let post = null;

  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-text font-body text-lg mb-4">Post not found.</p>
          <Link href="/blog" className="text-aqua hover:underline font-body text-sm">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('sk-SK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <article className="bg-navy min-h-screen">
      <div className="relative">
        {post.mainImage ? (
          <div className="relative h-[50vh] min-h-[400px] w-full">
            <Image
              src={urlFor(post.mainImage).width(1400).height(700).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/50 to-navy" />
          </div>
        ) : (
          <div className="h-48 bg-navy-light relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy" />
          </div>
        )}

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-0 z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-text hover:text-aqua text-sm font-body transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            {post.category ? post.category : 'Blog'}
          </Link>

          {post.category && (
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {post.category}
            </span>
          )}

          <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-5 text-slate-text text-sm font-mono pb-10 border-b border-white/5">
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formattedDate}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {post.excerpt && (
          <p className="text-slate-light text-xl font-body leading-relaxed mb-10 pb-10 border-b border-white/5 italic">
            {post.excerpt}
          </p>
        )}

        {post.body && (
          <div className="prose-dunaj">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}

        <div className="mt-16 pt-10 border-t border-white/5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-aqua font-display font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            Spat na blog
          </Link>
        </div>
      </div>
    </article>
  );
}
