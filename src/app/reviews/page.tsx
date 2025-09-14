import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Client Testimonials | Results-Driven Design by Pixelmojo',
  description:
    'Hear from startups and enterprise teams who partnered with Pixelmojo. Real stories of how our design and strategy delivered impact, growth, and ROI.',
  openGraph: {
    title: 'Client Testimonials | Results-Driven Design by Pixelmojo',
    description:
      'Hear from startups and enterprise teams who partnered with Pixelmojo. Real stories of how our design and strategy delivered impact, growth, and ROI.',
    type: 'website',
  },
}

export default function Reviews() {
  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechStart Manila',
      company: 'TechStart Manila',
      rating: 5,
      review:
        'Lloyd transformed our outdated website into a modern, high-performing platform. His attention to detail and technical expertise exceeded our expectations. The new site has increased our conversion rate by 40%.',
      project: 'E-Commerce Platform',
      avatar: '👩‍💼',
    },
    {
      name: 'Michael Santos',
      role: 'Product Manager',
      company: 'FinTech Solutions PH',
      rating: 5,
      review:
        'Working with Lloyd was a game-changer for our startup. He not only delivered a beautiful product but also provided valuable insights on user experience and performance optimization.',
      project: 'Financial Dashboard',
      avatar: '👨‍💻',
    },
    {
      name: 'Jessica Reyes',
      role: 'Marketing Director',
      company: 'Creative Agency BGC',
      rating: 5,
      review:
        "Lloyd's ability to translate our creative vision into a functional website was impressive. He communicated clearly throughout the project and delivered on time and within budget.",
      project: 'Agency Portfolio',
      avatar: '👩‍🎨',
    },
    {
      name: 'David Lim',
      role: 'Founder',
      company: 'EduTech Philippines',
      rating: 5,
      review:
        'The learning management system Lloyd built for us has been instrumental in our growth. His code is clean, well-documented, and easy to maintain. Highly recommended!',
      project: 'Learning Platform',
      avatar: '👨‍🏫',
    },
    {
      name: 'Maria Garcia',
      role: 'Operations Manager',
      company: 'Local Retail Chain',
      rating: 5,
      review:
        'Lloyd helped us transition from offline to online seamlessly. His e-commerce solution integrated perfectly with our existing systems. Sales have increased by 60% since launch.',
      project: 'Retail E-Commerce',
      avatar: '👩‍💼',
    },
    {
      name: 'Alex Tan',
      role: 'CTO',
      company: 'StartupHub Cebu',
      rating: 5,
      review:
        "As a fellow developer, I appreciate Lloyd's clean code and modern approach. He's not just a coder but a problem solver who thinks about the bigger picture.",
      project: 'SaaS Platform',
      avatar: '👨‍💻',
    },
  ]

  const stats = [
    { label: 'Happy Clients', value: '50+' },
    { label: 'Projects Completed', value: '100+' },
    { label: 'Average Rating', value: '5.0' },
    { label: 'Client Retention', value: '95%' },
  ]

  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-20'>
        <h1 className='mb-6 font-heading'>Client Reviews</h1>
        <p className='lead max-w-3xl mx-auto mb-12'>
          Don't just take my word for it. Here's what clients have to say about
          working with me on their digital projects.
        </p>

        {/* Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto'>
          {stats.map((stat, index) => (
            <div key={index} className='text-center'>
              <div className='text-3xl font-bold text-primary mb-2'>
                {stat.value}
              </div>
              <div className='text-sm text-muted-foreground'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
        {reviews.map((review, index) => (
          <div
            key={index}
            className='card p-8 hover:shadow-xl transition-all duration-300'
          >
            {/* Rating Stars */}
            <div className='flex gap-1 mb-4'>
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className='text-yellow-500'>
                  ★
                </span>
              ))}
            </div>

            {/* Review Text */}
            <p className='text-muted-foreground mb-6 italic'>
              "{review.review}"
            </p>

            {/* Reviewer Info */}
            <div className='border-t pt-4'>
              <div className='flex items-center gap-3'>
                <div className='text-3xl'>{review.avatar}</div>
                <div>
                  <div className='font-semibold'>{review.name}</div>
                  <div className='text-sm text-muted-foreground'>
                    {review.role}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {review.company}
                  </div>
                </div>
              </div>
              <div className='mt-3 text-xs text-primary'>
                Project: {review.project}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Highlight */}
      <div className='bg-muted/30 rounded-2xl p-12 mb-20 text-center'>
        <h2 className='mb-8 font-heading'>Featured Testimonial</h2>
        <blockquote className='text-xl italic mb-8 max-w-3xl mx-auto'>
          "Lloyd is not just a developer; he's a true partner in bringing
          digital visions to life. His combination of technical excellence,
          creative problem-solving, and professional communication makes him
          stand out in the industry. I wouldn't hesitate to work with him
          again."
        </blockquote>
        <div className='flex items-center justify-center gap-3'>
          <span className='text-3xl'>🌟</span>
          <div className='text-left'>
            <div className='font-semibold'>Patricia Martinez</div>
            <div className='text-sm text-muted-foreground'>
              Chief Digital Officer, Enterprise Corp
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='text-center'>
        <h2 className='mb-4 font-heading'>
          Ready to Be My Next Success Story?
        </h2>
        <p className='text-large text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Join the growing list of satisfied clients who have transformed their
          digital presence with modern web solutions.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <LinkButton
            href='/contact-us'
            variant='default'
            shape='pill'
            size='lg'
          >
            Start Your Project
          </LinkButton>
          <LinkButton href='/services' variant='outline' shape='pill' size='lg'>
            View Services
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
