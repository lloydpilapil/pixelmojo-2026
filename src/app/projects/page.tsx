import type { Metadata } from 'next'
import WorksClient from './works-client'

export const metadata: Metadata = {
  title: 'Our Projects | Growth-Focused Design & Strategy by Pixelmojo',
  description:
    'View case studies in UI/UX, product design, and digital strategy. See how Pixelmojo delivers high-impact results for startups, B2B teams, and global brands.',
  openGraph: {
    title: 'Our Projects | Growth-Focused Design & Strategy by Pixelmojo',
    description:
      'View case studies in UI/UX, product design, and digital strategy. See how Pixelmojo delivers high-impact results for startups, B2B teams, and global brands.',
    type: 'website',
  },
}

export default function Projects() {
  return <WorksClient />
}
