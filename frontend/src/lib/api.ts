const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:1337'

export interface StrapiPost {
  id: number
  attributes: {
    title: string
    slug: string
    excerpt: string
    content: string
    category: 'Strategy' | 'Technology' | 'Finance' | 'Tax'
    author: string
    readTime: string
    featured: boolean
    publishedAt: string
    coverImage: {
      data: {
        attributes: {
          url: string
          formats: {
            medium?: { url: string }
            small?: { url: string }
          }
        }
      } | null
    }
  }
}

export interface NormalizedPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  readTime: string
  featured: boolean
  date: string
  img: string
}

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=340&fit=crop&q=80'

export function normalizePost(item: StrapiPost): NormalizedPost {
  const a = item.attributes
  const imgData = a.coverImage?.data?.attributes
  const img = imgData
    ? `${CMS_URL}${imgData.formats?.medium?.url ?? imgData.formats?.small?.url ?? imgData.url}`
    : FALLBACK_IMG

  return {
    id: item.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    category: a.category,
    author: a.author,
    readTime: a.readTime ?? '5 min read',
    featured: a.featured ?? false,
    date: new Date(a.publishedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    img,
  }
}

export async function fetchPosts(): Promise<NormalizedPost[]> {
  const res = await fetch(
    `${CMS_URL}/api/blog-posts?populate=coverImage&sort=publishedAt:desc&pagination[pageSize]=50`,
  )
  if (!res.ok) throw new Error('Failed to fetch blog posts')
  const json = await res.json()
  return (json.data as StrapiPost[]).map(normalizePost)
}

export async function fetchPostBySlug(slug: string): Promise<NormalizedPost | null> {
  const res = await fetch(
    `${CMS_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=coverImage`,
  )
  if (!res.ok) throw new Error('Failed to fetch blog post')
  const json = await res.json()
  if (!json.data || json.data.length === 0) return null
  return normalizePost(json.data[0] as StrapiPost)
}
