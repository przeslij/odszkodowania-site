// ============================================================
// TYPES & CONFIGURATION
// ============================================================

// src/components/contact/contactOptions.ts

import type { ComponentType, SVGProps } from 'react'

export type CountryCode =
  | 'PL'
  | 'DE'
  | 'GB'
  | 'FR'
  | 'IT'
  | 'ES'
  | 'NL'
  | 'BE'
  | 'AT'
  | 'CZ'
  | 'SK'
  | 'LT'
  | 'LV'
  | 'EE'
  | 'UA'
  | 'US'
  | 'CA'
  | 'AU'
  | 'CH'
  | 'SE'
  | 'NO'
  | 'DK'
  | 'FI'
  | 'IE'
  | 'PT'
  | 'GR'
  | 'HU'
  | 'RO'
  | 'BG'
  | 'HR'
  | 'SI'

export interface Country {
  code: CountryCode
  name: string
  dialCode: string
  flag: string
  pattern?: string
}

// Rozszerzony interfejs z ikoną
export interface InfraOption {
  id: string
  label: string
  desc: string
  icon: string // Nazwa ikony z Heroicons
}

export interface LevelOption {
  id: string
  label: string
  desc: string
}

export interface StatusOption {
  id: string
  label: string
}

export interface KWOption {
  id: 'yes' | 'no'
  label: string
  icon: string
}

// ============================================================
// CONSTANTS
// ============================================================

export const COUNTRIES: readonly Country[] = [
  {
    code: 'PL',
    name: 'Polska',
    dialCode: '+48',
    flag: '🇵🇱',
    pattern: '### ### ###',
  },
  {
    code: 'DE',
    name: 'Niemcy',
    dialCode: '+49',
    flag: '🇩🇪',
    pattern: '### ### ### ####',
  },
  {
    code: 'GB',
    name: 'Wielka Brytania',
    dialCode: '+44',
    flag: '🇬🇧',
    pattern: '#### ######',
  },
  {
    code: 'FR',
    name: 'Francja',
    dialCode: '+33',
    flag: '🇫🇷',
    pattern: '# ## ## ## ##',
  },
  {
    code: 'IT',
    name: 'Włochy',
    dialCode: '+39',
    flag: '🇮🇹',
    pattern: '### ### ####',
  },
  {
    code: 'ES',
    name: 'Hiszpania',
    dialCode: '+34',
    flag: '🇪🇸',
    pattern: '### ### ###',
  },
  {
    code: 'NL',
    name: 'Holandia',
    dialCode: '+31',
    flag: '🇳🇱',
    pattern: '# ########',
  },
  {
    code: 'BE',
    name: 'Belgia',
    dialCode: '+32',
    flag: '🇧🇪',
    pattern: '### ## ## ##',
  },
  {
    code: 'AT',
    name: 'Austria',
    dialCode: '+43',
    flag: '🇦🇹',
    pattern: '### ### ####',
  },
  {
    code: 'CZ',
    name: 'Czechy',
    dialCode: '+420',
    flag: '🇨🇿',
    pattern: '### ### ###',
  },
  {
    code: 'SK',
    name: 'Słowacja',
    dialCode: '+421',
    flag: '🇸🇰',
    pattern: '### ### ###',
  },
  {
    code: 'LT',
    name: 'Litwa',
    dialCode: '+370',
    flag: '🇱🇹',
    pattern: '### #####',
  },
  {
    code: 'LV',
    name: 'Łotwa',
    dialCode: '+371',
    flag: '🇱🇻',
    pattern: '## ### ###',
  },
  {
    code: 'EE',
    name: 'Estonia',
    dialCode: '+372',
    flag: '🇪🇪',
    pattern: '#### ####',
  },
  {
    code: 'UA',
    name: 'Ukraina',
    dialCode: '+380',
    flag: '🇺🇦',
    pattern: '## ### ## ##',
  },
  {
    code: 'US',
    name: 'Stany Zjednoczone',
    dialCode: '+1',
    flag: '🇺🇸',
    pattern: '(###) ###-####',
  },
  {
    code: 'CA',
    name: 'Kanada',
    dialCode: '+1',
    flag: '🇨🇦',
    pattern: '(###) ###-####',
  },
  {
    code: 'AU',
    name: 'Australia',
    dialCode: '+61',
    flag: '🇦🇺',
    pattern: '# #### ####',
  },
  {
    code: 'CH',
    name: 'Szwajcaria',
    dialCode: '+41',
    flag: '🇨🇭',
    pattern: '## ### ## ##',
  },
  {
    code: 'SE',
    name: 'Szwecja',
    dialCode: '+46',
    flag: '🇸🇪',
    pattern: '##-### ## ##',
  },
  {
    code: 'NO',
    name: 'Norwegia',
    dialCode: '+47',
    flag: '🇳🇴',
    pattern: '### ## ###',
  },
  {
    code: 'DK',
    name: 'Dania',
    dialCode: '+45',
    flag: '🇩🇰',
    pattern: '## ## ## ##',
  },
  {
    code: 'FI',
    name: 'Finlandia',
    dialCode: '+358',
    flag: '🇫🇮',
    pattern: '## ### ## ##',
  },
  {
    code: 'IE',
    name: 'Irlandia',
    dialCode: '+353',
    flag: '🇮🇪',
    pattern: '## ### ####',
  },
  {
    code: 'PT',
    name: 'Portugalia',
    dialCode: '+351',
    flag: '🇵🇹',
    pattern: '### ### ###',
  },
  {
    code: 'GR',
    name: 'Grecja',
    dialCode: '+30',
    flag: '🇬🇷',
    pattern: '### ### ####',
  },
  {
    code: 'HU',
    name: 'Węgry',
    dialCode: '+36',
    flag: '🇭🇺',
    pattern: '## ### ####',
  },
  {
    code: 'RO',
    name: 'Rumunia',
    dialCode: '+40',
    flag: '🇷🇴',
    pattern: '### ### ###',
  },
  {
    code: 'BG',
    name: 'Bułgaria',
    dialCode: '+359',
    flag: '🇧🇬',
    pattern: '### ### ###',
  },
  {
    code: 'HR',
    name: 'Chorwacja',
    dialCode: '+385',
    flag: '🇭🇷',
    pattern: '## ### ####',
  },
  {
    code: 'SI',
    name: 'Słowenia',
    dialCode: '+386',
    flag: '🇸🇮',
    pattern: '## ### ###',
  },
] as const

// Opcje infrastruktury z ikonami
export const INFRA_OPTIONS: readonly InfraOption[] = [
  {
    id: 'slup',
    label: 'Słup elektroenergetyczny',
    desc: 'Linie niskiego, średniego lub wysokiego napięcia',
    icon: 'BoltIcon', // Ikona pioruna/energii
  },
  {
    id: 'gaz',
    label: 'Gazociąg',
    desc: 'Instalacje przesyłowe gazu',
    icon: 'FireIcon', // Ikona ognia/gazu
  },
  {
    id: 'ropa',
    label: 'Ropociąg',
    desc: 'Rurociągi paliwowe',
    icon: 'BeakerIcon', // Ikona laboratoryjna/ropa
  },
  {
    id: 'inne',
    label: 'Inne urządzenie przesyłowe',
    desc: 'Stacje, kolektory, inne instalacje',
    icon: 'Cog6ToothIcon', // Ikona ustawień/mechanizmu
  },
] as const

// Mapowanie ikon (dla użycia w komponencie)
export const INFRA_ICONS: Record<string, string> = {
  slup: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', // Bolt
  gaz: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z', // Fire
  ropa: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5', // Beaker
  inne: 'M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z', // Cog
} as const

export const SLUP_LEVELS: readonly LevelOption[] = [
  { id: 'high', label: 'Wysokie napięcie', desc: '110–750 kV' },
  { id: 'medium', label: 'Średnie napięcie', desc: '15–30 kV' },
  { id: 'low', label: 'Niskie napięcie', desc: 'Do 1 kV' },
] as const

export const GAZ_LEVELS: readonly LevelOption[] = [
  { id: 'high-pressure', label: 'Wysokie ciśnienie', desc: 'Powyżej 16 bar' },
  { id: 'medium-pressure', label: 'Średnie ciśnienie', desc: '0.5–16 bar' },
  { id: 'low-pressure', label: 'Niskie ciśnienie', desc: 'Do domu' },
] as const

export const STATUS_OPTIONS: readonly StatusOption[] = [
  { id: 'existing', label: 'Istniejące' },
  { id: 'planned', label: 'Planowane / w trakcie' },
  { id: 'modernization', label: 'Modernizacja' },
] as const

// Opcje KW z ikonami
export const KW_OPTIONS: readonly KWOption[] = [
  { id: 'yes', label: 'Tak', icon: 'CheckIcon' },
  { id: 'no', label: 'Nie', icon: 'XMarkIcon' },
] as const
