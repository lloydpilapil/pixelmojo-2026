
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

export function injectHeadingIds(content: string): string {
  return content.replace(/^(#{2,6})\s+(.+)$/gm, (match, hashes, text) => {
    const id = generateSlug(text.trim())
    return `${hashes} ${text.trim()} {#${id}}`
  })
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Blog post metadata interface
export interface BlogPostMeta {
  title: string
  description?: string
  date: string
  tags?: string[]
  author: {
    name: string
    bio: string
    avatar?: string
    title: string
    company?: string
    socialLinks?: {
      linkedin?: string
      twitter?: string
      github?: string
      website?: string
    }
    expertise?: string[]
  }
  faqs?: Array<{
    id: string
    question: string
    answer: string
  }>
  readingTime?: number
}