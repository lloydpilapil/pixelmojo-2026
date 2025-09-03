export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className='border-t border-border bg-card mt-auto'>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <p className='text-muted text-small'>&copy; {currentYear} Lloyd Pilapil. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
