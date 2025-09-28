import type { Metadata } from 'next'

const pageTitle = 'Insights & Strategy Blog | Product, UX & Growth'
const brandedTitle = `${pageTitle} | Pixelmojo`
const pageDescription =
  'Real-world lessons in UX, product design, and growth strategy—written by the team behind Pixelmojo. Built for startups, SaaS teams, and digital leaders.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: brandedTitle,
    description: pageDescription,
    type: 'website',
    url: 'https://pixelmojo.com/blog',
    images: [
      {
        url: 'https://pixelmojo.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: brandedTitle,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://pixelmojo.com/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
