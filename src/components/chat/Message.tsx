import React from 'react'

interface MessageProps {
  role: 'user' | 'assistant'
  content: string
}

// Lightweight markdown parser for chat messages
function parseMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = []
  let key = 0

  // Split by lines to handle bullet points and line breaks
  const lines = text.split('\n')

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      elements.push(<br key={`br-${key++}`} />)
    }

    if (!line.trim()) {
      return // Skip empty lines (already added line break)
    }

    // Check for headings (### Heading)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = headingMatch[2]

      // Render heading based on level
      if (level === 1) {
        elements.push(
          <h1
            key={`heading-${key++}`}
            className='text-lg md:text-xl font-bold mt-2 mb-1'
          >
            {text}
          </h1>
        )
      } else if (level === 2) {
        elements.push(
          <h2
            key={`heading-${key++}`}
            className='text-base md:text-lg font-bold mt-2 mb-1'
          >
            {text}
          </h2>
        )
      } else if (level === 3) {
        elements.push(
          <h3
            key={`heading-${key++}`}
            className='text-sm md:text-base font-semibold mt-1.5 mb-0.5'
          >
            {text}
          </h3>
        )
      } else if (level === 4) {
        elements.push(
          <h4
            key={`heading-${key++}`}
            className='text-sm font-semibold mt-1 mb-0.5'
          >
            {text}
          </h4>
        )
      } else if (level === 5) {
        elements.push(
          <h5
            key={`heading-${key++}`}
            className='text-xs font-semibold mt-1 mb-0.5'
          >
            {text}
          </h5>
        )
      } else {
        elements.push(
          <h6
            key={`heading-${key++}`}
            className='text-xs font-medium mt-1 mb-0.5'
          >
            {text}
          </h6>
        )
      }
      return
    }

    // Check for bullet points (• text or - text or * text)
    const bulletMatch = line.match(/^[•\-\*]\s+(.+)$/)
    if (bulletMatch) {
      elements.push(
        <div key={`bullet-${key++}`} className='flex gap-2 ml-2'>
          <span className='text-primary mt-0.5'>•</span>
          <span>{bulletMatch[1]}</span>
        </div>
      )
      return
    }

    // Process the line for inline markdown
    const parts: React.ReactNode[] = []
    let remaining = line
    let partKey = 0

    while (remaining.length > 0) {
      // Match bold (**text**)
      const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
      if (boldMatch) {
        parts.push(
          <strong key={`bold-${key}-${partKey++}`} className='font-bold'>
            {boldMatch[1]}
          </strong>
        )
        remaining = remaining.slice(boldMatch[0].length)
        continue
      }

      // Match italic (*text*)
      const italicMatch = remaining.match(/^\*(.+?)\*/)
      if (italicMatch) {
        parts.push(
          <em key={`italic-${key}-${partKey++}`} className='italic'>
            {italicMatch[1]}
          </em>
        )
        remaining = remaining.slice(italicMatch[0].length)
        continue
      }

      // Match inline code (`code`)
      const codeMatch = remaining.match(/^`(.+?)`/)
      if (codeMatch) {
        parts.push(
          <code
            key={`code-${key}-${partKey++}`}
            className='px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-xs font-mono'
          >
            {codeMatch[1]}
          </code>
        )
        remaining = remaining.slice(codeMatch[0].length)
        continue
      }

      // Match links [text](url)
      const linkMatch = remaining.match(/^\[(.+?)\]\((.+?)\)/)
      if (linkMatch) {
        parts.push(
          <a
            key={`link-${key}-${partKey++}`}
            href={linkMatch[2]}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:opacity-80 transition-opacity'
          >
            {linkMatch[1]}
          </a>
        )
        remaining = remaining.slice(linkMatch[0].length)
        continue
      }

      // No markdown found, take next character
      parts.push(remaining[0])
      remaining = remaining.slice(1)
    }

    elements.push(<span key={`line-${key++}`}>{parts}</span>)
  })

  return elements
}

export default function Message({ role, content }: MessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] md:max-w-[80%] rounded-lg px-3 py-2 md:px-4 md:py-2.5 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        <div className='text-xs md:text-sm whitespace-pre-wrap'>
          {parseMarkdown(content)}
        </div>
      </div>
    </div>
  )
}
