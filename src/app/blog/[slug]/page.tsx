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
  const { slug } = await params
  const post = allPosts.find(post => post._raw.flattenedPath === slug)

  if (!post) {
    return {}
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
  const post = allPosts.find(post => post._raw.flattenedPath === slug)

  if (!post) {
    notFound()
  }

  const MDXContent = getMDXComponent(post.body.code)
  // Get MDX components (not using hook in async function)
  const mdxComponents = {
    // Standard HTML elements
    p: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className='list-disc pl-6 mb-4'>{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className='list-decimal pl-6 mb-4'>{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className='mb-1'>{children}</li>
    ),

    code: ({ children }: { children: React.ReactNode }) => (
      <code className='bg-muted text-foreground px-2 py-1 rounded text-sm font-mono'>
        {children}
      </code>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
      <pre className='bg-muted text-foreground p-4 rounded-lg overflow-x-auto mb-4 font-mono'>
        {children}
      </pre>
    ),

    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className='border-l-4 border-border pl-4 my-4 italic text-muted-foreground'>
        {children}
      </blockquote>
    ),

    a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
      <a
        href={href}
        className='text-primary underline underline-offset-2 hover:opacity-80 transition-opacity'
      >
        {children}
      </a>
    ),

    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className='font-bold'>{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className='italic'>{children}</em>
    ),

    // Custom MDX components
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
        tags={post.tags}
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
        <article className='animate-fade-in'>
          {/* All content now comes from MDX */}
          <div className='prose max-w-none mb-12'>
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
