import Link from 'next/link'
import Image from 'next/image'
import { calculateReadingTime } from '@/lib/blog-utils'
import type { ServiceTheme } from '@/utils/serviceThemes'

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
  theme?: ServiceTheme | null
}

export function BlogPostCard({ post, theme }: BlogPostCardProps) {
  const cardStyle = theme
    ? {
        '--card-bg': theme.isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)',
        '--card-border': theme.isDark
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)',
        '--card-hover-border': theme.hoverBorder,
        '--card-image-bg': theme.isDark
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.05)',
        '--card-divider': theme.isDark
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)',
        '--card-text': theme.textColor,
        '--card-muted-text': theme.mutedTextColor,
        backgroundColor: theme.isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)',
        borderColor: theme.isDark
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)',
        color: theme.textColor,
        borderRadius: '0px',
      }
    : undefined

  return (
    <Link href={post.url} className='group'>
      <article
        className={`overflow-hidden transition-all duration-300 h-full flex flex-col border ${
          theme
            ? 'hover:shadow-lg hover:border-[var(--card-hover-border)] focus-within:border-[var(--card-hover-border)]'
            : 'hover:shadow-lg hover:border-primary/50 focus-within:border-primary/50'
        }`}
        style={cardStyle || { borderRadius: '0px' }}
      >
        {/* Post Image */}
        <div
          className='aspect-[16/10] relative overflow-hidden'
          style={
            theme ? { backgroundColor: 'var(--card-image-bg)' } : undefined
          }
        >
          <Image
            src={post.featuredImage || '/placeholder.svg'}
            alt={post.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </div>

        <div className='p-6 flex flex-col flex-grow'>
          <h3
            className='text-lg font-semibold mb-3 transition-colors'
            style={theme ? { color: 'var(--card-text)' } : undefined}
          >
            {post.title}
          </h3>

          {post.description && (
            <p
              className='text-sm mb-4 line-clamp-3 flex-grow'
              style={theme ? { color: 'var(--card-muted-text)' } : undefined}
            >
              {post.description}
            </p>
          )}

          <div
            className='mt-auto pt-4'
            style={
              theme ? { borderTop: '1px solid var(--card-divider)' } : undefined
            }
          >
            <div
              className='flex items-center gap-2 text-xs'
              style={theme ? { color: 'var(--card-muted-text)' } : undefined}
            >
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
