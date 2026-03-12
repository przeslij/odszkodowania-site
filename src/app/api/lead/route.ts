// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchemaRefined, type ContactFormData } from '@/schemas/contact'

// ============================================================
// TYPES
// ============================================================

interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  code?: string
  data?: T
  errors?: Record<string, string[]>
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

// ============================================================
// RATE LIMITING
// ⚠️ PRODUKCJA: In-memory Map resetuje się przy cold-start
// w serverless (Vercel). Zamienić na @upstash/ratelimit + Redis.
// ============================================================

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetAt) {
    const resetAt = now + windowMs
    rateLimitMap.set(identifier, { count: 1, resetAt })
    return { allowed: true, remaining: maxRequests - 1, resetAt }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt }
  }

  record.count++
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.resetAt,
  }
}

// ============================================================
// SANITIZATION
// ============================================================

function sanitizeString(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[<>]/g, '').trim().slice(0, 500)
}

function sanitizeFormData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeString(item) : item,
      )
    } else if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (typeof value === 'boolean') {
      sanitized[key] = value
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '').slice(0, 20)
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return '***'
  return `${local.slice(0, 2)}***@${domain}`
}

// ============================================================
// TURNSTILE VERIFICATION
// ============================================================

async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    // Dev bypass — nie blokuj lokalnych testów
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Turnstile] TURNSTILE_SECRET_KEY not configured - bypass in development')
      return true
    }
    console.error('[Turnstile] TURNSTILE_SECRET_KEY not configured')
    return false
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: secretKey, response: token }),
      },
    )

    if (!response.ok) {
      console.error('[Turnstile] HTTP error:', response.status)
      return false
    }

    const data = (await response.json()) as {
      success: boolean
      'error-codes'?: string[]
    }

    if (!data.success) {
      console.error('[Turnstile] Verification failed:', data['error-codes'])
    }

    return data.success === true
  } catch (error) {
    console.error('[Turnstile] Verification error:', error)
    return false
  }
}

// ============================================================
// DATABASE & NOTIFICATIONS (Mock)
// ============================================================

async function saveLead(data: ContactFormData): Promise<string> {
  // TODO: Implementacja zapisu do bazy (Prisma, Supabase, itp.)
  const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

  console.log('[API] Lead saved:', {
    leadId,
    email: maskEmail(data.email),
    infrastructure: data.infrastructure,
    timestamp: new Date().toISOString(),
  })

  return leadId
}

async function sendNotification(
  data: ContactFormData,
  leadId: string,
): Promise<void> {
  // TODO: Implementacja wysyłki emaila (Resend, SendGrid, AWS SES)
  console.log('[API] Notification sent for lead:', {
    leadId,
    name: `${data.firstName} ${data.lastName}`,
    email: maskEmail(data.email),
  })
}

// ============================================================
// HELPERS
// ============================================================

function jsonResponse<T>(
  status: number,
  body: ApiResponse<T>,
  extraHeaders?: Record<string, string>,
) {
  return NextResponse.json(body, {
    status,
    headers: extraHeaders,
  })
}

// ============================================================
// API HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // 1. RATE LIMITING
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rateLimitResult = checkRateLimit(ip, 5, 15 * 60 * 1000)

    if (!rateLimitResult.allowed) {
      return jsonResponse(
        429,
        {
          success: false,
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Za dużo prób. Spróbuj ponownie za 15 minut.',
        },
        {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetAt.toString(),
        },
      )
    }

    // 2. PARSE BODY
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return jsonResponse(400, {
        success: false,
        message: 'Nieprawidłowy format danych.',
      })
    }

    // 3. VERIFY CAPTCHA
    const captchaToken = body.captchaToken
    if (!captchaToken || typeof captchaToken !== 'string') {
      return jsonResponse(400, {
        success: false,
        code: 'CAPTCHA_TOKEN_MISSING',
        message: 'Brak tokenu CAPTCHA.',
      })
    }

    const captchaValid = await verifyTurnstile(captchaToken)
    if (!captchaValid) {
      return jsonResponse(400, {
        success: false,
        code: 'CAPTCHA_VERIFICATION_FAILED',
        message: 'Weryfikacja CAPTCHA nie powiodła się. Odśwież stronę i spróbuj ponownie.',
      })
    }

    // 4. SANITIZE INPUT
    const sanitizedData = sanitizeFormData(body)

    // 5. VALIDATE WITH ZOD
    const validationResult = contactFormSchemaRefined.safeParse(sanitizedData)

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors
      console.log('[API] Validation failed:', fieldErrors)

      return jsonResponse(400, {
        success: false,
        message: 'Dane formularza są nieprawidłowe.',
        errors: fieldErrors,
      })
    }

    const validData = validationResult.data

    // 6. NORMALIZE DATA
    const normalizedData: ContactFormData = {
      ...validData,
      phone: normalizePhone(validData.phone),
      email: validData.email.toLowerCase().trim(),
      firstName: validData.firstName.trim(),
      lastName: validData.lastName.trim(),
      city: validData.city.trim(),
    }

    // 7. SAVE TO DATABASE
    let leadId: string
    try {
      leadId = await saveLead(normalizedData)
    } catch (error) {
      console.error('[API] Database error:', error)
      return jsonResponse(500, {
        success: false,
        message: 'Błąd zapisu danych. Spróbuj ponownie później.',
      })
    }

    // 8. SEND NOTIFICATIONS (fire-and-forget)
    void sendNotification(normalizedData, leadId).catch((error) => {
      console.error('[API] Failed to send notification:', error)
    })

    // 9. SUCCESS RESPONSE
    return jsonResponse(
      200,
      {
        success: true,
        message: 'Formularz został wysłany pomyślnie.',
        data: { leadId },
      },
      {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetAt.toString(),
      },
    )
  } catch (error) {
    console.error('[API] Unhandled error:', error)

    return jsonResponse(500, {
      success: false,
      message: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
    })
  }
}

// ============================================================
// OPTIONS - CORS preflight
// ============================================================

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}