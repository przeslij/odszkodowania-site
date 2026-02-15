// ============================================================
// TYPES & CONFIGURATION
// ============================================================

// src/components/contact/contactOptions.ts

export type CountryCode =
  | 'PL' | 'DE' | 'GB' | 'FR' | 'IT' | 'ES' | 'NL' | 'BE' | 'AT' | 'CZ'
  | 'SK' | 'LT' | 'LV' | 'EE' | 'UA' | 'US' | 'CA' | 'AU' | 'CH' | 'SE'
  | 'NO' | 'DK' | 'FI' | 'IE' | 'PT' | 'GR' | 'HU' | 'RO' | 'BG' | 'HR' | 'SI'

export interface Country {
  code: CountryCode
  name: string
  dialCode: string
  flag: string
  pattern?: string
}

export interface InfraOption {
  id: string
  label: string
  desc: string
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

// ============================================================
// CONSTANTS
// ============================================================

export const COUNTRIES: readonly Country[] = [
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

export const INFRA_OPTIONS: readonly InfraOption[] = [
  { id: 'slup', label: 'Słup elektroenergetyczny', desc: 'Linie niskiego, średniego lub wysokiego napięcia' },
  { id: 'gaz', label: 'Gazociąg', desc: 'Instalacje przesyłowe gazu' },
  { id: 'ropa', label: 'Ropociąg', desc: 'Rurociągi paliwowe' },
  { id: 'inne', label: 'Inne urządzenie przesyłowe', desc: 'Stacje, kolektory, inne instalacje' },
] as const

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

export const KW_OPTIONS: readonly StatusOption[] = [
  { id: 'yes', label: 'Tak' },
  { id: 'no', label: 'Nie' },
] as const
