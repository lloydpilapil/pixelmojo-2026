import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Tag } from '@/components/ui/tag'
import { LinkButtonWithArrow } from '@/components/ui/button'
import { calculateReadingTime } from '@/lib/blog-utils'
import { getAuthor } from '@/lib/data/authors'

export const metadata: Metadata = {
  title: 'Blog | Lloyd Pilapil',
  description:
    'Thoughts, tutorials, and insights about web development and technology by Lloyd Pilapil.',
  openGraph: {
    title: 'Lloyd Pilapil - Blog',
    description:
      'Thoughts, tutorials, and insights about web development and technology.',
    type: 'website',
  },
}

// Client Component for Newsletter Form
function NewsletterSection({
  variant = 'default',
  buttonText = 'Subscribe now',
  buttonFullWidth = true,
}: {
  variant?: 'default' | 'secondary'
  buttonText?: string
  buttonFullWidth?: boolean
}) {
  return (
    <div className='space-y-4'>
      <input
        type='email'
        placeholder='your@email.com'
        className='w-full px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cta'
      />
      <button
        type='button'
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-11 px-5 text-base rounded-full shadow hover:scale-105 active:scale-95 ${
          variant === 'secondary'
            ? 'bg-secondary/20 text-secondary hover:bg-growth hover:text-white'
            : 'bg-cta text-white hover:bg-growth'
        } ${buttonFullWidth ? 'w-full' : 'w-full md:w-auto'}`}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default function Blog() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  // Get author data
  const author = getAuthor('lloyd-pilapil')

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
          {featuredPost && (
            <Link href={featuredPost.url} className='group'>
              <article className='card overflow-hidden hover:shadow-xl transition-all duration-300'>
                {/* Featured Image */}
                <div className='aspect-[16/9] relative overflow-hidden bg-muted'>
                  <img
                    src='/placeholder.svg'
                    alt={featuredPost.title}
                    className='w-full h-full object-cover opacity-50'
                  />
                  {featuredPost.tags && featuredPost.tags[0] && (
                    <div className='absolute top-4 left-4'>
                      <Tag variant='solid' size='sm'>
                        {featuredPost.tags[0]}
                      </Tag>
                    </div>
                  )}
                </div>

                <div className='p-8'>
                  <div className='flex items-center gap-4 text-sm text-muted mb-4'>
                    <time>
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <span>
                      {calculateReadingTime(featuredPost.body?.raw || '')} min
                      read
                    </span>
                  </div>

                  <h2 className='mb-4 group-hover:text-primary transition-colors'>
                    {featuredPost.title}
                  </h2>

                  {featuredPost.description && (
                    <p className='text-muted mb-6 line-clamp-3'>
                      {featuredPost.description}
                    </p>
                  )}

                  <div className='flex items-center gap-3'>
                    <img
                      src='/lloyd-pilapil.webp'
                      alt={author.name}
                      className='w-10 h-10 rounded-full'
                    />
                    <div>
                      <p className='font-medium text-sm'>{author.name}</p>
                      <p className='text-xs text-muted'>{author.title}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-between items-center mb-12'>
            <h2>Latest articles</h2>
            <LinkButtonWithArrow
              href='/blog/archive'
              variant='link'
              arrowIcon='chevron'
            >
              See All
            </LinkButtonWithArrow>
          </div>

          {recentPosts.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {recentPosts.map(post => (
                <Link key={post._id} href={post.url} className='group'>
                  <article className='card overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col'>
                    {/* Post Image */}
                    <div className='aspect-[16/10] relative overflow-hidden bg-muted'>
                      <img
                        src='/placeholder.svg'
                        alt={post.title}
                        className='w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity'
                      />
                    </div>

                    <div className='p-6 flex flex-col flex-grow'>
                      <div className='flex items-center gap-2 text-xs text-muted mb-3'>
                        {post.tags && post.tags[0] && (
                          <>
                            <span className='uppercase font-semibold text-secondary'>
                              {post.tags[0]}
                            </span>
                            <span>•</span>
                          </>
                        )}
                        <span>
                          {calculateReadingTime(post.body?.raw || '')} min read
                        </span>
                      </div>

                      <h3 className='mb-3 group-hover:text-primary transition-colors line-clamp-2'>
                        {post.title}
                      </h3>

                      {post.description && (
                        <p className='text-sm text-muted mb-4 line-clamp-3 flex-grow'>
                          {post.description}
                        </p>
                      )}

                      <div className='flex items-center gap-3 mt-auto pt-4 border-t border-border'>
                        <img
                          src='/lloyd-pilapil.webp'
                          alt={author.name}
                          className='w-8 h-8 rounded-full'
                        />
                        <div>
                          <p className='font-medium text-sm'>{author.name}</p>
                          <p className='text-xs text-muted'>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
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
        </div>
      </section>

      {/* Bottom Newsletter Section */}
      <section className='bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-t border-border'>
        <div className='container mx-auto px-4 py-20'>
          <div className='max-w-4xl mx-auto'>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div>
                <span className='text-primary font-semibold text-sm uppercase tracking-wider'>
                  Subscribe to
                </span>
                <h2 className='mt-2 mb-4'>The Creative Brief</h2>
                <p className='text-muted'>
                  Where 70K+ creatives and marketers find the latest insights,
                  articles and tools sparking industry-wide interest.
                </p>
              </div>
              <div>
                <NewsletterSection
                  variant='secondary'
                  buttonText='Subscribe'
                  buttonFullWidth={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
