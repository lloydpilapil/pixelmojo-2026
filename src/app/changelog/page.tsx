import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getVersionInfo } from '@/lib/version'

export const metadata: Metadata = {
  title: 'Changelog | Pixelmojo',
  description: 'Product updates and version history for Pixelmojo',
}

interface VersionEntry {
  version: string
  name: string
  date: string
  changes: {
    category: 'Added' | 'Improved' | 'Fixed' | 'Changed'
    items: string[]
  }[]
}

const changelog: VersionEntry[] = [
  {
    version: 'v1.2.0',
    name: 'Search',
    date: '2025-01-04',
    changes: [
      {
        category: 'Added',
        items: [
          'Client-side search functionality with Fuse.js fuzzy matching',
          'Search modal with keyboard shortcuts (⌘K / Ctrl+K)',
          'Search across blog posts, projects, services, and pages',
          'Categorized search results with up to 20 items',
          'Custom scrollbar styling for better UX',
          'Background scroll lock when modal is open',
        ],
      },
      {
        category: 'Improved',
        items: [
          'Enhanced header navigation with integrated search',
          'Better keyboard navigation support',
        ],
      },
    ],
  },
  {
    version: 'v1.1.0',
    name: 'Monitoring',
    date: '2025-10-03',
    changes: [
      {
        category: 'Added',
        items: [
          'Sentry error monitoring integration',
          'Performance monitoring and tracking',
          'Error boundary components',
        ],
      },
      {
        category: 'Improved',
        items: [
          'Enhanced error handling across the application',
          'Better debugging capabilities',
        ],
      },
    ],
  },
  {
    version: 'v1.0.0',
    name: 'Launch',
    date: '2025',
    changes: [
      {
        category: 'Added',
        items: [
          'Initial website launch',
          'Blog system with Contentlayer and MDX',
          'Project portfolio showcase',
          'Service pages with detailed offerings',
          'Contact form functionality',
          'Responsive design for all devices',
          'Dark mode support',
          'Smooth scroll animations with Lenis',
        ],
      },
    ],
  },
]

const categoryColors = {
  Added: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  Improved: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  Fixed:
    'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
  Changed:
    'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
}

export default function ChangelogPage() {
  const currentVersion = getVersionInfo()

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='border-b border-border bg-card'>
        <div className='container mx-auto px-4 py-8'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Home
          </Link>
          <div className='max-w-3xl'>
            <h1 className='mb-4'>Changelog</h1>
            <p className='text-muted-foreground text-lg'>
              Product updates and version history. Current version:{' '}
              <span className='font-mono text-primary font-semibold'>
                {currentVersion.version}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Changelog Entries */}
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-3xl mx-auto'>
          <div className='space-y-12'>
            {changelog.map((entry, index) => (
              <div
                key={entry.version}
                className='relative border-l-2 border-border pl-8 pb-8'
              >
                {/* Version Indicator */}
                <div className='absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary border-4 border-background' />

                {/* Version Header */}
                <div className='mb-6'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h2 className='text-2xl font-bold font-montserrat'>
                      {entry.version}
                    </h2>
                    {entry.name && (
                      <span className='px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full'>
                        {entry.name}
                      </span>
                    )}
                    {index === 0 && (
                      <span className='px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full'>
                        Latest
                      </span>
                    )}
                  </div>
                  <p className='text-muted-foreground text-sm'>{entry.date}</p>
                </div>

                {/* Changes */}
                <div className='space-y-6'>
                  {entry.changes.map((change, changeIndex) => (
                    <div key={changeIndex}>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[change.category]}`}
                      >
                        {change.category}
                      </div>
                      <ul className='space-y-2 ml-4'>
                        {change.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className='text-foreground/80 flex items-start gap-2'
                          >
                            <span className='text-primary mt-1.5'>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className='mt-16 pt-8 border-t border-border text-center'>
            <p className='text-muted-foreground text-sm'>
              Want to see what we're building next?{' '}
              <Link href='/contact-us' className='text-primary hover:underline'>
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
