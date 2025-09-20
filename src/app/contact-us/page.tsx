'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ScrollVideoSection from '@/components/ScrollVideoSection'
import { ChevronDown } from 'lucide-react'

export default function Contact() {
  const getDefaultFormState = () => ({
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    email: '',
    linkedin: '',
    projectWebsite: '',
    projectStage: '',
    projectTimeline: '',
    projectBudget: '',
    preferredContact: 'email',
    hearAboutUs: '',
    message: '',
  })

  const [formData, setFormData] = useState(getDefaultFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)
    setFormData(getDefaultFormState())
  }

  if (submitted) {
    return (
      <div className='container mx-auto px-4 py-16 animate-fade-in'>
        <div className='max-w-2xl mx-auto text-center'>
          <div className='card p-12'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg
                className='w-8 h-8 text-primary'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h1 className='mb-4 font-heading'>Thank You!</h1>
            <p className='text-muted mb-8'>
              Your message is in. Expect a reply within one business day with
              next steps and a link to schedule a working session.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant='default'
              shape='pill'
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-16 pb-32 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading max-w-7xl mx-auto'>
          Ready to Transform Your Digital Chaos Into Growth?
        </h1>
        <p className='lead max-w-5xl mx-auto mb-8'>
          If you've made it here, you're probably tired of juggling multiple
          vendors, dealing with disconnected solutions, or working with agencies
          that create pretty designs but don't drive real business results.
        </p>

        {/* Scroll-Animated Video Section */}
        <ScrollVideoSection
          videoId='1098923926'
          coverImage='/cover-contact.webp'
          caption='See how we partner with teams to turn ideas into ship-ready experiences that scale.'
        />
      </div>

      <div className='max-w-6xl mx-auto mt-20'>
        <div className='grid gap-8 lg:grid-cols-[1.05fr,1fr] lg:items-start'>
          <div className='space-y-6'>
            <div className='card p-8 md:p-10 space-y-6'>
              <div className='space-y-4'>
                <h2 className='font-heading text-2xl md:text-3xl'>
                  We get it. Let's fix that.
                </h2>
                <p className='text-muted text-sm md:text-base'>
                  At Pixelmojo, we don't just launch websites or campaigns. We
                  architect connected growth ecosystems that turn your entire
                  digital presence into a revenue engine.
                </p>
                <p className='text-muted text-sm md:text-base'>
                  Here's what happens next: fill in a few details and we'll line
                  up a 30-minute strategy session to audit your current setup
                  and show you where growth is hiding.
                </p>
                <p className='text-muted text-sm md:text-base'>
                  No pressure or pitch. You'll walk away with actionable
                  recommendations whether we work together or not.
                </p>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                {[
                  {
                    title: 'Signal-rich audit',
                    description:
                      'We review your product flows, funnels, and messaging so the conversation starts with insight, not discovery.',
                  },
                  {
                    title: 'Road-mapping together',
                    description:
                      'Expect collaborative sketching on priorities, packages, and launch cadence tailored to your team.',
                  },
                  {
                    title: 'Team-augmented support',
                    description:
                      'Need design, content, or dev horsepower? We scope the right cross-functional crew from day one.',
                  },
                  {
                    title: 'Next-day follow up',
                    description:
                      'You get a recap, recommended next steps, and a proposed path to ship momentum quickly.',
                  },
                ].map(item => (
                  <div
                    key={item.title}
                    className='rounded-lg border border-border/70 bg-muted/20 p-4 shadow-sm'
                  >
                    <p className='font-medium text-foreground'>{item.title}</p>
                    <p className='text-muted text-sm mt-2'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='card p-8 md:p-10 space-y-8'>
            <div className='space-y-3'>
              <h2 className='font-heading text-2xl md:text-3xl'>
                Tell us about your project
              </h2>
              <p className='text-muted text-sm md:text-base'>
                Share the essentials so we can show up to your strategy session
                with ideas, not guesswork.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-10'>
              <section className='space-y-6'>
                <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
                  <div>
                    <h3 className='font-heading text-lg'>Contact details</h3>
                    <p className='text-muted text-sm'>
                      We'll reach out with next steps and a calendar link.
                    </p>
                  </div>
                  <p className='text-muted text-xs md:text-sm'>
                    Prefer a different channel? Let us know below.
                  </p>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block text-small font-medium mb-2'
                    >
                      First name *
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder='Jane'
                      className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='lastName'
                      className='block text-small font-medium mb-2'
                    >
                      Last name *
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder='Doe'
                      className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='company'
                      className='block text-small font-medium mb-2'
                    >
                      Company or team
                    </label>
                    <input
                      type='text'
                      id='company'
                      name='company'
                      value={formData.company}
                      onChange={handleChange}
                      placeholder='Acme Labs'
                      className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='role'
                      className='block text-small font-medium mb-2'
                    >
                      Your role
                    </label>
                    <input
                      type='text'
                      id='role'
                      name='role'
                      value={formData.role}
                      onChange={handleChange}
                      placeholder='Head of Product'
                      className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label
                      htmlFor='email'
                      className='block text-small font-medium mb-2'
                    >
                      Email *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='name@company.com'
                      className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                    />
                    <p className='text-muted text-xs mt-2'>
                      Zero spam: we only use this to follow up on your project.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor='linkedin'
                      className='block text-small font-medium mb-2'
                    >
                      LinkedIn profile
                    </label>
                    <input
                      type='url'
                      id='linkedin'
                      name='linkedin'
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder='https://www.linkedin.com/in/you'
                      className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='projectWebsite'
                      className='block text-small font-medium mb-2'
                    >
                      Relevant link
                    </label>
                    <input
                      type='url'
                      id='projectWebsite'
                      name='projectWebsite'
                      value={formData.projectWebsite}
                      onChange={handleChange}
                      placeholder='https://product-preview.com'
                      className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <span className='block text-small font-medium mb-2'>
                      Preferred contact
                    </span>
                    <div className='flex flex-wrap gap-3'>
                      {[
                        { label: 'Email', value: 'email' },
                        { label: 'LinkedIn DM', value: 'linkedin' },
                        { label: 'Video call', value: 'video' },
                      ].map(option => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
                            formData.preferredContact === option.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:border-primary/60'
                          }`}
                        >
                          <input
                            type='radio'
                            name='preferredContact'
                            value={option.value}
                            checked={formData.preferredContact === option.value}
                            onChange={handleChange}
                            className='sr-only'
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className='space-y-6'>
                <button
                  type='button'
                  onClick={() => setIsProjectDetailsOpen(!isProjectDetailsOpen)}
                  className='w-full flex items-center justify-between text-left group'
                >
                  <div className='flex flex-col gap-2'>
                    <h3 className='font-heading text-lg group-hover:text-primary transition-colors'>
                      Project snapshot
                    </h3>
                    <p className='text-muted text-sm'>
                      A quick snapshot helps us show up prepared.
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                      isProjectDetailsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isProjectDetailsOpen
                      ? 'max-h-none opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='grid gap-6 md:grid-cols-2 pt-4'>
                    <div>
                      <label
                        htmlFor='projectStage'
                        className='block text-small font-medium mb-2'
                      >
                        Where are you today?
                      </label>
                      <select
                        id='projectStage'
                        name='projectStage'
                        value={formData.projectStage}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                      >
                        <option value=''>Select stage</option>
                        <option value='idea'>Exploring an idea</option>
                        <option value='prototype'>
                          Validating a prototype
                        </option>
                        <option value='launch'>Preparing to launch</option>
                        <option value='scale'>
                          Scaling an existing product
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor='projectTimeline'
                        className='block text-small font-medium mb-2'
                      >
                        Ideal timeline
                      </label>
                      <select
                        id='projectTimeline'
                        name='projectTimeline'
                        value={formData.projectTimeline}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                      >
                        <option value=''>Select timeline</option>
                        <option value='2-4 weeks'>2-4 weeks</option>
                        <option value='1-2 months'>1-2 months</option>
                        <option value='3-6 months'>3-6 months</option>
                        <option value='flexible'>
                          Flexible / depends on scope
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor='projectBudget'
                        className='block text-small font-medium mb-2'
                      >
                        Working budget (USD)
                      </label>
                      <select
                        id='projectBudget'
                        name='projectBudget'
                        value={formData.projectBudget}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                      >
                        <option value=''>Select range</option>
                        <option value='under-5k'>Under $5k</option>
                        <option value='5k-15k'>$5k - $15k</option>
                        <option value='15k-30k'>$15k - $30k</option>
                        <option value='30k-plus'>$30k +</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor='hearAboutUs'
                        className='block text-small font-medium mb-2'
                      >
                        How did you hear about us?
                      </label>
                      <select
                        id='hearAboutUs'
                        name='hearAboutUs'
                        value={formData.hearAboutUs}
                        onChange={handleChange}
                        className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                      >
                        <option value=''>Select an option</option>
                        <option value='referral'>
                          Referral or past partner
                        </option>
                        <option value='event'>Met at an event</option>
                        <option value='content'>Content or newsletter</option>
                        <option value='search'>Search or social</option>
                        <option value='other'>Something else</option>
                      </select>
                    </div>

                    <div className='md:col-span-2'>
                      <label
                        htmlFor='message'
                        className='block text-small font-medium mb-2'
                      >
                        What would make this engagement a win? *
                      </label>
                      <textarea
                        id='message'
                        name='message'
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Share goals, success metrics, collaborators, or links we should review ahead of the call.'
                        className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical'
                      ></textarea>
                      <p className='text-muted text-xs mt-2'>
                        Include anything you feel will help us prep for a
                        productive first conversation.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className='space-y-4'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  variant='default'
                  shape='pill'
                  className='w-full'
                >
                  Send project details
                </Button>
                <p className='text-center text-muted text-xs'>
                  Prefer to email instead? Reach me at{' '}
                  <span className='font-medium text-foreground'>
                    hello@pixelmojo.com
                  </span>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
