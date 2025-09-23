'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BlogHeroProps {
  title: string
  description?: string
  date: string
  createdDate?: string
  updatedDate?: string
  readingTime?: number
  tags?: string[]
  author?: {
    name: string
    avatar?: string
  }
  className?: string
}

export function BlogHero({
  title,
  description,
  date,
  createdDate,
  updatedDate,
  readingTime,
  tags,
  author,
  className,
}: BlogHeroProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedCreatedDate = createdDate
    ? new Date(createdDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const formattedUpdatedDate = updatedDate
    ? new Date(updatedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const [shareUrl, setShareUrl] = useState('')
  const [encodedUrl, setEncodedUrl] = useState('')
  const [encodedTitle] = useState(encodeURIComponent(title))

  useEffect(() => {
    const url = window.location.href
    setShareUrl(url)
    setEncodedUrl(encodeURIComponent(url))
  }, [])

  return (
    <div className={cn('w-full bg-background', className)}>
      <div className='container mx-auto px-4 py-16 pb-24'>
        <header className='max-w-7xl mx-auto text-center'>
          {/* Dates */}
          <div className='text-muted text-small mb-4 space-y-1'>
            <time className='block'>
              Published: {formattedDate}
              {readingTime && (
                <>
                  <span className='text-muted-foreground mx-2'>•</span>
                  <span>{readingTime} min read</span>
                </>
              )}
            </time>
            {formattedCreatedDate && formattedCreatedDate !== formattedDate && (
              <time className='block text-muted-foreground'>
                Created: {formattedCreatedDate}
              </time>
            )}
            {formattedUpdatedDate && formattedUpdatedDate !== formattedDate && (
              <time className='block text-muted-foreground'>
                Last updated: {formattedUpdatedDate}
              </time>
            )}
          </div>

          {/* Title */}
          <h1 className='max-w-6xl mx-auto mb-8'>{title}</h1>

          {description && (
            <p className='text-large text-muted-foreground mb-8 leading-relaxed max-w-5xl mx-auto'>
              {description}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className='flex flex-wrap items-center justify-center gap-2 mb-8'>
              {tags.map(tag => (
                <span
                  key={tag}
                  className='px-3 py-1 bg-primary/10 text-primary rounded-full text-small font-medium'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author */}
          {author && (
            <div className='flex items-center justify-center gap-3 mb-8'>
              <div className='w-10 h-10 bg-muted rounded-full flex items-center justify-center overflow-hidden'>
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={40}
                    height={40}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-primary/60'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z' />
                    </svg>
                  </div>
                )}
              </div>
              <span className='text-small text-muted-foreground'>
                by {author.name}
              </span>
            </div>
          )}

          {/* Social Sharing Icons */}
          <div className='flex items-center justify-center gap-4 mb-8'>
            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-muted hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors group'
              aria-label='Share on Twitter'
            >
              <svg
                className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-muted hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors group'
              aria-label='Share on LinkedIn'
            >
              <svg
                className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-muted hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors group'
              aria-label='Share on Facebook'
            >
              <svg
                className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
              </svg>
            </a>

            {/* Copy Link */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                // You could add a toast notification here
              }}
              className='w-10 h-10 bg-muted hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors group'
              aria-label='Copy link'
            >
              <svg
                className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
            </button>
          </div>
        </header>
      </div>
    </div>
  )
}

export default BlogHero
