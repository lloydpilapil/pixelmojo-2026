import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Services | Lloyd Pilapil',
  description: 'Comprehensive web development and design services to bring your digital vision to life.',
  openGraph: {
    title: 'Services | Lloyd Pilapil',
    description: 'Comprehensive web development and design services.',
    type: 'website',
  },
}

export default function Services() {
  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      features: ['React/Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimization'],
      icon: '🚀',
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design solutions that combine aesthetics with functionality.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      icon: '🎨',
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Complete online store setups with payment processing and inventory management.',
      features: ['Shopify', 'WooCommerce', 'Payment Integration', 'SEO Optimization'],
      icon: '🛒',
    },
    {
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications that work seamlessly on iOS and Android.',
      features: ['React Native', 'Progressive Web Apps', 'App Store Deployment', 'Push Notifications'],
      icon: '📱',
    },
    {
      title: 'API Development',
      description: 'Robust backend solutions and API integrations for your applications.',
      features: ['RESTful APIs', 'GraphQL', 'Database Design', 'Third-party Integrations'],
      icon: '⚡',
    },
    {
      title: 'Consulting & Strategy',
      description: 'Technical guidance and strategic planning for your digital projects.',
      features: ['Code Reviews', 'Architecture Planning', 'Tech Stack Selection', 'Performance Audits'],
      icon: '💡',
    },
  ]

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-20'>
        <h1 className='mb-6 font-heading'>Services</h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          From concept to deployment, I offer comprehensive web development services
          tailored to your unique needs. Let's build something amazing together.
        </p>
      </div>

      {/* Services Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
        {services.map((service, index) => (
          <div
            key={index}
            className='card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
          >
            <div className='text-4xl mb-4'>{service.icon}</div>
            <h3 className='text-xl font-bold mb-3 font-heading'>{service.title}</h3>
            <p className='text-muted-foreground mb-6'>{service.description}</p>
            <ul className='space-y-2'>
              {service.features.map((feature, idx) => (
                <li key={idx} className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>✓</span>
                  <span className='text-sm'>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Process Section */}
      <div className='mb-20'>
        <h2 className='text-center mb-12 font-heading'>My Process</h2>
        <div className='grid md:grid-cols-4 gap-8'>
          {[
            { step: '01', title: 'Discovery', desc: 'Understanding your goals and requirements' },
            { step: '02', title: 'Planning', desc: 'Creating a roadmap and choosing the right tools' },
            { step: '03', title: 'Development', desc: 'Building your solution with clean, scalable code' },
            { step: '04', title: 'Delivery', desc: 'Testing, deployment, and ongoing support' },
          ].map((phase, index) => (
            <div key={index} className='text-center'>
              <div className='text-5xl font-bold text-primary/20 mb-4'>{phase.step}</div>
              <h3 className='font-bold mb-2 font-heading'>{phase.title}</h3>
              <p className='text-sm text-muted-foreground'>{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className='text-center bg-muted/30 rounded-2xl p-12'>
        <h2 className='mb-4 font-heading'>Ready to Start Your Project?</h2>
        <p className='text-large text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Let's discuss how I can help bring your ideas to life with modern web technologies
          and thoughtful design.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <LinkButton href='/contact-us' variant='default' shape='pill' size='lg'>
            Get Started
          </LinkButton>
          <LinkButton href='/works' variant='outline' shape='pill' size='lg'>
            View My Works
          </LinkButton>
        </div>
      </div>
    </div>
  )
}