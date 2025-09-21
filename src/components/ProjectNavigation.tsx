import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllWorks } from '@/data/works'

interface ProjectNavigationProps {
  currentSlug: string
}

export default function ProjectNavigation({
  currentSlug,
}: ProjectNavigationProps) {
  const allWorks = getAllWorks()
  const currentIndex = allWorks.findIndex(work => work.slug === currentSlug)

  if (currentIndex === -1) return null

  const previousProject = currentIndex > 0 ? allWorks[currentIndex - 1] : null
  const nextProject =
    currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null

  // Don't show navigation if there are no other projects
  if (!previousProject && !nextProject) return null

  return (
    <div className='border-t border-border/60 pt-8 mt-16'>
      <div className='flex justify-between items-center'>
        {/* Previous Project */}
        {previousProject ? (
          <Link
            href={previousProject.slug}
            className='group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors'
          >
            <ChevronLeft className='w-4 h-4' />
            <span className='text-sm'>{previousProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Project */}
        {nextProject ? (
          <Link
            href={nextProject.slug}
            className='group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors'
          >
            <span className='text-sm'>{nextProject.title}</span>
            <ChevronRight className='w-4 h-4' />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
