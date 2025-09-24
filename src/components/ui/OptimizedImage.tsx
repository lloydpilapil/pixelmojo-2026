import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string
  alt: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'wide'
  priority?: boolean
  className?: string
  containerClassName?: string
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video', // 16:9
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[21/9]',
}

export default function OptimizedImage({
  src,
  alt,
  aspectRatio,
  priority = false,
  className,
  containerClassName,
  width = 1920,
  height = 1080,
  quality = 95,
  ...props
}: OptimizedImageProps) {
  // Generate responsive sizes based on common breakpoints
  const sizes =
    props.sizes ||
    `
    (max-width: 640px) 100vw,
    (max-width: 768px) 80vw,
    (max-width: 1024px) 60vw,
    (max-width: 1280px) 50vw,
    40vw
  `

  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      sizes={sizes}
      className={cn(
        'object-cover transition-opacity duration-300',
        aspectRatio ? 'w-full h-full' : 'w-full h-auto',
        className
      )}
      {...props}
    />
  )

  // If aspectRatio is specified, wrap in a container
  if (aspectRatio) {
    return (
      <div
        className={cn(
          'relative overflow-hidden',
          aspectRatioClasses[aspectRatio],
          containerClassName
        )}
      >
        {imageElement}
      </div>
    )
  }

  return imageElement
}

// Specific optimized components for common use cases
export function HeroImage({ className, ...props }: OptimizedImageProps) {
  return (
    <OptimizedImage
      priority
      quality={95}
      aspectRatio='wide'
      className={cn('rounded-xl', className)}
      sizes='100vw'
      {...props}
    />
  )
}

export function ThumbnailImage({ className, ...props }: OptimizedImageProps) {
  return (
    <OptimizedImage
      aspectRatio='landscape'
      quality={95}
      className={cn('rounded-lg', className)}
      sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
      {...props}
    />
  )
}

export function ProfileImage({ className, ...props }: OptimizedImageProps) {
  return (
    <OptimizedImage
      aspectRatio='square'
      quality={95}
      className={cn('rounded-full', className)}
      sizes='(max-width: 768px) 20vw, 10vw'
      {...props}
    />
  )
}

export function FullWidthImage({ className, ...props }: OptimizedImageProps) {
  return (
    <OptimizedImage
      quality={95}
      className={cn('w-full h-auto', className)}
      sizes='100vw'
      {...props}
    />
  )
}
