// mdx-components.tsx
import React from 'react'
import type { MDXComponents } from 'mdx/types'
import TLDR from '@/components/blog/TLDR'
import BlogQuote from '@/components/blog/BlogQuote'
import InlineCTA from '@/components/blog/InlineCTA'
import BlogFAQ from '@/components/blog/BlogFAQ'
import BlogPostImage from '@/components/blog/BlogPostImage'
import BlogCTA from '@/components/blog/BlogCTA'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Let rehype-slug handle ID generation for headings
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
    h5: ({ children, ...props }) => <h5 {...props}>{children}</h5>,
    h6: ({ children, ...props }) => <h6 {...props}>{children}</h6>,
    
    // Rest of your components remain the same...
    p: ({ children }) => <p>{children}</p>,
    ul: ({ children }) => <ul className='list-disc pl-6 mb-4'>{children}</ul>,
    ol: ({ children }) => <ol className='list-decimal pl-6 mb-4'>{children}</ol>,
    li: ({ children }) => <li className='mb-1'>{children}</li>,
    
    code: ({ children }) => (
      <code className='bg-muted text-foreground px-2 py-1 rounded text-sm font-mono'>{children}</code>
    ),
    pre: ({ children }) => (
      <pre className='bg-muted text-foreground p-4 rounded-lg overflow-x-auto mb-4 font-mono'>
        {children}
      </pre>
    ),
    
    blockquote: ({ children }) => (
      <blockquote className='border-l-4 border-border pl-4 my-4 italic text-muted-foreground'>
        {children}
      </blockquote>
    ),
    
    a: ({ children, href }) => (
      <a href={href} className='text-primary underline underline-offset-2 hover:opacity-80 transition-opacity'>
        {children}
      </a>
    ),
    
    strong: ({ children }) => (
      <strong className='font-bold'>{children}</strong>
    ),
    em: ({ children }) => (
      <em className='italic'>{children}</em>
    ),
    
    TLDR: TLDR,
    BlogQuote: BlogQuote,
    InlineCTA: InlineCTA,
    BlogFAQ: BlogFAQ,
    BlogPostImage: BlogPostImage,
    BlogCTA: BlogCTA,
    
    ...components,
  }
}