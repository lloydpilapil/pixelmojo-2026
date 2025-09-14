import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { FeaturedPostCard } from '@/components/blog/FeaturedPostCard'

export const metadata: Metadata = {
  title: 'Insights & Strategy Blog | Product, UX & Growth by Pixelmojo',
  description:
    'Real-world lessons in UX, product design, and growth strategy—written by the team behind Pixelmojo. Built for startups, SaaS teams, and digital leaders.',
  openGraph: {
    title: 'Insights & Strategy Blog | Product, UX & Growth by Pixelmojo',
    description:
      'Real-world lessons in UX, product design, and growth strategy—written by the team behind Pixelmojo. Built for startups, SaaS teams, and digital leaders.',
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

          {recentPosts.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {recentPosts.map(post => (
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
