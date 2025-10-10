import type { Metadata } from 'next'
import { Montserrat, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { DynamicSelectionColors } from '@/components/DynamicSelectionColors'
import ConditionalRecentArticles from '@/components/ConditionalRecentArticles'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import StructuredData from './structured-data'
import Script from 'next/script'
import ChatWidget from '@/components/chat/ChatWidget'
import CookieConsent from '@/components/CookieConsent'
import { ConsentProvider } from '@/contexts/ConsentContext'
import ConsentGatedScripts from '@/components/ConsentGatedScripts'

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
  metadataBase: new URL('https://www.pixelmojo.io'),
  title: 'Pixelmojo | AI Product Studio - Ship Revenue in 90 Days',
  description:
    'AI-native product studio that builds complete ecosystems generating immediate revenue. From idea to profitable product in 90 days. Real results, not promises.',
  alternates: {
    canonical: 'https://www.pixelmojo.io',
  },
  openGraph: {
    title: 'Pixelmojo - AI-Native Design & Product Studio',
    description:
      'Transform ideas into revenue-generating products. We design, develop, and deploy AI-powered solutions that deliver measurable ROI from day one.',
    url: 'https://www.pixelmojo.io',
    siteName: 'Pixelmojo',
    images: [
      {
        url: '/og-image.webp',
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
    title: 'Pixelmojo - AI-Native Design & Product Studio',
    description:
      'Transform ideas into revenue-generating products. We design, develop, and deploy AI-powered solutions that deliver measurable ROI from day one.',
    images: ['/og-image.webp'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-theme='dark' suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 - Initialize BEFORE any tracking scripts */}
        <Script
          id='consent-mode-init'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Set default consent to 'denied' for all consent types
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });

              // Initialize dataLayer
              gtag('js', new Date());
            `,
          }}
        />
        <StructuredData />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ConsentProvider>
          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-5679MLR7'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
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
            <ChatWidget />
            <CookieConsent />
            <ConsentGatedScripts />
          </SmoothScrollProvider>
        </ConsentProvider>
      </body>
    </html>
  )
}
