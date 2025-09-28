import type { Metadata } from 'next'

const pageTitle = 'Contact Us | Start Your AI + Design Sprint'
const brandedTitle = `${pageTitle} | Pixelmojo`
const pageDescription =
  "Tell us where delivery drags. We'll map AI enablement to real user journeys and pair it with experiments your team can ship this quarter."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: 'https://pixelmojo.com/contact-us',
  },
  openGraph: {
    title: brandedTitle,
    description: pageDescription,
    type: 'website',
    url: 'https://pixelmojo.com/contact-us',
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
