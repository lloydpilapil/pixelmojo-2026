import { allPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer2/hooks'
import { notFound } from 'next/navigation'
import { calculateReadingTime } from '@/lib/blog-utils'
import { getAuthor } from '@/lib/data/authors'
import BlogPostLayout from '@/components/blog/BlogPostLayout'
import TableOfContents from '@/components/blog/TableOfContents'
import BlogCTA from '@/components/blog/BlogCTA'
import AuthorBio from '@/components/blog/AuthorBio'
import BlogHero from '@/components/blog/BlogHero'
import TLDR from '@/components/blog/TLDR'
import BlogQuote from '@/components/blog/BlogQuote'
import InlineCTA from '@/components/blog/InlineCTA'
import BlogFAQ from '@/components/blog/BlogFAQ'
import BlogPostImage from '@/components/blog/BlogPostImage'

interface BlogPostProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allPosts.map(post => ({
    slug: post._raw.flattenedPath,
  }))
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = params
  const post = allPosts.find(post => post._raw.flattenedPath === slug)

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
  const { slug } = params
  const post = allPosts.find(post => post._raw.flattenedPath === slug)

  if (!post) {
    notFound()
  }

  const MDXContent = getMDXComponent(post.body.code)

  // MDX components for blog posts
  const mdxComponents = {
    TLDR,
    BlogQuote,
    InlineCTA,
    BlogFAQ,
    BlogPostImage,
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
        sidebar={
          post.showCTA !== false ? (
            <BlogCTA
              title='Stay Updated'
              description='Get the latest web development insights delivered to your inbox.'
              buttonText='Subscribe'
              variant='newsletter'
            />
          ) : undefined
        }
      >
        {/* Article Content */}
        <article className='animate-fade-in blog-post'>
          {/* All content now comes from MDX */}
          <div className='prose max-w-none mb-12 blog-post-content'>
            <MDXContent components={mdxComponents} />
          </div>

          {/* Author Bio */}
          <AuthorBio
            author={{
              ...author,
              avatar: '/lloyd-pilapil.webp',
            }}
            title='About the Author'
          />
        </article>
      </BlogPostLayout>
    </>
  )
}
