import type { Metadata } from 'next'
import { Montserrat, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { DynamicSelectionColors } from '@/components/DynamicSelectionColors'
import ConditionalRecentArticles from '@/components/ConditionalRecentArticles'
import { Analytics } from '@vercel/analytics/react'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import StructuredData from './structured-data'
import Script from 'next/script'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800', '900'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pixelmojo.com'),
  title: {
    default: 'Pixelmojo | AI Product Studio',
    template: '%s | Pixelmojo',
  },
  description:
    'AI-native product studio that builds complete ecosystems generating immediate revenue. From idea to profitable product in 90 days. Real results, not promises.',
  keywords: [
    'AI product studio',
    'AI design agency',
    'AI product development',
    'Revenue-focused design',
    'Growth engineering',
  ],
  applicationName: 'Pixelmojo',
  alternates: {
    canonical: 'https://pixelmojo.com',
  },
  openGraph: {
    title: 'Pixelmojo | AI Product Studio',
    description:
      'Transform ideas into revenue-generating products. We design, develop, and deploy AI-powered solutions that deliver measurable ROI from day one.',
    url: 'https://pixelmojo.com',
    siteName: 'Pixelmojo',
    images: [
      {
        url: 'https://pixelmojo.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Pixelmojo - AI-Native Design & Product Studio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lloydpixelmojo',
    creator: '@lloydpixelmojo',
    title: 'Pixelmojo | AI Product Studio',
    description:
      'Transform ideas into revenue-generating products. We design, develop, and deploy AI-powered solutions that deliver measurable ROI from day one.',
    images: ['https://pixelmojo.com/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-theme='dark'>
      <Script
        id='gtm-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5679MLR7');
          `,
        }}
      />
      <body
        className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-5679MLR7'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <StructuredData />
        <SmoothScrollProvider>
          <DynamicSelectionColors
            // Using default colors, changing on selection
            rotationTrigger='selection'
            fadeEffect={true}
            transitionDuration={300}
            randomize={false}

            // Optional: Use brand colors instead
            // colors={[
            //   { bg: 'rgba(0, 84, 147, 0.3)', color: 'rgb(0, 84, 147)' }, // Primary blue
            //   { bg: 'rgba(60, 194, 158, 0.3)', color: 'rgb(60, 194, 158)' }, // Secondary teal
            //   { bg: 'rgba(244, 128, 36, 0.3)', color: 'rgb(244, 128, 36)' }, // Accent orange
            //   { bg: 'rgba(253, 75, 139, 0.3)', color: 'rgb(253, 75, 139)' }, // CTA pink
            // ]}

            // Optional: Time-based rotation every 10 seconds
            // rotationTrigger="time"
            // rotationInterval={10000}

            // Optional: Apply only to blog content
            // selector=".blog-content"
            // excludeElements={['code', 'pre']}
          />
          <Header />
          <main className='flex-1'>{children}</main>
          <ConditionalRecentArticles />
          <Footer />
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
