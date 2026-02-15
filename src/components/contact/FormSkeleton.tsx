import { memo } from 'react'

// ============================================================
// SKELETON LOADER
// ============================================================

export const FormSkeleton = memo(() => (
  <section
    className="bg-white px-6 py-24 dark:bg-gray-900 sm:py-32"
    aria-labelledby="form-title"
  >
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
