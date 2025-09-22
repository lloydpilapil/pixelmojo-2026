import Image from 'next/image'
import type { ServiceTheme } from '@/utils/serviceThemes'

interface AdaptiveLogoProps {
  theme?: ServiceTheme | null
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function AdaptiveLogo({
  theme,
  width = 140,
  height = 32,
  className = '',
  priority = false,
}: AdaptiveLogoProps) {
  // Option 1: Use dedicated logo files (when available)
  // Uncomment this block when you have white/dark logo variants
  /*
  const logoSrc = theme?.isDark
    ? '/pixelmojo-branding-white.svg'  // White logo for dark backgrounds
    : '/pixelmojo-branding-dark.svg'   // Dark logo for light backgrounds
  */

  // Option 2: Use CSS filter approach (current implementation)
  const logoSrc = '/pixelmojo-branding.svg'
  const logoStyle = {
    filter: theme?.isDark ? 'brightness(0) invert(1)' : 'none',
  }

  return (
    <Image
      src={logoSrc}
      alt='PixelMojo'
      width={width}
      height={height}
      className={`w-auto transition-all duration-300 ${className}`}
      style={logoStyle}
      priority={priority}
    />
  )
}

/*
USAGE GUIDE:

1. CURRENT SETUP (CSS Filter):
   - Uses existing pixelmojo-branding.svg
   - Inverts colors for dark backgrounds
   - Works immediately, no new files needed

2. UPGRADE TO DEDICATED LOGOS (Recommended):
   - Create: /public/pixelmojo-branding-white.svg (for dark backgrounds)
   - Create: /public/pixelmojo-branding-dark.svg (for light backgrounds)
   - Uncomment Option 1 code block above
   - Comment out Option 2 code block
   - Much cleaner and more professional result

3. LOGO FILE REQUIREMENTS:
   - White variant: Pure white (#FFFFFF) with transparent background
   - Dark variant: Dark color (#000000 or your brand dark) with transparent background
   - Same dimensions and proportions as current logo
   - SVG format recommended for crisp scaling

4. THEME MAPPING:
   - Dark backgrounds: Purple, Green, Teal, Blue → White logo
   - Light backgrounds: Yellow, Sky Blue → Dark logo
   - Default/no theme: Current logo (dark)
*/
