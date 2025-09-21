import type { Metadata } from 'next'
import Image from 'next/image'
import { LinkButton } from './ui/button'
import { Tag } from './ui/tag'
import { ExternalLink } from 'lucide-react'
import { WorkItem } from '@/data/works'

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
    <div className='container mx-auto px-4 py-16'>
      {/* Hero Section */}
      <div className='text-center mb-16'>
        <div className='inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm'>
          <span>{work.category}</span>
          <span>•</span>
          <span>{work.year}</span>
        </div>
        <h1 className='mb-6'>{work.title}</h1>
        <p className='lead max-w-3xl mx-auto mb-8'>{work.description}</p>

        {/* Technologies */}
        {work.technologies && work.technologies.length > 0 && (
          <div className='flex flex-wrap items-center justify-center gap-2 mb-8'>
            {work.technologies.map((tech, index) => (
              <Tag key={index} variant='primary' size='sm'>
                {tech}
              </Tag>
            ))}
          </div>
        )}

        {/* Demo Link */}
        {work.demoUrl && (
          <div className='mb-8'>
            <LinkButton
              href={work.demoUrl}
              variant='outline'
              size='default'
              className='group'
            >
              View Live Project
              <ExternalLink className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </LinkButton>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {work.coverImage && (
        <div className='mb-16'>
          <div className='relative aspect-video rounded-lg overflow-hidden'>
            <Image
              src={work.coverImage}
              alt={work.title}
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>
      )}

      {/* Content Placeholder */}
      <div className='w-full mx-auto mb-16 text-center'>
        <div className='p-12 rounded-lg border-2 border-dashed border-gray-300'>
          <h2 className='text-2xl font-bold mb-4 text-muted'>
            Project Content Coming Soon
          </h2>
          <p className='text-muted'>
            This is a reusable component structure. Project details will be
            populated here.
          </p>
        </div>
      </div>
    </div>
  )
}
