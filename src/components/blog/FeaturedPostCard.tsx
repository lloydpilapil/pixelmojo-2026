import Link from 'next/link'
import Image from 'next/image'
import { calculateReadingTime } from '@/lib/blog-utils'

interface FeaturedPostCardProps {
  post: {
    _id: string
    url: string
    title: string
    description?: string
    date: string
    tags?: string[]
    featuredImage?: string
    body?: {
      raw: string
    }
  }
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <Link href={post.url} className='group'>
      <article className='relative aspect-[4/3] md:aspect-[37/20] overflow-hidden rounded-2xl'>
        {/* Background Image */}
        <Image
          src={post.featuredImage || '/placeholder.svg'}
          alt={post.title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {/* Gradient Overlay - different for mobile */}
        <div className='absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-black/25 to-transparent' />

        {/* Content Overlay - Full width on mobile, left 70% on desktop */}
        <div className='absolute inset-0 flex flex-col justify-end'>
          <div className='w-full md:w-[70%] p-6 sm:p-8 md:p-12'>
            {/* Featured Label */}
            <div className='mb-3'>
              <span className='inline-block px-3 py-1 text-xs font-semibold text-primary bg-white/90 rounded-full uppercase tracking-wider'>
                Featured Insight
              </span>
            </div>

            {/* Title - Use global h2 styles */}
            <h2 className='text-white font-bold mb-4 group-hover:text-white transition-colors'>
              {post.title}
            </h2>

            {/* Description - Use global p styles */}
            {post.description && (
              <p className='text-white/90 mb-6 line-clamp-3'>
                {post.description}
              </p>
            )}

            {/* Meta Info - YOUR ORIGINAL SIZE */}
            <div className='flex items-center gap-4 text-sm text-white/70'>
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{calculateReadingTime(post.body?.raw || '')} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default FeaturedPostCard
