import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchemaRefined } from '@/schemas/contact'
import { sanitizeFormData, checkRateLimit, normalizePhone } from '@/lib/sanitize'

/**
 * Weryfikuje Cloudflare Turnstile token
 */
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured')
    return false
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification failed:', error)
    return false
  }
}

/**
 * Zapisuje lead do bazy danych
 * W produkcji: Prisma, Supabase, lub inne ORM
 */
async function saveLead(data: any): Promise<string> {
  // TODO: Implementacja zapisu do bazy
  // Przykład z Prisma:
  // const lead = await prisma.lead.create({
  //   data: {
  //     ...data,
  //     createdAt: new Date(),
  //   }
  // })
  // return lead.id

  // Mock dla przykładu
  const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
  console.log('[API] Lead saved:', {
    leadId,
    email: data.email,
    infrastructure: data.infrastructure,
  })

  return leadId
}

/**
 * Wysyła email powiadomienie
 * W produkcji: Resend, SendGrid, AWS SES
 */
async function sendNotification(data: any, leadId: string): Promise<void> {
  // TODO: Implementacja wysyłki emaila
  // Przykład z Resend:
  // await resend.emails.send({
  //   from: 'leads@yourdomain.com',
  //   to: 'sales@yourdomain.com',
  //   subject: `Nowy lead: ${data.firstName} ${data.lastName}`,
  //   html: `<p>Lead ID: ${leadId}</p>...`
  // })

  console.log('[API] Notification sent for lead:', leadId)
}

/**
 * POST /api/lead
 * Obsługuje zgłoszenia z formularza kontaktowego
 */
export async function POST(request: NextRequest) {
  try {
    // 1. RATE LIMITING - po IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
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
        }
      )
    }

    // 2. PARSE BODY
    const body = await request.json()

    // 3. VERIFY CAPTCHA
    const captchaValid = await verifyTurnstile(body.captchaToken)
    if (!captchaValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Weryfikacja CAPTCHA nie powiodła się. Odśwież stronę i spróbuj ponownie.',
        },
        { status: 400 }
      )
    }

    // 4. SANITIZE INPUT
    const sanitizedData = sanitizeFormData(body)

    // 5. VALIDATE WITH ZOD
    const validationResult = contactFormSchemaRefined.safeParse(sanitizedData)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Dane formularza są nieprawidłowe',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // 6. NORMALIZE DATA
    const normalizedData = {
      ...validData,
      phone: normalizePhone(validData.phone),
      email: validData.email.toLowerCase(),
    }

    // 7. SAVE TO DATABASE
    const leadId = await saveLead(normalizedData)

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
      }
    )
  } catch (error) {
    console.error('[API] Error processing lead:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS - dla CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
