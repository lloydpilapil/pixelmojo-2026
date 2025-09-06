export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}

export const navigationConfig = {
  mainNav: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Services',
      href: '/services',
      children: [
        {
          label: 'Overview',
          href: '/services',
          description: 'Comprehensive digital solutions for your business',
        },
        {
          label: 'UI/UX Design Solutions',
          href: '/services/ui-ux-design',
          description: 'User-centered design that converts',
        },
        {
          label: 'Brand Identity',
          href: '/services/brand-identity',
          description: 'Complete brand identity and strategy',
        },
        {
          label: 'Brand Activation & Growth',
          href: '/services/brand-activation',
          description: 'Launch and scale your brand effectively',
        },
        {
          label: 'Web & App Design',
          href: '/services/web-app-design',
          description: 'Modern, responsive digital experiences',
        },
        {
          label: 'Graphic & Visuals',
          href: '/services/graphic-visuals',
          description: 'Stunning visual content and graphics',
        },
        {
          label: 'Development Solutions',
          href: '/services/development',
          description: 'Custom development and technical solutions',
        },
      ],
    },
    {
      label: 'Works',
      href: '/works',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Reviews',
      href: '/reviews',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
  ctaButton: {
    label: 'Start a Project',
    href: '/contact',
  },
}