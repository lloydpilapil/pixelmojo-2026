import {
  isFeatureEnabled,
  getHeroVariant,
  getSpecialOfferBanner,
  getEmergencyMessage,
} from '@/lib/edge-config'

interface EdgeConfigDemoProps {
  className?: string
}

export default async function EdgeConfigDemo({
  className,
}: EdgeConfigDemoProps) {
  // Get various Edge Config values
  const [
    specialOffer,
    emergencyMessage,
    heroVariant,
    aiFeatureEnabled,
    maintenanceMode,
  ] = await Promise.all([
    getSpecialOfferBanner(),
    getEmergencyMessage(),
    getHeroVariant(),
    isFeatureEnabled('ai-feature-enabled'),
    isFeatureEnabled('maintenance-mode'),
  ])

  // Show maintenance mode if enabled
  if (maintenanceMode) {
    return (
      <div className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center'>
        <div className='bg-card border border-border rounded-xl p-8 max-w-md mx-4 text-center'>
          <h2 className='text-xl font-heading mb-4'>Maintenance Mode</h2>
          <p className='text-muted-foreground'>
            We're currently updating our systems. Please check back soon!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Emergency Message Banner */}
      {emergencyMessage.enabled && (
        <div
          className={`w-full p-4 text-center text-sm font-medium ${
            emergencyMessage.type === 'warning'
              ? 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
              : emergencyMessage.type === 'success'
                ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
          }`}
        >
          {emergencyMessage.message}
        </div>
      )}

      {/* Special Offer Banner */}
      {specialOffer.enabled && (
        <div className='bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 mb-6'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>{specialOffer.message}</span>
            {specialOffer.link && (
              <a
                href={specialOffer.link}
                className='text-primary hover:text-primary/80 text-sm font-medium underline'
              >
                Learn More
              </a>
            )}
          </div>
        </div>
      )}

      {/* Hero Variant Demo */}
      {heroVariant !== 'default' && (
        <div className='text-xs text-muted-foreground mb-4'>
          Active Hero Variant:{' '}
          <span className='font-medium'>{heroVariant}</span>
        </div>
      )}

      {/* AI Feature Demo */}
      {aiFeatureEnabled && (
        <div className='bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-accent rounded-full animate-pulse'></div>
            <span className='text-sm font-medium text-accent'>
              New AI Features Available!
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
