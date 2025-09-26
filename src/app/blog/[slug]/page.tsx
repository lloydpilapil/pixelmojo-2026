import { allPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer2/hooks'
import { notFound } from 'next/navigation'
import { calculateReadingTime } from '@/lib/blog-utils'
import { getAuthor } from '@/lib/data/authors'
import BlogPostLayout from '@/components/blog/BlogPostLayout'
import TableOfContents from '@/components/blog/TableOfContents'
import AuthorBio from '@/components/blog/AuthorBio'
import BlogHero from '@/components/blog/BlogHero'
import TLDR from '@/components/blog/TLDR'
import BlogQuote from '@/components/blog/BlogQuote'
import BlogFAQ from '@/components/blog/BlogFAQ'
import BlogPostImage from '@/components/blog/BlogPostImage'

interface BlogPostProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allPosts.map(post => ({
    slug: post.slug || post._raw.flattenedPath,
  }))
}

// ISR Configuration - Revalidate every hour
export const revalidate = 3600 // 1 hour in seconds

// Enable ISR for dynamic paths
export const dynamic = 'force-static'
export const dynamicParams = true

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params
  const post = allPosts.find(
    post =>
      (post.slug && post.slug === slug) || post._raw.flattenedPath === slug
  )

  if (!post) {
    notFound()
  }

  return {
    title: `${post.title} | Lloyd Pilapil`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
    },
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = allPosts.find(
    post =>
      (post.slug && post.slug === slug) || post._raw.flattenedPath === slug
  )

  if (!post) {
    notFound()
  }

  const MDXContent = getMDXComponent(post.body.code)

  // Custom link component for external links
  const CustomLink = ({ href, children, ...props }: any) => {
    // Check if link is external (starts with http/https or is not relative)
    const isExternal =
      href && (href.startsWith('http') || href.startsWith('https'))

    if (isExternal) {
      return (
        <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
          {children}
        </a>
      )
    }

    // Internal links remain as-is
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  // MDX components for blog posts
  const mdxComponents = {
    TLDR,
    BlogQuote,
    BlogFAQ,
    BlogPostImage,
    a: CustomLink, // Override default anchor tag
  }

  // Calculate reading time
  const readingTime = calculateReadingTime(post.body.raw)

  // Get author data (defaulting to Lloyd Pilapil)
  const author = getAuthor('lloyd-pilapil')

  return (
    <>
      {/* Full Width Hero Section */}
      <BlogHero
        title={post.title}
        description={post.description}
        date={post.date}
        readingTime={readingTime}
        author={{
          name: author.name,
          avatar: '/lloyd-pilapil.webp',
        }}
      />

      {/* Two Column Layout Below Hero */}
      <BlogPostLayout
        tableOfContents={
          post.showTOC !== false && post.headings ? (
            <TableOfContents headings={post.headings} />
          ) : undefined
        }
        sidebar={undefined}
      >
        {/* Article Content */}
        <article className='animate-fade-in blog-post'>
          {/* All content now comes from MDX */}
          <div className='prose max-w-none blog-post-content'>
            <MDXContent components={mdxComponents} />
          </div>

          {/* Author Bio - with narrow layout */}
          <div data-blog-layout='narrow'>
            <AuthorBio
              author={{
                ...author,
                avatar: '/lloyd-pilapil.webp',
              }}
              title='About the Author'
            />
          </div>
        </article>
      </BlogPostLayout>
    </>
  )
}
