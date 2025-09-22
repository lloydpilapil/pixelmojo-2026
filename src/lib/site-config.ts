const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

const normalizedSiteUrl = rawSiteUrl
  ? rawSiteUrl.replace(/\/$/, '')
  : 'http://localhost:3000'

export function buildCanonicalUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, normalizedSiteUrl).toString()
}

export const SITE_URL = normalizedSiteUrl
