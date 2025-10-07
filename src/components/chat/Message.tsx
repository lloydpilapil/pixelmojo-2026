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
