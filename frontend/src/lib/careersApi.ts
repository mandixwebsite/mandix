import fm from 'front-matter'

export interface NormalizedJob {
  slug: string
  title: string
  department: string
  location: string
  type: string
  desc: string
  requirements: string[]
}

// Statically import all markdown files at build time
const rawFiles = import.meta.glob<{ default: string }>(
  '../../content/careers/*.md',
  { eager: true, query: '?raw', import: 'default' }
)

function parseJob(filePath: string, rawContent: string): NormalizedJob {
  const parsed = fm<any>(rawContent)
  const data = parsed.attributes

  // Derive slug from filename
  const slug = filePath.replace(/^.*\//, '').replace(/\.md$/, '')

  return {
    slug,
    title: data.title ?? 'Untitled Job',
    department: data.department ?? 'General',
    location: data.location ?? 'Remote',
    type: data.type ?? 'Full-time',
    desc: data.desc ?? '',
    requirements: Array.isArray(data.requirements) ? data.requirements : [],
  }
}

export function fetchJobs(): NormalizedJob[] {
  const jobs: NormalizedJob[] = []
  for (const [path, rawContent] of Object.entries(rawFiles)) {
    jobs.push(parseJob(path, rawContent as unknown as string))
  }
  return jobs
}

