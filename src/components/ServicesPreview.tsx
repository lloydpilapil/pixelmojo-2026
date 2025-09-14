'use client'

import React, { useState } from 'react'

interface ServiceItem {
  title: string
  description: string
  details: string[]
}

interface ServicesPreviewProps {
  title?: string
  services?: ServiceItem[]
}

const ServicesPreview = ({
  title = 'Our Services',
  services = [
    {
      title: 'UI/UX Design Solutions',
      description:
        'User-centered design that drives engagement and conversions',
      details: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Interaction Design',
        'Usability Testing',
      ],
    },
    {
      title: 'Brand Identity',
      description: 'Comprehensive brand design that tells your story',
      details: [
        'Logo Design & Guidelines',
        'Brand Strategy & Positioning',
        'Visual Identity Systems',
        'Brand Voice & Messaging',
      ],
    },
    {
      title: 'Brand Activation & Growth',
      description: 'Strategic campaigns that amplify your brand presence',
      details: [
        'Marketing Campaign Design',
        'Social Media Strategy',
        'Content Creation & Planning',
        'Growth Marketing Tactics',
      ],
    },
    {
      title: 'Web & App Design',
      description: 'Digital experiences that perform and delight users',
      details: [
        'Responsive Web Design',
        'Mobile App Interfaces',
        'Progressive Web Apps',
        'E-commerce Solutions',
      ],
    },
    {
      title: 'Graphic & Visuals',
      description: 'Visual assets that communicate and captivate',
      details: [
        'Print & Digital Graphics',
        'Illustration & Iconography',
        'Marketing Collateral',
        'Presentation Design',
      ],
    },
    {
      title: 'Development Solutions',
      description: 'Robust technical implementation that scales',
      details: [
        'Frontend Development',
        'Backend Architecture',
        'CMS Integration',
        'Performance Optimization',
      ],
    },
  ],
}: ServicesPreviewProps) => {
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(
    services[0]
  )

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center mb-16'>{title}</h2>

        <div className='grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto'>
          {/* Left Column - Services List */}
          <div className='space-y-4'>
            {services.map((service, index) => (
              <div
                key={index}
                className='card p-6 cursor-pointer transition-all duration-300 hover:shadow-lg'
                onMouseEnter={() => setHoveredService(service)}
              >
                <h3 className='mb-2'>{service.title}</h3>
                <p className='text-muted'>{service.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Service Details */}
          <div className='card p-8'>
            {hoveredService && (
              <div>
                <h3 className='mb-6'>{hoveredService.title}</h3>
                <div className='space-y-3'>
                  {hoveredService.details.map((detail, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <span className='text-primary mt-1'>•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
