import type { Metadata } from 'next'
import AboutClient from './about-client'

export const metadata: Metadata = {
  title: 'About Pixelmojo | AI Products That Generate Profits From Day One',
  description:
    'Meet the team that builds complete AI product ecosystems generating measurable ROI immediately. 20+ years of turning concepts into profitable realities.',
  alternates: {
    canonical: 'https://pixelmojo.com/about',
  },
}

export default function About() {
  return <AboutClient />
}
