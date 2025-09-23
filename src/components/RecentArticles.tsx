import React from 'react'
import { allPosts } from 'contentlayer/generated'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { LinkButton } from '@/components/ui/button'
import type { ServiceTheme } from '@/utils/serviceThemes'

interface RecentArticlesProps {
  title?: string
  limit?: number
  showViewAllButton?: boolean
  className?: string
  theme?: ServiceTheme | null
  featuredPostIds?: string[]
}

const RecentArticles = ({
  title = 'Recent Articles',
  limit = 3,
  showViewAllButton = true,
  className = '',
  theme = null,
  featuredPostIds = [],
}: RecentArticlesProps) => {
  // Get the latest posts sorted by date
  const recentPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)

  if (recentPosts.length === 0) {
    return null
  }

  return (
    <section
      className={`py-20 ${className}`}
      style={{
        backgroundColor: theme?.bg || 'transparent',
        color: theme?.textColor || 'inherit',
      }}
    >
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Section Header */}
          <div className='text-center mb-16'>
            <h2
              className='mb-6'
              style={{ color: theme?.textColor || 'inherit' }}
            >
              {title}
            </h2>
            <p
              className='max-w-2xl mx-auto text-lg leading-relaxed'
              style={{
                color: theme?.mutedTextColor || 'var(--muted-foreground)',
              }}
            >
              Stay ahead with insights, trends, and expert perspectives on
              design, development, and digital strategy from our team.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {recentPosts.map(post => (
              <BlogPostCard
                key={post._id}
                post={post}
                theme={theme}
                featured={featuredPostIds.includes(post._id)}
              />
            ))}
          </div>

          {/* View All Button */}
          {showViewAllButton && (
            <div className='text-center'>
              <LinkButton
                href='/blog'
                variant='outline'
                size='lg'
                shape='pill'
                style={
                  theme
                    ? {
                        backgroundColor: 'transparent',
                        color: theme.textColor,
                        borderColor: theme.textColor,
                      }
                    : {}
                }
              >
                View All Articles
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RecentArticles
