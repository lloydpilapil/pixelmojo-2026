'use client'

import { useState } from 'react'
import { PortfolioCard } from '@/components/FeaturedWorks'
import { getAllWorks } from '@/data/works'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function WorksClient() {
  const [showAll, setShowAll] = useState(false)
  const works = getAllWorks()
  const initialCount = 4
  const displayedWorks = showAll ? works : works.slice(0, initialCount)
  const hasMoreWorks = works.length > initialCount

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div className='text-center mb-20'>
          <h1 className='mb-6 font-heading'>Our Projects</h1>
          <p className='lead max-w-3xl mx-auto mb-8'>
            Real results from our AI-native approach. Client work and innovative
            products that prove the power of unified intelligence over
            traditional agency chaos.
          </p>
        </div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8 max-w-7xl mx-auto mb-12'>
          {displayedWorks.map((work, index) => (
            <PortfolioCard
              key={work.slug}
              work={work}
              index={index}
              layout='grid'
            />
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMoreWorks && (
          <div className='text-center'>
            <Button
              variant='outline'
              size='lg'
              onClick={() => setShowAll(!showAll)}
              className='group relative overflow-hidden transition-all duration-300'
            >
              <span className='flex items-center gap-2'>
                {showAll ? (
                  <>
                    Show Less
                    <ChevronUp className='w-4 h-4 transition-transform group-hover:-translate-y-0.5' />
                  </>
                ) : (
                  <>
                    View More Projects
                    <ChevronDown className='w-4 h-4 transition-transform group-hover:translate-y-0.5' />
                  </>
                )}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
