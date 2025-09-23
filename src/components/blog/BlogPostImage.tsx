import React from 'react'
import Image from 'next/image'
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
  className,
}: BlogPostImageProps) {
  const aspectClasses = {
    video: 'aspect-video',
    '3/2': 'aspect-[3/2]',
    square: 'aspect-square',
  }

  return (
    <div
      data-blog-layout='full'
      className={cn(
        'w-full rounded-lg overflow-hidden mb-8 relative',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        fill
        className='object-cover'
      />
    </div>
  )
}

export default BlogPostImage
