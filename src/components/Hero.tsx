import { LinkButton } from '@/components/ui/button'

interface HeroProps {
  title: string
  description: string
  ctaText: string
  ctaHref: string
  className?: string
}

export default function Hero({
  title: _title,
  description,
  ctaText,
  ctaHref,
  className = ''
}: HeroProps) {
  return (
    <section className={`text-center mb-20 ${className}`}>
      <div className='text-center mb-16'>
        <h1 className='hero-title mb-6'>
          WE <span className='text-accent'>DESIGN</span> FOR <span className='text-cta'>IMPACT</span><span className='text-cta'>,</span> WE BUILD FOR <span className='text-growth'>ROI</span>
        </h1>
      </div>
      <p className='lead max-w-5xl mx-auto mb-10'>
        {description}
      </p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <LinkButton href={ctaHref} variant='default' shape='pill' size='lg'>
          {ctaText}
        </LinkButton>
      </div>
    </section>
  )
}