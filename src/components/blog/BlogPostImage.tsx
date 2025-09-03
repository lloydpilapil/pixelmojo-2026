import React from 'react'
import { cn } from '@/lib/utils'

interface BlogPostImageProps {
  src?: string
  alt: string
  aspectRatio?: 'video' | '3/2' | 'square'
  className?: string
}

export function BlogPostImage({ 
  src, 
  alt, 
  aspectRatio = '3/2', 
  className 
}: BlogPostImageProps) {
  const aspectClasses = {
    'video': 'aspect-video',
    '3/2': 'aspect-[3/2]',
    'square': 'aspect-square'
  }

  return (
    <div className={cn(
      'w-full rounded-lg overflow-hidden mb-8',
      aspectClasses[aspectRatio],
      className
    )}>
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className='w-full h-full object-cover'
        loading="lazy"
      />
    </div>
  )
}

export default BlogPostImage