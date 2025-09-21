import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = {
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
