import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

export async function getAllPosts() {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        "category": categories[0]->title,
        "readTime": round(length(pt::text(body)) / 5 / 180) + " min",
        body
      }
    `);
  } catch (error) {
    console.error('getAllPosts error:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        "category": categories[0]->title,
        "readTime": round(length(pt::text(body)) / 5 / 180) + " min",
        body
      }
    `, { slug });
  } catch (error) {
    console.error('getPostBySlug error:', error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    return await client.fetch(`
      *[_type == "category"] | order(title asc) {
        _id,
        title
      }
    `);
  } catch (error) {
    console.error('getAllCategories error:', error);
    return [];
  }
}

export async function getPostsByCategory(category: string) {
  try {
    return await client.fetch(`
      *[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        "category": categories[0]->title,
        "readTime": round(length(pt::text(body)) / 5 / 180) + " min"
      }
    `, { category });
  } catch (error) {
    console.error('getPostsByCategory error:', error);
    return [];
  }
}