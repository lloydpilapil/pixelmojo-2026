import React from 'react'
import { cn } from '@/lib/utils'

interface TLDRProps {
  title?: string
  points: string[]
  className?: string
}

export function TLDR({ 
  title = "TL;DR", 
  points, 
  className 
}: TLDRProps) {
  if (!points || points.length === 0) {
    return null
  }

  return (
    <div className={cn('my-8', className)}>
      <h2 className='font-semibold text-primary mb-3'>{title}</h2>
      
      <ul className='space-y-2'>
        {points.map((point, index) => (
          <li key={index} className='flex items-start gap-3 text-sm'>
            <span className='flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2'></span>
            <span className='text-foreground leading-relaxed'>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TLDR