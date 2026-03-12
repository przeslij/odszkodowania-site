// src/components/sections/LegalAuthority.tsx
'use client'

import {
  ScaleIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

/**
 * Section: Trust Bar / Legal Authority
 * Strategia: Wykorzystanie wyroku TK P 10/16 do budowy autorytetu i zbijania obiekcji o zasiedzeniu.
 * SEO: Frazy kluczowe: "wyrok TK P 10/16", "zasiedzenie służebności przesyłu", "odszkodowanie za słupy".
 */

const highlights = [
  {
    icon: ScaleIcon,
    title: 'Ochrona własności (Art. 21 i 64 Konstytucji)',
    description:
      'Zasiedzenie przed 2008 r. bez decyzji administracyjnej i odszkodowania uznano za niezgodne z ustawą zasadniczą.',
  },
  {
    icon: AcademicCapIcon,
    title: 'Rewizja starych spraw',
    description:
      'Wyrok zakwestionował dotychczasową praktykę zasiedzenia służebności przesyłu w złej wierze bez odszkodowania. Otwiera to drogę do ponownej analizy spraw wcześniej uznanych za zamknięte - nawet jeśli słupy stoją od lat 80.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Podstawa prawna',
    description:
      'Wyrok TK z dnia 2.12.2025, sygn. P 10/16, opublikowany w Dzienniku Ustaw.',
    link: {
      href: 'https://trybunal.gov.pl/postepowanie-i-orzeczenia/wyroki/art/13444-sluzebnosc-przesylu',
      label: 'Pełna treść orzeczenia',
    },
  },
]

export function LegalAuthority() {
  return (
    <section
      id="wyrok-tk"
      aria-labelledby="legal-authority-heading"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-gray-900"
    >
      {/* Subtelne tło z paragrafem konstytucji */}
      <div className="absolute top-0 left-0 hidden h-full w-1/3 opacity-[0.03] dark:opacity-[0.02] lg:block pointer-events-none select-none">
        <span className="text-[10rem] font-bold leading-none text-slate-900 dark:text-white">
          Art. 21
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-16 lg:grid-cols-2">
          {/* Content Left */}
          <div>
            <p className="mb-4 text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Status: Przełom prawny 2025
            </p>
            <h2
              id="legal-authority-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Koniec ery darmowego zasiedzenia - wyrok TK otwiera drogę do
              odszkodowań
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Przez lata sądy pozwalały korporacjom na darmowe korzystanie z
              prywatnych gruntów przez tzw. zasiedzenie.
              <strong className="text-gray-900 dark:text-white">
                {' '}
                Wyrok Trybunału Konstytucyjnego (sygn. P 10/16)
              </strong>{' '}
              definitywnie zakwestionował tę praktykę.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              To oznacza, że właściciele nieruchomości, którzy dotychczas byli
              pozbawieni szans na dochodzenie swoich praw, mogą teraz ponownie
              rozważyć swoje roszczenia - nawet jeśli urządzenia stoją na działce
              od kilkudziesięciu lat.
            </p>
          </div>

          {/* Right Side: Cards */}
          <div className="space-y-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 mb-4">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-2 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-gray-300">
                  {item.description}
                </p>
                {item.link && (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    aria-label="Pełna treść orzeczenia Trybunału Konstytucyjnego (otwiera się w nowej karcie)"
                  >
                    {item.link.label}
                    <ArrowTopRightOnSquareIcon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            ))}

            {/* CTA — kieruje do formularza po zbudowaniu autorytetu */}
            <a
              href="#kontakt"
              className="mt-4 block text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sprawdź, czy ten wyrok dotyczy Twojej działki{' '}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}