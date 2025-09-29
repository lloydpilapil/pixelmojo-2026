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
        <div className='md:flex'>
          {/* Image Section */}
          <div className='md:w-1/2 relative aspect-[4/3] overflow-hidden'>
            <Image
              src={post.featuredImage || '/placeholder.svg'}
              alt={post.title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
              quality={95}
            />
          </div>

          {/* Content Section */}
          <div className='md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center'>
            {/* Featured Label */}
            <div className='mb-3 md:mb-4'>
              <span className='inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase tracking-wider'>
                Featured Insight
              </span>
            </div>

            <h2 className='font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors'>
              {post.title}
            </h2>

            {post.description && (
              <p className='text-muted-foreground mb-4 md:mb-6 line-clamp-2 md:line-clamp-3'>
                {post.description}
              </p>
            )}

            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
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
      </article>
    </Link>
  )
}

export default FeaturedPostCard
