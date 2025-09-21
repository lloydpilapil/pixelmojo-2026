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
      <article className='rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
        {/* Mobile: Image overlay layout */}
        <div className='md:hidden relative aspect-[4/3] overflow-hidden'>
          <Image
            src={post.featuredImage || '/placeholder.svg'}
            alt={post.title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />

          {/* Strong gradient overlay for mobile */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent' />

          {/* Content overlay for mobile */}
          <div className='absolute inset-0 flex flex-col justify-end p-6'>
            {/* Featured Label */}
            <div className='mb-3'>
              <span className='inline-block px-3 py-1 text-xs font-semibold text-primary bg-white/95 rounded-full uppercase tracking-wider'>
                Featured Insight
              </span>
            </div>

            <h2 className='text-white font-bold mb-3 drop-shadow-lg'>
              {post.title}
            </h2>

            {post.description && (
              <p className='text-white/90 mb-4 line-clamp-2 drop-shadow-md'>
                {post.description}
              </p>
            )}

            <div className='flex items-center gap-4 text-sm text-white/80'>
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{calculateReadingTime(post.body?.raw || '')} min read</span>
            </div>
          </div>
        </div>

        {/* Desktop: Split layout */}
        <div className='hidden md:flex'>
          {/* Image Section - Left side */}
          <div className='w-1/2 relative aspect-[4/3] overflow-hidden'>
            <Image
              src={post.featuredImage || '/placeholder.svg'}
              alt={post.title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
          </div>

          {/* Content Section - Right side */}
          <div className='w-1/2 p-8 lg:p-12 flex flex-col justify-center'>
            {/* Featured Label */}
            <div className='mb-4'>
              <span className='inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase tracking-wider'>
                Featured Insight
              </span>
            </div>

            <h2 className='mb-4 group-hover:text-primary transition-colors'>
              {post.title}
            </h2>

            {post.description && (
              <p className='text-muted-foreground mb-6 line-clamp-3'>
                {post.description}
              </p>
            )}

            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
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
