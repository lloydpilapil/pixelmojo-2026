'use client'

import { useState } from 'react'
import {
  ChevronDown,
  FileText,
  DollarSign,
  Briefcase,
  Scale,
  Shield,
  AlertTriangle,
  Clock,
  Users,
  Globe,
} from 'lucide-react'
import {
  LenisFadeIn,
  LenisStaggered,
} from '@/components/animations/LenisReveal'
import Hero from '@/components/Hero'
import Link from 'next/link'

export default function TermsOfServicePage() {
  const [openSections, setOpenSections] = useState<number[]>([0]) // First section open by default

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const sections = [
    {
      title: 'Agreement to Terms',
      icon: FileText,
      content: (
        <>
          <p>
            Welcome to Pixelmojo (&quot;Company,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;). These Terms of Service
            (&quot;Terms&quot;) govern your access to and use of our website
            located at{' '}
            <a
              href='https://pixelmojo.io'
              className='text-primary hover:underline font-semibold'
            >
              pixelmojo.io
            </a>{' '}
            (the &quot;Site&quot;) and all related services (collectively, the
            &quot;Services&quot;).
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these
            Terms. If you disagree with any part of these Terms, you may not
            access our Services.
          </p>
          <div className='mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400'>
            <p className='font-bold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2'>
              <AlertTriangle className='h-5 w-5 text-yellow-700 dark:text-yellow-400' />
              Important Notice
            </p>
            <p className='text-sm text-yellow-800 dark:text-yellow-200'>
              These Terms contain an arbitration clause and class action waiver
              that affects your legal rights. Please read Section on Dispute
              Resolution carefully.
            </p>
          </div>
        </>
      ),
    },
    {
      title: 'Services & Deliverables',
      icon: Briefcase,
      content: (
        <>
          <h3 className='text-xl font-bold mb-4 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Scope of Services
          </h3>
          <p className='mb-4'>
            The specific Services to be provided will be detailed in a Statement
            of Work (SOW) or project agreement. Services may include:
          </p>
          <div className='grid md:grid-cols-2 gap-3 mb-8'>
            {[
              'AI Product Development',
              'Revenue-First Design Systems',
              'AI-Powered Growth Engines',
              'Profit-Optimized Interfaces (UI/UX Design)',
              'Conversion Asset Systems',
              'Full-Stack AI Implementation',
            ].map((service, i) => (
              <div
                key={i}
                className='flex gap-3 items-center p-4 bg-primary/5 border-l-2 border-primary'
              >
                <span className='text-2xl font-bold text-primary'>{i + 1}</span>
                <span className='font-medium'>{service}</span>
              </div>
            ))}
          </div>

          <h3 className='text-xl font-bold mb-4 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Client Responsibilities
          </h3>
          <p className='mb-3'>
            To ensure successful project delivery, the Client agrees to:
          </p>
          <div className='space-y-3'>
            {[
              {
                title: 'Timely Feedback',
                desc: 'Provide feedback and approvals within 3-5 business days',
                icon: Clock,
              },
              {
                title: 'Materials & Access',
                desc: 'Supply all necessary materials, content, and credentials',
                icon: FileText,
              },
              {
                title: 'Single Point of Contact',
                desc: 'Designate one person for project communication',
                icon: Users,
              },
              {
                title: 'Meeting Participation',
                desc: 'Attend scheduled meetings and reviews',
                icon: Briefcase,
              },
              {
                title: 'Payment Schedule',
                desc: 'Pay invoices according to agreed terms',
                icon: DollarSign,
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className='flex gap-4 p-4 bg-card/50 border border-border hover:border-primary/50 transition-all'
                >
                  <div className='flex h-10 w-10 items-center justify-center bg-primary/10 flex-shrink-0'>
                    <Icon className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <p className='font-bold text-foreground'>{item.title}</p>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <h3 className='text-xl font-bold mb-4 mt-8 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Project Timelines &
            Revisions
          </h3>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='p-5 bg-muted/30 border border-border'>
              <p className='font-semibold text-foreground mb-2'>⏱️ Timelines</p>
              <p className='text-sm text-muted-foreground'>
                Project timelines are estimates and may adjust based on client
                feedback cycles or scope changes. Delays caused by late feedback
                may extend timelines.
              </p>
            </div>
            <div className='p-5 bg-muted/30 border border-border'>
              <p className='font-semibold text-foreground mb-2'>✏️ Revisions</p>
              <p className='text-sm text-muted-foreground'>
                Revision rounds specified in SOW. Additional revisions beyond
                agreed scope may incur extra charges at standard hourly rate.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Pricing & Payment',
      icon: DollarSign,
      content: (
        <>
          <h3 className='text-xl font-bold mb-4 text-foreground'>
            Pricing Models
          </h3>
          <div className='space-y-4 mb-8'>
            {[
              {
                model: '60-Day Conversion Sprint',
                price: '₱180K (PH) / $4,500 (Global)',
                terms: '50% upfront, 50% at day 30',
                color: 'primary',
              },
              {
                model: 'Growth Retainer',
                price: '$3,500/month base + performance bonuses',
                terms: 'Monthly billing at start of month',
                color: 'secondary',
              },
              {
                model: 'Project-Based',
                price: 'Fixed fee for defined scope',
                terms: 'Typically 50% upfront, 50% upon completion',
                color: 'growth',
              },
            ].map((pricing, i) => (
              <div
                key={i}
                className={`p-6 border-l-4 border-${pricing.color} bg-${pricing.color}/5`}
              >
                <div className='flex justify-between items-start flex-wrap gap-4'>
                  <div>
                    <h4
                      className={`font-bold text-lg text-${pricing.color} mb-1`}
                    >
                      {pricing.model}
                    </h4>
                    <p className='text-sm text-muted-foreground mb-2'>
                      {pricing.price}
                    </p>
                    <p className='text-xs text-muted-foreground flex items-center gap-2'>
                      <Clock className='h-3 w-3' />
                      {pricing.terms}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className='text-xl font-bold mb-4 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Payment Terms
          </h3>
          <div className='bg-card/50 border border-border p-6'>
            <ul className='space-y-3'>
              {[
                { label: 'Invoice Due', value: '7 days from issuance' },
                {
                  label: 'Late Payment Fee',
                  value: '2% monthly interest charge',
                },
                {
                  label: 'Service Suspension',
                  value: 'May occur for non-payment',
                },
                {
                  label: 'Refund Policy',
                  value: 'Non-refundable once work commences',
                },
                {
                  label: 'Scope Changes',
                  value:
                    'Documented via Change Order, may incur additional fees',
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className='flex justify-between items-center pb-3 border-b border-border/50 last:border-0'
                >
                  <span className='text-sm font-medium text-muted-foreground'>
                    {item.label}
                  </span>
                  <span className='text-sm font-bold text-foreground'>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ),
    },
    {
      title: 'Intellectual Property Rights',
      icon: Shield,
      content: (
        <>
          <h3 className='text-xl font-bold mb-4 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Ownership of Deliverables
          </h3>
          <p className='mb-4'>
            Upon <strong>full payment</strong> of all fees, Client will own all
            rights to the final Deliverables created specifically for the Client
            under the project agreement.
          </p>
          <div className='grid md:grid-cols-2 gap-3 mb-8'>
            {[
              'Custom designs and visual assets',
              'Custom-developed code and applications',
              'Brand assets and identity systems',
              'Content created specifically for Client',
            ].map((item, i) => (
              <div
                key={i}
                className='flex gap-2 items-center p-3 bg-primary/5 border border-border'
              >
                <Check className='h-4 w-4 text-primary flex-shrink-0' />
                <span className='text-sm'>{item}</span>
              </div>
            ))}
          </div>

          <h3 className='text-xl font-bold mb-4 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Pixelmojo Retains
          </h3>
          <div className='bg-card/50 border border-border p-6 space-y-2'>
            {[
              'Proprietary methodologies, frameworks, and processes',
              'Code libraries, templates, and reusable components',
              'Design systems and pattern libraries',
              'AI models, prompts, and training data',
              'Tools and automation workflows',
            ].map((item, i) => (
              <div key={i} className='flex gap-2 items-start'>
                <span className='text-primary mt-1'>•</span>
                <span className='text-sm text-muted-foreground'>{item}</span>
              </div>
            ))}
          </div>

          <div className='mt-8 grid md:grid-cols-2 gap-4'>
            <div className='p-5 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400'>
              <p className='font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
                Third-Party Assets
              </p>
              <p className='text-sm text-yellow-800 dark:text-yellow-200'>
                Some deliverables may include third-party assets (fonts,
                plugins, APIs) that are licensed. Client responsible for
                maintaining valid licenses.
              </p>
            </div>
            <div className='p-5 bg-primary/5 border-l-4 border-primary'>
              <p className='font-semibold text-foreground mb-2'>
                Portfolio Rights
              </p>
              <p className='text-sm text-muted-foreground'>
                Pixelmojo retains right to display work in portfolio unless
                otherwise agreed. We respect NDAs and can anonymize sensitive
                projects.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Warranties & Disclaimers',
      icon: Scale,
      content: (
        <>
          <h3 className='text-xl font-bold mb-4 text-foreground'>
            Our Warranties
          </h3>
          <div className='grid gap-3 mb-8'>
            {[
              'Services performed in professional and workmanlike manner',
              'Deliverables conform to agreed specifications',
              'We have right to provide Services and grant licenses',
              'Our work will not infringe third-party IP rights',
            ].map((warranty, i) => (
              <div
                key={i}
                className='flex gap-3 items-start p-4 bg-card/50 border border-border'
              >
                <Check className='h-5 w-5 text-growth mt-0.5 flex-shrink-0' />
                <span className='text-sm'>{warranty}</span>
              </div>
            ))}
          </div>

          <div className='p-8 bg-gray-100 dark:bg-gray-800/50 border-l-4 border-gray-500 dark:border-gray-400 mb-8'>
            <p className='font-bold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider'>
              Disclaimer
            </p>
            <p className='text-sm text-gray-800 dark:text-gray-200 mb-3'>
              <strong>
                EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED &quot;AS
                IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              </strong>
            </p>
            <p className='text-sm text-gray-800 dark:text-gray-200'>
              We do not warrant that:
            </p>
            <ul className='mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300'>
              {[
                'Services will be uninterrupted or error-free',
                'Results will meet your specific business objectives',
                'All errors or defects will be corrected',
                'Services will achieve specific conversion rates or revenue targets',
              ].map((item, i) => (
                <li key={i} className='flex gap-2'>
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h3 className='text-xl font-bold mb-4 text-foreground'>
            Limitation of Liability
          </h3>
          <div className='p-8 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400'>
            <p className='text-sm font-bold text-red-900 dark:text-red-100 mb-3'>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PIXELMOJO SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES.
            </p>
            <p className='text-sm text-red-800 dark:text-red-200'>
              Our total liability shall not exceed the amount paid by Client to
              Pixelmojo in the 12 months preceding the claim.
            </p>
          </div>
        </>
      ),
    },
    {
      title: 'Termination & Dispute Resolution',
      icon: AlertTriangle,
      content: (
        <>
          <h3 className='text-xl font-bold mb-4 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Termination Terms
          </h3>
          <div className='grid md:grid-cols-2 gap-4 mb-8'>
            <div className='p-6 bg-card/50 border border-border'>
              <p className='font-bold text-foreground mb-3'>By Client</p>
              <p className='text-sm text-muted-foreground mb-3'>
                14 days written notice required
              </p>
              <p className='text-sm text-muted-foreground mb-2'>
                <strong>Client responsible for:</strong>
              </p>
              <ul className='space-y-1 text-sm text-muted-foreground'>
                <li>• All fees for work completed</li>
                <li>• 50% of remaining project fees</li>
                <li>• Third-party costs incurred</li>
              </ul>
            </div>
            <div className='p-6 bg-card/50 border border-border'>
              <p className='font-bold text-foreground mb-3'>By Pixelmojo</p>
              <p className='text-sm text-muted-foreground mb-3'>
                Immediate termination if Client:
              </p>
              <ul className='space-y-1 text-sm text-muted-foreground'>
                <li>• Fails to pay within 30 days</li>
                <li>• Breaches these Terms</li>
                <li>• Engages in abusive conduct</li>
                <li>• Provides false information</li>
              </ul>
            </div>
          </div>

          <h3 className='text-xl font-bold mb-4 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Dispute Resolution
          </h3>
          <div className='space-y-4'>
            <div className='p-6 bg-primary/5 border-l-4 border-primary'>
              <p className='font-bold text-foreground mb-2'>
                1. Informal Resolution
              </p>
              <p className='text-sm text-muted-foreground'>
                Contact us at{' '}
                <a
                  href='mailto:founders@pixelmojo.io'
                  className='text-primary hover:underline font-semibold'
                >
                  founders@pixelmojo.io
                </a>{' '}
                to attempt informal resolution before filing formal dispute.
              </p>
            </div>
            <div className='p-6 bg-secondary/5 border-l-4 border-secondary'>
              <p className='font-bold text-foreground mb-2'>
                2. Binding Arbitration
              </p>
              <p className='text-sm text-muted-foreground'>
                Disputes resolved through arbitration in accordance with
                Philippine Arbitration Law, conducted in Metro Manila,
                Philippines.
              </p>
            </div>
            <div className='p-6 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400'>
              <p className='font-bold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2'>
                <AlertTriangle className='h-5 w-5 text-yellow-700 dark:text-yellow-400' />
                Class Action Waiver
              </p>
              <p className='text-sm text-yellow-800 dark:text-yellow-200'>
                <strong>
                  YOU AGREE THAT DISPUTES WILL BE RESOLVED INDIVIDUALLY, NOT AS
                  PART OF A CLASS ACTION OR REPRESENTATIVE PROCEEDING.
                </strong>
              </p>
            </div>
          </div>

          <h3 className='text-xl font-bold mb-4 mt-8 text-foreground flex items-center gap-2'>
            <span className='text-primary'>→</span> Governing Law
          </h3>
          <div className='p-6 bg-card/50 border border-border flex items-start gap-4'>
            <Globe className='h-8 w-8 text-primary flex-shrink-0' />
            <div>
              <p className='text-sm text-muted-foreground'>
                These Terms are governed by the{' '}
                <strong>laws of the Republic of the Philippines</strong>,
                without regard to conflict of law principles. Any legal action
                must be brought in the courts of{' '}
                <strong>Makati City, Metro Manila, Philippines</strong>.
              </p>
            </div>
          </div>
        </>
      ),
    },
  ]

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <Hero
        title={<>Terms of Service</>}
        description='Terms and conditions for using our website and services. Last updated: October 10, 2025'
        eyebrow='Legal'
        ctaText='Contact Us'
        ctaHref='/contact-us'
      />

      {/* Key Highlights */}
      <LenisFadeIn delay={200}>
        <section className='max-w-6xl mx-auto mb-16'>
          <div className='bg-card/50 border border-border p-8'>
            <h2 className='text-xl font-bold mb-6 text-foreground'>
              Key Highlights
            </h2>
            <div className='grid md:grid-cols-3 gap-4'>
              {[
                {
                  icon: DollarSign,
                  label: 'Clear Pricing',
                  desc: 'Fixed pricing with no hidden fees',
                },
                {
                  icon: Shield,
                  label: 'IP Protection',
                  desc: 'You own deliverables after payment',
                },
                {
                  icon: Clock,
                  label: 'Flexible Terms',
                  desc: '60-day sprints or monthly retainers',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className='p-5 bg-muted/30 border border-border hover:border-primary/50 transition-all'
                  >
                    <Icon className='h-8 w-8 text-primary mb-3' />
                    <p className='font-bold text-foreground mb-1'>
                      {item.label}
                    </p>
                    <p className='text-sm text-muted-foreground'>{item.desc}</p>
                  </div>
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
                <Scale className='h-8 w-8 text-primary' />
              </div>
              <div>
                <h2 className='text-3xl font-bold mb-3 text-foreground'>
                  Questions About Terms?
                </h2>
                <p className='text-muted-foreground mb-6'>
                  Our team is here to clarify any questions about these terms.
                </p>
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='p-5 bg-background/50 border border-border'>
                <p className='text-sm font-semibold text-muted-foreground mb-2'>
                  General Inquiries
                </p>
                <a
                  href='mailto:founders@pixelmojo.io'
                  className='text-lg font-bold text-primary hover:underline'
                >
                  founders@pixelmojo.io
                </a>
              </div>
              <div className='p-5 bg-background/50 border border-border'>
                <p className='text-sm font-semibold text-muted-foreground mb-2'>
                  Legal Matters
                </p>
                <a
                  href='mailto:legal@pixelmojo.io'
                  className='text-lg font-bold text-primary hover:underline'
                >
                  legal@pixelmojo.io
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
              Looking for our Privacy Policy?
            </p>
            <Link
              href='/privacy-policy'
              className='inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all'
            >
              View Privacy Policy →
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
