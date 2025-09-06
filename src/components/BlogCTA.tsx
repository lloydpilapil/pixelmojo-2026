import { LinkButton } from '@/components/ui/button'

interface BlogCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  className?: string
}

export default function BlogCTA({
  title = 'Latest from the Blog',
  description = 'Check out our latest insights on design, development, and digital strategy to help grow your business.',
  buttonText = 'Read All Posts',
  buttonHref = '/blog',
  className = ''
}: BlogCTAProps) {
  return (
    <section className={`text-center bg-muted/30 rounded-2xl p-12 ${className}`}>
      <h2 className='mb-6'>{title}</h2>
      <p className='text-large text-muted mb-8 max-w-2xl mx-auto'>
        {description}
      </p>
      <LinkButton
        href={buttonHref}
        variant='default'
        shape='pill'
        rightIcon={
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
          </svg>
        }
      >
        {buttonText}
      </LinkButton>
    </section>
  )
}