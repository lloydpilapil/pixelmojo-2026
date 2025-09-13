import type { Metadata } from 'next'
import { Montserrat, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { DynamicSelectionColors } from '@/components/DynamicSelectionColors'

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
  title: 'Portfolio | Your Name',
  description:
    'Personal portfolio website showcasing my projects and blog posts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
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
        <Footer />
      </body>
    </html>
  )
}
