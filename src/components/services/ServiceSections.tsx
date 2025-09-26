import type { ReactNode } from 'react'
import OptimizedImage from '@/components/ui/OptimizedImage'
import type { ServiceTheme } from '@/utils/serviceThemes'

interface ServiceHeroProps {
  theme: ServiceTheme
  eyebrow?: string
  title: string
  description: string
  subtitle?: string
  price?: string
  layout?: 'center' | 'split'
  kicker?: string
  image?: {
    src: string
    alt: string
    priority?: boolean
  }
  children?: ReactNode
}

export function ServiceHero({
  theme,
  eyebrow,
  title,
  description,
  subtitle,
  price,
  layout = 'center',
  kicker,
  image,
  children,
}: ServiceHeroProps) {
  const textColor = theme.textColor
  const mutedColor = theme.mutedTextColor

  if (layout === 'split') {
    return (
      <section className='mb-16 lg:mb-24'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center'>
          <div className='space-y-6'>
            {eyebrow ? (
              <p
                className='text-xs font-semibold uppercase tracking-[0.3em]'
                style={{ color: mutedColor }}
              >
                {eyebrow}
              </p>
            ) : null}
            <h1
              className='font-heading text-4xl leading-tight md:text-5xl lg:text-6xl'
              style={{ color: textColor }}
            >
              {title}
            </h1>
            <p
              className='text-lg leading-relaxed md:text-xl'
              style={{ color: mutedColor }}
            >
              {description}
            </p>
            {subtitle ? (
              <p
                className='text-sm text-muted-foreground md:text-base'
                style={{ color: mutedColor }}
              >
                {subtitle}
              </p>
            ) : null}
            {kicker ? (
              <p
                className='text-sm font-medium uppercase tracking-wide'
                style={{ color: textColor }}
              >
                {kicker}
              </p>
            ) : null}
            {children}
            {price ? (
              <p
                className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'
                style={{ color: mutedColor }}
              >
                Starting at {price}
              </p>
            ) : null}
          </div>
          {image ? (
            <div className='relative'>
              <div
                className='relative overflow-hidden rounded-3xl border'
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                }}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  aspectRatio='video'
                  priority={image.priority}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section className='mb-16 lg:mb-24 text-center'>
      <div className='mx-auto flex max-w-4xl flex-col gap-6'>
        {eyebrow ? (
          <p
            className='text-xs font-semibold uppercase tracking-[0.3em]'
            style={{ color: mutedColor }}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          className='font-heading text-4xl leading-tight md:text-5xl lg:text-6xl'
          style={{ color: textColor }}
        >
          {title}
        </h1>
        <p
          className='text-lg leading-relaxed md:text-xl'
          style={{ color: mutedColor }}
        >
          {description}
        </p>
        {subtitle ? (
          <p
            className='mx-auto max-w-2xl text-sm text-muted-foreground md:text-base'
            style={{ color: mutedColor }}
          >
            {subtitle}
          </p>
        ) : null}
        {kicker ? (
          <p
            className='text-sm font-semibold uppercase tracking-wide'
            style={{ color: textColor }}
          >
            {kicker}
          </p>
        ) : null}
      </div>
      {image ? (
        <div className='mt-12 flex justify-center'>
          <div
            className='relative w-full max-w-4xl overflow-hidden rounded-3xl border'
            style={{
              borderColor: theme.border,
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            }}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              aspectRatio='video'
              priority={image.priority}
            />
          </div>
        </div>
      ) : null}
      {children ? <div className='mt-12'>{children}</div> : null}
      {price ? (
        <p
          className='mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground'
          style={{ color: mutedColor }}
        >
          Starting at {price}
        </p>
      ) : null}
    </section>
  )
}

interface ServiceStatListProps {
  theme: ServiceTheme
  items: Array<{
    value: string
    label: string
    detail?: string
  }>
  columns?: 2 | 3 | 4
}

export function ServiceStatList({
  theme,
  items,
  columns = 3,
}: ServiceStatListProps) {
  const textColor = theme.textColor
  const mutedColor = theme.mutedTextColor
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns]

  return (
    <div
      className={`grid gap-6 rounded-3xl border p-6 md:p-10 ${gridCols}`}
      style={{
        borderColor: theme.border,
        backgroundColor: theme.isDark
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(0, 0, 0, 0.04)',
      }}
    >
      {items.map((item, index) => (
        <div key={index} className='space-y-2'>
          <p
            className='text-3xl font-bold md:text-4xl'
            style={{ color: textColor }}
          >
            {item.value}
          </p>
          <p
            className='text-sm uppercase tracking-wide'
            style={{ color: mutedColor }}
          >
            {item.label}
          </p>
          {item.detail ? (
            <p
              className='text-sm leading-relaxed'
              style={{ color: mutedColor }}
            >
              {item.detail}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

interface ServiceCardGridProps {
  theme: ServiceTheme
  items: Array<{
    title: string
    eyebrow?: string
    description?: string
    bullets?: string[]
    footnote?: string
  }>
  columns?: 2 | 3 | 4
  compact?: boolean
}

export function ServiceCardGrid({
  theme,
  items,
  columns = 3,
  compact = false,
}: ServiceCardGridProps) {
  const textColor = theme.textColor
  const mutedColor = theme.mutedTextColor
  const isDark = theme.isDark

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns]

  return (
    <div className={`grid gap-6 md:gap-8 ${gridCols}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-3xl border p-6 transition-transform duration-300 ${
            compact ? 'space-y-4' : 'space-y-6'
          }`}
          style={{
            borderColor: theme.border,
            backgroundColor: isDark
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.05)',
          }}
        >
          {item.eyebrow ? (
            <p
              className='text-xs font-semibold uppercase tracking-[0.2em]'
              style={{ color: mutedColor }}
            >
              {item.eyebrow}
            </p>
          ) : null}
          <h3 className='text-xl font-semibold' style={{ color: textColor }}>
            {item.title}
          </h3>
          {item.description ? (
            <p
              className='text-sm leading-relaxed'
              style={{ color: mutedColor }}
            >
              {item.description}
            </p>
          ) : null}
          {item.bullets ? (
            <ul className='space-y-2 text-sm' style={{ color: mutedColor }}>
              {item.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className='flex gap-2'>
                  <span style={{ color: textColor }}>•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {item.footnote ? (
            <p
              className='text-xs uppercase tracking-wide'
              style={{ color: mutedColor }}
            >
              {item.footnote}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

interface ServiceTimelineProps {
  theme: ServiceTheme
  items: Array<{
    title: string
    duration?: string
    description: string
  }>
}

export function ServiceTimeline({ theme, items }: ServiceTimelineProps) {
  const textColor = theme.textColor
  const mutedColor = theme.mutedTextColor

  return (
    <div className='relative space-y-10 md:space-y-12'>
      <div
        className='absolute left-4 top-2 bottom-2 hidden w-px md:left-1/2 md:-translate-x-1/2 md:block'
        style={{
          backgroundColor: theme.isDark
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)',
        }}
      />
      {items.map((item, index) => (
        <div
          key={index}
          className='relative flex flex-col gap-4 md:flex-row md:items-start md:gap-12'
        >
          <div className='relative flex w-full items-center gap-4 pl-12 md:w-1/2 md:justify-end md:pl-0'>
            <span
              className='absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border md:left-1/2 md:h-10 md:w-10 md:-translate-x-1/2'
              style={{
                borderColor: theme.border,
                backgroundColor: theme.bg,
                color: textColor,
              }}
            >
              {index + 1}
            </span>
            <div className='flex flex-col text-left md:text-right'>
              <h3
                className='text-lg font-semibold'
                style={{ color: textColor }}
              >
                {item.title}
              </h3>
              {item.duration ? (
                <p
                  className='text-xs uppercase tracking-wide'
                  style={{ color: mutedColor }}
                >
                  {item.duration}
                </p>
              ) : null}
            </div>
          </div>
          <div
            className='rounded-3xl border p-6 md:w-1/2'
            style={{
              borderColor: theme.border,
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            }}
          >
            <p
              className='text-sm leading-relaxed'
              style={{ color: mutedColor }}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

interface ServiceSplitSectionProps {
  theme: ServiceTheme
  eyebrow?: string
  title: string
  description?: string
  bullets?: string[]
  kicker?: string
  reverse?: boolean
  tone?: 'solid' | 'muted' | 'transparent'
  image?: {
    src: string
    alt: string
  }
  children?: ReactNode
}

export function ServiceSplitSection({
  theme,
  eyebrow,
  title,
  description,
  bullets,
  kicker,
  reverse = false,
  tone = 'muted',
  image,
  children,
}: ServiceSplitSectionProps) {
  const textColor = theme.textColor
  const mutedColor = theme.mutedTextColor

  const backgroundColor =
    tone === 'transparent'
      ? 'transparent'
      : tone === 'solid'
        ? theme.bg
        : theme.isDark
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(0, 0, 0, 0.04)'

  const content = (
    <div className={`space-y-6 ${reverse ? 'lg:order-2' : ''}`}>
      {eyebrow ? (
        <p
          className='text-xs font-semibold uppercase tracking-[0.25em]'
          style={{ color: mutedColor }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className='text-3xl font-semibold md:text-4xl'
        style={{ color: textColor }}
      >
        {title}
      </h2>
      {description ? (
        <p
          className='text-base leading-relaxed md:text-lg'
          style={{ color: mutedColor }}
        >
          {description}
        </p>
      ) : null}
      {bullets ? (
        <ul
          className='space-y-2 text-sm md:text-base'
          style={{ color: mutedColor }}
        >
          {bullets.map((bullet, index) => (
            <li key={index} className='flex gap-3'>
              <span className='mt-1 text-lg' style={{ color: textColor }}>
                •
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {children}
      {kicker ? (
        <p
          className='text-sm uppercase tracking-wide'
          style={{ color: textColor }}
        >
          {kicker}
        </p>
      ) : null}
    </div>
  )

  return (
    <section
      className='rounded-3xl border p-6 md:p-12'
      style={{
        borderColor: tone === 'transparent' ? 'transparent' : theme.border,
        backgroundColor,
      }}
    >
      <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]'>
        {content}
        {image ? (
          <div
            className={`overflow-hidden rounded-3xl border ${reverse ? 'lg:order-1' : ''}`}
            style={{
              borderColor: theme.border,
              backgroundColor: theme.isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            }}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              aspectRatio='video'
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
