'use client'

import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  type FormEvent,
} from 'react'
import { useForm, Controller, type UseFormRegisterReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Turnstile } from '@marsidev/react-turnstile'
import { PatternFormat } from 'react-number-format'

import {
  contactFormSchemaRefined,
  type ContactFormData,
} from '@/schemas/contact'
import {
  INFRA_OPTIONS,
  SLUP_LEVELS,
  GAZ_LEVELS,
  STATUS_OPTIONS,
  KW_OPTIONS,
} from './contactOptions'
import { contactStyles } from './contactStyles'
import { PhoneInput } from './PhoneInput'
import { FormSkeleton } from './FormSkeleton'
import { SuccessDialog, ErrorDialog } from './ContactDialogs'

// ============================================================
// ATOMIC COMPONENTS
// ============================================================

interface FormErrorProps {
  message?: string
  id: string
}

const FormError = memo<FormErrorProps>(({ message, id }) => {
  if (!message) return null

  return (
    <p
      id={id}
      className="mt-2 text-sm text-red-600"
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  )
})
FormError.displayName = 'FormError'

interface InputFieldProps {
  id: string
  label: string
  type?: string
  autoComplete?: string
  placeholder?: string
  error?: string
  register: UseFormRegisterReturn
  onInput?: (e: FormEvent<HTMLInputElement>) => void
}

const InputField = memo<InputFieldProps>(({
  id,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  error,
  register,
  onInput,
}) => {
  const inputClass = `${contactStyles.input.base} ${error ? contactStyles.input.error : contactStyles.input.normal}`

  return (
    <div>
      <label htmlFor={id} className={contactStyles.label}>
        {label} <span className="text-red-600" aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${id}` : undefined}
        aria-required="true"
        className={inputClass}
        onInput={onInput}
        {...register}
      />
      <FormError id={`error-${id}`} message={error} />
    </div>
  )
})
InputField.displayName = 'InputField'

// ============================================================
// MAIN COMPONENT
// ============================================================

export function ContactSection() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchemaRefined),
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      infrastructure: [],
      marketingConsent: false,
    },
  })

  const selectedInfra = watch('infrastructure') ?? []

  // Hydration fix
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Analytics tracking (mock if not available)
  const trackFormStarted = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'form_start', { form_name: 'contact' })
    }
  }, [])

  const trackFormSubmit = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'form_submit', { form_name: 'contact' })
    }
  }, [])

  const trackFormSuccess = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'form_success', { form_name: 'contact' })
    }
  }, [])

  const trackFormError = useCallback((error: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'form_error', {
        form_name: 'contact',
        error,
      })
    }
  }, [])

  useEffect(() => {
    trackFormStarted()
  }, [trackFormStarted])

  // Form submission handler
  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      try {
        trackFormSubmit()

        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, captchaToken }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message || 'Błąd serwera. Spróbuj ponownie później.',
          )
        }

        trackFormSuccess()
        setIsSuccessOpen(true)
        reset()
        setCaptchaToken(null)
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.'
        setErrorMessage(msg)
        setIsErrorOpen(true)
        trackFormError(msg)
      }
    },
    [captchaToken, reset, trackFormSubmit, trackFormSuccess, trackFormError],
  )

  // Infrastructure checkbox handler
  const handleInfraChange = useCallback(
    (id: ContactFormData['infrastructure'][number]) => {
      const nextValue = selectedInfra.includes(id)
        ? selectedInfra.filter((v) => v !== id)
        : [...selectedInfra, id]
      setValue('infrastructure', nextValue, { shouldValidate: true })
    },
    [selectedInfra, setValue],
  )

  // Phone handlers (synced z react-hook-form)
  const handlePhoneChange = useCallback(
    (value: string) => {
      setValue('phone', value, { shouldValidate: false })
    },
    [setValue],
  )

  const handlePhoneBlur = useCallback(() => {
    trigger('phone')
  }, [trigger])

  // CAPTCHA handlers
  const handleCaptchaSuccess = useCallback(
    (token: string) => {
      setCaptchaToken(token)
      setValue('captchaToken', token, { shouldValidate: true })
    },
    [setValue],
  )

  const handleCaptchaError = useCallback(() => {
    setCaptchaToken(null)
    setValue('captchaToken', '', { shouldValidate: true })
  }, [setValue])

  // Derived state for conditional rendering
  const showSlupParams = useMemo(
    () => selectedInfra.includes('slup'),
    [selectedInfra],
  )
  const showGazParams = useMemo(
    () => selectedInfra.includes('gaz'),
    [selectedInfra],
  )
  const showConditionalFields = useMemo(
    () => selectedInfra.length > 0,
    [selectedInfra],
  )

  if (!isClient) {
    return <FormSkeleton />
  }

  return (
    <section
      className="bg-white px-6 py-24 dark:bg-gray-900 sm:py-32"
      aria-labelledby="form-title"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="max-w-2xl">
          <h2
            id="form-title"
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Sprawdź swoją sprawę
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Bezpłatna analiza prawna Twojej nieruchomości w 24h.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-16 grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-16"
        >
          <div className="lg:col-span-2 space-y-10">
            {/* Personal Data Section */}
            <fieldset className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <legend className="sr-only">Dane kontaktowe</legend>

              <InputField
                id="firstName"
                label="Imię"
                autoComplete="given-name"
                placeholder="Jan"
                error={errors.firstName?.message}
                register={register('firstName')}
              />

              <InputField
                id="lastName"
                label="Nazwisko"
                autoComplete="family-name"
                placeholder="Kowalski"
                error={errors.lastName?.message}
                register={register('lastName')}
              />

              <div className="sm:col-span-2">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      id="phone"
                      label="Telefon"
                      error={errors.phone?.message}
                      value={field.value || ''}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                    />
                  )}
                />
              </div>

              <div className="sm:col-span-2">
                <InputField
                  id="email"
                  label="E-mail"
                  type="email"
                  autoComplete="email"
                  placeholder="jan.kowalski@example.com"
                  error={errors.email?.message}
                  register={register('email')}
                />
              </div>

              <div>
                <label htmlFor="postalCode" className={contactStyles.label}>
                  Kod pocztowy{' '}
                  <span className="text-red-600" aria-hidden="true">
                    *
                  </span>
                </label>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <PatternFormat
                      id="postalCode"
                      format="##-###"
                      mask="_"
                      placeholder="00-000"
                      value={field.value || ''}
                      onValueChange={(values) => {
                        // zapisujemy wartość w formacie 00-000,
                        // żeby pasowała do walidacji Zod
                        field.onChange(values.formattedValue)
                      }}
                      onBlur={field.onBlur}
                      aria-invalid={!!errors.postalCode}
                      aria-describedby={
                        errors.postalCode ? 'error-postalCode' : undefined
                      }
                      aria-required="true"
                      className={`${contactStyles.input.base} ${
                        errors.postalCode
                          ? contactStyles.input.error
                          : contactStyles.input.normal
                      }`}
                      autoComplete="postal-code"
                    />
                  )}
                />
                <FormError
                  id="error-postalCode"
                  message={errors.postalCode?.message}
                />
              </div>

              <InputField
                id="city"
                label="Miejscowość"
                autoComplete="address-level2"
                placeholder="Warszawa"
                error={errors.city?.message}
                register={register('city')}
              />
            </fieldset>

            {/* Infrastructure Section */}
            <fieldset>
              <legend className="text-base font-semibold text-gray-900 dark:text-white">
                Rodzaj infrastruktury na działce{' '}
                <span className="text-red-600" aria-hidden="true">
                  *
                </span>
              </legend>
              <div className="mt-6 space-y-5">
                {INFRA_OPTIONS.map((opt) => (
                  <div key={opt.id} className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          type="checkbox"
                          checked={selectedInfra.includes(
                            opt.id as ContactFormData['infrastructure'][number],
                          )}
                          onChange={() =>
                            handleInfraChange(
                              opt.id as ContactFormData['infrastructure'][number],
                            )
                          }
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500"
                          aria-describedby={`infra-desc-${opt.id}`}
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[input:checked]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor={`infra-${opt.id}`}
                        className="font-medium text-gray-900 dark:text-white cursor-pointer"
                      >
                        {opt.label}
                      </label>
                      <p
                        id={`infra-desc-${opt.id}`}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <FormError
                id="error-infrastructure"
                message={errors.infrastructure?.message}
              />
            </fieldset>

            {/* Slup Parameters - Card Style */}
            {showSlupParams && (
              <fieldset className={contactStyles.fieldset}>
                <legend className="text-sm font-bold text-gray-900 dark:text-white">
                  Parametry techniczne słupa{' '}
                  <span className="text-red-600" aria-hidden="true">
                    *
                  </span>
                </legend>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {SLUP_LEVELS.map((level) => (
                    <label
                      key={level.id}
                      className={`${contactStyles.card.base} ${contactStyles.card.normal} has-[:checked]:${contactStyles.card.checked}`}
                    >
                      <input
                        type="radio"
                        value={level.label}
                        {...register('slupParams')}
                        className="sr-only"
                      />
                      <div className="flex flex-1 flex-col">
                        <span className="block text-sm font-medium text-gray-900 dark:text-white">
                          {level.label}
                        </span>
                        <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                          {level.desc}
                        </span>
                      </div>
                      <CheckCircleIcon
                        className="invisible size-5 text-indigo-600 group-has-[input:checked]:visible dark:text-indigo-500"
                        aria-hidden="true"
                      />
                    </label>
                  ))}
                </div>
                <FormError
                  id="error-slupParams"
                  message={errors.slupParams?.message}
                />
              </fieldset>
            )}

            {/* Gaz Parameters - Card Style */}
            {showGazParams && (
              <fieldset className={contactStyles.fieldset}>
                <legend className="text-sm font-bold text-gray-900 dark:text-white">
                  Parametry techniczne gazociągu{' '}
                  <span className="text-red-600" aria-hidden="true">
                    *
                  </span>
                </legend>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {GAZ_LEVELS.map((level) => (
                    <label
                      key={level.id}
                      className={`${contactStyles.card.base} ${contactStyles.card.normal} has-[:checked]:${contactStyles.card.checked}`}
                    >
                      <input
                        type="radio"
                        value={level.label}
                        {...register('gazParams')}
                        className="sr-only"
                      />
                      <div className="flex flex-1 flex-col">
                        <span className="block text-sm font-medium text-gray-900 dark:text-white">
                          {level.label}
                        </span>
                        <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                          {level.desc}
                        </span>
                      </div>
                      <CheckCircleIcon
                        className="invisible size-5 text-indigo-600 group-has-[input:checked]:visible dark:text-indigo-500"
                        aria-hidden="true"
                      />
                    </label>
                  ))}
                </div>
                <FormError
                  id="error-gazParams"
                  message={errors.gazParams?.message}
                />
              </fieldset>
            )}

            {/* Conditional Fields */}
            {showConditionalFields && (
              <>
                {/* Status */}
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900 dark:text-white">
                    Status urządzenia{' '}
                    <span className="text-red-600" aria-hidden="true">
                      *
                    </span>
                  </legend>
                  <div className="mt-4 space-y-3">
                    {STATUS_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={opt.id}
                          {...register('status')}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  <FormError
                    id="error-status"
                    message={errors.status?.message}
                  />
                </fieldset>

                {/* KW */}
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900 dark:text-white">
                    Czy działka ma Księgę Wieczystą?{' '}
                    <span className="text-red-600" aria-hidden="true">
                      *
                    </span>
                  </legend>
                  <div className="mt-4 flex gap-6">
                    {KW_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={opt.id}
                          {...register('hasKW')}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  <FormError
                    id="error-hasKW"
                    message={errors.hasKW?.message}
                  />
                </fieldset>
              </>
            )}

            {/* Marketing Consent */}
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <input
                  id="marketingConsent"
                  type="checkbox"
                  {...register('marketingConsent')}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="marketingConsent"
                  className="text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  Zgadzam się na telefoniczny kontakt marketingowy.{' '}
                  <span className="text-red-600" aria-hidden="true">
                    *
                  </span>
                </label>
                <FormError
                  id="error-marketingConsent"
                  message={errors.marketingConsent?.message}
                />
              </div>
            </div>

            {/* CAPTCHA & Submit */}
            <div className="space-y-6 border-t border-gray-200 pt-6 dark:border-white/10">
              <Turnstile
                siteKey={
                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                  '1x00000000000000000000AA'
                }
                onSuccess={handleCaptchaSuccess}
                onError={handleCaptchaError}
                options={{ theme: 'auto' }}
              />
              <FormError
                id="error-captcha"
                message={errors.captchaToken?.message}
              />

              <button
                type="submit"
                disabled={isSubmitting || !captchaToken}
                className="w-full rounded-lg bg-indigo-600 px-4 py-4 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Przetwarzanie...
                  </span>
                ) : (
                  'Wyślij darmowe zgłoszenie'
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="mt-12 space-y-6 lg:mt-0">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Dlaczego my?
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex gap-3">
                  <CheckIcon
                    className="h-5 w-5 shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <span>Bezpłatna weryfikacja KW</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon
                    className="h-5 w-5 shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <span>Analiza w 24h</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon
                    className="h-5 w-5 shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <span>Bez zobowiązań</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon
                    className="h-5 w-5 shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <span>95% wygranych spraw</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-indigo-50 p-8 dark:border-white/10 dark:bg-indigo-500/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                Masz pytania?
              </h3>
              <p className="mt-4 text-sm text-indigo-700 dark:text-indigo-300">
                Zadzwoń do nas{' '}
                <a
                  href="tel:+48123456789"
                  className="font-semibold hover:underline"
                >
                  +48 123 456 789
                </a>
              </p>
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
                Pon–Pt 8:00–18:00
              </p>
            </div>
          </aside>
        </form>

        {/* Dialogs */}
        <SuccessDialog
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
        />
        <ErrorDialog
          isOpen={isErrorOpen}
          onClose={() => setIsErrorOpen(false)}
          message={errorMessage}
        />
      </div>
    </section>
  )
}
