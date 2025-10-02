export default function StructuredData() {
  const organizationAddress = {
    '@type': 'PostalAddress',
    streetAddress: '111 Paseo de Roxas, Legazpi Village',
    addressLocality: 'Makati',
    addressRegion: 'Metro Manila',
    postalCode: '1229',
    addressCountry: 'PH',
  }

  const organizationAreaServed = [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Philippines' },
    { '@type': 'Country', name: 'Singapore' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
  ]

  const organizationGeo = {
    '@type': 'GeoCoordinates',
    latitude: 14.55443,
    longitude: 121.01935,
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.pixelmojo.io/#organization',
        name: 'Pixelmojo',
        alternateName: 'Pixelmojo AI Product Studio',
        url: 'https://www.pixelmojo.io',
        logo: 'https://www.pixelmojo.io/pixelmojo-icon.svg',
        image: 'https://www.pixelmojo.io/og-image.webp',
        description:
          'AI-native product studio that builds complete ecosystems generating immediate revenue. From idea to profitable product in 90 days. Real results, not promises.',
        slogan: 'Ship Revenue in 90 Days',
        foundingDate: '2024',
        address: organizationAddress,
        location: {
          '@type': 'Place',
          name: 'Pixelmojo Studio',
          address: organizationAddress,
          geo: organizationGeo,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+63-917-165-8601',
          contactType: 'sales',
          email: 'founders@pixelmojo.io',
          availableLanguage: ['English', 'Filipino'],
        },
        areaServed: organizationAreaServed,
        sameAs: [
          'https://www.linkedin.com/company/pixelmojo',
          'https://www.behance.net/pixelmojo',
          'https://dribbble.com/lloydpixelmojo',
          'https://github.com/pixelmojo',
        ],
        knowsAbout: [
          'AI Product Development',
          'Machine Learning Integration',
          'Revenue-Driven Design',
          'Growth Engineering',
          'Enterprise SaaS',
          'Product Strategy',
          'UI/UX Design',
          'Full-Stack Development',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.pixelmojo.io/#website',
        url: 'https://www.pixelmojo.io',
        name: 'Pixelmojo | AI Product Studio',
        description: 'AI-native product studio that ships revenue in 90 days',
        publisher: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate:
              'https://www.pixelmojo.io/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://www.pixelmojo.io/#founder',
        name: 'Lloyd Pilapil',
        jobTitle: 'Founder & AI Product Architect',
        url: 'https://www.pixelmojo.io',
        worksFor: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
        alumniOf: {
          '@type': 'Organization',
          name: 'Salesforce',
        },
        knowsAbout: [
          'AI Product Development',
          'UI/UX Design',
          'Growth Marketing',
          'SaaS Architecture',
          'Machine Learning',
          'Product Strategy',
        ],
        sameAs: [
          'https://www.linkedin.com/in/lloydpixelmojo',
          'https://twitter.com/lloydpixelmojo',
          'https://github.com/lloydpixelmojo',
        ],
      },
      {
        '@type': 'Service',
        '@id':
          'https://www.pixelmojo.io/services/ai-product-development/#service',
        serviceType: 'AI Product Development',
        name: 'AI Product Development',
        description:
          'Ship AI products in 90 days. Production-ready MVPs that validate with real users and generate early revenue.',
        provider: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
        areaServed: organizationAreaServed,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI Product Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'MVP Development',
                description: '90-day MVP delivery with revenue validation',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'LLM Integration',
                description: 'Claude, GPT-4, and custom model integration',
              },
            },
          ],
        },
      },
      {
        '@type': 'Service',
        '@id':
          'https://www.pixelmojo.io/services/revenue-first-design/#service',
        serviceType: 'Revenue-First Design Systems',
        name: 'Revenue-First Design Systems',
        description:
          'Design systems built to convert, not just look pretty. Every component optimized for activation, retention, and expansion.',
        provider: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://www.pixelmojo.io/services/ai-powered-growth/#service',
        serviceType: 'AI-Powered Growth Engines',
        name: 'AI-Powered Growth Engines',
        description:
          'Automate growth that drives real pipeline. From lead scoring to lifecycle campaigns that convert.',
        provider: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://www.pixelmojo.io/services/full-stack-ai/#service',
        serviceType: 'Full-Stack AI Implementation',
        name: 'Full-Stack AI Implementation',
        description:
          'Production AI that generates ROI in weeks. Complete ecosystems from infrastructure to interface.',
        provider: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
      },
      {
        '@type': 'CreativeWork',
        '@id': 'https://www.pixelmojo.io/projects/mojo-ai/#project',
        name: 'Mojo AI',
        description:
          'Transform single templates into hundreds of on-brand ad variations in minutes. AI-powered content generation meets intelligent design analysis.',
        creator: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
        dateCreated: '2025',
        keywords: [
          'Figma Plugin',
          'AI Design',
          'Creative Automation',
          'GPT-5 Integration',
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id':
          'https://www.pixelmojo.io/projects/seo-intelligence-platform/#project',
        name: 'SEO Intelligence Platform',
        description:
          'Built with Google Search Console MCP to create an autonomous SEO optimization system that drove 3x organic traffic growth.',
        creator: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
        dateCreated: '2025',
        keywords: [
          'MCP Protocol',
          'SEO Automation',
          'Claude AI',
          'Marketing Tech',
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id':
          'https://www.pixelmojo.io/projects/logistics-track-trace-system/#project',
        name: 'Logistics Track & Trace System',
        description:
          'Enterprise logistics platform that unified fragmented operations into a real-time tracking system, cutting ops workload by 70%.',
        creator: {
          '@id': 'https://www.pixelmojo.io/#organization',
        },
        dateCreated: '2025',
        keywords: [
          'Enterprise SaaS',
          'Real-time Tracking',
          'WebSockets',
          'PostgreSQL',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.pixelmojo.io/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What makes Pixelmojo different from traditional agencies?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "We're an AI-native product studio, not an agency. We ship complete products that generate revenue in 90 days, not just designs or strategies. Our AI-powered approach delivers 3x faster than traditional methods.",
            },
          },
          {
            '@type': 'Question',
            name: 'How quickly can you deliver a working product?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We deliver production-ready MVPs in 90 days that validate with real users and generate early revenue. Our AI-native methodology eliminates traditional bottlenecks.',
            },
          },
          {
            '@type': 'Question',
            name: 'What technologies do you specialize in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We specialize in AI/ML integration (Claude, GPT-4, custom models), modern web frameworks (React, Next.js, TypeScript), and scalable architectures (PostgreSQL, Redis, WebSockets).',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.pixelmojo.io/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.pixelmojo.io',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://www.pixelmojo.io/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Projects',
            item: 'https://www.pixelmojo.io/projects',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Blogs',
            item: 'https://www.pixelmojo.io/blogs',
          },
        ],
      },
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
