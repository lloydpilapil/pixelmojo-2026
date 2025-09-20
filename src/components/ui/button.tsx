import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'shadow hover:scale-105 active:scale-95' +
          ' bg-[#FD4B8B] text-white hover:bg-[#55AE44]',
        destructive:
          'bg-[#FD4B8B] text-white shadow-sm hover:bg-[#55AE44] hover:scale-105 active:scale-95',
        outline:
          'border-2 border-[#FD4B8B] bg-transparent text-[#FD4B8B] shadow-sm hover:bg-[#55AE44] hover:text-white hover:border-[#55AE44] hover:scale-105 active:scale-95',
        secondary:
          'bg-[#FD4B8B]/20 text-[#FD4B8B] shadow-sm hover:bg-[#55AE44] hover:text-white hover:scale-105 active:scale-95',
        ghost:
          'text-[#FD4B8B] hover:bg-[#55AE44] hover:text-white hover:scale-105 active:scale-95',
        link: 'text-primary underline-offset-4 hover:text-primary/80 hover:underline',
      },
      size: {
        default: 'h-11 px-5 text-base', // 44px height (was 36px)
        sm: 'h-10 px-4 text-sm', // 40px height (was 32px)
        lg: 'h-12 px-10 text-base', // 48px height (was 40px)
        icon: 'h-11 w-11', // 44px × 44px (was 36px)
        link: 'h-auto px-0 py-0 text-base', // Text-style links align with surrounding copy
      },
      shape: {
        default: 'rounded-full',
        pill: 'rounded-full',
        square: 'rounded-none',
        rounded: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'pill', // Changed to pill shape by default
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// Link Button Props
export interface LinkButtonProps
  extends LinkProps,
    Omit<VariantProps<typeof buttonVariants>, 'asChild'> {
  className?: string
  children: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? (variant === 'link' ? 'link' : undefined)

    const content = loading ? (
      <>
        <svg
          className='animate-spin -ml-1 mr-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
        Loading...
      </>
    ) : (
      <>
        {leftIcon && <span className='flex items-center'>{leftIcon}</span>}
        {children}
        {rightIcon && <span className='flex items-center'>{rightIcon}</span>}
      </>
    )

    return (
      <button
        className={cn(
          buttonVariants({ variant, size: resolvedSize, shape, className })
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {content}
      </button>
    )
  }
)
Button.displayName = 'Button'

// Link Button Component
const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      href,
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? (variant === 'link' ? 'link' : undefined)

    const content = (
      <>
        {leftIcon && <span className='flex items-center'>{leftIcon}</span>}
        {children}
        {rightIcon && <span className='flex items-center'>{rightIcon}</span>}
      </>
    )

    return (
      <Link
        className={cn(
          buttonVariants({ variant, size: resolvedSize, shape, className })
        )}
        href={href}
        ref={ref}
        {...props}
      >
        {content}
      </Link>
    )
  }
)
LinkButton.displayName = 'LinkButton'

// Link Button with Arrow Component - FIXED VERSION
export interface LinkButtonWithArrowProps
  extends Omit<LinkButtonProps, 'rightIcon'> {
  arrowIcon?: 'chevron' | 'arrow'
  showArrow?: boolean
}

const LinkButtonWithArrow = React.forwardRef<
  HTMLAnchorElement,
  LinkButtonWithArrowProps
>(
  (
    {
      className,
      variant = 'link',
      size,
      shape,
      href,
      children,
      leftIcon,
      arrowIcon = 'chevron',
      showArrow = true,
      ...props
    },
    ref
  ) => {
    // Simple inline SVG icons to avoid external dependencies
    const ChevronRight = () => (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='9 18 15 12 9 6' />
      </svg>
    )

    const ArrowRight = () => (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <line x1='5' y1='12' x2='19' y2='12' />
        <polyline points='12 5 19 12 12 19' />
      </svg>
    )

    const resolvedSize = size ?? (variant === 'link' ? 'link' : undefined)

    const rightIcon = showArrow ? (
      arrowIcon === 'arrow' ? (
        <ArrowRight />
      ) : (
        <ChevronRight />
      )
    ) : null

    // FIXED: Simplified content structure to remove extra wrapper and padding
    const content = (
      <>
        {leftIcon && <span className='flex items-center'>{leftIcon}</span>}
        {children}
        {rightIcon && (
          <span className='inline-block ml-1 transition-transform group-hover:translate-x-1'>
            {rightIcon}
          </span>
        )}
      </>
    )

    return (
      <Link
        className={cn(
          buttonVariants({ variant, size: resolvedSize, shape, className }),
          'group'
        )}
        href={href}
        ref={ref}
        {...props}
      >
        {content}
      </Link>
    )
  }
)
LinkButtonWithArrow.displayName = 'LinkButtonWithArrow'

// Text Button with Arrow (non-link version)
export interface TextButtonWithArrowProps
  extends Omit<ButtonProps, 'rightIcon'> {
  arrowIcon?: 'chevron' | 'arrow'
  showArrow?: boolean
}

const TextButtonWithArrow = React.forwardRef<
  HTMLButtonElement,
  TextButtonWithArrowProps
>(
  (
    {
      className,
      variant = 'link',
      size,
      shape,
      children,
      leftIcon,
      arrowIcon = 'chevron',
      showArrow = true,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    // Simple inline SVG icons
    const ChevronRight = () => (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='9 18 15 12 9 6' />
      </svg>
    )

    const ArrowRight = () => (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <line x1='5' y1='12' x2='19' y2='12' />
        <polyline points='12 5 19 12 12 19' />
      </svg>
    )

    const resolvedSize = size ?? (variant === 'link' ? 'link' : undefined)

    const rightIcon =
      showArrow && !loading ? (
        arrowIcon === 'arrow' ? (
          <ArrowRight />
        ) : (
          <ChevronRight />
        )
      ) : null

    const content = loading ? (
      <>
        <svg
          className='animate-spin -ml-1 mr-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
        Loading...
      </>
    ) : (
      <>
        {leftIcon && <span className='flex items-center'>{leftIcon}</span>}
        <span className='inline-flex items-center gap-1 group'>
          {children}
          {rightIcon && (
            <span className='inline-block transition-transform group-hover:translate-x-1'>
              {rightIcon}
            </span>
          )}
        </span>
      </>
    )

    return (
      <button
        className={cn(
          buttonVariants({ variant, size: resolvedSize, shape, className }),
          'group'
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {content}
      </button>
    )
  }
)
TextButtonWithArrow.displayName = 'TextButtonWithArrow'

export {
  Button,
  LinkButton,
  LinkButtonWithArrow,
  TextButtonWithArrow,
  buttonVariants,
}
