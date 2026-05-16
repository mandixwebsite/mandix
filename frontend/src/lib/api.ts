/**
 * Blog data loader — replaces Strapi API calls with local .md file reading.
 *
 * Uses Vite's import.meta.glob to statically import all markdown files at
 * build time. gray-matter parses the YAML frontmatter. The result is a typed
 * array of NormalizedPost objects — identical shape to before, so Blog.tsx
 * and BlogPost.tsx need minimal changes.
 *
 * HOW IT WORKS:
 *   1. At build time, Vite bundles every .md file in content/blogs/ as a raw string
 *   2. gray-matter splits each file into { data: frontmatter, content: body }
 *   3. We normalise into NormalizedPost — same shape as the old Strapi response
 *   4. Blog.tsx / BlogPost.tsx import these functions and use them synchronously
 */

import matter from 'gray-matter'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NormalizedPost {
  /** Filename without extension — used as URL slug: /blog/my-post-slug */
  slug: string
  title: string
  excerpt: string
  /** Raw markdown body (everything after the frontmatter) */
  content: string
  category: string
  author: string
  readTime: string
  featured: boolean
  /** Human-readable date string e.g. "16 May 2026" */
  date: string
  /** Absolute URL or path to cover image */
  img: string
}

// ---------------------------------------------------------------------------
// Raw markdown imports (Vite static glob — resolved at build time)
// ---------------------------------------------------------------------------

// Each value is the raw file string including frontmatter.
// The key is the file path relative to the project root.
const rawFiles = import.meta.glob<{ default: string }>(
  '../../content/blogs/*.md',
  { eager: true, query: '?raw', import: 'default' }
)

// ---------------------------------------------------------------------------
// Fallback image if no cover is specified in frontmatter
// ---------------------------------------------------------------------------

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=340&fit=crop&q=80'

// ---------------------------------------------------------------------------
// Parse a single raw file string into a NormalizedPost
// ---------------------------------------------------------------------------

function parsePost(filePath: string, rawContent: string): NormalizedPost {
  const { data, content } = matter(rawContent)

  // Derive slug from filename: "../content/blogs/my-post.md" → "my-post"
  const slug = filePath.replace(/^.*\//, '').replace(/\.md$/, '')

  // Format date from "2026-05-16" → "16 May 2026"
  const rawDate = data.date ?? ''
  let formattedDate = rawDate
  if (rawDate) {
    try {
      formattedDate = new Date(rawDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      formattedDate = rawDate
    }
  }

  return {
    slug,
    title: data.title ?? 'Untitled',
    excerpt: data.excerpt ?? '',
    content,
    category: data.category ?? 'General',
    author: data.author ?? 'Mandix Team',
    readTime: data.readTime ?? '5 min read',
    featured: data.featured ?? false,
    date: formattedDate,
    img: data.cover ?? FALLBACK_IMG,
  }
}

// ---------------------------------------------------------------------------
// Load and cache all posts (sorted newest-first)
// ---------------------------------------------------------------------------

let _cache: NormalizedPost[] | null = null

function loadAllPosts(): NormalizedPost[] {
  if (_cache) return _cache

  const posts = Object.entries(rawFiles).map(([filePath, rawContent]) =>
    parsePost(filePath, rawContent as unknown as string)
  )

  // Sort by date descending (newest first)
  posts.sort((a, b) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    return db - da
  })

  _cache = posts
  return _cache
}

// ---------------------------------------------------------------------------
// Public API — same function names as before for drop-in replacement
// ---------------------------------------------------------------------------

/**
 * Returns all blog posts sorted newest-first.
 * Synchronous — no loading state needed.
 */
export function fetchPosts(): NormalizedPost[] {
  return loadAllPosts()
}

/**
 * Returns a single post by slug, or null if not found.
 * Synchronous — no loading state needed.
 */
export function fetchPostBySlug(slug: string): NormalizedPost | null {
  return loadAllPosts().find((p) => p.slug === slug) ?? null
}
