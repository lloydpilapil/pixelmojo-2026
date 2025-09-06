import Link from 'next/link'
import Image from 'next/image'
import { NavigationDropdown } from './navigation-dropdown'

const servicesItems = [
  {
    label: 'Web Design',
    href: '/services/web-design',
    description: 'Modern, responsive websites that convert',
    image: '/services/web-design.svg',
    price: 'Starting at $2,500'
  },
  {
    label: 'Branding',
    href: '/services/branding',
    description: 'Complete brand identity and strategy',
    image: '/services/branding.svg',
    price: 'Starting at $1,500'
  },
  {
    label: 'Digital Marketing',
    href: '/services/digital-marketing',
    description: 'SEO, PPC, and social media management',
    image: '/services/marketing.svg',
    badge: 'Popular'
  }
]

const worksItems = [
  {
    label: 'Case Studies',
    href: '/works/case-studies',
    description: 'Deep dives into our successful projects'
  },
  {
    label: 'Portfolio',
    href: '/works/portfolio',
    description: 'Browse our latest design work'
  },
  {
    label: 'Client Reviews',
    href: '/reviews',
    description: 'What our clients say about us'
  }
]

export default function Header() {
  return (
    <header className='border-b border-border bg-card'>
      <div className='container mx-auto px-4 py-4'>
        <nav className='flex justify-between items-center'>
          <Link href='/' className='hover:opacity-80 transition-opacity'>
            <Image
              src='/pixelmojo-branding.svg'
              alt='PixelMojo'
              width={140}
              height={32}
              className='h-8 w-auto'
              priority
            />
          </Link>
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Home
            </Link>
            <Link
              href='/about'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              About
            </Link>
            <NavigationDropdown
              label='Services'
              items={servicesItems}
            />
            <NavigationDropdown
              label='Works'
              items={worksItems}
            />
            <Link
              href='/blog'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Blog
            </Link>
            <Link
              href='/contact-us'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Contact
            </Link>
          </div>
          <div className='md:hidden flex flex-col space-y-2'>
            <Link
              href='/'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Home
            </Link>
            <Link
              href='/about'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              About
            </Link>
            <NavigationDropdown
              label='Services'
              items={servicesItems}
              isMobile={true}
            />
            <NavigationDropdown
              label='Works'
              items={worksItems}
              isMobile={true}
            />
            <Link
              href='/blog'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Blog
            </Link>
            <Link
              href='/contact-us'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
