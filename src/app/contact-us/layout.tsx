import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Pixelmojo | Book a Strategy Session for Growth',
  description:
    "Let's fix what's holding your growth back. Connect with PixelMojo for a free strategy call—designed to turn digital chaos into a growth engine.",
  openGraph: {
    title: 'Contact Pixelmojo | Book a Strategy Session for Growth',
    description:
      "Let's fix what's holding your growth back. Connect with PixelMojo for a free strategy call—designed to turn digital chaos into a growth engine.",
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
