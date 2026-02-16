import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchemaRefined, type ContactFormData } from '@/schemas/contact'

// ============================================================
// TYPES
// ============================================================

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

interface LeadData extends ContactFormData {
  leadId: string
  createdAt: string
}

// ============================================================
// RATE LIMITING (In-memory - dla developmentu)
// W produkcji: Redis, Upstash, lub baza danych
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
    // Nowe okno lub pierwsze żądanie
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    }
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
    }
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
  // Usuwamy potencjalnie niebezpieczne znaki
  return value
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 500) // Limit długości
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
  // Usuwamy wszystko oprócz cyfr i + na początku
  return phone.replace(/[^\d+]/g, '').slice(0, 20)
}

// ============================================================
// TURNSTILE VERIFICATION
// ============================================================

async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('[Turnstile] TURNSTILE_SECRET_KEY not configured')
    return false
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
        }),
      },
    )

    if (!response.ok) {
      console.error('[Turnstile] HTTP error:', response.status)
      return false
    }

    const data = await response.json()

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
    email: data.email,
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
    email: data.email,
  })
}

// ============================================================
// API HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // 1. RATE LIMITING - po IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rateLimitResult = checkRateLimit(ip, 5, 15 * 60 * 1000) // 5 requests / 15min

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Za dużo prób. Spróbuj ponownie za 15 minut.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetAt.toString(),
          },
        },
      )
    }

    // 2. PARSE BODY
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Nieprawidłowy format danych.',
        },
        { status: 400 },
      )
    }

    // 3. VERIFY CAPTCHA
    const captchaToken = body.captchaToken
    if (!captchaToken || typeof captchaToken !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Brak tokenu CAPTCHA.',
        },
        { status: 400 },
      )
    }

    const captchaValid = await verifyTurnstile(captchaToken)
    if (!captchaValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Weryfikacja CAPTCHA nie powiodła się. Odśwież stronę i spróbuj ponownie.',
        },
        { status: 400 },
      )
    }

    // 4. SANITIZE INPUT
    const sanitizedData = sanitizeFormData(body)

    // 5. VALIDATE WITH ZOD
    const validationResult = contactFormSchemaRefined.safeParse(sanitizedData)

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors
      console.log('[API] Validation failed:', fieldErrors)

      return NextResponse.json(
        {
          success: false,
          message: 'Dane formularza są nieprawidłowe',
          errors: fieldErrors,
        },
        { status: 400 },
      )
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
      return NextResponse.json(
        {
          success: false,
          message: 'Błąd zapisu danych. Spróbuj ponownie później.',
        },
        { status: 500 },
      )
    }

    // 8. SEND NOTIFICATIONS (async, nie blokujemy response)
    sendNotification(normalizedData, leadId).catch((error) => {
      console.error('[API] Failed to send notification:', error)
    })

    // 9. SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: 'Formularz został wysłany pomyślnie',
        leadId,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetAt.toString(),
        },
      },
    )
  } catch (error) {
    console.error('[API] Unhandled error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
      },
      { status: 500 },
    )
  }
}

// ============================================================
// OPTIONS - dla CORS preflight
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
