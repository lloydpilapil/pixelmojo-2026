import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  BLOG_POSTS_PER_PAGE,
  FEATURED_POST_FALLBACK_INDEX,
} from '@/lib/blog-config'
import { buildCanonicalUrl } from '@/lib/site-config'

export async function generateStaticParams() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const featuredPost =
    posts.find(post => post.featured) ?? posts[FEATURED_POST_FALLBACK_INDEX]

  const postsWithoutFeatured = featuredPost
    ? posts.filter(post => post._id !== featuredPost._id)
    : posts
  const totalPages = Math.ceil(
    postsWithoutFeatured.length / BLOG_POSTS_PER_PAGE
  )

  return Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(pageNumber => pageNumber > 1)
    .map(pageNumber => ({
      page: pageNumber.toString(),
    }))
}

export async function generateMetadata({
  params,
}: {
  params: { page: string }
}): Promise<Metadata> {
  const pageNumber = parseInt(params.page)

  return {
    title: `Blog - Page ${pageNumber} | Pixelmojo`,
    description: `Browse page ${pageNumber} of our insights on UX, product design, and growth strategy. Real-world lessons from the Pixelmojo team.`,
    openGraph: {
      title: `Blog - Page ${pageNumber} | Pixelmojo`,
      description: `Browse page ${pageNumber} of our insights on UX, product design, and growth strategy.`,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: buildCanonicalUrl(`/blog/page/${pageNumber}`),
    },
  }
}

export default function BlogPage({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page)

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }

  if (pageNumber === 1) {
    redirect('/blog')
  }

  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Remove the featured post from paginated results
  const featuredPost =
    posts.find(post => post.featured) ?? posts[FEATURED_POST_FALLBACK_INDEX]

  const recentPosts = featuredPost
    ? posts.filter(post => post._id !== featuredPost._id)
    : posts
  const totalPages = Math.ceil(recentPosts.length / BLOG_POSTS_PER_PAGE)

  if (pageNumber > totalPages) {
    notFound()
  }

  const startIndex = (pageNumber - 1) * BLOG_POSTS_PER_PAGE
  const endIndex = startIndex + BLOG_POSTS_PER_PAGE
  const currentPosts = recentPosts.slice(startIndex, endIndex)

  return (
    <div className='animate-fade-in'>
      {/* Hero Section - Simplified for pagination pages */}
      <section className='bg-gradient-to-br from-primary/5 via-background to-secondary/5'>
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-6xl mx-auto'>
            <div className='flex items-center justify-center mb-4'>
              <Link
                href='/blog'
                className='text-muted hover:text-primary transition-colors flex items-center gap-2'
              >
                <ChevronLeft className='w-4 h-4' />
                Back to Blog
              </Link>
              <span className='mx-4 text-muted'>•</span>
              <span className='text-muted'>
                Page {pageNumber} of {totalPages}
              </span>
            </div>
            <h1 className='text-center mb-6'>Creative Insights</h1>
            <p className='lead text-center max-w-3xl mx-auto'>
              Exploring page {pageNumber} of our thoughts, tutorials, and
              insights about web development and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className='container mx-auto px-4 py-16'>
        <div className='max-w-6xl mx-auto'>
          {currentPosts.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {currentPosts.map(post => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className='card p-12 text-center'>
              <h3 className='mb-2'>No Posts Found</h3>
              <p className='text-muted'>This page doesn't have any posts.</p>
            </div>
          )}

          {/* Pagination Controls */}
          <div className='mt-16 flex items-center justify-center gap-2'>
            {/* Previous Button */}
            {pageNumber > 1 ? (
              <Link
                href={
                  pageNumber === 2 ? '/blog' : `/blog/page/${pageNumber - 1}`
                }
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors'
              >
                <ChevronLeft className='w-4 h-4' />
                Previous
              </Link>
            ) : (
              <button
                disabled
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border opacity-50 cursor-not-allowed'
              >
                <ChevronLeft className='w-4 h-4' />
                Previous
              </button>
            )}

            {/* Page Numbers */}
            <div className='flex items-center gap-1'>
              {/* First page link */}
              <Link
                href='/blog'
                className={`px-3 py-1 rounded-lg transition-colors ${
                  pageNumber === 1 ? 'bg-primary text-white' : 'hover:bg-muted'
                }`}
              >
                1
              </Link>

              {/* Show ellipsis if needed */}
              {pageNumber > 3 && <span className='px-2 text-muted'>...</span>}

              {/* Show current page and neighbors */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (page === 1) return false // Already shown
                  if (page === pageNumber) return true
                  if (Math.abs(page - pageNumber) <= 1) return true
                  if (page === totalPages) return false // Will be shown separately
                  return false
                })
                .map(page => (
                  <Link
                    key={page}
                    href={`/blog/page/${page}`}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      page === pageNumber
                        ? 'bg-primary text-white'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {page}
                  </Link>
                ))}

              {/* Show ellipsis if needed */}
              {pageNumber < totalPages - 2 && (
                <span className='px-2 text-muted'>...</span>
              )}

              {/* Last page link if there's more than one page */}
              {totalPages > 1 && (
                <Link
                  href={`/blog/page/${totalPages}`}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    pageNumber === totalPages
                      ? 'bg-primary text-white'
                      : 'hover:bg-muted'
                  }`}
                >
                  {totalPages}
                </Link>
              )}
            </div>

            {/* Next Button */}
            {pageNumber < totalPages ? (
              <Link
                href={`/blog/page/${pageNumber + 1}`}
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors'
              >
                Next
                <ChevronRight className='w-4 h-4' />
              </Link>
            ) : (
              <button
                disabled
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border opacity-50 cursor-not-allowed'
              >
                Next
                <ChevronRight className='w-4 h-4' />
              </button>
            )}
          </div>

          {/* Page Info */}
          <p className='mt-6 text-center text-sm text-muted'>
            Showing posts {startIndex + 1}-
            {Math.min(endIndex, recentPosts.length)} of {recentPosts.length}{' '}
            total posts
          </p>
        </div>
      </section>
    </div>
  )
}
