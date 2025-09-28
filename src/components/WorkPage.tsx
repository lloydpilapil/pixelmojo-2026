import type { Metadata } from 'next'
import { LinkButton } from './ui/button'
import { Tag } from './ui/tag'
import HeroVisual from './HeroVisual'
import { WorkItem, generateAltText } from '@/data/works'
import ProjectNavigation from './ProjectNavigation'

interface WorkPageProps {
  work: WorkItem
}

export function generateWorkMetadata(work: WorkItem): Metadata {
  return {
    title: `${work.title} | Pixelmojo`,
    description: work.description,
    openGraph: {
      title: `${work.title} | Pixelmojo`,
      description: work.description,
      type: 'website',
    },
  }
}

export default function WorkPage({ work }: WorkPageProps) {
  return (
    <div>
      {/* Hero Section - Same width as services */}
      <div className='container mx-auto px-4 py-20 lg:py-32 max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Content - Left Side */}
          <div>
            {/* Project Metadata */}
            <div className='flex flex-wrap items-center gap-3 mb-6'>
              <Tag variant='primary' size='sm'>
                {work.category}
              </Tag>
              <Tag variant='muted' size='sm'>
                {work.year}
              </Tag>
              {work.isNew && (
                <Tag variant='default' size='sm'>
                  New
                </Tag>
              )}
            </div>

            <h1 className='leading-tight mb-6 lg:mb-8'>{work.title}</h1>
            <p className='text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-10'>
              {work.description}
            </p>

            {/* Technologies */}
            {work.technologies && work.technologies.length > 0 && (
              <div className='mb-8'>
                <p className='text-sm font-semibold text-foreground mb-4'>
                  Technologies:
                </p>
                <div className='flex flex-wrap gap-2'>
                  {work.technologies.map((tech, index) => (
                    <Tag key={index} variant='muted' size='sm'>
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Demo Link */}
            {work.demoUrl && (
              <div className='flex pt-4'>
                <LinkButton
                  href={work.demoUrl}
                  variant='default'
                  size='default'
                  className='group'
                >
                  View Live Project
                </LinkButton>
              </div>
            )}
          </div>

          {/* Cover Image - Right Side */}
          {work.coverImage && (
            <div className='relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden'>
              <HeroVisual
                src={work.coverImage}
                alt={generateAltText(work, 'main')}
                priority
                animation='reveal'
                className='w-full h-full [&>div]:w-full [&>div]:h-full [&>div>img]:w-full [&>div>img]:h-full [&>div>img]:object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent' />
            </div>
          )}
        </div>
      </div>

      {/* Project Content - Normal Container */}
      <div className='container mx-auto px-4 py-0 lg:py-0 max-w-7xl'>
        <div className='mb-24 lg:mb-32'>
          {/* Default placeholder for all projects */}
          <div className='text-center'>
            <div className='p-12 rounded-lg border-2 border-dashed border-gray-300'>
              <h2 className='text-2xl font-bold mb-4 text-muted'>
                Project Details Coming Soon
              </h2>
              <p className='text-muted'>
                We're putting together the comprehensive details for this
                project. Check back soon for the full case study, process
                insights, and results.
              </p>
            </div>
          </div>

          {/* Project Navigation */}
          <div className='pt-16 lg:pt-24'>
            <ProjectNavigation currentSlug={work.slug} />
          </div>
        </div>
      </div>
    </div>
  )
}
