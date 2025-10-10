import React from 'react'
import { cn } from '@/lib/utils'

interface BlogTableProps {
  data: {
    headers: string[]
    rows: string[][]
  }
  className?: string
}

/**
 * BlogTable component for rendering data tables in blog posts
 * Automatically respects the blog layout narrow constraint (65% width, 25% left margin)
 * Mobile-responsive with horizontal scrolling
 *
 * @example
 * <BlogTable
 *   data={{
 *     headers: ["Column 1", "Column 2"],
 *     rows: [["Data 1", "Data 2"], ["Data 3", "Data 4"]]
 *   }}
 * />
 */
export default function BlogTable({ data, className }: BlogTableProps) {
  return (
    <div
      data-blog-layout='narrow'
      className={cn('overflow-x-auto mb-6', className)}
    >
      <table className='w-full border-collapse rounded-lg border border-border/60'>
        <thead className='bg-muted/50'>
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                className='px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider text-foreground border-b border-border'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-border bg-background'>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className='hover:bg-muted/30 transition-colors'>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className='px-4 py-3 text-foreground/90 text-sm'
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
