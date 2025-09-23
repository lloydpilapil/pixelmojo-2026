import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    // Enable modern formats (WebP/AVIF) for better compression
    formats: ['image/avif', 'image/webp'],

    // Define responsive breakpoints for your design
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Allow optimization of external images (if needed)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any HTTPS domain - adjust as needed
      },
    ],

    // Minimize layout shift
    minimumCacheTTL: 31536000, // 1 year cache for optimized images

    // Additional optimization options for Vercel Pro
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for better ISR performance
  experimental: {
    // Enable partial prerendering for even better performance
    ppr: false, // Enable when stable

    // Optimize static generation
    optimizeCss: true,

    // Better caching strategies
    staleTimes: {
      dynamic: 30, // 30 seconds for dynamic content
      static: 180, // 3 minutes for static content
    },
  },

  async headers() {
    return [
      // Security headers for all pages
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://player.vimeo.com https://vimeo.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://player.vimeo.com https://vitals.vercel-insights.com; frame-src 'self' https://player.vimeo.com;",
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
      // Aggressive caching for static assets
      {
        source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
          {
            key: 'X-Cache-Tags',
            value: 'static-assets',
          },
        ],
      },
      // Aggressive caching for images
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400', // 1 year with 1 day SWR
          },
          {
            key: 'X-Cache-Tags',
            value: 'images',
          },
        ],
      },
      // Medium caching for pages with dynamic content
      {
        source: '/blog/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400', // 1 hour with 1 day SWR
          },
          {
            key: 'X-Cache-Tags',
            value: 'blog-content',
          },
        ],
      },
      // Longer caching for static pages
      {
        source: '/(about|services|works)/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800', // 1 day with 1 week SWR
          },
          {
            key: 'X-Cache-Tags',
            value: 'static-pages',
          },
        ],
      },
      // Short caching for frequently updated pages
      {
        source: '/(contact-us|contact)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, stale-while-revalidate=3600', // 30 min with 1 hour SWR
          },
          {
            key: 'X-Cache-Tags',
            value: 'dynamic-pages',
          },
        ],
      },
      // API routes with short cache
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=600', // 5 min with 10 min SWR
          },
          {
            key: 'X-Cache-Tags',
            value: 'api-routes',
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
