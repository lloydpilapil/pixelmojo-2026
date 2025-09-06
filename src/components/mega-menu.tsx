'use client'

interface MegaMenuProps {
  trigger: string
  isOpen: boolean
  onToggle: () => void
}

export default function MegaMenu({ trigger, isOpen, onToggle }: MegaMenuProps) {
  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={onToggle}
        className="text-sm font-medium text-foreground/80 hover:text-[#55AE44] transition-colors duration-200 flex items-center gap-1"
      >
        {trigger}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

    </>
  )
}