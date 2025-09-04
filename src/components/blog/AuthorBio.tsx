import React from 'react'
import { cn } from '@/lib/utils'

export interface AuthorData {
  name: string
  bio: string
  avatar?: string
  title: string
  company?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  expertise?: string[]
}

interface AuthorBioProps {
  author: AuthorData
  className?: string
  title?: string
}

export function AuthorBio({
  author,
  className,
  title = 'About the Author',
}: AuthorBioProps) {
  return (
    <section className={cn('py-12', className)}>
      {/* Optional section title */}
      {title && (
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
        </div>
      )}

      {/* Main card container */}
      <div className='relative bg-transparent rounded-xl border border-border p-8'>
        {/* LinkedIn icon in top right corner */}
        {author.socialLinks?.linkedin && (
          <a
            href={author.socialLinks.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='absolute top-6 right-6 w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors'
            aria-label='LinkedIn Profile'
          >
            <svg
              className='w-5 h-5 text-foreground'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </a>
        )}

        {/* Main content area */}
        <div className='flex gap-6'>
          {/* Avatar */}
          <div className='flex-shrink-0'>
            <div className='w-24 h-24 rounded-full overflow-hidden bg-muted'>
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center'>
                  <svg
                    className='w-10 h-10 text-primary/50'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Text content */}
          <div className='flex-1 pr-12'>
            {/* Name and Title */}
            <div className='mb-4'>
              <h3 className='text-2xl font-bold mb-1'>{author.name}</h3>
              <p className='text-base text-muted-foreground'>
                {author.title}
                {author.company && ` at ${author.company}`}
              </p>
            </div>

            {/* Bio */}
            <p className='text-base leading-relaxed mb-6 text-foreground/90'>
              {author.bio}
            </p>

            {/* Expertise Tags */}
            {author.expertise && author.expertise.length > 0 && (
              <div className='mb-6'>
                <p className='text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider'>
                  Expertise
                </p>
                <div className='flex flex-wrap gap-2'>
                  {author.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className='bg-secondary/15 text-secondary border border-secondary/20 text-sm px-4 py-1.5 rounded-full font-medium'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthorBio
