// src/components/contact/ContactDialogs.tsx

import { memo, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import {
  CheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

// ============================================================
// HOOK: Bezpieczne renderowanie (unika hydration mismatch)
// ============================================================

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient
}

// ============================================================
// SUCCESS DIALOG
// ============================================================

interface SuccessDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const SuccessDialog = memo<SuccessDialogProps>(
  ({ isOpen, onClose }) => {
    const isClient = useIsClient()

    // Nie renderuj na serwerze - unikamy hydration mismatch z Headless UI
    if (!isClient || !isOpen) return null

    return (
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
                  <CheckIcon
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <DialogTitle
                  as="h3"
                  className="mt-3 text-base font-semibold text-gray-900 dark:text-white"
                >
                  Formularz wysłany pomyślnie
                </DialogTitle>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Dziękujemy! Nasz zespół skontaktuje się z Tobą w ciągu 24
                  godzin.
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
    )
  },
)

SuccessDialog.displayName = 'SuccessDialog'

// ============================================================
// ERROR DIALOG
// ============================================================

interface ErrorDialogProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export const ErrorDialog = memo<ErrorDialogProps>(
  ({ isOpen, onClose, message }) => {
    const isClient = useIsClient()

    // Nie renderuj na serwerze - unikamy hydration mismatch z Headless UI
    if (!isClient || !isOpen) return null

    return (
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
                  <ExclamationTriangleIcon
                    className="h-6 w-6 text-red-600 dark:text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <DialogTitle
                  as="h3"
                  className="mt-3 text-base font-semibold text-gray-900 dark:text-white"
                >
                  Wystąpił błąd
                </DialogTitle>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {message}
                </p>
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
    )
  },
)

ErrorDialog.displayName = 'ErrorDialog'
