/**
 * Analytics Event Tracking
 * Kompatybilny z Google Analytics 4, Segment, Mixpanel, etc.
 */

type EventName =
  | 'form_started'
  | 'form_field_completed'
  | 'form_submitted'
  | 'form_error'
  | 'form_success'
  | 'captcha_completed'

type EventProperties = Record<string, string | number | boolean | string[]>

/**
 * Wysyła event do analytics
 */
export function trackEvent(eventName: EventName, properties?: EventProperties): void {
  // Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    ;(window as any).gtag('event', eventName, properties)
  }

  // Segment
  if (typeof window !== 'undefined' && 'analytics' in window) {
    ;(window as any).analytics?.track(eventName, properties)
  }

  // Console log w dev mode
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, properties)
  }
}

/**
 * Tracking dla form events
 */
export const formAnalytics = {
  started: () => {
    trackEvent('form_started', {
      form_name: 'contact_lead',
      timestamp: Date.now(),
    })
  },

  fieldCompleted: (fieldName: string) => {
    trackEvent('form_field_completed', {
      form_name: 'contact_lead',
      field_name: fieldName,
    })
  },

  submitted: (infrastructure: string[]) => {
    trackEvent('form_submitted', {
      form_name: 'contact_lead',
      infrastructure: infrastructure,
      infrastructure_count: infrastructure.length,
    })
  },

  error: (errorType: string, errorMessage: string) => {
    trackEvent('form_error', {
      form_name: 'contact_lead',
      error_type: errorType,
      error_message: errorMessage,
    })
  },

  success: (leadId?: string) => {
    trackEvent('form_success', {
      form_name: 'contact_lead',
      lead_id: leadId || 'unknown',
    })
  },

  captchaCompleted: () => {
    trackEvent('captcha_completed', {
      form_name: 'contact_lead',
    })
  },
}

/**
 * Inicjalizacja analytics w useEffect
 */
export function initFormAnalytics(): void {
  if (typeof window !== 'undefined') {
    // Track page view jeśli trzeba
    formAnalytics.started()
  }
}
