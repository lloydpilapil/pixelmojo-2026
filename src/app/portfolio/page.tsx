import type { Metadata } from 'next'
import { projects } from '@/lib/data/projects'
import { LinkButton } from '@/components/ui/button'

const pageTitle = 'Lloyd Pilapil Portfolio'
const pageDescription =
  'Explore my portfolio of web development projects including full-stack applications, React components, and modern web solutions.'
const canonicalUrl = 'https://www.pixelmojo.io/portfolio'
const brandedTitle = `${pageTitle} | Pixelmojo`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: brandedTitle,
    description: pageDescription,
    url: canonicalUrl,
    type: 'website',
    images: [
      {
        url: 'https://www.pixelmojo.io/og-image.webp',
        width: 1200,
        height: 630,
        alt: brandedTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: brandedTitle,
    description: pageDescription,
    images: ['https://www.pixelmojo.io/og-image.webp'],
  },
}

export default function Portfolio() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div className='text-center mb-20'>
          <h1 className='mb-6'>My Portfolio</h1>
          <p className='lead max-w-3xl mx-auto mb-8'>
            Here are some of the projects I've worked on. Each one represents a
            unique challenge and learning experience in my development journey.
          </p>

          {/* Portfolio Stats */}
          <div className='flex justify-center gap-8 text-center'>
            <div>
              <div className='text-3xl font-extrabold text-primary mb-1'>
                {projects.length}+
              </div>
              <p className='text-small text-muted'>Projects</p>
            </div>
            <div>
              <div className='text-3xl font-extrabold text-primary mb-1'>
                5+
              </div>
              <p className='text-small text-muted'>Technologies</p>
            </div>
            <div>
              <div className='text-3xl font-extrabold text-primary mb-1'>
                100%
              </div>
              <p className='text-small text-muted'>Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
          {projects.map(project => (
            <div
              key={project.id}
              className='card overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
            >
              {/* Project Image */}
              <div className='relative h-48 bg-muted flex items-center justify-center overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                <div className='text-center z-10'>
                  <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
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
                        d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                      />
                    </svg>
                  </div>
                  <p className='text-muted text-small'>Project Screenshot</p>
                </div>

                {/* Category Badge */}
                <div className='absolute top-4 right-4'>
                  <span className='bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium'>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className='p-6'>
                <h3 className='mb-3 group-hover:text-primary transition-colors'>
                  {project.title}
                </h3>
                <p className='text-muted mb-4 text-small leading-relaxed'>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className='mb-6'>
                  <div className='flex flex-wrap gap-2'>
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className='bg-muted text-muted-foreground text-xs px-2 py-1 rounded font-medium'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className='flex gap-3'>
                  <LinkButton
                    href={project.demoUrl}
                    variant='default'
                    shape='pill'
                    size='sm'
                    className='flex-1'
                    leftIcon={
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    }
                  >
                    Demo
                  </LinkButton>
                  <LinkButton
                    href={project.githubUrl}
                    variant='outline'
                    shape='pill'
                    size='sm'
                    className='flex-1'
                    leftIcon={
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                        />
                      </svg>
                    }
                  >
                    Code
                  </LinkButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className='text-center bg-muted/30 rounded-2xl p-12'>
          <h2 className='mb-6'>Ready to Work Together?</h2>
          <p className='text-large text-muted mb-8 max-w-2xl mx-auto'>
            I'm always open to discussing new opportunities and exciting
            projects. Let's create something amazing together.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <LinkButton
              href='/contact'
              variant='default'
              shape='pill'
              rightIcon={
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              }
            >
              Start a Project
            </LinkButton>
            <LinkButton href='/about' variant='outline' shape='pill'>
              Learn More About Me
            </LinkButton>
          </div>
        </section>
      </div>
    </div>
  )
}
