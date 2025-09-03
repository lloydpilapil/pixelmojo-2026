import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Lloyd Pilapil | Portfolio',
  description: 'Passionate developer creating beautiful and functional web experiences. Welcome to my digital portfolio.',
  openGraph: {
    title: 'Lloyd Pilapil | Portfolio',
    description: 'Passionate developer creating beautiful and functional web experiences.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <section className='text-center mb-20'>
        <h1 className='mb-6'>
          Hello, I'm <span className='text-primary'>Lloyd Pilapil</span>
        </h1>
        <p className='lead max-w-2xl mx-auto mb-10'>
          A passionate developer creating beautiful and functional web
          experiences. Welcome to my digital portfolio where I showcase my work
          and share my thoughts.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <LinkButton href='/portfolio' variant='default' shape='pill' size='lg'>
            View My Work
          </LinkButton>
          <LinkButton href='/contact' variant='outline' shape='pill' size='lg'>
            Get In Touch
          </LinkButton>
        </div>
      </section>

      {/* Services Section */}
      <section className='mb-20'>
        <div className='text-center mb-12'>
          <h2 className='mb-4'>What I Do</h2>
          <p className='text-muted'>
            Specialized in creating digital experiences that matter
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='card text-center p-8 hover:shadow-lg transition-shadow'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' />
              </svg>
            </div>
            <h3 className='mb-4'>Frontend Development</h3>
            <p className='text-muted'>
              Creating responsive and interactive user interfaces using modern
              frameworks and technologies.
            </p>
          </div>
          <div className='card text-center p-8 hover:shadow-lg transition-shadow'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2' />
              </svg>
            </div>
            <h3 className='mb-4'>Backend Development</h3>
            <p className='text-muted'>
              Building robust server-side applications and APIs with scalable
              architecture.
            </p>
          </div>
          <div className='card text-center p-8 hover:shadow-lg transition-shadow'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <h3 className='mb-4'>Full Stack Solutions</h3>
            <p className='text-muted'>
              End-to-end development from concept to deployment with modern tech
              stacks.
            </p>
          </div>
        </div>
      </section>

      {/* Blog CTA Section */}
      <section className='text-center bg-muted/30 rounded-2xl p-12'>
        <h2 className='mb-6'>Latest from the Blog</h2>
        <p className='text-large text-muted mb-8 max-w-2xl mx-auto'>
          Check out my latest thoughts on development, technology, and insights
          from building modern web applications.
        </p>
        <LinkButton
          href='/blog'
          variant='default'
          shape='pill'
          rightIcon={
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
            </svg>
          }
        >
          Read All Posts
        </LinkButton>
      </section>
    </div>
  )
}
