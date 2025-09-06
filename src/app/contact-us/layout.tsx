import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Lloyd Pilapil',
  description: 'Get in touch with Lloyd Pilapil for web development projects, collaboration opportunities, or just to say hello.',
  openGraph: {
    title: 'Contact Lloyd Pilapil',
    description: 'Get in touch for web development projects and collaboration opportunities.',
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