import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tagVariants = cva(
  'inline-flex items-center font-medium rounded-full transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-secondary/15 text-secondary border border-secondary/20',
        primary: 'bg-primary/15 text-primary border border-primary/20',
        muted: 'bg-muted text-muted-foreground border border-muted',
        outline: 'border-2 border-secondary/30 text-secondary bg-transparent',
        solid: 'bg-secondary text-secondary-foreground border-0',
      },
      size: {
        sm: 'text-xs px-2.5 py-1',
        default: 'text-sm px-4 py-1.5',
        lg: 'text-base px-5 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span
        className={cn(tagVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    )
  }
)
Tag.displayName = 'Tag'

export { Tag, tagVariants }
