import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface PostSummary {
  title: string
  href: string
  date?: string
}

interface BlogPostNavigationProps {
  previousPost?: PostSummary
  nextPost?: PostSummary
}

function formatDate(date?: string) {
  if (!date) return null

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogPostNavigation({
  previousPost,
  nextPost,
}: BlogPostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null
  }

  return (
    <nav className='border-t border-border/60 pt-10'>
      <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
        {previousPost ? (
          <Link
            href={previousPost.href}
            className='group flex flex-1 flex-col gap-2 text-left'
          >
            <span className='flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground transition-colors group-hover:text-primary'>
              <ArrowLeft className='h-4 w-4' />
              Previous Insight
            </span>
            <span className='text-lg font-semibold leading-snug transition-colors group-hover:text-primary'>
              {previousPost.title}
            </span>
            {formatDate(previousPost.date) && (
              <span className='text-sm text-muted-foreground'>
                {formatDate(previousPost.date)}
              </span>
            )}
          </Link>
        ) : (
          <div className='flex-1' />
        )}

        {nextPost ? (
          <Link
            href={nextPost.href}
            className='group flex flex-1 flex-col gap-2 text-right'
          >
            <span className='flex items-center justify-end gap-2 text-xs uppercase tracking-wide text-muted-foreground transition-colors group-hover:text-primary'>
              Next Insight
              <ArrowRight className='h-4 w-4' />
            </span>
            <span className='text-lg font-semibold leading-snug transition-colors group-hover:text-primary'>
              {nextPost.title}
            </span>
            {formatDate(nextPost.date) && (
              <span className='text-sm text-muted-foreground'>
                {formatDate(nextPost.date)}
              </span>
            )}
          </Link>
        ) : (
          <div className='flex-1' />
        )}
      </div>
    </nav>
  )
}
