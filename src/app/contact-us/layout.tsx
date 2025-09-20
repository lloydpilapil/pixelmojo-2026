import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Pixelmojo | Start Your AI + Design Sprint',
  description:
    "Tell us where delivery drags. We'll map AI enablement to real user journeys and pair it with experiments your team can ship this quarter.",
  openGraph: {
    title: 'Contact Pixelmojo | Start Your AI + Design Sprint',
    description:
      "Tell us where delivery drags. We'll map AI enablement to real user journeys and pair it with experiments your team can ship this quarter.",
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
