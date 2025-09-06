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
    // Enhanced headings with scroll margin for anchor links
    h1: ({ children, ...props }) => (
      <h1
        className='text-4xl md:text-5xl font-bold mb-6 mt-8 tracking-tight scroll-mt-20'
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className='text-3xl md:text-4xl font-bold mb-5 mt-8 tracking-tight scroll-mt-20'
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className='text-2xl md:text-3xl font-semibold mb-4 mt-6 tracking-tight scroll-mt-20'
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className='text-xl md:text-2xl font-semibold mb-3 mt-5 scroll-mt-20'
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5
        className='text-lg md:text-xl font-semibold mb-2 mt-4 scroll-mt-20'
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6
        className='text-base md:text-lg font-semibold mb-2 mt-4 scroll-mt-20'
        {...props}
      >
        {children}
      </h6>
    ),

    // Enhanced paragraph with better readability
    p: ({ children }) => (
      <p className='mb-6 leading-relaxed text-foreground/90 text-base md:text-lg'>
        {children}
      </p>
    ),

    // Improved lists with better spacing
    ul: ({ children }) => (
      <ul className='list-disc pl-6 mb-6 space-y-2 marker:text-muted-foreground text-base md:text-lg'>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className='list-decimal pl-6 mb-6 space-y-2 marker:text-muted-foreground text-base md:text-lg'>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className='leading-relaxed text-foreground/90'>{children}</li>
    ),

    // Enhanced code blocks
    code: ({ children }) => (
      <code className='bg-muted text-foreground px-2 py-1 rounded text-sm font-mono before:content-none after:content-none'>
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className='bg-muted text-foreground p-4 rounded-lg overflow-x-auto mb-6 font-mono text-sm leading-relaxed border border-border'
        {...props}
      >
        {children}
      </pre>
    ),

    // Enhanced blockquote
    blockquote: ({ children }) => (
      <blockquote className='border-l-4 border-primary/30 bg-muted/30 pl-6 pr-4 py-4 my-6 italic text-foreground/80 text-base md:text-lg'>
        {children}
      </blockquote>
    ),

    // Smart link handling (internal vs external)
    a: ({ children, href, ...props }) => {
      const isExternal =
        href && (href.startsWith('http://') || href.startsWith('https://'))
      const isAnchor = href && href.startsWith('#')

      return (
        <a
          href={href}
          className='text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all duration-200 hover:text-primary/80'
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          aria-label={isAnchor ? `Jump to section ${children}` : undefined}
          {...props}
        >
          {children}
          {isExternal && (
            <svg
              className='inline-block ml-1 mb-1 h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
          )}
        </a>
      )
    },

    // Text formatting
    strong: ({ children }) => (
      <strong className='font-bold text-foreground'>{children}</strong>
    ),
    em: ({ children }) => (
      <em className='italic text-foreground/90'>{children}</em>
    ),

    // Horizontal rule
    hr: () => <hr className='my-10 border-t border-border/50' />,

    // Table support
    table: ({ children }) => (
      <div className='overflow-x-auto mb-6 rounded-lg border border-border'>
        <table className='min-w-full divide-y divide-border'>{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className='bg-muted/50'>{children}</thead>,
    tbody: ({ children }) => (
      <tbody className='divide-y divide-border bg-background'>{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className='hover:bg-muted/30 transition-colors'>{children}</tr>
    ),
    th: ({ children }) => (
      <th className='px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider text-foreground'>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className='px-4 py-3 text-foreground/90'>{children}</td>
    ),

    // Images (for standard markdown images)
    img: ({ src, alt, ...props }) => (
      <img
        src={src}
        alt={alt || ''}
        className='rounded-lg my-6 w-full shadow-lg'
        loading='lazy'
        {...props}
      />
    ),

    // Details/Summary for collapsible content
    details: ({ children, ...props }) => (
      <details
        className='mb-6 p-4 bg-muted/30 rounded-lg border border-border group'
        {...props}
      >
        {children}
      </details>
    ),
    summary: ({ children }) => (
      <summary className='font-semibold cursor-pointer select-none hover:text-primary transition-colors list-none flex items-center gap-2'>
        <svg
          className='w-4 h-4 transition-transform group-open:rotate-90'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
        {children}
      </summary>
    ),

    // Mark/Highlight text
    mark: ({ children }) => (
      <mark className='bg-yellow-200 dark:bg-yellow-900/50 text-foreground px-1 rounded'>
        {children}
      </mark>
    ),

    // Keyboard shortcuts
    kbd: ({ children }) => (
      <kbd className='px-2 py-1 text-sm font-mono bg-muted border border-border rounded-md shadow-sm'>
        {children}
      </kbd>
    ),

    // Abbreviations
    abbr: ({ children, title }) => (
      <abbr
        title={title}
        className='underline decoration-dotted underline-offset-4 cursor-help'
      >
        {children}
      </abbr>
    ),

    // Small text
    small: ({ children }) => (
      <small className='text-sm text-muted-foreground'>{children}</small>
    ),

    // Superscript and Subscript
    sup: ({ children }) => (
      <sup className='text-xs relative -top-2'>{children}</sup>
    ),
    sub: ({ children }) => (
      <sub className='text-xs relative -bottom-1'>{children}</sub>
    ),

    // Definition list support
    dl: ({ children }) => <dl className='mb-6 space-y-4'>{children}</dl>,
    dt: ({ children }) => (
      <dt className='font-semibold text-foreground'>{children}</dt>
    ),
    dd: ({ children }) => (
      <dd className='ml-6 text-foreground/90'>{children}</dd>
    ),

    // Figure and figcaption for images with captions
    figure: ({ children }) => <figure className='my-8'>{children}</figure>,
    figcaption: ({ children }) => (
      <figcaption className='text-center mt-3 text-sm text-muted-foreground italic'>
        {children}
      </figcaption>
    ),

    // Custom blog components
    TLDR: TLDR,
    BlogQuote: BlogQuote,
    InlineCTA: InlineCTA,
    BlogFAQ: BlogFAQ,
    BlogPostImage: BlogPostImage,
    BlogCTA: BlogCTA,

    // Spread any additional components passed in
    ...components,
  }
}
