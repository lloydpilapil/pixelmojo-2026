import Link from 'next/link'
import Image from 'next/image'
import { calculateReadingTime } from '@/lib/blog-utils'

interface BlogPostCardProps {
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

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={post.url} className='group'>
      <article className='card overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col'>
        {/* Post Image */}
        <div className='aspect-[16/10] relative overflow-hidden bg-muted'>
          <Image
            src={post.featuredImage || '/placeholder.svg'}
            alt={post.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </div>

        <div className='p-6 flex flex-col flex-grow'>
          <h3 className='text-lg font-semibold mb-3 group-hover:text-primary transition-colors'>
            {post.title}
          </h3>

          {post.description && (
            <p className='text-sm text-muted mb-4 line-clamp-3 flex-grow'>
              {post.description}
            </p>
          )}

          <div className='mt-auto pt-4 border-t border-border'>
            <div className='flex items-center gap-2 text-xs text-muted'>
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>{calculateReadingTime(post.body?.raw || '')} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogPostCard
