import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollVideoSection from '@/components/ScrollVideoSection'

export const metadata: Metadata = {
  title: 'About Pixelmojo | Strategic Design for Growth-Driven Teams',
  description:
    'Led by Lloyd Pilapil, Pixelmojo blends enterprise strategy with startup speed to deliver high-impact UI/UX, product design, and growth-ready digital solutions.',
  openGraph: {
    title: 'About Pixelmojo | Strategic Design for Growth-Driven Teams',
    description:
      'Led by Lloyd Pilapil, Pixelmojo blends enterprise strategy with startup speed to deliver high-impact UI/UX, product design, and growth-ready digital solutions.',
    type: 'website',
  },
}

const aboutHighlights = [
  {
    title: 'Design-Led Engineering',
    description:
      'Translating validated user insights into cohesive systems, interfaces, and production-ready code.',
    features: [
      'UI/UX systems that scale across products',
      'Component libraries engineered for reuse',
      'Pixel-perfect implementation with accessibility in mind',
      'Design QA baked into delivery rituals',
    ],
    icon: '/ui_ux_design_solutions_services_thumb.svg',
    href: '/portfolio',
    cta: 'View project work',
  },
  {
    title: 'Product Strategy & Leadership',
    description:
      'Partnering with founders and product teams to align vision, roadmap, and delivery for measurable outcomes.',
    features: [
      'Research-informed product roadmaps',
      'Executive and stakeholder alignment',
      'North-star metrics tied to execution',
      'Prioritization frameworks that unlock focus',
    ],
    icon: '/branding_services_thumb.svg',
    href: '/services',
    cta: 'Explore strategy approach',
  },
  {
    title: 'Integrated Growth Systems',
    description:
      'Breaking down silos by uniting brand, design, engineering, and growth into one momentum-building engine.',
    features: [
      'Cross-functional rituals that ship faster',
      'Analytics loops for every release',
      'Campaigns connected to product moments',
      'Documentation that scales knowledge',
    ],
    icon: '/digital_marketing_services_thumb.svg',
    href: '/services/brand-activation-growth',
    cta: 'Align your growth ops',
  },
  {
    title: 'Full-Stack Craft',
    description:
      'Modern web engineering across the stack to ensure performance, maintainability, and joyful experiences.',
    features: [
      'React, Next.js, and TypeScript expertise',
      'API, CMS, and data integration patterns',
      'Performance & accessibility from day one',
      'CI/CD automation with observable workflows',
    ],
    icon: '/web_app_design_services_thumb.svg',
    href: '/services/development-solutions',
    cta: 'Review technical craft',
  },
  {
    title: 'Client Partnerships',
    description:
      'Long-term collaborations that turn ambitious roadmaps into shipped products and compounding value.',
    features: [
      '5+ years delivering enterprise-grade outcomes',
      '30+ multi-disciplinary launches across sectors',
      'Global collaboration across time zones',
      'Fractional and embedded leadership models',
    ],
    icon: '/creative_contents_services_thumb.svg',
    href: '/contact',
    cta: 'Start a partnership',
  },
  {
    title: 'Mentorship & Community',
    description:
      'Giving back through teaching, coaching, and building spaces for designers and engineers to grow.',
    features: [
      'Team coaching and enablement programs',
      'Playbooks for scaling design & dev orgs',
      'Workshops, talks, and community sessions',
      '1:1 mentorship for emerging talent',
    ],
    icon: '/graphic_visual_design_services_thumb.svg',
    href: '/contact',
    cta: 'Schedule a session',
  },
]

const experienceTimeline = [
  {
    period: '2024 — Present',
    company: 'Pixelmojo',
    role: 'Founder & Creative Visionary',
    description:
      'Leading a design-driven agency focused on high-impact digital solutions for SaaS, fintech, and high-growth companies. Driving digital strategy, branding, and user experience innovation while spearheading business growth through conversion-optimized design, scalable systems, and strategic content.',
  },
  {
    period: '2015 – 2023',
    company: 'Salesforce & Global Enterprises',
    role: 'UX Lead & Digital Strategist',
    description:
      'Led UX initiatives for large-scale infrastructure and enterprise SaaS projects. Specialized in optimizing complex user flows, increasing engagement by 20%, and implementing automated design systems that reduced project delivery time by 30%.',
  },
  {
    period: '2004 – 2014',
    company: 'Digital Transformation Era',
    role: 'Director of UX & Design',
    description:
      'Drove digital transformation for government and corporate clients, streamlining workflows to improve operational efficiency by 40% and leading flagship design projects that generated 30% revenue increases.',
  },
  {
    period: '2001 – 2004',
    company: 'Digital Renaissance',
    role: 'Senior UI/UX & Digital Product Designer',
    description:
      'Transitioned from traditional design to digital experiences during the early web boom, mastering front-end development, web design, and UX to create user-friendly digital platforms that set new standards for usability.',
  },
  {
    period: '1991 – 2001',
    company: 'Creative Foundation',
    role: 'Art Director & Graphic Designer',
    description:
      'Built a strong foundation in visual arts, focusing on branding, print media, and creative direction while mastering composition, typography, and brand storytelling.',
  },
]

export default function About() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading'>About Pixelmojo</h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          Strategic product design and engineering leadership from Lloyd
          Pilapil—aligning vision, execution, and measurable growth.
        </p>
      </div>

      {/* Scroll-Animated Video Section */}
      <ScrollVideoSection
        videoId='1098766945'
        coverImage='/video-cover-02.webp'
      />

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 max-w-4xl mx-auto leading-snug !text-4xl md:!text-5xl lg:!text-6xl'>
          Where Fortune 500 Strategy Meets Startup Agility
        </h2>
        <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
          After 20+ years working with global enterprises and scaling startups,
          I built Pixelmojo to fix a critical gap: combining enterprise-level
          strategic thinking with the speed and innovation growing businesses
          need. We deliver high-impact digital solutions that drive sustainable
          growth.
        </p>
        <h2 className='mt-10 mb-4 text-3xl font-heading'>Our Mission</h2>
        <p className='text-muted max-w-4xl mx-auto text-lg leading-relaxed'>
          We believe every digital touchpoint should drive measurable business
          growth. We don't just create beautiful designs—we architect complete
          growth ecosystems that turn your digital presence into a powerful
          engine for sustainable success. We design for impact. We build for
          ROI.
        </p>
        <div className='mt-12 max-w-5xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center shadow-sm'>
          <h3 className='font-heading text-2xl md:text-3xl mb-4 text-primary'>
            What Pixelmojo Means
          </h3>
          <p className='text-muted-foreground leading-relaxed max-w-4xl mx-auto text-lg'>
            Our name reflects our philosophy: every{' '}
            <span className='font-extrabold text-[#3CC29E]'>pixel</span> we
            design and every{' '}
            <span className='font-extrabold text-[#F48024]'>mojo</span>—that
            spark of innovation—we bring serves one purpose: driving your
            business growth. The intersecting elements in our logo represent the
            convergence of strategy, design, and technology into unified
            solutions that actually work.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className='mt-16 max-w-6xl mx-auto'>
          <h2 className='text-center font-heading text-3xl md:text-4xl mb-16 md:mb-20'>
            Three Decades of Design, Innovation & Digital Transformation
          </h2>

          <div className='space-y-16 md:space-y-20'>
            {experienceTimeline.map((entry, index) => (
              <div
                key={`${entry.period}-${index}`}
                className='text-center space-y-4'
              >
                <h3
                  className='text-lg md:text-xl font-semibold'
                  style={{ color: '#3CC29E' }}
                >
                  {entry.period}
                </h3>
                <div>
                  <h4 className='text-xl md:text-2xl font-heading text-foreground mb-2'>
                    {entry.company}
                  </h4>
                  <p className='text-lg font-medium text-muted-foreground mb-4'>
                    {entry.role}
                  </p>
                </div>
                <p className='text-muted leading-relaxed max-w-2xl mx-auto'>
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20'>
        {aboutHighlights.map((highlight, index) => (
          <Link
            key={index}
            href={highlight.href}
            className='group block h-full'
          >
            <div className='h-full bg-card rounded-2xl border border-border p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1'>
              {/* Icon */}
              <div className='w-16 h-16 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110'>
                <Image
                  src={highlight.icon}
                  alt={highlight.title}
                  width={64}
                  height={64}
                  className='w-16 h-16'
                />
              </div>

              {/* Content */}
              <div className='space-y-4 mb-6'>
                <h3 className='group-hover:text-primary transition-colors duration-300'>
                  {highlight.title}
                </h3>
                <p className='text-muted leading-relaxed'>
                  {highlight.description}
                </p>
              </div>

              {/* Features */}
              <div className='space-y-3 mb-6'>
                {highlight.features.map((feature, idx) => (
                  <div key={idx} className='flex items-start gap-3'>
                    <div className='flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5'>
                      <div className='w-2 h-2 rounded-full bg-primary' />
                    </div>
                    <span className='text-sm text-foreground'>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className='flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300'>
                <span>{highlight.cta ?? 'Learn more'}</span>
                <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
