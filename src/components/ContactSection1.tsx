'use client'

import { useEffect, useState } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Turnstile } from '@marsidev/react-turnstile'

import { contactFormSchemaRefined, type ContactFormData } from '@/schemas/contact'
import { formAnalytics } from '@/lib/analytics'

/* ==========================================================================
   CONFIGURATION & TYPES
   ========================================================================== */

const INFRA_OPTIONS = [
  { id: 'slup', label: 'Słup elektroenergetyczny', desc: 'Linie niskiego, średniego lub wysokiego napięcia' },
  { id: 'gaz', label: 'Gazociąg', desc: 'Instalacje przesyłowe gazu' },
  { id: 'ropa', label: 'Ropociąg', desc: 'Rurociągi paliwowe' },
  { id: 'inne', label: 'Inne urządzenie przesyłowe', desc: 'Stacje, kolektory, inne instalacje' },
] as const

type InfraId = (typeof INFRA_OPTIONS)[number]['id']

const SLUP_LEVELS = [
  'Wysokie napięcie (110–750 kV)',
  'Średnie napięcie (15–30 kV)',
  'Niskie napięcie',
] as const

const GAZ_LEVELS = [
  'Wysokie ciśnienie',
  'Średnie ciśnienie',
  'Niskie ciśnienie (do domu)',
] as const

const STATUS_OPTIONS = [
  { id: 'existing', label: 'Istniejące' },
  { id: 'planned', label: 'Planowane / w trakcie' },
  { id: 'modernization', label: 'Modernizacja' },
] as const

const KW_OPTIONS = [
  { id: 'yes', label: 'Tak' },
  { id: 'no', label: 'Nie' },
] as const

/* ==========================================================================
   STYLING CONSTANTS (DRY)
   ========================================================================== */

const INPUT_BASE = 'mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:bg-white/5 dark:text-white sm:text-sm'
const INPUT_NORMAL = 'ring-gray-300 focus:ring-indigo-600 dark:ring-white/10'
const INPUT_ERROR = 'ring-red-300 focus:ring-red-600'

const LABEL_BASE = 'block text-sm font-semibold text-gray-900 dark:text-white'
const FIELDSET_CONDITIONAL = 'p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10'

/* ==========================================================================
   ATOMIC COMPONENTS
   ========================================================================== */

const FormError = ({ message, id }: { message?: string; id: string }) => {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-1" role="alert">
      {message}
    </p>
  )
}

type InputFieldProps = {
  id: string
  label: string
  type?: string
  autoComplete?: string
  placeholder?: string
  error?: string
  register: UseFormRegisterReturn // ✅ PROPER TYPING - no more `any`
  onInput?: React.FormEventHandler<HTMLInputElement>
}

const InputField = ({ 
  id, 
  label, 
  type = 'text', 
  autoComplete, 
  placeholder, 
  error, 
  register, 
  onInput 
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className={LABEL_BASE}>
      {label} <span className="text-red-600">*</span>
    </label>
    <input
      id={id}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `error-${id}` : undefined}
      className={`${INPUT_BASE} ${error ? INPUT_ERROR : INPUT_NORMAL}`}
      onInput={onInput}
      {...register}
    />
    <FormError id={`error-${id}`} message={error} />
  </div>
)

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export function ContactSection() {
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchemaRefined),
    mode: 'onBlur',
    shouldUnregister: true, // 🎯 Auto-cleanup conditional fields
    defaultValues: {
      infrastructure: [],
      marketingConsent: false,
    },
  })

  const selectedInfra = watch('infrastructure') ?? []

  useEffect(() => {
    formAnalytics.started()
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    try {
      formAnalytics.submitted(data.infrastructure)

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, captchaToken }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Błąd serwera')

      formAnalytics.success(result.leadId)
      setSuccessOpen(true)
      reset()
      setCaptchaToken(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd'
      setErrorMessage(msg)
      setErrorDialogOpen(true)
      formAnalytics.error('submit_failed', msg)
    }
  }

  const handleInfraChange = (id: InfraId) => {
    const nextValue = selectedInfra.includes(id)
      ? selectedInfra.filter((v) => v !== id)
      : [...selectedInfra, id]
    setValue('infrastructure', nextValue as any, { shouldValidate: true })
  }

  // Auto-format postal code
  const handlePostalInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    let value = input.value.replace(/[^0-9]/g, '')
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2, 5)
    }
    input.value = value
  }

  return (
    <section className="bg-white px-6 py-24 dark:bg-gray-900 sm:py-32" aria-labelledby="form-title">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <header className="max-w-2xl">
          <h2 id="form-title" className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sprawdź swoją sprawę
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Bezpłatna analiza prawna Twojej nieruchomości w 24h.
          </p>
        </header>

        {/* MAIN FORM */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          noValidate 
          suppressHydrationWarning 
          className="mt-16 grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-16"
        >
          <div className="lg:col-span-2 space-y-10">
            {/* SEKCJA: DANE OSOBOWE */}
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
                <InputField
                  id="phone"
                  label="Telefon"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+48 123 456 789"
                  error={errors.phone?.message}
                  register={register('phone')}
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

              <InputField
                id="postalCode"
                label="Kod pocztowy"
                autoComplete="postal-code"
                placeholder="00-000"
                error={errors.postalCode?.message}
                register={register('postalCode')}
                onInput={handlePostalInput}
              />

              <InputField
                id="city"
                label="Miejscowość"
                autoComplete="address-level2"
                placeholder="Warszawa"
                error={errors.city?.message}
                register={register('city')}
              />
            </fieldset>

            {/* SEKCJA: INFRASTRUKTURA */}
            <fieldset>
              <legend className="text-base font-semibold text-gray-900 dark:text-white">
                Rodzaj infrastruktury na działce <span className="text-red-600">*</span>
              </legend>
              <div className="mt-6 space-y-3">
                {INFRA_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className="relative flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedInfra.includes(opt.id)}
                      onChange={() => handleInfraChange(opt.id)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <div className="text-sm leading-6">
                      <span className="font-medium text-gray-900 dark:text-white">{opt.label}</span>
                      <p className="text-gray-500 dark:text-gray-400">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <FormError id="error-infrastructure" message={errors.infrastructure?.message} />
            </fieldset>

            {/* CONDITIONAL: Parametry słupa */}
            {selectedInfra.includes('slup') && (
              <fieldset className={FIELDSET_CONDITIONAL}>
                <legend className="text-sm font-bold text-gray-900 dark:text-white">
                  Parametry techniczne słupa <span className="text-red-600">*</span>
                </legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {SLUP_LEVELS.map((level) => (
                    <label key={level} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        value={level}
                        {...register('slupParams')}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      {level}
                    </label>
                  ))}
                </div>
                <FormError id="error-slupParams" message={errors.slupParams?.message} />
              </fieldset>
            )}

            {/* CONDITIONAL: Parametry gazociągu */}
            {selectedInfra.includes('gaz') && (
              <fieldset className={FIELDSET_CONDITIONAL}>
                <legend className="text-sm font-bold text-gray-900 dark:text-white">
                  Parametry techniczne gazociągu <span className="text-red-600">*</span>
                </legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {GAZ_LEVELS.map((level) => (
                    <label key={level} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        value={level}
                        {...register('gazParams')}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      {level}
                    </label>
                  ))}
                </div>
                <FormError id="error-gazParams" message={errors.gazParams?.message} />
              </fieldset>
            )}

            {/* CONDITIONAL: Status & KW (tylko gdy wybrano infrastrukturę) */}
            {selectedInfra.length > 0 && (
              <>
                {/* Status urządzenia */}
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900 dark:text-white">
                    Status urządzenia <span className="text-red-600">*</span>
                  </legend>
                  <div className="mt-4 space-y-3">
                    {STATUS_OPTIONS.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
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
                  <FormError id="error-status" message={errors.status?.message} />
                </fieldset>

                {/* Księga Wieczysta */}
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900 dark:text-white">
                    Czy działka ma Księgę Wieczystą? <span className="text-red-600">*</span>
                  </legend>
                  <div className="mt-4 flex gap-6">
                    {KW_OPTIONS.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
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
                  <FormError id="error-hasKW" message={errors.hasKW?.message} />
                </fieldset>
              </>
            )}

            {/* MARKETING CONSENT */}
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
                <label htmlFor="marketingConsent" className="text-gray-600 dark:text-gray-400">
                  Zgadzam się na telefoniczny kontakt marketingowy. <span className="text-red-600">*</span>
                </label>
                <FormError id="error-marketingConsent" message={errors.marketingConsent?.message} />
              </div>
            </div>

            {/* CAPTCHA & SUBMIT */}
            <div className="space-y-6 border-t border-gray-200 pt-6 dark:border-white/10">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                onSuccess={(token) => {
                  setCaptchaToken(token)
                  setValue('captchaToken', token, { shouldValidate: true })
                  formAnalytics.captchaCompleted()
                }}
                onError={() => {
                  setCaptchaToken(null)
                  setValue('captchaToken', '', { shouldValidate: true })
                }}
                theme="auto"
              />
              <FormError id="error-captcha" message={errors.captchaToken?.message} />

              <button
                type="submit"
                disabled={isSubmitting || !captchaToken}
                className="w-full rounded-lg bg-indigo-600 px-4 py-4 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
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

          {/* ASIDE - Social Proof */}
          <aside className="mt-12 space-y-6 lg:mt-0">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Dlaczego my?</h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-green-500" />
                  <span>Bezpłatna weryfikacja KW</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-green-500" />
                  <span>Odpowiedź w 24h</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-green-500" />
                  <span>15+ lat doświadczenia</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Kontakt bezpośredni</h3>
              <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong className="text-gray-900 dark:text-white">Email:</strong>
                  <br />
                  <a href="mailto:hello@strona.pl" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                    hello@strona.pl
                  </a>
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">Lokalizacja:</strong>
                  <br />
                  Warszawa, Polska
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>

      {/* SUCCESS DIALOG */}
      <Dialog open={successOpen} onClose={setSuccessOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/75"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800"
            >
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/10">
                  <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                    Formularz wysłany pomyślnie
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Dziękujemy! Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => setSuccessOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Zamknij
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* ERROR DIALOG */}
      <Dialog open={errorDialogOpen} onClose={setErrorDialogOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/75"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800"
            >
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
                  <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                    Wystąpił błąd
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{errorMessage}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => setErrorDialogOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Zamknij
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  )
}
