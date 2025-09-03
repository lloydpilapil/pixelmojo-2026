import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About | Lloyd Pilapil',
  description: 'Learn more about Lloyd Pilapil - passionate developer creating exceptional digital experiences through clean code and innovative solutions.',
  openGraph: {
    title: 'About Lloyd Pilapil',
    description: 'Passionate developer creating exceptional digital experiences through clean code and innovative solutions.',
    type: 'website',
  },
}

export default function About() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <div className='max-w-6xl mx-auto'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h1 className='mb-6'>About Me</h1>
          <p className='lead max-w-2xl mx-auto'>
            Passionate about creating exceptional digital experiences through
            clean code and innovative solutions.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-16 items-start mb-20'>
          {/* Profile Image */}
          <div className='order-2 lg:order-1'>
            <div className='aspect-square bg-muted rounded-2xl flex items-center justify-center mb-8'>
              <div className='text-center'>
                <div className='w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-12 h-12 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </div>
                <p className='text-muted text-small'>Professional Photo</p>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className='order-1 lg:order-2 space-y-8'>
            <div className='space-y-6'>
              <p className='text-large'>
                Hello! I'm Lloyd Pilapil, a passionate developer with a love for creating
                innovative web solutions. I specialize in modern web technologies
                and enjoy turning complex problems into simple, beautiful designs.
              </p>

              <p>
                With several years of experience in full-stack development, I've
                worked on various projects ranging from small business websites to
                large-scale applications. I'm always eager to learn new
                technologies and stay up-to-date with industry trends.
              </p>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-3 gap-6 py-8 border-y border-border'>
              <div className='text-center'>
                <div className='text-primary mb-2' style={{fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-extrabold)'}}>5+</div>
                <p className='text-small text-muted'>Years Experience</p>
              </div>
              <div className='text-center'>
                <div className='text-primary mb-2' style={{fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-extrabold)'}}>30+</div>
                <p className='text-small text-muted'>Projects Completed</p>
              </div>
              <div className='text-center'>
                <div className='text-primary mb-2' style={{fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-extrabold)'}}>10+</div>
                <p className='text-small text-muted'>Happy Clients</p>
              </div>
            </div>

            <div className='flex gap-4'>
              <LinkButton href='/portfolio' variant='default' shape='pill'>
                View My Work
              </LinkButton>
              <LinkButton href='/contact' variant='outline' shape='pill'>
                Get In Touch
              </LinkButton>
            </div>
          </div>
        </div>

        {/* Skills & Technologies */}
        <section className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Skills & Technologies</h2>
            <p className='text-muted max-w-2xl mx-auto'>
              Here are the tools and technologies I work with to bring ideas to life
            </p>
          </div>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='card p-6 text-center'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' />
                </svg>
              </div>
              <h4 className='mb-3'>Frontend</h4>
              <ul className='text-muted text-small space-y-2'>
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>JavaScript</li>
              </ul>
            </div>
            
            <div className='card p-6 text-center'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2' />
                </svg>
              </div>
              <h4 className='mb-3'>Backend</h4>
              <ul className='text-muted text-small space-y-2'>
                <li>Node.js</li>
                <li>Python</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
              </ul>
            </div>
            
            <div className='card p-6 text-center'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z' />
                </svg>
              </div>
              <h4 className='mb-3'>Design</h4>
              <ul className='text-muted text-small space-y-2'>
                <li>Figma</li>
                <li>Adobe XD</li>
                <li>Sketch</li>
                <li>Framer</li>
              </ul>
            </div>
            
            <div className='card p-6 text-center'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' />
                </svg>
              </div>
              <h4 className='mb-3'>DevOps</h4>
              <ul className='text-muted text-small space-y-2'>
                <li>Docker</li>
                <li>AWS / Vercel</li>
                <li>GitHub Actions</li>
                <li>Nginx</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Experience</h2>
            <p className='text-muted max-w-2xl mx-auto'>
              My professional journey and the companies I've had the pleasure of working with
            </p>
          </div>
          
          <div className='max-w-3xl mx-auto space-y-8'>
            <div className='card p-8 border-l-4 border-l-primary'>
              <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
                <div>
                  <h3 className='mb-1'>Senior Developer</h3>
                  <p className='text-primary font-medium'>Company Name</p>
                </div>
                <div className='text-muted text-small'>
                  2022 - Present
                </div>
              </div>
              <p className='text-muted'>
                Leading development of web applications using modern technologies.
                Responsible for architecture decisions, code reviews, and mentoring
                junior developers.
              </p>
            </div>
            
            <div className='card p-8 border-l-4 border-l-muted-foreground'>
              <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
                <div>
                  <h3 className='mb-1'>Frontend Developer</h3>
                  <p className='text-muted-foreground font-medium'>Previous Company</p>
                </div>
                <div className='text-muted text-small'>
                  2020 - 2022
                </div>
              </div>
              <p className='text-muted'>
                Developed responsive user interfaces and improved user experience
                across multiple web applications. Collaborated with design teams to
                implement pixel-perfect designs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
