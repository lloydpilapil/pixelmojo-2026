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
  return (
    <Link href={post.url} className='group'>
      <article
        className='overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border'
        style={{
          backgroundColor: theme?.isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : theme?.bg
              ? 'rgba(0, 0, 0, 0.1)'
              : 'var(--card)',
          borderColor: theme?.isDark
            ? 'rgba(255, 255, 255, 0.2)'
            : theme?.bg
              ? 'rgba(0, 0, 0, 0.2)'
              : 'var(--border)',
          borderRadius: '0px',
        }}
      >
        {/* Post Image */}
        <div
          className='aspect-[16/10] relative overflow-hidden'
          style={{
            backgroundColor: theme?.isDark
              ? 'rgba(255, 255, 255, 0.05)'
              : theme?.bg
                ? 'rgba(0, 0, 0, 0.05)'
                : 'var(--muted)',
          }}
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
            style={{
              color: theme?.textColor || 'inherit',
            }}
          >
            {post.title}
          </h3>

          {post.description && (
            <p
              className='text-sm mb-4 line-clamp-3 flex-grow'
              style={{
                color: theme?.mutedTextColor || 'var(--muted-foreground)',
              }}
            >
              {post.description}
            </p>
          )}

          <div
            className='mt-auto pt-4'
            style={{
              borderTop: `1px solid ${
                theme?.isDark
                  ? 'rgba(255, 255, 255, 0.2)'
                  : theme?.bg
                    ? 'rgba(0, 0, 0, 0.2)'
                    : 'var(--border)'
              }`,
            }}
          >
            <div
              className='flex items-center gap-2 text-xs'
              style={{
                color: theme?.mutedTextColor || 'var(--muted-foreground)',
              }}
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
