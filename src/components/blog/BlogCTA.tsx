import Image from 'next/image'
import Link from 'next/link'

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
  buttonHref = '/contact-us',
}: BlogCTAProps) {
  return (
    <div data-blog-layout='narrow' className='my-16'>
      <div className='border border-border rounded-3xl overflow-hidden bg-card shadow-lg shadow-primary/5'>
        <div className='relative w-full aspect-[3/2]'>
          <Image
            src='/why-your-design-image.webp'
            alt='Transform your design process'
            fill
            className='object-cover'
            sizes='(min-width: 768px) 768px, 100vw'
            priority={false}
          />
        </div>

        <div className='px-8 py-10 text-center flex flex-col items-center gap-6'>
          <h3 className='text-2xl font-semibold text-foreground leading-tight max-w-2xl'>
            {title}
          </h3>
          <p className='text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed'>
            {description}
          </p>
          <Link
            href={buttonHref}
            className='inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200 shadow-md shadow-primary/20'
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCTA
