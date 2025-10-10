'use client'

import { useState } from 'react'
import {
  ChevronDown,
  Shield,
  Lock,
  Eye,
  FileText,
  Globe,
  Users,
  AlertCircle,
} from 'lucide-react'
import {
  LenisFadeIn,
  LenisStaggered,
} from '@/components/animations/LenisReveal'
import Hero from '@/components/Hero'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  const [openSections, setOpenSections] = useState<number[]>([0]) // First section open by default

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const sections = [
    {
      title: 'Introduction',
      icon: Shield,
      content: (
        <>
          <p>
            Welcome to Pixelmojo (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). We are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website{' '}
            <a
              href='https://pixelmojo.io'
              className='text-primary hover:underline font-semibold'
            >
              pixelmojo.io
            </a>{' '}
            (the &quot;Site&quot;) and use our services.
          </p>
          <p>
            By using our Site, you agree to the collection and use of
            information in accordance with this Privacy Policy. If you do not
            agree with our policies and practices, please do not use our Site.
          </p>
        </>
      ),
    },
    {
      title: 'Information We Collect',
      icon: FileText,
      content: (
        <>
          <h3 className='text-xl font-bold mb-3 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Personal Information You
            Provide
          </h3>
          <p>
            We collect personal information that you voluntarily provide to us
            when you:
          </p>
          <ul className='space-y-2 my-4'>
            {[
              'Fill out our contact form',
              'Use our AI chatbot assistant',
              'Subscribe to our newsletter',
              'Request a quote or book a consultation',
              'Communicate with us via email',
            ].map((item, i) => (
              <li key={i} className='flex gap-3 items-start'>
                <span className='mt-2 h-1.5 w-1.5 bg-primary flex-shrink-0' />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className='mb-3'>
            <strong>This information may include:</strong>
          </p>
          <div className='grid md:grid-cols-2 gap-3'>
            {[
              'Name (first and last)',
              'Email address',
              'Company name',
              'Phone number',
              'Project details and requirements',
              'Budget range and timeline preferences',
            ].map((item, i) => (
              <div
                key={i}
                className='flex gap-2 items-center p-3 bg-muted/30 border border-border/40'
              >
                <Check className='h-4 w-4 text-primary flex-shrink-0' />
                <span className='text-sm'>{item}</span>
              </div>
            ))}
          </div>

          <h3 className='text-xl font-bold mb-3 mt-8 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Automatically Collected
            Information
          </h3>
          <p className='mb-4'>
            When you visit our Site, we automatically collect certain
            information about your device and browsing behavior.
          </p>
          <div className='bg-card/50 border border-border p-6 space-y-2'>
            {[
              'IP address and geolocation data (country, region, city)',
              'Browser type and version',
              'Operating system',
              'Device information (mobile, desktop, tablet)',
              'Referring website',
              'Pages visited and time spent',
              'Click patterns and navigation paths',
              'Date and time of access',
            ].map((item, i) => (
              <div key={i} className='flex gap-2 items-start'>
                <span className='text-primary mt-1'>•</span>
                <span className='text-sm text-muted-foreground'>{item}</span>
              </div>
            ))}
          </div>

          <h3 className='text-xl font-bold mb-3 mt-8 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Chat Conversation Data
          </h3>
          <p className='mb-3'>
            When you interact with our AI chatbot, we collect and store:
          </p>
          <div className='grid md:grid-cols-2 gap-4'>
            {[
              { label: 'Chat messages', desc: 'Both yours and AI responses' },
              {
                label: 'Session metadata',
                desc: 'Page context, time on page, referrer',
              },
              {
                label: 'Engagement metrics',
                desc: 'Messages sent, session duration',
              },
              {
                label: 'Lead information',
                desc: 'Qualification and project details',
              },
            ].map((item, i) => (
              <div
                key={i}
                className='p-4 bg-primary/5 border-l-2 border-primary'
              >
                <p className='font-semibold text-sm text-foreground mb-1'>
                  {item.label}
                </p>
                <p className='text-xs text-muted-foreground'>{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className='text-xl font-bold mb-3 mt-8 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Cookies and Tracking
            Technologies
          </h3>
          <p className='mb-4'>
            We use cookies and similar tracking technologies to maintain
            sessions, analyze usage, and remember preferences.
          </p>
          <div className='space-y-3'>
            {[
              {
                type: 'Essential Cookies',
                desc: 'Required for site functionality (session management, authentication)',
                color: 'primary',
              },
              {
                type: 'Analytics Cookies',
                desc: 'Help us understand visitor behavior (Vercel Analytics)',
                color: 'secondary',
              },
              {
                type: 'Performance Cookies',
                desc: 'Monitor errors and performance (Sentry)',
                color: 'growth',
              },
            ].map((cookie, i) => (
              <div
                key={i}
                className={`p-4 border-l-4 border-${cookie.color} bg-${cookie.color}/5`}
              >
                <p className={`font-semibold text-${cookie.color} mb-1`}>
                  {cookie.type}
                </p>
                <p className='text-sm text-muted-foreground'>{cookie.desc}</p>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: (
        <>
          <p className='mb-4'>We use the information we collect to:</p>
          <div className='grid md:grid-cols-2 gap-3'>
            {[
              'Respond to your inquiries and provide customer support',
              'Process your requests for quotes, consultations, or services',
              'Send you project updates and communication',
              'Improve our website, products, and services',
              'Analyze usage patterns and optimize user experience',
              'Send marketing communications (with your consent)',
              'Detect and prevent fraud or security issues',
              'Comply with legal obligations',
              'Personalize your experience on our Site',
            ].map((item, i) => (
              <div
                key={i}
                className='flex gap-3 items-start p-3 bg-muted/20 border border-border/30 hover:border-primary/50 transition-colors'
              >
                <span className='text-lg'>{i + 1}.</span>
                <span className='text-sm'>{item}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Third-Party Services and Data Sharing',
      icon: Globe,
      content: (
        <>
          <p className='mb-6'>
            We use trusted third-party services to operate our Site and provide
            our services. These services may have access to your personal
            information only to perform specific tasks on our behalf.
          </p>

          <h3 className='text-xl font-bold mb-4 text-foreground'>
            Service Providers We Use
          </h3>
          <div className='grid gap-4'>
            {[
              {
                name: 'Vercel',
                desc: 'Web hosting and deployment',
                url: 'https://vercel.com/legal/privacy-policy',
              },
              {
                name: 'Supabase',
                desc: 'Database and backend services',
                url: 'https://supabase.com/privacy',
              },
              {
                name: 'OpenAI',
                desc: 'AI chatbot functionality',
                url: 'https://openai.com/privacy',
              },
              {
                name: 'Sentry',
                desc: 'Error monitoring and performance tracking',
                url: 'https://sentry.io/privacy',
              },
              {
                name: 'Google Tag Manager',
                desc: 'Analytics and tracking',
                url: 'https://policies.google.com/privacy',
              },
            ].map((service, i) => (
              <div
                key={i}
                className='p-5 bg-card/50 border border-border hover:border-primary/50 transition-all'
              >
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <h4 className='font-bold text-foreground'>
                      {service.name}
                    </h4>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {service.desc}
                    </p>
                  </div>
                  <a
                    href={service.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs text-primary hover:underline whitespace-nowrap ml-4'
                  >
                    Privacy Policy →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400'>
            <h4 className='font-bold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2'>
              <AlertCircle className='h-5 w-5 text-yellow-700 dark:text-yellow-400' />
              International Data Transfers
            </h4>
            <p className='text-sm text-yellow-800 dark:text-yellow-200'>
              Your information may be transferred to and processed in countries
              other than the Philippines, including the United States and
              Europe. We ensure appropriate safeguards are in place to protect
              your data in accordance with this Privacy Policy.
            </p>
          </div>
        </>
      ),
    },
    {
      title: 'Data Retention',
      icon: Lock,
      content: (
        <>
          <p className='mb-6'>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required by law.
          </p>
          <div className='grid gap-4'>
            {[
              {
                type: 'Contact Form Submissions',
                period: '2 years',
                note: 'or until you request deletion',
              },
              {
                type: 'Chat Conversations',
                period: '1 year',
                note: 'to improve our AI assistant',
              },
              {
                type: 'Newsletter Subscriptions',
                period: 'Indefinite',
                note: 'until you unsubscribe',
              },
              {
                type: 'Analytics Data',
                period: '26 months',
                note: 'aggregated and anonymized',
              },
            ].map((item, i) => (
              <div
                key={i}
                className='flex justify-between items-center p-4 bg-muted/30 border border-border'
              >
                <div>
                  <p className='font-semibold text-foreground'>{item.type}</p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {item.note}
                  </p>
                </div>
                <span className='text-lg font-bold text-primary'>
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Your Privacy Rights',
      icon: Users,
      content: (
        <>
          <p className='mb-6'>
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <div className='space-y-4'>
            {[
              {
                right: 'Right to Access',
                desc: 'Request a copy of the personal information we hold about you',
              },
              {
                right: 'Right to Rectification',
                desc: 'Request correction of inaccurate or incomplete information',
              },
              {
                right: 'Right to Erasure',
                desc: 'Request deletion of your personal information',
              },
              {
                right: 'Right to Restrict Processing',
                desc: 'Request limitation on how we use your data',
              },
              {
                right: 'Right to Data Portability',
                desc: 'Receive your data in a structured, machine-readable format',
              },
              {
                right: 'Right to Object',
                desc: 'Object to processing of your personal information',
              },
              {
                right: 'Right to Withdraw Consent',
                desc: 'Withdraw consent for marketing communications',
              },
            ].map((item, i) => (
              <div
                key={i}
                className='flex gap-4 p-4 bg-card/50 border border-border'
              >
                <span className='flex h-10 w-10 items-center justify-center bg-primary/10 text-primary font-bold text-lg flex-shrink-0'>
                  {i + 1}
                </span>
                <div>
                  <p className='font-bold text-foreground'>{item.right}</p>
                  <p className='text-sm text-muted-foreground mt-1'>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-6 p-6 bg-primary/5 border-l-4 border-primary'>
            <p className='text-sm'>
              To exercise these rights, please contact us at{' '}
              <a
                href='mailto:privacy@pixelmojo.io'
                className='text-primary hover:underline font-semibold'
              >
                privacy@pixelmojo.io
              </a>
              . We will respond to your request within <strong>30 days</strong>.
            </p>
          </div>
        </>
      ),
    },
  ]

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <Hero
        title={<>Privacy Policy</>}
        description='How we collect, use, and protect your personal information. Last updated: October 10, 2025'
        eyebrow='Legal'
        ctaText='Contact Us'
        ctaHref='/contact-us'
      />

      {/* Quick Navigation */}
      <LenisFadeIn delay={200}>
        <section className='max-w-6xl mx-auto mb-16'>
          <div className='bg-card/50 border border-border p-8'>
            <h2 className='text-xl font-bold mb-4 text-foreground'>
              Quick Navigation
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {sections.map((section, i) => {
                const Icon = section.icon
                return (
                  <button
                    key={i}
                    onClick={() => toggleSection(i)}
                    className='flex items-center gap-3 p-3 bg-muted/30 hover:bg-primary/10 border border-border hover:border-primary/50 transition-all text-left group'
                  >
                    <Icon className='h-5 w-5 text-primary' />
                    <span className='text-sm font-medium group-hover:text-primary transition-colors'>
                      {section.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      </LenisFadeIn>

      {/* Accordion Sections */}
      <LenisStaggered delay={300} staggerDelay={100}>
        <div className='max-w-6xl mx-auto space-y-4 mb-32'>
          {sections.map((section, index) => {
            const Icon = section.icon
            const isOpen = openSections.includes(index)

            return (
              <div
                key={index}
                className='border-2 border-border bg-card/70 hover:border-primary/30 transition-all'
              >
                <button
                  onClick={() => toggleSection(index)}
                  className='w-full p-6 md:p-8 flex items-center justify-between text-left group'
                >
                  <div className='flex items-center gap-4'>
                    <div className='flex h-12 w-12 items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors'>
                      <Icon className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <span className='text-xs uppercase tracking-wider text-muted-foreground block mb-1'>
                        Section {index + 1}
                      </span>
                      <h3 className='text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors'>
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ease-in-out flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='px-6 md:px-8 pb-8 pt-4 border-t border-border prose prose-lg dark:prose-invert max-w-none'>
                    {section.content}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </LenisStaggered>

      {/* Contact Section */}
      <LenisFadeIn delay={500}>
        <section className='max-w-4xl mx-auto mb-32'>
          <div className='border-2 border-primary p-10 bg-primary/5'>
            <div className='flex items-start gap-6 mb-6'>
              <div className='flex h-16 w-16 items-center justify-center bg-primary/20 flex-shrink-0'>
                <Shield className='h-8 w-8 text-primary' />
              </div>
              <div>
                <h2 className='text-3xl font-bold mb-3 text-foreground'>
                  Have Questions About Your Data?
                </h2>
                <p className='text-muted-foreground mb-6'>
                  We're here to help. Contact our privacy team for any
                  questions, concerns, or requests.
                </p>
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='p-5 bg-background/50 border border-border'>
                <p className='text-sm font-semibold text-muted-foreground mb-2'>
                  Privacy Inquiries
                </p>
                <a
                  href='mailto:privacy@pixelmojo.io'
                  className='text-lg font-bold text-primary hover:underline'
                >
                  privacy@pixelmojo.io
                </a>
              </div>
              <div className='p-5 bg-background/50 border border-border'>
                <p className='text-sm font-semibold text-muted-foreground mb-2'>
                  General Contact
                </p>
                <a
                  href='mailto:founders@pixelmojo.io'
                  className='text-lg font-bold text-primary hover:underline'
                >
                  founders@pixelmojo.io
                </a>
              </div>
            </div>
            <div className='mt-4 p-5 bg-background/50 border border-border'>
              <p className='text-sm font-semibold text-muted-foreground mb-2'>
                Physical Address
              </p>
              <p className='text-foreground'>
                111 Paseo de Roxas, Legazpi Village, Makati, 1229 Metro Manila,
                Philippines
              </p>
            </div>
          </div>
        </section>
      </LenisFadeIn>

      {/* Related Links */}
      <LenisFadeIn delay={600}>
        <section className='max-w-4xl mx-auto'>
          <div className='bg-muted/30 border border-border p-8 text-center'>
            <p className='text-sm text-muted-foreground mb-4'>
              Looking for our Terms of Service?
            </p>
            <Link
              href='/terms-of-service'
              className='inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all'
            >
              View Terms of Service →
            </Link>
          </div>
        </section>
      </LenisFadeIn>
    </div>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 20 20' fill='currentColor'>
      <path
        fillRule='evenodd'
        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
        clipRule='evenodd'
      />
    </svg>
  )
}
