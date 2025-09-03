import React from 'react'
import { LinkButton } from '@/components/ui/button'
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
  title = "About the Author" 
}: AuthorBioProps) {
  return (
    <section className={cn('py-12 border-t border-border', className)}>
      <div className='mb-8'>
        <h2 className='mb-2'>{title}</h2>
      </div>

      <div className='card p-8'>
        <div className='flex flex-col sm:flex-row gap-6'>
          {/* Avatar */}
          <div className='flex-shrink-0'>
            <div className='w-20 h-20 bg-muted rounded-full flex items-center justify-center overflow-hidden'>
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center'>
                  <svg className='w-8 h-8 text-primary/50' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 space-y-4'>
            {/* Name and Title */}
            <div>
              <h3 className='font-semibold text-lg mb-1'>{author.name}</h3>
              <p className='text-muted-foreground text-small'>
                {author.title}
                {author.company && ` at ${author.company}`}
              </p>
            </div>

            {/* Bio */}
            <p className='text-muted-foreground leading-relaxed'>
              {author.bio}
            </p>

            {/* Expertise Tags */}
            {author.expertise && author.expertise.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {author.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className='bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Social Links */}
            {author.socialLinks && (
              <div className='flex gap-3'>
                {author.socialLinks.linkedin && (
                  <LinkButton
                    href={author.socialLinks.linkedin}
                    variant='outline'
                    size='sm'
                    shape='pill'
                    leftIcon={
                      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                      </svg>
                    }
                  >
                    LinkedIn
                  </LinkButton>
                )}
                
                {author.socialLinks.twitter && (
                  <LinkButton
                    href={author.socialLinks.twitter}
                    variant='outline'
                    size='sm'
                    shape='pill'
                    leftIcon={
                      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/>
                      </svg>
                    }
                  >
                    Twitter
                  </LinkButton>
                )}

                {author.socialLinks.github && (
                  <LinkButton
                    href={author.socialLinks.github}
                    variant='outline'
                    size='sm'
                    shape='pill'
                    leftIcon={
                      <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
                      </svg>
                    }
                  >
                    GitHub
                  </LinkButton>
                )}

                {author.socialLinks.website && (
                  <LinkButton
                    href={author.socialLinks.website}
                    variant='outline'
                    size='sm'
                    shape='pill'
                    leftIcon={
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' />
                      </svg>
                    }
                  >
                    Website
                  </LinkButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthorBio