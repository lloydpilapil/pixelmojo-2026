'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  if (submitted) {
    return (
      <div className='container mx-auto px-4 py-16 animate-fade-in'>
        <div className='max-w-2xl mx-auto text-center'>
          <div className='card p-12'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
            <h1 className='mb-4 font-heading'>
              Thank You!
            </h1>
            <p className='text-muted mb-8'>
              Your message has been sent successfully. I'll get back to you as
              soon as possible.
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
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='mb-6 font-heading'>Get In Touch</h1>
          <p className='lead max-w-2xl mx-auto'>
            I'd love to hear from you. Send me a message and I'll respond as
            soon as possible.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-12'>
          <div className='card p-8'>
            <h2 className='mb-6 font-heading'>Contact Information</h2>

            <div className='space-y-6'>
              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-primary'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <div>
                  <h4 className='mb-1 font-heading'>Email</h4>
                  <p className='text-muted text-small'>lloyd.pilapil@example.com</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-primary'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
                <div>
                  <h4 className='mb-1 font-heading'>Location</h4>
                  <p className='text-muted text-small'>Philippines</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-primary'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6'
                    />
                  </svg>
                </div>
                <div>
                  <h4 className='mb-1 font-heading'>LinkedIn</h4>
                  <p className='text-muted text-small'>linkedin.com/in/lloydpilapil</p>
                </div>
              </div>
            </div>
          </div>

          <div className='card p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-small font-medium mb-2'
                >
                  Name *
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                />
              </div>

              <div>
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
                  className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                />
              </div>

              <div>
                <label
                  htmlFor='subject'
                  className='block text-small font-medium mb-2'
                >
                  Subject *
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-small font-medium mb-2'
                >
                  Message *
                </label>
                <textarea
                  id='message'
                  name='message'
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical'
                ></textarea>
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                loading={isSubmitting}
                variant='default'
                shape='pill'
                className='w-full'
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
