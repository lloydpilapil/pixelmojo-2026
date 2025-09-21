import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://player.vimeo.com https://vimeo.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://player.vimeo.com; frame-src 'self' https://player.vimeo.com;",
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/services/ui-ux-design-solutions',
        destination: '/services/ai-product-development',
        permanent: true,
      },
      {
        source: '/services/brand-identity',
        destination: '/services/revenue-first-design',
        permanent: true,
      },
      {
        source: '/services/brand-activation-growth',
        destination: '/services/ai-powered-growth',
        permanent: true,
      },
      {
        source: '/services/web-app-design',
        destination: '/services/profit-optimized-interfaces',
        permanent: true,
      },
      {
        source: '/services/graphic-visuals',
        destination: '/services/conversion-assets',
        permanent: true,
      },
      {
        source: '/services/development-solutions',
        destination: '/services/full-stack-ai',
        permanent: true,
      },
    ]
  },
}

export default withContentlayer(nextConfig)
