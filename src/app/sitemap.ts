import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

export const revalidate = 3600; // refresh sitemap every hour

const BASE_URL = 'https://dunajmedia.sk';

const staticPages: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}`,                                           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE_URL}/about`,                                     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/services`,                                  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/tvorba-web-stranok`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/seo-optimalizacia`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/sprava-socialnych-sieti`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/how-we-work`,                               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/work`,                                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/pricing`,                                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/blog`,                                      lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  { url: `${BASE_URL}/contact`,                                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPosts: MetadataRoute.Sitemap = [];

  try {
    const posts = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
        "slug": slug.current,
        _updatedAt
      }`
    );

    blogPosts = posts.map(({ slug, _updatedAt }) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(_updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('sitemap: failed to fetch blog posts from Sanity', error);
  }

  return [...staticPages, ...blogPosts];
}
