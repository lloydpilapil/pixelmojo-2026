import type { Metadata } from 'next'
import WorksClient from './works-client'

export const metadata: Metadata = {
  title: 'AI Product Portfolio | Revenue-Generating Solutions | Pixelmojo',
  description:
    'Real AI products that generate measurable ROI. From enterprise logistics systems to marketing automation platforms. See how we transform ideas into revenue in 90 days.',
  openGraph: {
    title: 'AI Product Portfolio | Revenue-Generating Solutions | Pixelmojo',
    description:
      'Real AI products that generate measurable ROI. From enterprise logistics systems to marketing automation platforms. See how we transform ideas into revenue in 90 days.',
    type: 'website',
  },
}

export default function Projects() {
  return <WorksClient />
}
