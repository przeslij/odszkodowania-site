// src/components/contact/contactStyles.ts

export const contactStyles = {
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
