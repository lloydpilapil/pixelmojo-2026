import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  trailingSlash: false, // Enforce no trailing slashes, redirect /page/ to /page
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
          // DNS Prefetch Control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // HSTS - Force HTTPS for 2 years
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Permissions Policy (formerly Feature-Policy)
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://player.vimeo.com https://vimeo.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://cdn.getkoala.com https://www.clarity.ms https://scripts.clarity.ms https://analytics.ahrefs.com https://static.hotjar.com https://script.hotjar.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com https://static.hotjar.com https://res-1.cdn.office.net data: blob:; connect-src 'self' https://player.vimeo.com https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://cdn.getkoala.com https://api.getkoala.com https://analytics.ahrefs.com https://static.hotjar.com https://script.hotjar.com https://www.clarity.ms https://scripts.clarity.ms https://j.clarity.ms; frame-src 'self' https://player.vimeo.com https://www.googletagmanager.com;",
          },
          // Cross-Origin Policies
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          // X-Frame-Options (defense in depth with CSP)
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
      // Trailing slash redirects
      {
        source: '/contact-us/',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/reviews/',
        destination: '/reviews',
        permanent: true,
      },
      // Old service URLs
      {
        source: '/services/ui-ux-design-solutions',
        destination: '/services/ai-product-development',
        permanent: true,
      },
      {
        source: '/services/ui-ux-design-solutions/',
        destination: '/services/ai-product-development',
        permanent: true,
      },
      {
        source: '/services/brand-identity',
        destination: '/services/revenue-first-design',
        permanent: true,
      },
      {
        source: '/services/brand-identity/',
        destination: '/services/revenue-first-design',
        permanent: true,
      },
      {
        source: '/services/brand-activation-growth',
        destination: '/services/ai-powered-growth',
        permanent: true,
      },
      {
        source: '/services/brand-activation-growth/',
        destination: '/services/ai-powered-growth',
        permanent: true,
      },
      {
        source: '/services/web-app-design',
        destination: '/services/profit-optimized-interfaces',
        permanent: true,
      },
      {
        source: '/services/web-mobile-app-design',
        destination: '/services/profit-optimized-interfaces',
        permanent: true,
      },
      {
        source: '/services/web-mobile-app-design/',
        destination: '/services/profit-optimized-interfaces',
        permanent: true,
      },
      {
        source: '/services/graphic-visuals',
        destination: '/services/conversion-assets',
        permanent: true,
      },
      {
        source: '/services/graphic-visual-design',
        destination: '/services/conversion-assets',
        permanent: true,
      },
      {
        source: '/services/graphic-visual-design/',
        destination: '/services/conversion-assets',
        permanent: true,
      },
      {
        source: '/services/development-solutions',
        destination: '/services/full-stack-ai',
        permanent: true,
      },
      {
        source: '/services/development-solutions/',
        destination: '/services/full-stack-ai',
        permanent: true,
      },
      {
        source: '/services/digital-marketing-servies',
        destination: '/services/ai-powered-growth',
        permanent: true,
      },
      {
        source: '/services/digital-marketing-servies/',
        destination: '/services/ai-powered-growth',
        permanent: true,
      },
      {
        source: '/services/revenue-first-design/',
        destination: '/services/revenue-first-design',
        permanent: true,
      },
      {
        source: '/services/full-stack-ai/',
        destination: '/services/full-stack-ai',
        permanent: true,
      },
      {
        source: '/works',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/works/',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/projects/',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/blogs/:path*',
        permanent: true,
      },
      // Project trailing slash redirects
      {
        source: '/projects/logistics-track-trace-system/',
        destination: '/projects/logistics-track-trace-system',
        permanent: true,
      },
      {
        source: '/projects/mojo-ai/',
        destination: '/projects/mojo-ai',
        permanent: true,
      },
      {
        source: '/projects/seo-intelligence-platform/',
        destination: '/projects/seo-intelligence-platform',
        permanent: true,
      },
      {
        source: '/projects/real-estate-earnings-tracker/',
        destination: '/projects/real-estate-earnings-tracker',
        permanent: true,
      },
      // Blog post redirects - old URLs to home or new URLs
      {
        source:
          '/blog/understanding-generation-alpha-characteristics-trends-and-their-impact-on-the-future',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blog/consumer-behavior-in-marketing-strategies-factors-technology-role-and-research-methods',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blog/the-definitive-guide-to-growth-marketing-in-the-age-of-ai-strategies-frameworks-and-real-world-dominance',
        destination:
          '/blogs/the-definitive-guide-to-growth-marketing-in-the-age-of-ai-strategies-frameworks-and-real-world-dominance',
        permanent: true,
      },
      {
        source: '/blogs/project',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/blogs/domain-rebrand',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/the-strategic-importance',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/the-ultimate-guide-to-digital-marketing-strategies-for-succe',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/consumer-behavior-in-marketing-strategies-factors-technologys-role-and-research-methods',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/ui-ux-design-secrets-that-will-double-your-e-commerce-sales-in-2025',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/the-importance-of-ui-ux-in-visual-design-for-digital-products----and-how-it-benefits-businesses',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/best-digital-marketing-tools-for-small-businesses-on-a-budget',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/why-merging-ui-ux-seo-and-content-marketing-is-key-to-digital-brandings-future',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/what-is-vibe-coding-and-why-its-changing-how-we-build-software',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/the-symbiotic-relationship-between-ui-and-ux-beyond-surface-level-design',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/the-psychology-behind-consumer-behavior-understanding-the-minds-of-todays-buyers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blogs/the-evolution-of-digital-design-where-ux-and-ui-meet',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/integrating-ui-ux-branding-and-content-marketing-the-blueprint-for-digital-product-success',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/growth-marketing-the-ultimate-framework-for-scalable-business-expansion',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/designing-for-the-future-with-ai-a-guide-to-next-gen-innovation',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/the-ultimate-guide-to-user-centered-design-principles-benefits-and-best-practices',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/generation-alpha-the-digital-pioneers-shaping-the-future',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/funnel-vs-flywheel-which-growth-model-actually-delivers-long-term-roi',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blogs/stop-selling-services-start-delivering-results',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/we-design-for-impact-we-build-for-roi-so-why-are-you-still-settling-for-pretty-but-pointless',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/we-design-for-impact-we-build-for-roi-so-why-are-you-still-settling-for-pretty-but-pointless/',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/growth-marketing-vs-traditional-marketing-the-complete-guide',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/growth-marketing-vs-traditional-marketing-the-complete-guide/',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/the-best-branding-agency-for-startups-a-guide-to-building-your-brand-from-scratch',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/creative-agencies-in-the-philippines-why-this-country-is-now-a-hub-for-global-brands',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/why-llm-and-geo-visibility-are-the-new-frontiers-of-branding-not-just-seo',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/why-llm-and-geo-visibility-are-the-new-frontiers-of-branding-not-just-seo/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blogs/growth-marketing-seo-the-dream-team',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blogs/growth-marketing-seo-the-dream-team/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blogs/elevate-b2b-saas',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/the-definitive-guide-to-growth-marketing-in-the-age-of-ai-strategies-frameworks-and-real-world-dominance/',
        destination:
          '/blogs/the-definitive-guide-to-growth-marketing-in-the-age-of-ai-strategies-frameworks-and-real-world-dominance',
        permanent: true,
      },
      // Missing blog posts - redirect to blogs homepage
      {
        source:
          '/blogs/real-estate-digital-transformation-lessons-from-global-leaders',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/the-ultimate-guide-to-choosing-the-best-digital-marketing-and-advertising-company-for-your-business',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/the-strategic-edge-of-outstanding-ui-ux-design',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/the-ultimate-guide-to-web-portal-development-building-solutions-that-work',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/targeted-marketing-grow-your-brand',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/ux-design-shop-a-user-centric-approach-to-elevating-your-brand-and-conversions',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/the-ultimate-guide-to-user-personas-a-comprehensive-blueprint',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/the-marketing-glossary-that-finally-speaks-human----and-why-youll-actually-use-it',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/why-your-next-digital-partner-should-have-fortune-500-experience',
        destination: '/blogs',
        permanent: true,
      },
      {
        source:
          '/blogs/content-creation-and-user-engagement-the-ultimate-guide-for-2025',
        destination: '/blogs',
        permanent: true,
      },
      // Additional 404 blog posts - redirect to home
      {
        source:
          '/blogs/the-power-of-ai-in-brand-marketing-smarter-strategies-for-b2b-growth',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blogs/strategy-is-the-philosophy-of-becoming',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/5-powerful-branding-solutions-for-startups-to-stand-out-in-the-market',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/blogs/the-ultimate-guide-to-digital-marketing-services-boosting-your-online-presence',
        destination: '/',
        permanent: true,
      },
      // Old works/projects
      {
        source: '/works/cigna',
        destination: '/projects',
        permanent: true,
      },
      // Old service pages
      {
        source: '/services/creative-contents',
        destination: '/services',
        permanent: true,
      },
      // Invalid URLs
      {
        source: '/&',
        destination: '/',
        permanent: true,
      },
      {
        source: '/$',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

// Wrap with Sentry first, then Contentlayer
export default withSentryConfig(withContentlayer(nextConfig), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'pixelmojo',
  project: 'pixelmojo-site',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})
