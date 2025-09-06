'use client'

import { useMDXComponents } from '@/components/mdx-components'
import { getMDXComponent } from 'next-contentlayer2/hooks'

interface MDXContentWrapperProps {
  code: string
}

export default function MDXContentWrapper({ code }: MDXContentWrapperProps) {
  const MDXContent = getMDXComponent(code)
  const mdxComponents = useMDXComponents({})
  
  return (
    <div className='prose max-w-none mb-12'>
      <MDXContent components={mdxComponents} />
    </div>
  )
}
