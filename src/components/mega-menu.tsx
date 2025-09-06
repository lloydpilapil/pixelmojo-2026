'use client'

import Link from 'next/link'
import Image from 'next/image'

export interface MegaMenuItem {
  label: string
  href: string
  description?: string
  image?: string
  icon?: string
  price?: string
  badge?: string | null
}

interface MegaMenuProps {
  label: string
  items: MegaMenuItem[]
  isOpen: boolean
  onToggle: () => void
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    fill='none' 
    stroke='currentColor' 
    viewBox='0 0 24 24'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
  </svg>
)

const ArrowIcon = () => (
  <svg className='w-4 h-4 text-muted-foreground group-hover:text-[#55AE44] transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
  </svg>
)

export function MegaMenu({ label, items, isOpen, onToggle }: MegaMenuProps) {
  return (
    <>
      <DesktopMegaMenuButton label={label} isOpen={isOpen} onToggle={onToggle} />
      <MobileMegaMenuDropdown label={label} items={items} isOpen={isOpen} onToggle={onToggle} />
    </>
  )
}

function DesktopMegaMenuButton({ label, isOpen, onToggle }: { label: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      className='hidden md:flex items-center gap-1.5 text-sm font-medium hover:text-[#55AE44] transition-colors duration-200'
      onClick={onToggle}
    >
      {label}
      <ChevronIcon isOpen={isOpen} />
    </button>
  )
}

function MobileMegaMenuDropdown({ label, items, isOpen, onToggle }: { label: string; items: MegaMenuItem[]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className='md:hidden w-full'>
      <button
        onClick={onToggle}
        className='flex items-center justify-between w-full text-sm font-medium hover:text-[#55AE44] transition-colors duration-200 py-2'
      >
        {label}
        <ChevronIcon isOpen={isOpen} />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='pl-4 py-4 space-y-2'>
          {items.map((item) => (
            <MobileMegaMenuItem key={item.href} item={item} onToggle={onToggle} />
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileMegaMenuItem({ item, onToggle }: { item: MegaMenuItem; onToggle: () => void }) {
  return (
    <Link
      href={item.href}
      className='flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group border border-transparent hover:border-border'
      onClick={onToggle}
    >
      {item.image && (
        <div className='w-8 h-8 flex-shrink-0'>
          <Image 
            src={item.image} 
            alt={item.label}
            width={32}
            height={32}
            className='w-full h-full rounded-md object-cover bg-muted'
          />
        </div>
      )}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mb-1'>
          <h4 className='font-semibold text-sm text-foreground group-hover:text-[#55AE44] transition-colors'>
            {item.label}
          </h4>
          {item.badge && (
            <span className='bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap'>
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <p className='text-xs text-muted-foreground leading-relaxed'>
            {item.description}
          </p>
        )}
      </div>
      <ArrowIcon />
    </Link>
  )
}

interface MegaMenuPanelProps {
  items: MegaMenuItem[]
  isOpen: boolean
  onClose: () => void
}

export function MegaMenuPanel({ items, isOpen, onClose }: MegaMenuPanelProps) {
  return (
    <div
      className={`w-full bg-card border-t border-b border-border transition-all duration-300 overflow-hidden ${
        isOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0'
      }`}
    >
      <div className='container mx-auto px-4 py-4'>
        <div className='flex flex-wrap justify-center items-center gap-8'>
          {items.map((item, index) => (
            <div key={item.href} className='flex items-center gap-8'>
              <Link
                href={item.href}
                onClick={onClose}
                className='text-sm font-medium text-muted-foreground hover:text-[#55AE44] transition-colors'
              >
                {item.label}
              </Link>
              {index < items.length - 1 && (
                <div className='h-4 w-px bg-gray-600'></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

