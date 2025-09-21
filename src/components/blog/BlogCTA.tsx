'use client'

import React from 'react'

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
  // Apply the 25-75 grid directly to the component
  const containerStyle: React.CSSProperties = {
    marginLeft: '25%',
    width: '75%',
    marginTop: '4rem',
    marginBottom: '4rem',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: '1rem',
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
    borderRadius: '9999px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img
          src='/why-your-design-image.webp'
          srcSet='/why-your-design-image.webp 1x, /why-your-design-image@2x.webp 2x'
          alt='Transform your design process'
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
