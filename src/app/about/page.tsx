import type { Metadata } from 'next'
import AboutClient from './about-client'

const pageTitle =
  'About Pixelmojo: AI Products That Generate Profits From Day One'
const pageDescription =
  'Meet the team that builds complete AI product ecosystems generating measurable ROI immediately. 20+ years of turning concepts into profitable realities.'
const canonicalUrl = 'https://pixelmojo.com/about'
const brandedTitle = `${pageTitle} | Pixelmojo`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
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
        url: 'https://pixelmojo.com/og-image.webp',
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
    images: ['https://pixelmojo.com/og-image.webp'],
  },
}

export default function About() {
  return <AboutClient />
}
