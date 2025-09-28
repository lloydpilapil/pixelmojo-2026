import type { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { FeaturedPostCard } from '@/components/blog/FeaturedPostCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import {
  BLOG_POSTS_PER_PAGE,
  FEATURED_POST_FALLBACK_INDEX,
} from '@/lib/blog-config'
import { buildCanonicalUrl } from '@/lib/site-config'

const pageTitle = 'Blog | AI Product Development Insights & Case Studies'
const pageDescription =
  'Learn how we build AI products that generate revenue. Deep dives on product design, AI implementation, growth strategies, and real client results.'
const canonicalUrl = buildCanonicalUrl('/blog')
const brandedTitle = `${pageTitle} | Pixelmojo`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: brandedTitle,
    description: pageDescription,
    url: canonicalUrl,
    type: 'website',
    images: [
      {
        url: 'https://www.pixelmojo.io/og-image.webp',
        width: 1200,
        height: 630,
        alt: brandedTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: brandedTitle,
    description: pageDescription,
    images: ['https://www.pixelmojo.io/og-image.webp'],
  },
}

// ISR Configuration for blog listing - revalidate every 30 minutes
export const revalidate = 1800 // 30 minutes in seconds
export const dynamic = 'force-static'

export default function Blog() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const featuredPost =
    posts.find(post => post.featured) ?? posts[FEATURED_POST_FALLBACK_INDEX]

  const recentPosts = featuredPost
    ? posts.filter(post => post._id !== featuredPost._id)
    : posts
  const displayedPosts = recentPosts.slice(0, BLOG_POSTS_PER_PAGE)
  const totalPages = Math.ceil(recentPosts.length / BLOG_POSTS_PER_PAGE)
  const hasMorePages = totalPages > 1

  return (
    <div className='animate-fade-in'>
      {/* Hero Section */}
      <section className='bg-gradient-to-br from-primary/5 via-background to-secondary/5'>
        <div className='container mx-auto px-4 py-20'>
          <div className='max-w-6xl mx-auto'>
            <h1 className='text-center mb-6'>Creative Insights</h1>
            <p className='lead text-center max-w-3xl mx-auto'>
              Thoughts, tutorials, and insights about web development and
              technology—helping your team get great design done at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='max-w-6xl mx-auto'>
          {/* Featured Post - Now takes full width */}
          {featuredPost && <FeaturedPostCard post={featuredPost} />}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='mb-12'>
            <h2>More Insights</h2>
          </div>

          {displayedPosts.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {displayedPosts.map(post => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className='card p-12 text-center'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </div>
              <h3 className='mb-2'>No More Posts</h3>
              <p className='text-muted'>Check back soon for new content!</p>
            </div>
          )}

          {/* Pagination Controls */}
          {hasMorePages && (
            <div className='mt-16'>
              <div className='flex items-center justify-center gap-2'>
                {/* Page Numbers */}
                <div className='flex items-center gap-1'>
                  {/* Current page (1) - highlighted */}
                  <span className='px-3 py-1 rounded-lg bg-primary text-white'>
                    1
                  </span>

                  {/* Show next few page numbers */}
                  {Array.from(
                    { length: Math.min(3, totalPages - 1) },
                    (_, i) => i + 2
                  ).map(page => (
                    <Link
                      key={page}
                      href={`/blog/page/${page}`}
                      className='px-3 py-1 rounded-lg hover:bg-muted transition-colors'
                    >
                      {page}
                    </Link>
                  ))}

                  {/* Show ellipsis if there are many pages */}
                  {totalPages > 4 && (
                    <span className='px-2 text-muted'>...</span>
                  )}

                  {/* Last page link if it's not already shown */}
                  {totalPages > 4 && (
                    <Link
                      href={`/blog/page/${totalPages}`}
                      className='px-3 py-1 rounded-lg hover:bg-muted transition-colors'
                    >
                      {totalPages}
                    </Link>
                  )}
                </div>

                {/* Next Button */}
                <Link
                  href='/blog/page/2'
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors'
                >
                  Next
                  <ChevronRight className='w-4 h-4' />
                </Link>
              </div>

              {/* Page Info */}
              <p className='mt-6 text-center text-sm text-muted'>
                Showing posts 1-{displayedPosts.length} of {recentPosts.length}{' '}
                total posts
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
