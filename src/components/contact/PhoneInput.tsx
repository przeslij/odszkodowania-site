'use client'

import { memo, useState, useCallback, useEffect } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { PatternFormat } from 'react-number-format'

import { COUNTRIES, type Country, type CountryCode } from './contactOptions'

// ============================================================
// TYPES
// ============================================================

interface PhoneInputProps {
  id: string
  label: string
  error?: string
  value: string
  countryCode?: CountryCode
  onChange: (value: string) => void
  onBlur?: () => void
  onCountryChange?: (country: Country) => void
}

// ============================================================
// HELPERS
// ============================================================

/**
 * Znajduje kraj na podstawie kodu
 */
const findCountryByCode = (code?: CountryCode): Country => {
  if (!code) return COUNTRIES[0]
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0]
}

/**
 * Sprawdza czy numer pasuje do wzoru kraju (pobieżnie)
 */
const matchesPattern = (value: string, pattern?: string): boolean => {
  if (!pattern || !value) return true
  const digitsOnly = value.replace(/\D/g, '')
  const patternDigits = pattern.replace(/[^#]/g, '').length
  return digitsOnly.length <= patternDigits
}

// ============================================================
// COMPONENT
// ============================================================

export const PhoneInput = memo<PhoneInputProps>(({
  id,
  label,
  error,
  value,
  countryCode,
  onChange,
  onBlur,
  onCountryChange,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(() =>
    findCountryByCode(countryCode),
  )

  // Synchronizacja kraju z zewnętrznym stanem (np. po resecie formularza)
  useEffect(() => {
    const newCountry = findCountryByCode(countryCode)
    if (newCountry.code !== selectedCountry.code) {
      setSelectedCountry(newCountry)
    }
  }, [countryCode, selectedCountry.code])

  const handleCountryChange = useCallback(
    (country: Country) => {
      setSelectedCountry(country)
      onCountryChange?.(country)

      // Czyścimy numer tylko jeśli nie pasuje do nowego wzoru
      if (value && !matchesPattern(value, country.pattern)) {
        onChange('')
      }
    },
    [onChange, onCountryChange, value],
  )

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
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-900 dark:text-white"
      >
        {label}{' '}
        <span className="text-red-600" aria-hidden="true">
          *
        </span>
      </label>

      <div className="relative mt-2">
        <div className="flex rounded-md shadow-sm">
          {/* Country Selector with Listbox (A11y) */}
          <Listbox value={selectedCountry} onChange={handleCountryChange}>
            {({ open }) => (
              <div className="relative">
                <ListboxButton
                  className={buttonClass}
                  aria-label={`Wybrany kraj: ${selectedCountry.name}, kod: ${selectedCountry.dialCode}`}
                >
                  <span className="text-lg" aria-hidden="true">
                    {selectedCountry.flag}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {selectedCountry.dialCode}
                  </span>
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
                        className={({ focus, selected }) =>
                          `
                          flex w-full items-center gap-3 px-3 py-2 text-left cursor-pointer transition-colors
                          ${focus ? 'bg-gray-100 dark:bg-gray-700' : ''}
                          ${selected ? 'bg-indigo-50 dark:bg-indigo-500/10' : ''}
                        `
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className="text-lg" aria-hidden="true">
                              {country.flag}
                            </span>
                            <span className="flex-1 text-gray-900 dark:text-white">
                              {country.name}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {country.dialCode}
                            </span>
                            {selected && (
                              <CheckIcon
                                className="h-4 w-4 text-indigo-600"
                                aria-hidden="true"
                              />
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

          {/* Phone Number Input with PatternFormat */}
          <PatternFormat
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

      {error && (
        <p
          id={`error-${id}`}
          className="mt-2 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  )
})

PhoneInput.displayName = 'PhoneInput'
