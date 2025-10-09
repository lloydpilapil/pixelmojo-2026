/**
 * Base API Error class
 * Extends Error with HTTP status code and error code
 */
export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
    Object.setPrototypeOf(this, APIError.prototype)
  }
}

/**
 * 400 Bad Request - Client sent invalid data
 */
export class ValidationError extends APIError {
  constructor(
    message: string = 'Validation failed',
    public fields?: Record<string, string[]>
  ) {
    super(400, message, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

/**
 * 401 Unauthorized - Authentication required
 */
export class UnauthorizedError extends APIError {
  constructor(message: string = 'Authentication required') {
    super(401, message, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}

/**
 * 403 Forbidden - Authenticated but not authorized
 */
export class ForbiddenError extends APIError {
  constructor(message: string = 'Access forbidden') {
    super(403, message, 'FORBIDDEN')
    this.name = 'ForbiddenError'
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}

/**
 * 404 Not Found - Resource doesn't exist
 */
export class NotFoundError extends APIError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND')
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

/**
 * 409 Conflict - Resource already exists or conflict
 */
export class ConflictError extends APIError {
  constructor(message: string = 'Resource conflict') {
    super(409, message, 'CONFLICT')
    this.name = 'ConflictError'
    Object.setPrototypeOf(this, ConflictError.prototype)
  }
}

/**
 * 429 Too Many Requests - Rate limit exceeded
 */
export class RateLimitError extends APIError {
  constructor(
    message: string = 'Rate limit exceeded. Please try again later.'
  ) {
    super(429, message, 'RATE_LIMIT_EXCEEDED')
    this.name = 'RateLimitError'
    Object.setPrototypeOf(this, RateLimitError.prototype)
  }
}

/**
 * 500 Internal Server Error - Something went wrong on the server
 */
export class InternalServerError extends APIError {
  constructor(
    message: string = 'Internal server error. Please try again later.'
  ) {
    super(500, message, 'INTERNAL_SERVER_ERROR')
    this.name = 'InternalServerError'
    Object.setPrototypeOf(this, InternalServerError.prototype)
  }
}

/**
 * 503 Service Unavailable - Service is temporarily unavailable
 */
export class ServiceUnavailableError extends APIError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(503, message, 'SERVICE_UNAVAILABLE')
    this.name = 'ServiceUnavailableError'
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype)
  }
}

/**
 * Type guard to check if error is an APIError
 */
export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError
}

/**
 * Format error for JSON response
 */
export function formatErrorResponse(error: unknown): {
  error: string
  message: string
  code?: string
  details?: unknown
} {
  if (isAPIError(error)) {
    return {
      error: error.name,
      message: error.message,
      code: error.code,
      ...(error instanceof ValidationError && error.fields
        ? { details: error.fields }
        : {}),
    }
  }

  // Unknown errors - don't expose details in production
  if (process.env.NODE_ENV === 'production') {
    return {
      error: 'InternalServerError',
      message: 'An unexpected error occurred. Please try again later.',
    }
  }

  // Development - show full error
  if (error instanceof Error) {
    return {
      error: error.name,
      message: error.message,
      details: error.stack,
    }
  }

  return {
    error: 'UnknownError',
    message: 'An unknown error occurred',
  }
}
