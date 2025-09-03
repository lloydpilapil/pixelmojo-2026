import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Lloyd Pilapil',
  description: 'Thoughts, tutorials, and insights about web development and technology by Lloyd Pilapil.',
  openGraph: {
    title: 'Lloyd Pilapil - Blog',
    description: 'Thoughts, tutorials, and insights about web development and technology.',
    type: 'website',
  },
}

export default function Blog() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='mb-6'>Blog</h1>
          <p className='lead max-w-2xl mx-auto'>
            Thoughts, tutorials, and insights about web development and
            technology.
          </p>
        </div>

        <div className='space-y-6'>
          {posts.map(post => (
            <article key={post._id} className='card p-6 hover:shadow-lg transition-all duration-300'>
              <Link
                href={post.url}
                className='block group'
              >
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4'>
                  <h2 className='mb-2 sm:mb-0 group-hover:text-primary transition-colors'>
                    {post.title}
                  </h2>
                  <time className='text-muted text-small whitespace-nowrap'>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                {post.description && (
                  <p className='text-muted mb-4'>{post.description}</p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='bg-muted text-muted-foreground text-small px-3 py-1 rounded-full font-medium'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className='card p-12 text-center'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
              </svg>
            </div>
            <h3 className='mb-2'>No Posts Yet</h3>
            <p className='text-muted'>Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}
