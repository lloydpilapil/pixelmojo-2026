import {
  getEdgeConfig,
  getSpecialOfferBanner,
  getHeroVariant,
  isFeatureEnabled,
} from '@/lib/edge-config'

export const revalidate = 0 // Always fetch fresh data for testing

export default async function EdgeConfigTestPage() {
  // Fetch various Edge Config values
  const maintenanceMode = await isFeatureEnabled('maintenance-mode')
  const specialOffer = await getSpecialOfferBanner()
  const heroVariant = await getHeroVariant()

  // Test fetching a defined key with fallback
  const testValue = await getEdgeConfig('contact-response-time', '24 hours')

  return (
    <div className='container mx-auto px-4 py-16'>
      <h1 className='text-4xl font-bold mb-8'>Edge Config Test Page</h1>

      <div className='space-y-8'>
        {/* Maintenance Mode Status */}
        <div className='p-6 bg-muted rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Maintenance Mode</h2>
          <div className='flex items-center gap-2'>
            <div
              className={`w-4 h-4 rounded-full ${maintenanceMode ? 'bg-red-500' : 'bg-green-500'}`}
            />
            <span className='text-lg'>
              Status: <strong>{maintenanceMode ? 'ACTIVE' : 'Inactive'}</strong>
            </span>
          </div>
          <p className='text-muted-foreground mt-2'>
            Try changing this value in Vercel Edge Config and refresh the page!
          </p>
        </div>

        {/* Special Offer Banner */}
        <div className='p-6 bg-muted rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Special Offer Banner</h2>
          {specialOffer.enabled ? (
            <div className='p-4 bg-primary/10 border border-primary rounded-lg'>
              <p className='text-lg font-medium'>{specialOffer.message}</p>
              {specialOffer.link && (
                <a
                  href={specialOffer.link}
                  className='text-primary underline mt-2 inline-block'
                >
                  Learn More →
                </a>
              )}
            </div>
          ) : (
            <p className='text-muted-foreground'>No active offer</p>
          )}
        </div>

        {/* Hero Variant */}
        <div className='p-6 bg-muted rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Hero Variant</h2>
          <p className='text-lg'>
            Current variant:{' '}
            <strong className='text-primary'>{heroVariant}</strong>
          </p>
          <div className='mt-4 space-y-2'>
            <p className='text-sm text-muted-foreground'>Available options:</p>
            <ul className='list-disc list-inside text-sm text-muted-foreground'>
              <li>default</li>
              <li>ai-focused</li>
              <li>results-focused</li>
            </ul>
          </div>
        </div>

        {/* Contact Response Time */}
        <div className='p-6 bg-muted rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Contact Response Time</h2>
          <p className='text-lg'>
            Current setting: <strong>{String(testValue)}</strong>
          </p>
          <p className='text-sm text-muted-foreground mt-2'>
            This demonstrates getting business settings from Edge Config
          </p>
        </div>

        {/* Instructions */}
        <div className='p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800'>
          <h2 className='text-2xl font-semibold mb-4 text-blue-900 dark:text-blue-100'>
            🎯 How to Test
          </h2>
          <ol className='list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200'>
            <li>Go to Vercel Dashboard → Storage → Edge Config</li>
            <li>
              Click on your Edge Config (ecfg_jfilueabwlhmzf0wgto4k8s2nnqq)
            </li>
            <li>Edit any value (e.g., change maintenance-mode to true)</li>
            <li>Click "Save"</li>
            <li>Refresh this page - changes appear instantly!</li>
          </ol>
          <p className='mt-4 text-sm text-blue-700 dark:text-blue-300'>
            ✨ No deployment needed - Edge Config updates are instant!
          </p>
        </div>
      </div>
    </div>
  )
}
