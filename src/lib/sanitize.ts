import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanityzuje string usuwając potencjalnie niebezpieczny HTML/JS
 */
export function sanitizeString(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Nie pozwalamy na żadne tagi HTML
    ALLOWED_ATTR: [],
  }).trim()
}

/**
 * Sanityzuje cały obiekt formularza
 */
export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized = {} as T

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeString(value) as any
    } else if (Array.isArray(value)) {
      sanitized[key as keyof T] = value.map((item) =>
        typeof item === 'string' ? sanitizeString(item) : item
      ) as any
    } else {
      sanitized[key as keyof T] = value
    }
  }

  return sanitized
}

/**
 * Normalizuje numer telefonu do formatu standardowego
 */
export function normalizePhone(phone: string): string {
  // Usuń wszystkie spacje i znaki specjalne
  const cleaned = phone.replace(/\s/g, '')
  
  // Dodaj +48 jeśli brakuje
  if (!cleaned.startsWith('+48')) {
    return '+48' + cleaned.replace(/^48/, '')
  }
  
  return cleaned
}

/**
 * Rate limiting - prosty in-memory store
 * W produkcji użyj Redis/Upstash
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minut
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  // Wyczyść stare rekordy
  if (record && record.resetAt < now) {
    rateLimitStore.delete(identifier)
  }

  const current = rateLimitStore.get(identifier)

  if (!current) {
    // Pierwszy request
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs }
  }

  if (current.count >= limit) {
    // Przekroczony limit
    return { allowed: false, remaining: 0, resetAt: current.resetAt }
  }

  // Zwiększ licznik
  current.count++
  return { allowed: true, remaining: limit - current.count, resetAt: current.resetAt }
}

/**
 * Generuje CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}
