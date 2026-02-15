import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Formularz kontaktowy',
  description: 'Bezpłatna analiza prawna nieruchomości',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pl"
      data-headlessui-focus-visible=""
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white dark:bg-gray-900">
        {children}
      </body>
    </html>
  )
}
