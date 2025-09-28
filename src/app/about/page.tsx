import type { Metadata } from 'next'
import AboutClient from './about-client'

export const metadata: Metadata = {
  title:
    'About Pixelmojo: AI Products That Generate Profits From Day One | Pixelmojo',
  description:
    'Meet the team that builds complete AI product ecosystems generating measurable ROI immediately. 20+ years of turning concepts into profitable realities.',
  openGraph: {
    title:
      'About Pixelmojo: AI Products That Generate Profits From Day One | Pixelmojo',
    description:
      'Meet the team that builds complete AI product ecosystems generating measurable ROI immediately. 20+ years of turning concepts into profitable realities.',
    url: 'https://pixelmojo.com/about',
    siteName: 'Pixelmojo',
    images: [
      {
        url: 'https://pixelmojo.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'About Pixelmojo: AI Products That Generate Profits From Day One',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'About Pixelmojo: AI Products That Generate Profits From Day One | Pixelmojo',
    description:
      'Meet the team that builds complete AI product ecosystems generating measurable ROI immediately. 20+ years of turning concepts into profitable realities.',
    images: ['https://pixelmojo.com/og-image.webp'],
  },
}

export default function About() {
  return <AboutClient />
}
