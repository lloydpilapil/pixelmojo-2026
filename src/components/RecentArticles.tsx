import React from 'react'
import { allPosts } from 'contentlayer/generated'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { LinkButton } from '@/components/ui/button'

interface RecentArticlesProps {
  title?: string
  limit?: number
  showViewAllButton?: boolean
  className?: string
}

const RecentArticles = ({
  title = 'Recent Articles',
  limit = 3,
  showViewAllButton = true,
  className = '',
}: RecentArticlesProps) => {
  // Get the latest posts sorted by date
  const recentPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)

  if (recentPosts.length === 0) {
    return null
  }

  return (
    <section className={`py-20 ${className}`}>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Section Header */}
          <div className='text-center mb-16'>
            <h2>{title}</h2>
          </div>

          {/* Blog Posts Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {recentPosts.map(post => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>

          {/* View All Button */}
          {showViewAllButton && (
            <div className='text-center'>
              <LinkButton href='/blog' variant='outline' size='lg' shape='pill'>
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
