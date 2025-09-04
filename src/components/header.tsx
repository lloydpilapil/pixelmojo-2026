import Link from 'next/link'
import Image from 'next/image'

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
          <div className='hidden md:flex space-x-8'>
            <Link
              href='/'
              className='text-small font-medium hover:text-primary transition-colors'
            >
              Home
            </Link>
            <Link
              href='/about'
              className='text-small font-medium hover:text-primary transition-colors'
            >
              About
            </Link>
            <Link
              href='/portfolio'
              className='text-small font-medium hover:text-primary transition-colors'
            >
              Portfolio
            </Link>
            <Link
              href='/blog'
              className='text-small font-medium hover:text-primary transition-colors'
            >
              Blog
            </Link>
            <Link
              href='/contact'
              className='text-small font-medium hover:text-primary transition-colors'
            >
              Contact
            </Link>
          </div>
          <div className='md:hidden flex flex-col space-y-1'>
            <Link
              href='/'
              className='text-xs font-medium hover:text-primary transition-colors'
            >
              Home
            </Link>
            <Link
              href='/about'
              className='text-xs font-medium hover:text-primary transition-colors'
            >
              About
            </Link>
            <Link
              href='/portfolio'
              className='text-xs font-medium hover:text-primary transition-colors'
            >
              Portfolio
            </Link>
            <Link
              href='/blog'
              className='text-xs font-medium hover:text-primary transition-colors'
            >
              Blog
            </Link>
            <Link
              href='/contact'
              className='text-xs font-medium hover:text-primary transition-colors'
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
