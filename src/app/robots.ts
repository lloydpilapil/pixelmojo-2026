import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '*.json',
          '/blogs/design/',
          '/search',
        ],
        crawlDelay: 1, // Be nice to servers, wait 1 second between requests
      },
      {
        userAgent: 'GPTBot', // OpenAI's crawler
        allow: [
          '/',
          '/blog/',
          '/services/',
          '/projects/',
          '/about/',
          '/llms.txt',
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: [
          '/',
          '/blog/',
          '/services/',
          '/projects/',
          '/about/',
          '/llms.txt',
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Claude-Web', // Anthropic's crawler
        allow: [
          '/',
          '/blog/',
          '/services/',
          '/projects/',
          '/about/',
          '/llms.txt',
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'GoogleOther', // Google's AI crawlers
        allow: [
          '/',
          '/blog/',
          '/services/',
          '/projects/',
          '/about/',
          '/llms.txt',
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: [
          '/',
          '/blog/',
          '/services/',
          '/projects/',
          '/about/',
          '/llms.txt',
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: [
          'CCBot', // Common Crawl (used by many AI trainers)
          'anthropic-ai',
          'cohere-ai',
          'Omgilibot',
        ],
        allow: ['/llms.txt'], // Allow only llms.txt for training crawlers
        disallow: ['/'], // Disallow everything else
      },
    ],
    sitemap: 'https://www.pixelmojo.io/sitemap.xml',
    host: 'https://www.pixelmojo.io',
  }
}
