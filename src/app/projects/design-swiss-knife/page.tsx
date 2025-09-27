import type { Metadata } from 'next'
import DesignSwissKnifeCaseStudy from './DesignSwissKnifeCaseStudy'

export const metadata: Metadata = {
  title:
    'Design Swiss Knife - AI Figma Plugin for Mass Creative Production | PixelMojo',
  description:
    'Generate 100 ad variations from a single template with AI-powered copy and automated quality scoring. Built by PixelMojo.',
  openGraph: {
    title:
      'Design Swiss Knife - AI Figma Plugin for Mass Creative Production | PixelMojo',
    description:
      'Generate 100 ad variations from a single template with AI-powered copy and automated quality scoring. Built by PixelMojo.',
    type: 'website',
  },
}

export default function DesignSwissKnifePage() {
  return <DesignSwissKnifeCaseStudy />
}
