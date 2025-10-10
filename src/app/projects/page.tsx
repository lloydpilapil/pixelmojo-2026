import type { Metadata } from 'next'
import WorksClient from './works-client'

const pageTitle = 'AI Product Portfolio | Revenue-Generating Solutions'
const pageDescription =
  'Real AI products that generate measurable ROI. From enterprise logistics systems to marketing automation platforms. See how we transform ideas into revenue in 90 days.'
const canonicalUrl = 'https://www.pixelmojo.io/projects'
const brandedTitle = `${pageTitle} | Pixelmojo`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: brandedTitle,
    description: pageDescription,
    url: canonicalUrl,
    type: 'website',
    images: [
      {
        url: 'https://www.pixelmojo.io/og-image.webp',
        width: 1200,
        height: 630,
        alt: brandedTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: brandedTitle,
    description: pageDescription,
    images: ['https://www.pixelmojo.io/og-image.webp'],
  },
}

export default function Projects() {
  return <WorksClient />
}
