import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import ServiceNavigation from '@/components/ServiceNavigation'
import { LinkButton } from '@/components/ui/button'
import {
  ServiceCardGrid,
  ServiceHero,
  ServiceSplitSection,
  ServiceStatList,
  ServiceTimeline,
} from '@/components/services/ServiceSections'
import PricingTiers from '@/components/services/PricingTiers'
import { getServiceTheme } from '@/utils/serviceThemes'

const service = {
  title: 'Conversion Asset Systems',
  description:
    'Landing pages and marketing assets designed to convert visitors into customers.',
  pricing: 'Projects from $1,995',
}

export const metadata: Metadata = {
  title: 'Conversion Asset Systems | Visuals That Close Deals | Pixelmojo',
  description:
    'Visuals that close deals, not win awards. From pitch decks to product experiences that drive expansion.',
  alternates: {
    canonical: 'https://www.pixelmojo.io/services/conversion-assets',
  },
  openGraph: {
    title: 'Conversion Asset Systems | Visuals That Close Deals | Pixelmojo',
    description:
      'Visuals that close deals, not win awards. From pitch decks to product experiences that drive expansion.',
    url: 'https://www.pixelmojo.io/services/conversion-assets',
    siteName: 'Pixelmojo',
    images: [
      {
        url: 'https://www.pixelmojo.io/pixelmojo-services-conversion-assets-02.webp',
        width: 1200,
        height: 630,
        alt: 'Conversion Asset Systems | Visuals That Close Deals',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conversion Asset Systems | Visuals That Close Deals | Pixelmojo',
    description:
      'Visuals that close deals, not win awards. From pitch decks to product experiences that drive expansion.',
    images: [
      'https://www.pixelmojo.io/pixelmojo-services-conversion-assets-02.webp',
    ],
  },
}

const heroStats = [
  {
    value: '14 days',
    label: 'Investor deck ready',
    detail:
      'Narrative, numbers, and design aligned for boardrooms and demo days.',
  },
  {
    value: '60%',
    label: 'More meeting requests',
    detail:
      'Conversion-focused collateral and outreach assets win attention faster.',
  },
  {
    value: '45%',
    label: 'Pitch win rate increase',
    detail:
      'Story, visuals, and follow-up collateral deliver a cohesive buying journey.',
  },
]

const assetSuite = [
  {
    eyebrow: 'Capital & Sales',
    title: 'Decks that move money',
    bullets: [
      'Investor, sales, and partner decks customised for each audience.',
      'Dynamic data modules that update instantly as metrics evolve.',
      'Narrative scaffolds to keep the pitch consistent across teams.',
    ],
  },
  {
    eyebrow: 'Product Proof',
    title: 'Live demos with staying power',
    bullets: [
      'Interactive product tours and clickable prototypes that highlight value fast.',
      'Use-case reels and feature spotlights tailored to the buyer persona.',
      'Battle cards and objection handlers that keep conversations progressing.',
    ],
  },
  {
    eyebrow: 'Enablement',
    title: 'Leave-behinds with clear next steps',
    bullets: [
      'One-page value summaries designed for CFO and CTO decision makers.',
      'Implementation roadmaps that give confidence in your delivery motion.',
      'Drip-ready follow-up sequences that keep momentum between calls.',
    ],
  },
]

const productionTimeline = [
  {
    title: 'Story alignment',
    duration: 'Week 1',
    description:
      'We interview founders, sellers, and customers to surface the sharpest proof points. Narrative, visuals, and numbers get locked in together.',
  },
  {
    title: 'Asset sprint',
    duration: 'Week 2',
    description:
      'Decks, demo scripts, product visuals, and follow-up collateral are produced in parallel. Every deliverable is tested with real prospects or advisors.',
  },
  {
    title: 'Activation kit',
    duration: 'Week 3',
    description:
      'Playbooks, outreach templates, and measurement plans ensure the assets land with your team and start converting immediately.',
  },
]

const enablementHighlights = [
  {
    title: 'Pitch intelligence dashboard',
    description:
      'Track hit rates, feedback themes, and buyer questions in one place.',
  },
  {
    title: 'Asset governance',
    description:
      'Versioning, distribution, and usage analytics keep collateral fresh and relevant.',
  },
  {
    title: 'Team training',
    description:
      'Loom walkthroughs, scripts, and objection handling libraries for the entire GTM team.',
  },
]

export default function ConversionAssetSystems() {
  const theme = getServiceTheme(service.title)

  const buttonStyle: CSSProperties = {
    backgroundColor: theme.isDark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)',
    color: theme.textColor,
    border: `1px solid ${theme.textColor}`,
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Conversion Asset Systems',
    description:
      'Asset systems built to shorten sales cycles. Pitch decks, sales collateral, and motion assets produced as cohesive, data-backed systems.',
    provider: {
      '@type': 'Organization',
      name: 'Pixelmojo',
      url: 'https://pixelmojo.com',
      logo: 'https://pixelmojo.com/logo.png',
      sameAs: [
        'https://www.linkedin.com/company/pixelmojo',
        'https://twitter.com/pixelmojo',
      ],
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Philippines',
      },
      {
        '@type': 'Place',
        name: 'Southeast Asia',
      },
      {
        '@type': 'Place',
        name: 'Global',
      },
    ],
    offers: {
      '@type': 'Offer',
      price: '8000',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '8000',
        priceCurrency: 'USD',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: '1',
          unitText: 'project',
        },
      },
      availability: 'https://schema.org/InStock',
      url: 'https://pixelmojo.com/services/conversion-assets',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Conversion Asset Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pitch Decks & Fundraising Collateral',
            description:
              'Investor decks, teasers, and data rooms built for capital rounds.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sales Enablement Assets',
            description:
              'Demo environments, case studies, ROI calculators, and leave-behinds.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Motion & Video Production',
            description:
              'Product tours, explainer videos, and social-ready motion graphics.',
          },
        },
      ],
    },
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className='min-h-screen'
        style={{
          backgroundColor: theme.bg,
          color: theme.textColor,
        }}
      >
        <div className='container mx-auto px-4 py-16'>
          <div className='space-y-16 md:space-y-24'>
            <ServiceHero
              theme={theme}
              eyebrow='Pitch • Prove • Close'
              title='Asset systems built to shorten sales cycles'
              description={`We craft the capital, sales, and product collateral that keeps buyers engaged and moving forward.`}
              subtitle='Pitch decks, sales collateral, and motion assets produced as a cohesive, data-backed system.'
              price={service.pricing}
              layout='split'
              image={{
                src: '/pixelmojo-services-conversion-assets.webp',
                alt: 'Collection of conversion-focused sales decks and visual assets',
              }}
            >
              <div className='flex flex-wrap gap-4'>
                <LinkButton
                  href='/contact-us'
                  size='lg'
                  className='group'
                  style={buttonStyle}
                >
                  Plan my asset sprint
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </LinkButton>
              </div>
            </ServiceHero>

            <ServiceStatList theme={theme} items={heroStats} />

            {/* Pricing Tiers */}
            <PricingTiers serviceType='conversion-assets' theme={theme} />

            <ServiceSplitSection
              theme={theme}
              eyebrow='Story meets proof'
              title='Narratives engineered for decisions'
              description={`We connect your strategy, data, and design so investors, buyers, and partners see the value and the path to ROI instantly.`}
              bullets={[
                'Win-loss intel and customer proof points shape every slide, demo, and leave-behind.',
                'Financial models visualised so non-technical audiences grasp the upside fast.',
                'Call scripts, speaker notes, and follow-up frameworks keep messaging tight across the team.',
              ]}
              image={{
                src: '/pixelmojo-services-conversion-assets-02.webp',
                alt: 'Pitch narrative storyboard connecting proof points with messaging',
              }}
            />

            <div className='space-y-8'>
              <div className='max-w-3xl'>
                <h2
                  className='text-3xl font-semibold md:text-4xl'
                  style={{ color: theme.textColor }}
                >
                  The asset suite that ships with every engagement
                </h2>
                <p
                  className='mt-4 text-base md:text-lg'
                  style={{ color: theme.mutedTextColor }}
                >
                  Everything is modular and templatized so updates are painless
                  and your team stays in sync.
                </p>
              </div>
              <ServiceCardGrid theme={theme} items={assetSuite} columns={3} />
            </div>

            <div className='space-y-8'>
              <div className='max-w-3xl'>
                <h2
                  className='text-3xl font-semibold md:text-4xl'
                  style={{ color: theme.textColor }}
                >
                  Production cadence that respects deal speed
                </h2>
                <p
                  className='mt-4 text-base md:text-lg'
                  style={{ color: theme.mutedTextColor }}
                >
                  We build quickly, test with real prospects, and hand over a
                  system that keeps creating value after the sprint ends.
                </p>
              </div>
              <ServiceTimeline theme={theme} items={productionTimeline} />
            </div>

            <ServiceSplitSection
              theme={theme}
              eyebrow='Activation'
              title='Enablement that keeps momentum high'
              description={`We do not just drop files in a folder. Your team learns how to deploy, measure, and evolve every asset.`}
              bullets={[
                'Live enablement sessions plus on-demand training content for recurring refreshers.',
                'CRM and marketing automation triggers that send the right asset at the right moment.',
                'Measurement loops highlight which assets drive pipeline so you can double down fast.',
              ]}
              reverse
              image={{
                src: '/pixelmojo-services-conversion-assets-03.webp',
                alt: 'Enablement team launching a conversion asset program',
              }}
            />

            <div className='space-y-6'>
              <div className='max-w-2xl'>
                <h2
                  className='text-3xl font-semibold md:text-4xl'
                  style={{ color: theme.textColor }}
                >
                  Operational backbone included
                </h2>
              </div>
              <ServiceCardGrid
                theme={theme}
                items={enablementHighlights}
                compact
              />
            </div>

            <section
              className='rounded-3xl border p-10 text-center'
              style={{ borderColor: theme.border }}
            >
              <h2
                className='text-3xl font-semibold md:text-4xl'
                style={{ color: theme.textColor }}
              >
                Make every touchpoint a conversion trigger
              </h2>
              <p
                className='mx-auto mt-4 max-w-2xl text-base md:text-lg'
                style={{ color: theme.mutedTextColor }}
              >
                We will map the deals you are chasing, identify collateral gaps,
                and spin up the systems that move prospects from curiosity to
                signature.
              </p>
              <div className='mt-8 flex justify-center'>
                <LinkButton
                  href='/contact-us'
                  size='lg'
                  className='group'
                  style={buttonStyle}
                >
                  Kick off the conversion sprint
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </LinkButton>
              </div>
            </section>
          </div>

          <ServiceNavigation currentService='conversion-assets' theme={theme} />
        </div>
      </div>
    </>
  )
}
