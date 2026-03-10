import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Odszkodowanie za służebność przesyłu - bezpłatna analiza | Aston Legal',
  description:
    'Sprawdź bezpłatnie, czy Twojej nieruchomości przysługuje wynagrodzenie za słupy energetyczne, gazociągi lub inne urządzenia przesyłowe. Analiza prawna w 24h.',
  metadataBase: new URL('https://sluzebnosc-przesylu.pl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Odszkodowanie za służebność przesyłu - bezpłatna analiza | Aston Legal',
    description:
      'Sprawdź bezpłatnie, czy Twojej nieruchomości przysługuje wynagrodzenie za słupy energetyczne, gazociągi lub inne urządzenia przesyłowe.',
    url: '/',
    siteName: 'Aston Legal - Służebność Przesyłu',
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: '/assets/odszkodowania/urzadzenia/slupy/srednie-napiecie/slup-srednie-napiecie-15-30kv-odszkodowanie.webp',
        width: 1200,
        height: 630,
        alt: 'Odszkodowanie za służebność przesyłu - słupy energetyczne na działce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Odszkodowanie za służebność przesyłu | Aston Legal',
    description:
      'Sprawdź bezpłatnie, czy Twojej nieruchomości przysługuje wynagrodzenie za urządzenia przesyłowe. Analiza prawna w 24h.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
