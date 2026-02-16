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
  CheckCircleIcon, 
  CheckIcon,
  BoltIcon,
  FireIcon,
  BeakerIcon,
  Cog6ToothIcon,
  XMarkIcon,
  DocumentCheckIcon,
  DocumentMinusIcon,
} from '@heroicons/react/24/outline'
import { Turnstile } from '@marsidev/react-turnstile'
import { PatternFormat } from 'react-number-format'

import {
  contactFormSchemaRefined,
  type ContactFormData,
  type InfraType,
} from '@/schemas/contact'
import {
  INFRA_OPTIONS,
  SLUP_LEVELS,
  GAZ_LEVELS,
  STATUS_OPTIONS,
  KW_OPTIONS,
  type Country,
} from './contactOptions'
import { contactStyles } from './contactStyles'
import { PhoneInput } from './PhoneInput'
import { SuccessDialog, ErrorDialog } from './ContactDialogs'

// ============================================================
// DEFAULT VALUES
// ============================================================

const defaultValues: ContactFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  postalCode: '',
  city: '',
  infrastructure: [],
  slupParams: '',
  gazParams: '',
  status: null,
  hasKW: null,
  marketingConsent: false,
  captchaToken: '',
}

// ============================================================
// ICON COMPONENTS MAP
// ============================================================

const InfraIcon = memo<{ iconName: string; isChecked: boolean }>(
  ({ iconName, isChecked }) => {
    const iconClass = `h-6 w-6 transition-colors duration-200 ${
      isChecked 
        ? 'text-indigo-600 dark:text-indigo-400' 
        : 'text-gray-400 dark:text-gray-500'
    }`

    switch (iconName) {
      case 'BoltIcon':
        return <BoltIcon className={iconClass} aria-hidden="true" />
      case 'FireIcon':
        return <FireIcon className={iconClass} aria-hidden="true" />
      case 'BeakerIcon':
        return <BeakerIcon className={iconClass} aria-hidden="true" />
      case 'Cog6ToothIcon':
        return <Cog6ToothIcon className={iconClass} aria-hidden="true" />
      default:
        return null
    }
  }
)
InfraIcon.displayName = 'InfraIcon'

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
  inputMode?: 'text' | 'tel' | 'email' | 'numeric'
  pattern?: string
  blockDigits?: boolean
}

const InputField = memo<InputFieldProps>(
  ({
    id,
    label,
    type = 'text',
    autoComplete,
    placeholder,
    error,
    register,
    onInput,
    inputMode,
    pattern,
    blockDigits = false,
  }) => {
    const inputClass = `${contactStyles.input.base} ${
      error ? contactStyles.input.error : contactStyles.input.normal
    }`

    const handleInput = useCallback(
      (e: FormEvent<HTMLInputElement>) => {
        if (blockDigits) {
          const target = e.currentTarget
          const cleaned = target.value.replace(/[0-9]/g, '')
          if (target.value !== cleaned) {
            target.value = cleaned
          }
        }
        onInput?.(e)
      },
      [blockDigits, onInput]
    )

    return (
      <div>
        <label htmlFor={id} className={contactStyles.label}>
          {label}{' '}
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
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
          onInput={handleInput}
          inputMode={inputMode}
          pattern={pattern}
          {...register}
        />
        <FormError id={`error-${id}`} message={error} />
      </div>
    )
  }
)
InputField.displayName = 'InputField'

// ============================================================
// CARD COMPONENTS
// ============================================================

/**
 * MultiSelectCard - Karta dla wyboru wielokrotnego (checkbox)
 * Używana w sekcji "Rodzaj infrastruktury"
 */
interface MultiSelectCardProps {
  id: string
  label: string
  description: string
  iconName: string
  isChecked: boolean
  onChange: () => void
}

const MultiSelectCard = memo<MultiSelectCardProps>(
  ({ id, label, description, iconName, isChecked, onChange }) => {
    return (
      <label
        htmlFor={id}
        className={`
          ${contactStyles.checkboxCard.base}
          ${isChecked ? contactStyles.checkboxCard.checked : contactStyles.checkboxCard.normal}
        `}
      >
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="sr-only"
          aria-describedby={`${id}-desc`}
        />
        
        {/* Checkmark w rogu */}
        <div
          className={`
            absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full
            transition-all duration-200
            ${isChecked 
              ? 'bg-indigo-600 text-white scale-100' 
              : 'bg-gray-100 text-transparent scale-90 dark:bg-gray-700'}
          `}
        >
          <CheckIcon className="h-4 w-4" aria-hidden="true" />
        </div>

        {/* Zawartość karty */}
        <div className="flex flex-col">
          {/* Ikona */}
          <div
            className={`
              mb-3 flex h-12 w-12 items-center justify-center rounded-lg
              transition-colors duration-200
              ${isChecked 
                ? 'bg-indigo-100 dark:bg-indigo-500/20' 
                : 'bg-gray-100 dark:bg-gray-700'}
            `}
          >
            <InfraIcon iconName={iconName} isChecked={isChecked} />
          </div>

          {/* Tekst */}
          <span
            className={`
              block text-sm font-semibold transition-colors duration-200
              ${isChecked 
                ? 'text-indigo-900 dark:text-indigo-300' 
                : 'text-gray-900 dark:text-white'}
            `}
          >
            {label}
          </span>
          <span
            id={`${id}-desc`}
            className="mt-1 block text-sm text-gray-500 dark:text-gray-400"
          >
            {description}
          </span>
        </div>
      </label>
    )
  }
)
MultiSelectCard.displayName = 'MultiSelectCard'

/**
 * BinaryCard - Karta binarna TAK/NIE dla pojedynczego wyboru
 * Używana w sekcji "Księga Wieczysta"
 * Zoptymalizowana pod kątem Prawa Fittsa - duży obszar kliknięcia
 */
interface BinaryCardProps {
  id: string
  value: 'yes' | 'no'
  label: string
  isSelected: boolean
  onChange: (value: 'yes' | 'no') => void
}

const BinaryCard = memo<BinaryCardProps>(
  ({ id, value, label, isSelected, onChange }) => {
    const isYes = value === 'yes'
    
    // Kolory dla stanu zaznaczonego
    const checkedStyles = isYes
      ? 'border-green-600 bg-green-50/50 ring-1 ring-green-600 dark:border-green-500 dark:bg-green-500/10 dark:ring-green-500'
      : 'border-red-600 bg-red-50/50 ring-1 ring-red-600 dark:border-red-500 dark:bg-red-500/10 dark:ring-red-500'

    // Ikona dla stanu
    const Icon = isYes ? DocumentCheckIcon : DocumentMinusIcon
    const iconColorClass = isYes
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400'
    const bgColorClass = isYes
      ? 'bg-green-100 dark:bg-green-500/20'
      : 'bg-red-100 dark:bg-red-500/20'

    return (
      <label
        htmlFor={id}
        className={`
          ${contactStyles.binaryCard.base}
          ${isSelected ? checkedStyles : contactStyles.binaryCard.normal}
        `}
      >
        <input
          id={id}
          type="radio"
          name="hasKW"
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
          className="sr-only"
        />
        
        <div className="flex flex-col items-center text-center">
          {/* Ikona */}
          <div
            className={`
              mb-3 flex h-14 w-14 items-center justify-center rounded-xl
              transition-colors duration-200
              ${isSelected ? bgColorClass : 'bg-gray-100 dark:bg-gray-700'}
            `}
          >
            <Icon
              className={`
                h-7 w-7 transition-colors duration-200
                ${isSelected ? iconColorClass : 'text-gray-400 dark:text-gray-500'}
              `}
              aria-hidden="true"
            />
          </div>

          {/* Label */}
          <span
            className={`
              text-lg font-bold transition-colors duration-200
              ${isSelected 
                ? (isYes ? 'text-green-900 dark:text-green-300' : 'text-red-900 dark:text-red-300')
                : 'text-gray-900 dark:text-white'}
            `}
          >
            {label}
          </span>

          {/* Subtelny tekst pomocniczy */}
          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {isYes ? 'Posiadam numer księgi' : 'Nie posiadam / nie znam'}
          </span>
        </div>

        {/* Checkmark dla zaznaczonej opcji */}
        <div
          className={`
            absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full
            transition-all duration-200
            ${isSelected 
              ? (isYes 
                  ? 'bg-green-600 text-white scale-100' 
                  : 'bg-red-600 text-white scale-100')
              : 'bg-gray-100 text-transparent scale-90 dark:bg-gray-700'}
          `}
        >
          <CheckIcon className="h-4 w-4" aria-hidden="true" />
        </div>
      </label>
    )
  }
)
BinaryCard.displayName = 'BinaryCard'

/**
 * RadioCard - Standardowa karta radio (single-select)
 * Używana w sekcjach "Parametry techniczne" i "Status urządzenia"
 * POPRAWIONA: Szary kolor w stanie niezaznaczonym
 */
interface RadioCardProps {
  id: string
  label: string
  description?: string
  value: string
  register: UseFormRegisterReturn
}

const RadioCard = memo<RadioCardProps>(
  ({ id, label, description, value, register }) => {
    return (
      <label
        htmlFor={id}
        className={`
          group relative flex cursor-pointer rounded-xl border-2 p-5
          shadow-sm transition-all duration-200 ease-out
          has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/50 
          has-[:checked]:ring-1 has-[:checked]:ring-indigo-600
          has-[:checked]:dark:border-indigo-500 has-[:checked]:dark:bg-indigo-500/10
          has-[:checked]:dark:ring-indigo-500
          border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50
          dark:border-white/10 dark:bg-gray-800/50 
          dark:hover:border-white/20 dark:hover:bg-gray-800
        `}
      >
        <input
          id={id}
          type="radio"
          value={value}
          className="sr-only"
          {...register}
        />
        <div className="flex flex-1 flex-col">
          <span className="block text-sm font-semibold text-gray-900 group-has-[:checked]:text-indigo-900 dark:text-white dark:group-has-[:checked]:text-indigo-300">
            {label}
          </span>
          {description && (
            <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
        <CheckCircleIcon
          className="invisible size-5 text-indigo-600 group-has-[:checked]:visible dark:text-indigo-500"
          aria-hidden="true"
        />
      </label>
    )
  }
)
RadioCard.displayName = 'RadioCard'

// ============================================================
// SKELETON COMPONENT
// ============================================================

const FormSkeleton = memo(() => (
  <section className="bg-white px-6 py-24 dark:bg-gray-900 sm:py-32">
    <div className="mx-auto max-w-5xl">
      <div className="h-10 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mt-4 h-6 w-96 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mt-16 space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      </div>
    </div>
  </section>
))
FormSkeleton.displayName = 'FormSkeleton'

// ============================================================
// MAIN COMPONENT
// ============================================================

export function ContactSection() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [turnstileKey, setTurnstileKey] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>()

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
    defaultValues,
  })

  const selectedInfra = watch('infrastructure') ?? []
  const selectedKW = watch('hasKW')

  // Hydration fix
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Analytics tracking
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

        reset(defaultValues)
        setSelectedCountry(undefined)
        setCaptchaToken(null)
        setTurnstileKey((prev) => prev + 1)
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
    [captchaToken, reset, trackFormSubmit, trackFormSuccess, trackFormError]
  )

  // Infrastructure checkbox handler
  const handleInfraChange = useCallback(
    (id: InfraType) => {
      const nextValue = selectedInfra.includes(id)
        ? selectedInfra.filter((v) => v !== id)
        : [...selectedInfra, id]
      setValue('infrastructure', nextValue, { shouldValidate: true })
    },
    [selectedInfra, setValue]
  )

  // KW handler
  const handleKWChange = useCallback(
    (value: 'yes' | 'no') => {
      setValue('hasKW', value, { shouldValidate: true })
    },
    [setValue]
  )

  // Phone handlers
  const handlePhoneChange = useCallback(
    (value: string) => {
      setValue('phone', value, { shouldValidate: false })
    },
    [setValue]
  )

  const handlePhoneBlur = useCallback(() => {
    trigger('phone')
  }, [trigger])

  const handleCountryChange = useCallback((country: Country) => {
    setSelectedCountry(country)
  }, [])

  // CAPTCHA handlers
  const handleCaptchaSuccess = useCallback(
    (token: string) => {
      setCaptchaToken(token)
      setValue('captchaToken', token, { shouldValidate: true })
    },
    [setValue]
  )

  const handleCaptchaError = useCallback(() => {
    setCaptchaToken(null)
    setValue('captchaToken', '', { shouldValidate: true })
  }, [setValue])

  // Derived state for conditional rendering
  const showSlupParams = useMemo(
    () => selectedInfra.includes('slup'),
    [selectedInfra]
  )
  const showGazParams = useMemo(
    () => selectedInfra.includes('gaz'),
    [selectedInfra]
  )
  const showConditionalFields = useMemo(
    () => selectedInfra.length > 0,
    [selectedInfra]
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
                blockDigits={true}
                inputMode="text"
                pattern="[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+"
              />

              <InputField
                id="lastName"
                label="Nazwisko"
                autoComplete="family-name"
                placeholder="Kowalski"
                error={errors.lastName?.message}
                register={register('lastName')}
                blockDigits={true}
                inputMode="text"
                pattern="[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+"
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
                      countryCode={selectedCountry?.code}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      onCountryChange={handleCountryChange}
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
                  inputMode="email"
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
                      inputMode="numeric"
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
                blockDigits={true}
                inputMode="text"
                pattern="[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+"
              />
            </fieldset>

            {/* ============================================================
                SEKCJA: RODZAJ INFRASTRUKTURY - NOWE KARTY MULTI-SELECT
                ============================================================ */}
            <fieldset>
              <legend className="text-base font-semibold text-gray-900 dark:text-white">
                Rodzaj infrastruktury na działce{' '}
                <span className="text-red-600" aria-hidden="true">
                  *
                </span>
              </legend>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Wybierz wszystkie rodzaje infrastruktury obecne na Twojej działce
              </p>
              
              {/* Grid kart - responsywny: 1 kolumna na mobile, 2 na tablet, 4 na desktop */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {INFRA_OPTIONS.map((opt) => {
                  const inputId = `infra-${opt.id}`
                  const isChecked = selectedInfra.includes(opt.id as InfraType)

                  return (
                    <MultiSelectCard
                      key={opt.id}
                      id={inputId}
                      label={opt.label}
                      description={opt.desc}
                      iconName={opt.icon}
                      isChecked={isChecked}
                      onChange={() => handleInfraChange(opt.id as InfraType)}
                    />
                  )
                })}
              </div>
              
              <FormError
                id="error-infrastructure"
                message={errors.infrastructure?.message}
              />
            </fieldset>

            {/* Slup Parameters - POPRAWIONE: szare karty przed zaznaczeniem */}
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
                    <RadioCard
                      key={level.id}
                      id={`slup-${level.id}`}
                      label={level.label}
                      description={level.desc}
                      value={level.label}
                      register={register('slupParams')}
                    />
                  ))}
                </div>
                <FormError
                  id="error-slupParams"
                  message={errors.slupParams?.message}
                />
              </fieldset>
            )}

            {/* Gaz Parameters - POPRAWIONE: szare karty przed zaznaczeniem */}
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
                    <RadioCard
                      key={level.id}
                      id={`gaz-${level.id}`}
                      label={level.label}
                      description={level.desc}
                      value={level.label}
                      register={register('gazParams')}
                    />
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
                {/* Status - POPRAWIONE: szare karty przed zaznaczeniem */}
                <fieldset className={contactStyles.fieldset}>
                  <legend className="text-sm font-bold text-gray-900 dark:text-white">
                    Status urządzenia{' '}
                    <span className="text-red-600" aria-hidden="true">
                      *
                    </span>
                  </legend>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {STATUS_OPTIONS.map((opt) => (
                      <RadioCard
                        key={opt.id}
                        id={`status-${opt.id}`}
                        label={opt.label}
                        value={opt.id}
                        register={register('status')}
                      />
                    ))}
                  </div>
                  <FormError
                    id="error-status"
                    message={errors.status?.message}
                  />
                </fieldset>

                {/* ============================================================
                    SEKCJA: KSIĘGA WIECZYSTA - NOWE DUŻE KARTY BINARNE
                    Zoptymalizowane pod Prawo Fittsa
                    ============================================================ */}
                <fieldset>
                  <legend className="text-base font-semibold text-gray-900 dark:text-white">
                    Czy działka ma Księgę Wieczystą?{' '}
                    <span className="text-red-600" aria-hidden="true">
                      *
                    </span>
                  </legend>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Księga wieczysta przyspiesza analizę prawną nieruchomości
                  </p>
                  
                  {/* Dwie duże, sąsiadujące karty - optymalizacja pod mobile */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {KW_OPTIONS.map((opt) => (
                      <BinaryCard
                        key={opt.id}
                        id={`kw-${opt.id}`}
                        value={opt.id}
                        label={opt.label}
                        isSelected={selectedKW === opt.id}
                        onChange={handleKWChange}
                      />
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
                key={turnstileKey}
                siteKey={
                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                  '1x00000000000000000000AA'
                }
                onSuccess={handleCaptchaSuccess}
                onError={handleCaptchaError}
                onExpire={handleCaptchaError}
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
