import type { Metadata } from 'next'
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

const experienceTimeline = [
  {
    period: '2024 — Present',
    company: 'Pixelmojo',
    role: 'Founder & Creative Visionary',
    description:
      'Leading a design-driven agency focused on high-impact digital solutions for SaaS, fintech, and high-growth companies. Driving digital strategy, branding, and user experience innovation while spearheading business growth through conversion-optimized design, scalable systems, and strategic content.',
    highlight: '3x conversion lifts and faster GTM for emerging SaaS teams.',
  },
  {
    period: '2015 – 2023',
    company: 'Salesforce & Global Enterprises',
    role: 'UX Lead & Digital Strategist',
    description:
      'Led UX initiatives for large-scale infrastructure and enterprise SaaS projects. Specialized in optimizing complex user flows, increasing engagement by 20%, and implementing automated design systems that reduced project delivery time by 30%.',
    highlight: 'Design system adoption across 7 enterprise product squads.',
  },
  {
    period: '2004 – 2014',
    company: 'Digital Transformation Era',
    role: 'Director of UX & Design',
    description:
      'Drove digital transformation for government and corporate clients, streamlining workflows to improve operational efficiency by 40% and leading flagship design projects that generated 30% revenue increases.',
    highlight:
      'Portfolio of 40+ transformation programs modernized end-to-end.',
  },
  {
    period: '2001 – 2004',
    company: 'Digital Renaissance',
    role: 'Senior UI/UX & Digital Product Designer',
    description:
      'Transitioned from traditional design to digital experiences during the early web boom, mastering front-end development, web design, and UX to create user-friendly digital platforms that set new standards for usability.',
    highlight: 'Early adopter of UX research ops, reducing rework by 25%.',
  },
  {
    period: '1991 – 2001',
    company: 'Creative Foundation',
    role: 'Art Director & Graphic Designer',
    description:
      'Built a strong foundation in visual arts, focusing on branding, print media, and creative direction while mastering composition, typography, and brand storytelling.',
    highlight: 'Award-winning campaigns across print, OOH, and identity.',
  },
]

const processSteps = [
  {
    title: 'Discover & Risk Assessment',
    description:
      'Map north-star journeys, surface the AI assists worth testing, and define the evidence we’ll collect together.',
    deliverables:
      'Stakeholder workshops, analytics deep-dive, opportunity and risk map.',
    timeframe: '1–2 weeks',
    outcome:
      'Shared problem framing, prioritized opportunities, and success metrics leadership can endorse.',
  },
  {
    title: 'Design & Development',
    description:
      'Prototype AI-enabled flows, codify them in your design system, and prep engineering with sprint-ready assets.',
    deliverables:
      'UX flows, interactive prototypes, instrumented design system updates.',
    timeframe: '3–6 weeks',
    outcome:
      'Validated journey blueprint, instrumented UI kit, and handoff docs devs can ship.',
  },
  {
    title: 'Launch & Optimize',
    description:
      'Roll out with analytics wired, monitor adoption, and feed insights straight back into prioritization.',
    deliverables: 'Launch playbook, instrumentation plan, KPI dashboard setup.',
    timeframe: '2+ weeks',
    outcome:
      'Live experience with dashboards, experiment backlog, and executive-ready reporting.',
  },
]

export default function About() {
  return (
    <div className='container mx-auto px-4 py-16 pb-32 animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='mb-6 font-heading max-w-7xl mx-auto'>
          We embed AI-enabled product design with your teams.
        </h1>
        <p className='lead max-w-3xl mx-auto mb-8'>
          Pixelmojo helps product squads deliver evidence-led UX, AI-enabled
          product design, and delivery rituals leadership can defend.
        </p>
      </div>

      {/* Scroll-Animated Video Section */}
      <ScrollVideoSection
        videoId='1098766945'
        coverImage='/video-cover-02.webp'
        caption='Showreel: See how Pixelmojo fuses strategy, UX, and engineering to unlock measurable growth for product teams.'
      />

      {/* Value Proposition Section */}
      <div className='text-center mb-20'>
        <h2 className='mb-6 max-w-4xl mx-auto leading-snug !text-4xl md:!text-5xl lg:!text-6xl'>
          AI-enabled product design that actually ships
        </h2>
        <div className='mx-auto max-w-4xl space-y-6 text-left md:text-center'>
          <p className='text-muted text-lg leading-relaxed'>
            After 20+ years inside global enterprises and scaling startups, I
            built Pixelmojo to close the gap between AI ambition and ship-ready
            design. We integrate with your teams to activate experiment-ready
            journeys, reusable systems, and the analytics leaders demand.
          </p>
          <ul className='grid gap-4 list-none p-0 md:grid-cols-2 md:gap-5'>
            <li className='rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary/80'>
                Decision velocity
              </p>
              <p className='mt-2 text-base leading-relaxed text-muted'>
                Align product, design, and AI leads around experiment-ready
                journeys so the roadmap moves faster with proof.
              </p>
            </li>
            <li className='rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary/80'>
                Unified delivery
              </p>
              <p className='mt-2 text-base leading-relaxed text-muted'>
                Plug reusable design systems and analytics into every sprint so
                brand, product, and engineering stay in lockstep.
              </p>
            </li>
            <li className='rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm md:col-span-2'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary/80'>
                Momentum you can measure
              </p>
              <p className='mt-2 text-base leading-relaxed text-muted'>
                Instrument launches from day one, capturing usage signals that
                show what to scale next.
              </p>
            </li>
          </ul>
        </div>
        <h2 className='mt-12 mb-4 text-3xl font-heading'>Our Mission</h2>
        <div className='mx-auto max-w-4xl space-y-4 text-left md:text-center'>
          <p className='text-muted text-lg leading-relaxed'>
            Every experience layer should pay its way. We coach teams to turn AI
            ideas into testable journeys that drive revenue.
          </p>
          <ul className='grid gap-4 list-none p-0 md:grid-cols-2 md:gap-5'>
            <li className='rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary/80'>
                Frictionless journeys
              </p>
              <p className='mt-2 text-base leading-relaxed text-muted'>
                Connect strategy, UX, and engineering to remove roadblocks
                across revenue-critical flows.
              </p>
            </li>
            <li className='rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary/80'>
                Learning loops
              </p>
              <p className='mt-2 text-base leading-relaxed text-muted'>
                Ship with tracking hooks and rituals that turn every release
                into a data-backed recommendation.
              </p>
            </li>
            <li className='rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary/80'>
                Scalable systems
              </p>
              <p className='mt-2 text-base leading-relaxed text-muted'>
                Build design and delivery frameworks your teams can extend
                without calling an agency every sprint.
              </p>
            </li>
            <li className='rounded-2xl border border-border/60 bg-card/70 p-5 text-left shadow-sm'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-primary/80'>
                Empowered teams
              </p>
              <p className='mt-2 text-base leading-relaxed text-muted'>
                Embed playbooks, rituals, and knowledge transfer so momentum
                survives long after handoff.
              </p>
            </li>
          </ul>
        </div>
        <div className='mt-12 max-w-5xl mx-auto'>
          <div className='gradient-surface relative overflow-hidden rounded-2xl border border-white/15 p-8 text-center shadow-lg shadow-primary/15 md:p-12'>
            <div className='relative z-10 space-y-5'>
              <h3 className='font-heading text-2xl text-white md:text-3xl'>
                What Pixelmojo Means
              </h3>
              <p className='mx-auto max-w-4xl text-lg leading-relaxed text-white/90'>
                Every{' '}
                <span className='font-extrabold text-[#3CC29E]'>pixel</span> we
                design and every bit of{' '}
                <span className='font-extrabold text-[#F48024]'>mojo</span>—that
                spark of insight—has one job: turn AI ambition into launches
                leadership can defend. The intersecting forms in our logo stand
                for strategy, design, and engineering moving in sync, so the
                experience layer becomes a measurable growth engine.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className='mt-16 max-w-6xl mx-auto'>
          <h2
            className='text-center font-heading text-3xl md:text-4xl'
            style={{ marginBottom: '4rem' }}
          >
            Three Decades of Design, Innovation & Digital Transformation
          </h2>

          <div className='relative'>
            <div className='space-y-10 sm:space-y-12 md:space-y-14'>
              {experienceTimeline.map((entry, index) => (
                <article
                  key={`${entry.period}-${index}`}
                  className='relative rounded-2xl py-2 text-left md:px-0'
                >
                  <div className='flex flex-col gap-5 md:flex-row md:gap-10'>
                    <div className='md:w-48'>
                      <p className='font-mono text-xs tracking-[0.14em] text-primary/80 md:uppercase md:tracking-[0.28em]'>
                        {entry.period}
                      </p>
                      <h3 className='mt-2 text-2xl font-heading text-foreground md:text-3xl'>
                        {entry.company}
                      </h3>
                    </div>
                    <div className='flex-1 space-y-4'>
                      <p className='text-sm font-semibold tracking-[0.05em] text-muted-foreground md:uppercase md:tracking-[0.14em]'>
                        {entry.role}
                      </p>
                      <p className='text-muted leading-relaxed'>
                        {entry.description}
                      </p>
                      {entry.highlight ? (
                        <p className='text-sm font-semibold text-primary'>
                          {entry.highlight}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className='mt-24 max-w-6xl mx-auto px-4 md:px-0'>
          <h2
            className='text-center font-heading text-3xl md:text-4xl'
            style={{ marginBottom: '4rem' }}
          >
            How We Turn Strategy Into Measurable Growth
          </h2>

          <div className='grid gap-6 md:grid-cols-3 md:gap-8'>
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className='group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card/60 p-6 text-left shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary md:p-8'
              >
                <span className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#3CC29E] font-heading text-base font-semibold text-white'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className='mt-4 text-xl font-heading'>{step.title}</h3>
                <p className='mt-4 text-muted leading-relaxed'>
                  {step.description}
                </p>
                <dl className='mt-6 space-y-4 text-sm text-muted-foreground'>
                  <div>
                    <dt className='font-medium text-foreground'>
                      Deliverables
                    </dt>
                    <dd className='mt-1 leading-relaxed'>
                      {step.deliverables}
                    </dd>
                  </div>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <dt className='font-medium text-foreground'>Timeframe</dt>
                      <dd className='mt-1 leading-relaxed'>{step.timeframe}</dd>
                    </div>
                    <div className='relative inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-primary md:uppercase md:tracking-[0.18em]'>
                      <span className='h-2 w-2 rounded-full bg-primary' />
                      <span>Phase {index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <dt className='font-medium text-foreground'>Outcome</dt>
                    <dd className='mt-1 leading-relaxed'>{step.outcome}</dd>
                  </div>
                </dl>
                <span className='pointer-events-none absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
