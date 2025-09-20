'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft } from 'lucide-react'

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
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState<string | null>(null)

  const totalSteps = 2

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

  const validateStep1 = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
  }

  const validateStep2 = () => {
    return formData.message.trim() !== ''
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
      setError(null)
    } else if (currentStep === 1) {
      setError('Please fill in all required fields with valid information.')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentStep === 1) {
      handleNext()
      return
    }

    if (!validateStep2()) {
      setError('Please describe what would make this engagement a win.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          message?: string
        } | null
        throw new Error(
          payload?.message ||
            'We could not send your message. Please try again.'
        )
      }

      setSubmitted(true)
      setFormData(getDefaultFormState())
      setCurrentStep(1)
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : 'We could not send your message. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
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
          Start the AI + design sprint your roadmap needs.
        </h1>
        <p className='lead max-w-5xl mx-auto mb-12'>
          Tell us where delivery drags. We'll map AI enablement to real user
          journeys and pair it with experiments your team can ship this quarter.
        </p>
      </div>

      {/* Progressive Form Layout */}
      <div className='max-w-4xl mx-auto'>
        {/* Form Container */}
        <div className='card p-8 md:p-12 space-y-8'>
          <div className='space-y-3 text-center'>
            <h2 className='font-heading text-2xl md:text-3xl'>
              {currentStep === 1
                ? 'Tell us about your project'
                : 'Project snapshot'}
            </h2>
            <p className='text-muted text-sm md:text-base max-w-2xl mx-auto'>
              {currentStep === 1
                ? 'Share the essentials so we can show up to your strategy session with ideas, not guesswork.'
                : 'A quick snapshot helps us show up prepared with tailored recommendations.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Step 1: Contact Details */}
            {currentStep === 1 && (
              <div className='space-y-6 animate-fade-in'>
                <div className='grid gap-6 md:grid-cols-2 max-w-2xl mx-auto'>
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
                    <div className='flex flex-wrap gap-3 justify-center'>
                      {[
                        { label: 'Email', value: 'email' },
                        { label: 'LinkedIn DM', value: 'linkedin' },
                        { label: 'Video call', value: 'video' },
                      ].map(option => {
                        const id = `preferredContact-${option.value}`

                        return (
                          <label
                            key={option.value}
                            htmlFor={id}
                            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
                              formData.preferredContact === option.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/60'
                            }`}
                          >
                            <input
                              id={id}
                              type='radio'
                              name='preferredContact'
                              value={option.value}
                              checked={
                                formData.preferredContact === option.value
                              }
                              onChange={handleChange}
                              className='sr-only'
                            />
                            {option.label}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className='space-y-6 animate-fade-in'>
                <div className='grid gap-6 md:grid-cols-2 max-w-2xl mx-auto'>
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
                      <option value='prototype'>Validating a prototype</option>
                      <option value='launch'>Preparing to launch</option>
                      <option value='scale'>Scaling an existing product</option>
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
                      <option value='referral'>Referral or past partner</option>
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
                      placeholder='Share goals, success metrics, collaborators, or links we should review ahead of the call.&#10;&#10;Include anything you feel will help us prep for a productive first conversation.'
                      className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical'
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation and Submit */}
            <div className='space-y-4 max-w-2xl mx-auto'>
              {error && (
                <p className='text-sm text-red-600 bg-red-500/10 border border-red-400/50 rounded-lg px-4 py-3 text-center'>
                  {error}
                </p>
              )}

              <div className='flex gap-4'>
                {currentStep > 1 && (
                  <Button
                    type='button'
                    onClick={handlePrevious}
                    variant='outline'
                    shape='pill'
                    className='flex-1'
                  >
                    <ChevronLeft className='w-4 h-4 mr-2' />
                    Previous
                  </Button>
                )}

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  variant='default'
                  shape='pill'
                  className='flex-1'
                >
                  {currentStep === totalSteps ? (
                    'Send project details'
                  ) : (
                    <>
                      Continue
                      <ChevronRight className='w-4 h-4 ml-2' />
                    </>
                  )}
                </Button>
              </div>

              <p className='text-center text-muted text-xs'>
                Prefer to email instead? Reach me at{' '}
                <a
                  href='mailto:founders@pixelmojo.com?subject=Inquiry'
                  className='font-medium text-foreground hover:text-primary transition-colors underline'
                >
                  founders@pixelmojo.com
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
