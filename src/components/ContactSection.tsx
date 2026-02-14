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
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'
import {
  CheckIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Turnstile } from '@marsidev/react-turnstile'
import { NumericFormat, PatternFormat } from 'react-number-format'

import { contactFormSchemaRefined, type ContactFormData } from '@/schemas/contact'

// ============================================================
// TYPES & CONFIGURATION
// ============================================================

type CountryCode = 'PL' | 'DE' | 'GB' | 'FR' | 'IT' | 'ES' | 'NL' | 'BE' | 'AT' | 'CZ' |
  'SK' | 'LT' | 'LV' | 'EE' | 'UA' | 'US' | 'CA' | 'AU' | 'CH' | 'SE' |
  'NO' | 'DK' | 'FI' | 'IE' | 'PT' | 'GR' | 'HU' | 'RO' | 'BG' | 'HR' | 'SI'

interface Country {
  code: CountryCode
  name: string
  dialCode: string
  flag: string
  pattern?: string
}

interface InfraOption {
  id: string
  label: string
  desc: string
}

interface LevelOption {
  id: string
  label: string
  desc: string
}

interface StatusOption {
  id: string
  label: string
}

// ============================================================
// CONSTANTS
// ============================================================

const COUNTRIES: readonly Country[] = [
  { code: 'PL', name: 'Polska', dialCode: '+48', flag: '🇵🇱', pattern: '### ### ###' },
  { code: 'DE', name: 'Niemcy', dialCode: '+49', flag: '🇩🇪', pattern: '### ### ### ####' },
  { code: 'GB', name: 'Wielka Brytania', dialCode: '+44', flag: '🇬🇧', pattern: '#### ######' },
  { code: 'FR', name: 'Francja', dialCode: '+33', flag: '🇫🇷', pattern: '# ## ## ## ##' },
  { code: 'IT', name: 'Włochy', dialCode: '+39', flag: '🇮🇹', pattern: '### ### ####' },
  { code: 'ES', name: 'Hiszpania', dialCode: '+34', flag: '🇪🇸', pattern: '### ### ###' },
  { code: 'NL', name: 'Holandia', dialCode: '+31', flag: '🇳🇱', pattern: '# ########' },
  { code: 'BE', name: 'Belgia', dialCode: '+32', flag: '🇧🇪', pattern: '### ## ## ##' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹', pattern: '### ### ####' },
  { code: 'CZ', name: 'Czechy', dialCode: '+420', flag: '🇨🇿', pattern: '### ### ###' },
  { code: 'SK', name: 'Słowacja', dialCode: '+421', flag: '🇸🇰', pattern: '### ### ###' },
  { code: 'LT', name: 'Litwa', dialCode: '+370', flag: '🇱🇹', pattern: '### #####' },
  { code: 'LV', name: 'Łotwa', dialCode: '+371', flag: '🇱🇻', pattern: '## ### ###' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪', pattern: '#### ####' },
  { code: 'UA', name: 'Ukraina', dialCode: '+380', flag: '🇺🇦', pattern: '## ### ## ##' },
  { code: 'US', name: 'Stany Zjednoczone', dialCode: '+1', flag: '🇺🇸', pattern: '(###) ###-####' },
  { code: 'CA', name: 'Kanada', dialCode: '+1', flag: '🇨🇦', pattern: '(###) ###-####' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', pattern: '# #### ####' },
  { code: 'CH', name: 'Szwajcaria', dialCode: '+41', flag: '🇨🇭', pattern: '## ### ## ##' },
  { code: 'SE', name: 'Szwecja', dialCode: '+46', flag: '🇸🇪', pattern: '##-### ## ##' },
  { code: 'NO', name: 'Norwegia', dialCode: '+47', flag: '🇳🇴', pattern: '### ## ###' },
  { code: 'DK', name: 'Dania', dialCode: '+45', flag: '🇩🇰', pattern: '## ## ## ##' },
  { code: 'FI', name: 'Finlandia', dialCode: '+358', flag: '🇫🇮', pattern: '## ### ## ##' },
  { code: 'IE', name: 'Irlandia', dialCode: '+353', flag: '🇮🇪', pattern: '## ### ####' },
  { code: 'PT', name: 'Portugalia', dialCode: '+351', flag: '🇵🇹', pattern: '### ### ###' },
  { code: 'GR', name: 'Grecja', dialCode: '+30', flag: '🇬🇷', pattern: '### ### ####' },
  { code: 'HU', name: 'Węgry', dialCode: '+36', flag: '🇭🇺', pattern: '## ### ####' },
  { code: 'RO', name: 'Rumunia', dialCode: '+40', flag: '🇷🇴', pattern: '### ### ###' },
  { code: 'BG', name: 'Bułgaria', dialCode: '+359', flag: '🇧🇬', pattern: '### ### ###' },
  { code: 'HR', name: 'Chorwacja', dialCode: '+385', flag: '🇭🇷', pattern: '## ### ####' },
  { code: 'SI', name: 'Słowenia', dialCode: '+386', flag: '🇸🇮', pattern: '## ### ###' },
] as const

const INFRA_OPTIONS: readonly InfraOption[] = [
  { id: 'slup', label: 'Słup elektroenergetyczny', desc: 'Linie niskiego, średniego lub wysokiego napięcia' },
  { id: 'gaz', label: 'Gazociąg', desc: 'Instalacje przesyłowe gazu' },
  { id: 'ropa', label: 'Ropociąg', desc: 'Rurociągi paliwowe' },
  { id: 'inne', label: 'Inne urządzenie przesyłowe', desc: 'Stacje, kolektory, inne instalacje' },
] as const

const SLUP_LEVELS: readonly LevelOption[] = [
  { id: 'high', label: 'Wysokie napięcie', desc: '110–750 kV' },
  { id: 'medium', label: 'Średnie napięcie', desc: '15–30 kV' },
  { id: 'low', label: 'Niskie napięcie', desc: 'Do 1 kV' },
] as const

const GAZ_LEVELS: readonly LevelOption[] = [
  { id: 'high-pressure', label: 'Wysokie ciśnienie', desc: 'Powyżej 16 bar' },
  { id: 'medium-pressure', label: 'Średnie ciśnienie', desc: '0.5–16 bar' },
  { id: 'low-pressure', label: 'Niskie ciśnienie', desc: 'Do domu' },
] as const

const STATUS_OPTIONS: readonly StatusOption[] = [
  { id: 'existing', label: 'Istniejące' },
  { id: 'planned', label: 'Planowane / w trakcie' },
  { id: 'modernization', label: 'Modernizacja' },
] as const

const KW_OPTIONS: readonly StatusOption[] = [
  { id: 'yes', label: 'Tak' },
  { id: 'no', label: 'Nie' },
] as const

// ============================================================
// STYLES
// ============================================================

const styles = {
  input: {
    base: 'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset dark:bg-white/5 dark:text-white sm:text-sm',
    normal: 'ring-gray-300 focus:ring-indigo-600 dark:ring-white/10',
    error: 'ring-red-300 focus:ring-red-600',
  },
  label: 'block text-sm font-semibold text-gray-900 dark:text-white',
  fieldset: 'p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10',
  card: {
    base: 'group relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all duration-200',
    normal: 'border-gray-300 hover:border-gray-400 dark:border-white/10 dark:bg-gray-800/50 dark:hover:border-white/20',
    checked: 'border-indigo-600 ring-2 ring-indigo-600 dark:border-indigo-500 dark:ring-indigo-500',
  },
} as const

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
      className="mt-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-1"
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
  const inputClass = `${styles.input.base} ${error ? styles.input.error : styles.input.normal}`
  
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
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
// PHONE INPUT COMPONENT with Listbox (A11y)
// ============================================================

interface PhoneInputProps {
  id: string
  label: string
  error?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}

const PhoneInput = memo<PhoneInputProps>(({
  id,
  label,
  error,
  value,
  onChange,
  onBlur,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0])

  const handleCountryChange = useCallback((country: Country) => {
    setSelectedCountry(country)
    // Clear phone when country changes to avoid format conflicts
    onChange('')
  }, [onChange])

  const buttonClass = `
    relative inline-flex items-center gap-2 rounded-l-md px-3 py-2 
    text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-inset
    sm:text-sm dark:bg-white/5 dark:text-white
    ${error 
      ? 'ring-red-300 focus:ring-red-600' 
      : 'ring-gray-300 focus:ring-indigo-600 dark:ring-white/10'}
  `

  const inputClass = `
    flex-1 rounded-r-md border-0 px-3.5 py-2 
    text-gray-900 ring-1 ring-inset placeholder:text-gray-400 
    focus:ring-2 focus:ring-inset sm:text-sm 
    dark:bg-white/5 dark:text-white
    ${error 
      ? 'ring-red-300 focus:ring-red-600' 
      : 'ring-gray-300 focus:ring-indigo-600 dark:ring-white/10'}
  `

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label} <span className="text-red-600" aria-hidden="true">*</span>
      </label>
      <div className="relative mt-2">
        <div className="flex rounded-md shadow-sm">
          {/* Country Selector with Listbox for full A11y */}
          <Listbox value={selectedCountry} onChange={handleCountryChange}>
            {({ open }) => (
              <div className="relative">
                <ListboxButton
                  className={buttonClass}
                  aria-label={`Wybrany kraj: ${selectedCountry.name}, kod: ${selectedCountry.dialCode}`}
                >
                  <span className="text-lg" aria-hidden="true">{selectedCountry.flag}</span>
                  <span className="text-gray-500 text-sm">{selectedCountry.dialCode}</span>
                  <ChevronDownIcon 
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
                    aria-hidden="true"
                  />
                </ListboxButton>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions
                    className="absolute left-0 top-full z-50 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:ring-white/10"
                    modal={false}
                  >
                    <div className="sticky top-0 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                      Wybierz kraj
                    </div>
                    {COUNTRIES.map((country) => (
                      <ListboxOption
                        key={country.code}
                        value={country}
                        className={({ focus, selected }) => `
                          flex w-full items-center gap-3 px-3 py-2 text-left cursor-pointer transition-colors
                          ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''}
                          ${selected ? 'bg-indigo-50 dark:bg-indigo-500/10' : ''}
                        `}
                      >
                        {({ selected }) => (
                          <>
                            <span className="text-lg" aria-hidden="true">{country.flag}</span>
                            <span className="flex-1 text-gray-900 dark:text-white">{country.name}</span>
                            <span className="text-gray-500 text-sm">{country.dialCode}</span>
                            {selected && (
                              <CheckIcon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                            )}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            )}
          </Listbox>
          
          {/* Phone Number Input with NumericFormat */}
          <NumericFormat
            id={id}
            value={value}
            onValueChange={(values) => {
              onChange(values.value)
            }}
            onBlur={onBlur}
            format={selectedCountry.pattern || '### ### ###'}
            mask="_"
            placeholder={selectedCountry.pattern?.replace(/#/g, '0') || '000 000 000'}
            aria-invalid={!!error}
            aria-describedby={error ? `error-${id}` : undefined}
            aria-required="true"
            className={inputClass}
            inputMode="tel"
            autoComplete="tel"
            allowEmptyFormatting
          />
        </div>
      </div>
      <FormError id={`error-${id}`} message={error} />
    </div>
  )
})
PhoneInput.displayName = 'PhoneInput'

// ============================================================
// SKELETON LOADER
// ============================================================

const FormSkeleton = memo(() => (
  <section className="bg-white px-6 py-24 dark:bg-gray-900 sm:py-32" aria-labelledby="form-title">
    <div className="mx-auto max-w-5xl">
      <header className="max-w-2xl">
        <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-4 h-6 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </header>
      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="h-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-4">
          <div className="h-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  </section>
))
FormSkeleton.displayName = 'FormSkeleton'

// ============================================================
// DIALOG COMPONENTS
// ============================================================

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
}

const SuccessDialog = memo<SuccessDialogProps>(({ isOpen, onClose }) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in dark:bg-gray-900/75"
    />
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <DialogPanel
          transition
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 dark:bg-gray-800"
        >
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/10">
              <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" aria-hidden="true" />
            </div>
            <DialogTitle as="h3" className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
              Formularz wysłany pomyślnie
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Dziękujemy! Nasz zespół skontaktuje się z Tobą w ciągu 24 godzin.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Zamknij
          </button>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
))
SuccessDialog.displayName = 'SuccessDialog'

interface ErrorDialogProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

const ErrorDialog = memo<ErrorDialogProps>(({ isOpen, onClose, message }) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in dark:bg-gray-900/75"
    />
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <DialogPanel
          transition
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 dark:bg-gray-800"
        >
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
            </div>
            <DialogTitle as="h3" className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
              Wystąpił błąd
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
          >
            Zamknij
          </button>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
))
ErrorDialog.displayName = 'ErrorDialog'


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
      (window as any).gtag('event', 'form_start', { form_name: 'contact' })
    }
  }, [])

  const trackFormSubmit = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', { form_name: 'contact' })
    }
  }, [])

  const trackFormSuccess = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_success', { form_name: 'contact' })
    }
  }, [])

  const trackFormError = useCallback((error: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_error', { form_name: 'contact', error })
    }
  }, [])

  useEffect(() => {
    trackFormStarted()
  }, [trackFormStarted])

  // Form submission handler
  const onSubmit = useCallback(async (data: ContactFormData) => {
    try {
      trackFormSubmit()

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, captchaToken }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Błąd serwera. Spróbuj ponownie później.')
      }

      trackFormSuccess()
      setIsSuccessOpen(true)
      reset()
      setCaptchaToken(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.'
      setErrorMessage(msg)
      setIsErrorOpen(true)
      trackFormError(msg)
    }
  }, [captchaToken, reset, trackFormSubmit, trackFormSuccess, trackFormError])

  // Infrastructure checkbox handler
  const handleInfraChange = useCallback((id: string) => {
    const nextValue = selectedInfra.includes(id)
      ? selectedInfra.filter((v) => v !== id)
      : [...selectedInfra, id]
    setValue('infrastructure', nextValue, { shouldValidate: true })
  }, [selectedInfra, setValue])

  // Phone change handler with form state sync
  const handlePhoneChange = useCallback((value: string) => {
    setValue('phone', value, { shouldValidate: false })
  }, [setValue])

  // Phone blur handler for validation
  const handlePhoneBlur = useCallback(() => {
    trigger('phone')
  }, [trigger])

  // CAPTCHA handlers
  const handleCaptchaSuccess = useCallback((token: string) => {
    setCaptchaToken(token)
    setValue('captchaToken', token, { shouldValidate: true })
  }, [setValue])

  const handleCaptchaError = useCallback(() => {
    setCaptchaToken(null)
    setValue('captchaToken', '', { shouldValidate: true })
  }, [setValue])

  // Derived state for conditional rendering
  const showSlupParams = useMemo(() => selectedInfra.includes('slup'), [selectedInfra])
  const showGazParams = useMemo(() => selectedInfra.includes('gaz'), [selectedInfra])
  const showConditionalFields = useMemo(() => selectedInfra.length > 0, [selectedInfra])

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
                <label htmlFor="postalCode" className={styles.label}>
                  Kod pocztowy <span className="text-red-600" aria-hidden="true">*</span>
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
                      value={field.value}
                      onValueChange={(values) => {
                        field.onChange(values.value)
                      }}
                      onBlur={field.onBlur}
                      aria-invalid={!!errors.postalCode}
                      aria-describedby={errors.postalCode ? 'error-postalCode' : undefined}
                      aria-required="true"
                      className={`${styles.input.base} ${errors.postalCode ? styles.input.error : styles.input.normal}`}
                      autoComplete="postal-code"
                    />
                  )}
                />
                <FormError id="error-postalCode" message={errors.postalCode?.message} />
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
                Rodzaj infrastruktury na działce <span className="text-red-600" aria-hidden="true">*</span>
              </legend>
              <div className="mt-6 space-y-5">
                {INFRA_OPTIONS.map((opt) => (
                  <div key={opt.id} className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          type="checkbox"
                          checked={selectedInfra.includes(opt.id)}
                          onChange={() => handleInfraChange(opt.id)}
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
                      <p id={`infra-desc-${opt.id}`} className="text-gray-500 dark:text-gray-400">
                        {opt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <FormError id="error-infrastructure" message={errors.infrastructure?.message} />
            </fieldset>

            {/* Slup Parameters - Card Style */}
            {showSlupParams && (
              <fieldset className={styles.fieldset}>
                <legend className="text-sm font-bold text-gray-900 dark:text-white">
                  Parametry techniczne słupa <span className="text-red-600" aria-hidden="true">*</span>
                </legend>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {SLUP_LEVELS.map((level) => (
                    <label
                      key={level.id}
                      className={`${styles.card.base} ${styles.card.normal} has-[:checked]:${styles.card.checked}`}
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
                <FormError id="error-slupParams" message={errors.slupParams?.message} />
              </fieldset>
            )}

            {/* Gaz Parameters - Card Style */}
            {showGazParams && (
              <fieldset className={styles.fieldset}>
                <legend className="text-sm font-bold text-gray-900 dark:text-white">
                  Parametry techniczne gazociągu <span className="text-red-600" aria-hidden="true">*</span>
                </legend>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {GAZ_LEVELS.map((level) => (
                    <label
                      key={level.id}
                      className={`${styles.card.base} ${styles.card.normal} has-[:checked]:${styles.card.checked}`}
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
                <FormError id="error-gazParams" message={errors.gazParams?.message} />
              </fieldset>
            )}

            {/* Conditional Fields */}
            {showConditionalFields && (
              <>
                {/* Status */}
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900 dark:text-white">
                    Status urządzenia <span className="text-red-600" aria-hidden="true">*</span>
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
                  <FormError id="error-status" message={errors.status?.message} />
                </fieldset>

                {/* KW */}
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900 dark:text-white">
                    Czy działka ma Księgę Wieczystą? <span className="text-red-600" aria-hidden="true">*</span>
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
                  <FormError id="error-hasKW" message={errors.hasKW?.message} />
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
                <label htmlFor="marketingConsent" className="text-gray-600 dark:text-gray-400 cursor-pointer">
                  Zgadzam się na telefoniczny kontakt marketingowy. <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <FormError id="error-marketingConsent" message={errors.marketingConsent?.message} />
              </div>
            </div>

            {/* CAPTCHA & Submit */}
            <div className="space-y-6 border-t border-gray-200 pt-6 dark:border-white/10">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                onSuccess={handleCaptchaSuccess}
                onError={handleCaptchaError}
                theme="auto"
              />
              <FormError id="error-captcha" message={errors.captchaToken?.message} />

              <button
                type="submit"
                disabled={isSubmitting || !captchaToken}
                className="w-full rounded-lg bg-indigo-600 px-4 py-4 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
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

          {/* Sidebar */}
          <aside className="mt-12 space-y-6 lg:mt-0">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Dlaczego my?
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
                  <span>Bezpłatna weryfikacja KW</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
                  <span>Analiza w 24h</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
                  <span>Bez zobowiązań</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon className="h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
                  <span>95% wygranych spraw</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-indigo-50 p-8 dark:border-white/10 dark:bg-indigo-500/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                Masz pytania?
              </h3>
              <p className="mt-4 text-sm text-indigo-700 dark:text-indigo-300">
                Zadzwoń do nas: <a href="tel:+48123456789" className="font-semibold hover:underline">+48 123 456 789</a>
              </p>
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
                Pon–Pt: 8:00–18:00
              </p>
            </div>
          </aside>
        </form>
      </div>

      {/* Dialogs */}
      <SuccessDialog isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
      <ErrorDialog 
        isOpen={isErrorOpen} 
        onClose={() => setIsErrorOpen(false)} 
        message={errorMessage} 
      />
    </section>
  )
}
