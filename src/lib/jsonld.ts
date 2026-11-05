export const SITE_URL = 'https://dunajmedia.sk';

const organization = { '@type': 'Organization', name: 'Dunajmedia', url: SITE_URL };

export interface FaqItem {
  question?: string | null;
  answer?: string | null;
}

interface BlogPostingInput {
  title: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  imageUrl?: string | null;
  url: string;
}

export function blogPostingJsonLd({ title, excerpt, publishedAt, updatedAt, imageUrl, url }: BlogPostingInput) {
  // Editors can backdate publishedAt past the last edit; dateModified must never precede datePublished.
  const dateModified =
    updatedAt && publishedAt && new Date(updatedAt) < new Date(publishedAt) ? publishedAt : updatedAt;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt?.trim() || undefined,
    image: imageUrl || undefined,
    datePublished: publishedAt || undefined,
    dateModified: dateModified || undefined,
    inLanguage: 'sk-SK',
    author: organization,
    publisher: organization,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function faqPageJsonLd(items: FaqItem[] | null | undefined) {
  const valid = (items ?? []).filter(
    (item): item is { question: string; answer: string } => !!item?.question?.trim() && !!item?.answer?.trim()
  );
  if (!valid.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.question.trim(),
      acceptedAnswer: { '@type': 'Answer', text: item.answer.trim() },
    })),
  };
}
