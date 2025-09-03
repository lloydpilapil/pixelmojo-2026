import Link from 'next/link'

export default function Header() {
  return (
    <header className='border-b border-border bg-card'>
      <div className='container mx-auto px-4 py-4'>
        <nav className='flex justify-between items-center'>
          <Link href='/' className='text-xl font-extrabold text-primary hover:opacity-80 transition-opacity'>
            Lloyd Pilapil
          </Link>
          <div className='flex space-x-8'>
            <Link href='/' className='text-small font-medium hover:text-primary transition-colors'>
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
        </nav>
      </div>
    </header>
  )
}
