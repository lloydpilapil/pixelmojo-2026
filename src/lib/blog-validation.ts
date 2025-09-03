// Blog content validation utilities

export interface ValidationResult {
  isValid: boolean
  warnings: string[]
  errors: string[]
}

export interface BlogContentLimits {
  title: {
    min: number
    max: number
    optimal: { min: number; max: number }
  }
  description: {
    min: number
    max: number
    optimal: { min: number; max: number }
  }
}

export const BLOG_LIMITS: BlogContentLimits = {
  title: {
    min: 10,
    max: 70,
    optimal: { min: 50, max: 60 }
  },
  description: {
    min: 50,
    max: 200,
    optimal: { min: 120, max: 160 }
  }
}

export function validateBlogTitle(title: string): ValidationResult {
  const length = title.length
  const warnings: string[] = []
  const errors: string[] = []

  // Error conditions
  if (length < BLOG_LIMITS.title.min) {
    errors.push(`Title too short (${length} chars). Minimum: ${BLOG_LIMITS.title.min} characters.`)
  }
  
  if (length > BLOG_LIMITS.title.max) {
    errors.push(`Title too long (${length} chars). Maximum: ${BLOG_LIMITS.title.max} characters.`)
  }

  // Warning conditions (not optimal but not breaking)
  if (length < BLOG_LIMITS.title.optimal.min && length >= BLOG_LIMITS.title.min) {
    warnings.push(`Title could be longer for better SEO (${length} chars). Optimal: ${BLOG_LIMITS.title.optimal.min}-${BLOG_LIMITS.title.optimal.max} characters.`)
  }
  
  if (length > BLOG_LIMITS.title.optimal.max && length <= BLOG_LIMITS.title.max) {
    warnings.push(`Title might be too long for search results (${length} chars). Optimal: ${BLOG_LIMITS.title.optimal.min}-${BLOG_LIMITS.title.optimal.max} characters.`)
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors
  }
}

export function validateBlogDescription(description: string | undefined): ValidationResult {
  const warnings: string[] = []
  const errors: string[] = []

  if (!description || description.trim() === '') {
    warnings.push('Description is missing. Recommended for SEO and social sharing.')
    return { isValid: true, warnings, errors }
  }

  const length = description.length

  // Error conditions
  if (length < BLOG_LIMITS.description.min) {
    errors.push(`Description too short (${length} chars). Minimum: ${BLOG_LIMITS.description.min} characters.`)
  }
  
  if (length > BLOG_LIMITS.description.max) {
    errors.push(`Description too long (${length} chars). Maximum: ${BLOG_LIMITS.description.max} characters.`)
  }

  // Warning conditions
  if (length < BLOG_LIMITS.description.optimal.min && length >= BLOG_LIMITS.description.min) {
    warnings.push(`Description could be longer for better SEO (${length} chars). Optimal: ${BLOG_LIMITS.description.optimal.min}-${BLOG_LIMITS.description.optimal.max} characters.`)
  }
  
  if (length > BLOG_LIMITS.description.optimal.max && length <= BLOG_LIMITS.description.max) {
    warnings.push(`Description might be too long for search snippets (${length} chars). Optimal: ${BLOG_LIMITS.description.optimal.min}-${BLOG_LIMITS.description.optimal.max} characters.`)
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors
  }
}

export function validateBlogPost(title: string, description?: string) {
  const titleValidation = validateBlogTitle(title)
  const descriptionValidation = validateBlogDescription(description)

  return {
    title: titleValidation,
    description: descriptionValidation,
    overall: {
      isValid: titleValidation.isValid && descriptionValidation.isValid,
      warnings: [...titleValidation.warnings, ...descriptionValidation.warnings],
      errors: [...titleValidation.errors, ...descriptionValidation.errors]
    }
  }
}