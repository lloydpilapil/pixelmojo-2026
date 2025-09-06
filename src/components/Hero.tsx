import { LinkButton } from '@/components/ui/button'

interface HeroProps {
  title: React.ReactNode
  description: string
  ctaText: string
  ctaHref: string
  className?: string
}

export default function Hero({
  title,
  description,
  ctaText,
  ctaHref,
  className = '',
}: HeroProps) {
  return (
    <section className={`text-center mb-20 mt-16 md:mt-24 ${className}`}>
      <div className='text-center'>
        <h1 className='hero-title max-w-6xl mx-auto mb-10 md:mb-12'>{title}</h1>
      </div>
      <p className='lead max-w-5xl mx-auto mb-10 md:mb-12'>{description}</p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center mt-12'>
        <LinkButton href={ctaHref} variant='default' shape='pill' size='lg'>
          {ctaText}
        </LinkButton>
      </div>
    </section>
  )
}
