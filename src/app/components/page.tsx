import type { Metadata } from 'next'
import { Button, LinkButton } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Components | Lloyd Pilapil',
  description: 'UI component showcase and design system documentation.',
}

export default function ComponentsPage() {
  return (
    <div className='container mx-auto px-4 py-16 animate-fade-in'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='mb-6'>UI Components</h1>
          <p className='lead max-w-2xl mx-auto'>
            Explore our design system components with various states and variants.
          </p>
        </div>

        {/* Button Variants */}
        <section className='mb-16'>
          <h2 className='mb-8'>Button Variants</h2>
          
          <div className='space-y-8'>
            {/* Default Buttons */}
            <div className='card p-6'>
              <h3 className='mb-4'>Default Shape</h3>
              <div className='flex flex-wrap gap-4'>
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Pill Buttons */}
            <div className='card p-6'>
              <h3 className='mb-4'>Pill Shape</h3>
              <div className='flex flex-wrap gap-4'>
                <Button variant="default" shape="pill">Default Pill</Button>
                <Button variant="secondary" shape="pill">Secondary Pill</Button>
                <Button variant="outline" shape="pill">Outline Pill</Button>
                <Button variant="ghost" shape="pill">Ghost Pill</Button>
                <Button variant="destructive" shape="pill">Destructive Pill</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className='card p-6'>
              <h3 className='mb-4'>Sizes</h3>
              <div className='flex flex-wrap items-center gap-4'>
                <Button size="sm" shape="pill">Small</Button>
                <Button size="default" shape="pill">Default</Button>
                <Button size="lg" shape="pill">Large</Button>
                <Button size="icon" shape="pill">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Pill Buttons */}
        <section className='mb-16'>
          <h2 className='mb-8'>Enhanced Pill Buttons</h2>
          
          <div className='space-y-8'>
            {/* With Icons */}
            <div className='card p-6'>
              <h3 className='mb-4'>With Icons</h3>
              <div className='flex flex-wrap gap-4'>
                <PillButton 
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Add Item
                </PillButton>
                
                <PillButton 
                  variant="secondary"
                  rightIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  Continue
                </PillButton>
                
                <PillButton 
                  variant="outline"
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  }
                >
                  Download
                </PillButton>
              </div>
            </div>

            {/* States */}
            <div className='card p-6'>
              <h3 className='mb-4'>States</h3>
              <div className='flex flex-wrap gap-4'>
                <PillButton>Normal</PillButton>
                <PillButton disabled>Disabled</PillButton>
                <PillButton loading>Loading</PillButton>
              </div>
            </div>

            {/* All Variants as Pills */}
            <div className='card p-6'>
              <h3 className='mb-4'>All Pill Variants</h3>
              <div className='flex flex-wrap gap-4'>
                <PillButton variant="default">Primary Pill</PillButton>
                <PillButton variant="secondary">Secondary Pill</PillButton>
                <PillButton variant="outline">Outline Pill</PillButton>
                <PillButton variant="ghost">Ghost Pill</PillButton>
                <PillButton variant="destructive">Destructive Pill</PillButton>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className='mb-16'>
          <h2 className='mb-8'>Usage Examples</h2>
          
          <div className='space-y-6'>
            {/* CTA Section */}
            <div className='card p-8 text-center bg-muted/30'>
              <h3 className='mb-4'>Call to Action</h3>
              <p className='text-muted mb-6'>Ready to get started with your next project?</p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <PillButton size="lg">Get Started</PillButton>
                <PillButton variant="outline" size="lg">Learn More</PillButton>
              </div>
            </div>

            {/* Form Actions */}
            <div className='card p-6'>
              <h3 className='mb-4'>Form Actions</h3>
              <div className='flex justify-between items-center'>
                <PillButton variant="ghost">Cancel</PillButton>
                <div className='flex gap-3'>
                  <PillButton variant="outline">Save Draft</PillButton>
                  <PillButton>Publish</PillButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}