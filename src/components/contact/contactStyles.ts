// src/components/contact/contactStyles.ts

/**
 * Centralne style dla formularza kontaktowego
 * Zapewniają spójność wizualną wszystkich komponentów
 */

export const contactStyles = {
  // Style dla pól input
  input: {
    base: 'block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white transition-all duration-200',
    normal: 'ring-gray-300 focus:ring-indigo-600 dark:ring-white/10',
    error: 'ring-red-300 focus:ring-red-600 dark:ring-red-500/50',
  },

  // Style dla labeli
  label: 'block text-sm font-semibold text-gray-900 dark:text-white mb-2',

  // Style dla fieldsetów
  fieldset: 'space-y-4',

  // Style dla kart wyboru (radio/checkbox cards)
  card: {
    // Bazowe style dla wszystkich kart
    base: 'group relative flex cursor-pointer rounded-xl border-2 p-5 shadow-sm transition-all duration-200 ease-out focus:outline-none',
    
    // Stan niezaznaczony (domyślnie szary - NEUTRALNY)
    normal: 
      'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 ' +
      'dark:border-white/10 dark:bg-gray-800/50 dark:hover:border-white/20 dark:hover:bg-gray-800',
    
    // Stan zaznaczony (indigo)
    checked: 
      'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600 ' +
      'dark:border-indigo-500 dark:bg-indigo-500/10 dark:ring-indigo-500',
    
    // Stan disabled
    disabled: 
      'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed ' +
      'dark:border-white/5 dark:bg-gray-800/30',
  },

  // Style dla kart multi-select (checkbox cards)
  checkboxCard: {
    base: 'group relative flex cursor-pointer rounded-xl border-2 p-5 shadow-sm transition-all duration-200 ease-out focus:outline-none',
    
    // Stan niezaznaczony (szary)
    normal: 
      'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 ' +
      'dark:border-white/10 dark:bg-gray-800/50 dark:hover:border-white/20 dark:hover:bg-gray-800',
    
    // Stan zaznaczony (indigo z checkmark)
    checked: 
      'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600 ' +
      'dark:border-indigo-500 dark:bg-indigo-500/10 dark:ring-indigo-500',
  },

  // Style dla kart binary (TAK/NIE)
  binaryCard: {
    base: 'group relative flex cursor-pointer rounded-xl border-2 p-6 shadow-sm transition-all duration-200 ease-out focus:outline-none items-center justify-center',
    
    // Stan niezaznaczony
    normal: 
      'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 ' +
      'dark:border-white/10 dark:bg-gray-800/50 dark:hover:border-white/20 dark:hover:bg-gray-800',
    
    // Stan zaznaczony TAK (zielony)
    yesChecked: 
      'border-green-600 bg-green-50/50 ring-1 ring-green-600 ' +
      'dark:border-green-500 dark:bg-green-500/10 dark:ring-green-500',
    
    // Stan zaznaczony NIE (czerwony)
    noChecked: 
      'border-red-600 bg-red-50/50 ring-1 ring-red-600 ' +
      'dark:border-red-500 dark:bg-red-500/10 dark:ring-red-500',
  },

  // Style dla tekstu w kartach
  cardText: {
    title: 'block text-sm font-semibold text-gray-900 dark:text-white',
    description: 'mt-1 block text-sm text-gray-500 dark:text-gray-400',
    titleChecked: 'block text-sm font-semibold text-indigo-900 dark:text-indigo-300',
  },

  // Style dla ikon w kartach
  cardIcon: {
    base: 'mb-3 flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200',
    normal: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    checked: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
  },

  // Style dla checkmark w rogu karty
  checkmark: {
    base: 'absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200',
    normal: 'bg-gray-100 text-transparent dark:bg-gray-700',
    checked: 'bg-indigo-600 text-white dark:bg-indigo-500',
  },
} as const

export type ContactStyles = typeof contactStyles
