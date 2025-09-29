const FALLBACK_SITE_URL = 'https://www.pixelmojo.io'
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

const normalizedSiteUrl = (() => {
  if (!rawSiteUrl) {
    return FALLBACK_SITE_URL
  }

  try {
    const parsedUrl = new URL(rawSiteUrl)

    const isLocalHost = ['localhost', '127.0.0.1'].includes(parsedUrl.hostname)

    if (isLocalHost && process.env.NODE_ENV === 'production') {
      return FALLBACK_SITE_URL
    }

    return parsedUrl.origin
  } catch {
    return FALLBACK_SITE_URL
  }
})()

export function buildCanonicalUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, normalizedSiteUrl).toString()
}

export const SITE_URL = normalizedSiteUrl
