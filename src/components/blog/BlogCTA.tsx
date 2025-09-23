'use client'

import React from 'react'
import Image from 'next/image'

interface BlogCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export function BlogCTA({
  title = 'Ready to transform your design process from art to science?',
  description = "Let's build your computational thinking operating system together.",
  buttonText = 'Start Your Transformation Today',
  buttonHref = '/contact',
}: BlogCTAProps) {
  // Container styling
  const containerStyle: React.CSSProperties = {
    marginTop: '4rem',
    marginBottom: '4rem',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '0px',
    overflow: 'hidden',
  }

  const imageStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '3/2',
    objectFit: 'cover',
    borderBottom: '1px solid var(--border)',
  }

  const contentStyle: React.CSSProperties = {
    padding: '2rem',
    textAlign: 'center',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: 'var(--foreground)',
  }

  const descriptionStyle: React.CSSProperties = {
    color: 'var(--muted-foreground)',
    marginBottom: '1.5rem',
  }

  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '0.75rem 2rem',
    backgroundColor: 'var(--cta)',
    color: 'white',
    borderRadius: '0px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  }

  return (
    <div data-blog-layout='narrow' style={containerStyle}>
      <div style={cardStyle}>
        <Image
          src='/why-your-design-image.webp'
          alt='Transform your design process'
          width={400}
          height={200}
          style={imageStyle}
        />

        <div style={contentStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descriptionStyle}>{description}</p>
          <a
            href={buttonHref}
            style={buttonStyle}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = 'var(--growth)')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = 'var(--cta)')
            }
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogCTA
