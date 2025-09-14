'use client'

import React from 'react'
import { LinkButton } from '@/components/ui/button'

interface CTACardProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  className?: string
}

const CTACard = ({
  title = 'Ready to Stop the Digital Chaos?',
  description = "Let's turn your disconnected systems into one powerful growth engine.",
  buttonText = 'Get Your Strategy Session',
  buttonHref = '/contact-us',
  className = '',
}: CTACardProps) => {
  return (
    <section className={`py-20 ${className}`}>
      <div className='container mx-auto px-4'>
        <div className='relative overflow-hidden rounded-3xl p-12 text-center text-white max-w-4xl mx-auto bg-gradient-to-br from-cta via-cta/90 to-cta/70 animate-gradient'>
          {/* Gradient Animation Styles */}
          <style jsx>{`
            .animate-gradient {
              background: linear-gradient(
                125deg,
                #8c1b4c,
                #b32a6c,
                #e54b8c,
                #f472b6
              );
              background-size: 300% 300%;
              animation: sophisticated-gradient 20s ease infinite;
              box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.2);
            }

            @keyframes sophisticated-gradient {
              0% {
                background-position: 0% 50%;
              }
              25% {
                background-position: 100% 0%;
              }
              50% {
                background-position: 100% 100%;
              }
              75% {
                background-position: 0% 100%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}</style>

          <h2 className='mb-6 text-white'>{title}</h2>

          <p className='text-large text-white/95 mb-8 max-w-2xl mx-auto'>
            {description}
          </p>

          <LinkButton
            href={buttonHref}
            variant='outline'
            size='lg'
            shape='pill'
            className='border-white text-white hover:bg-white hover:text-cta transition-all duration-300'
          >
            {buttonText}
          </LinkButton>
        </div>
      </div>
    </section>
  )
}

export default CTACard
