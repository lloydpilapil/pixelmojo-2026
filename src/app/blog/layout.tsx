import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights & Strategy Blog | Product, UX & Growth by Pixelmojo',
  description:
    'Real-world lessons in UX, product design, and growth strategy—written by the team behind Pixelmojo. Built for startups, SaaS teams, and digital leaders.',
  openGraph: {
    title: 'Insights & Strategy Blog | Product, UX & Growth by Pixelmojo',
    description:
      'Real-world lessons in UX, product design, and growth strategy—written by the team behind Pixelmojo. Built for startups, SaaS teams, and digital leaders.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
