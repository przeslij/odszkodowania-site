// src/components/sections/LegalAuthority.tsx
'use client'

import { ScaleIcon, ShieldCheckIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

/**
 * Section: Trust Bar / Legal Authority
 * Strategia: Wykorzystanie wyroku TK P 10/16 do budowy autorytetu i zbijania obiekcji o zasiedzeniu.
 * SEO: Frazy kluczowe: "wyrok TK P 10/16", "zasiedzenie służebności przesyłu", "odszkodowanie za słupy".
 */

export function LegalAuthority() {
  return (
    <section id="wyrok-tk" className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-gray-900">
      {/* Subtelne tło z paragrafem konstytucji dla efektu "Enterprise" */}
      <div className="absolute top-0 left-0 hidden h-full w-1/3 opacity-5 lg:block">
        <span className="text-[10rem] font-bold leading-none select-none">Art. 21</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">

          {/* Content Left: The Argument */}
          <div>
            <p className="mb-4 text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Status: Przełom prawny 2025
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Wyrok Trybunału Konstytucyjnego zmienia zasady gry
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Przez lata sądy pozwalały korporacjom na darmowe korzystanie z prywatnych gruntów przez tzw. zasiedzenie.
              <strong> Wyrok Trybunału Konstytucyjnego (sygn. P 10/16)</strong> definitywnie zakwestionował tę praktykę.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              To oznacza, że właściciele nieruchomości, którzy dotychczas byli pozbawieni szans na dochodzenie swoich
              praw, mogą teraz ponownie rozważyć swoje roszczenia - nawet jeśli urządzenia stoją na działce od
              kilkudziesięciu lat.
            </p>
          </div>

          {/* Right Side: 3 cards with key theses — light variant for visual cohesion */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 mb-4">
                <ScaleIcon className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2 dark:text-white">Ochrona własności (Art. 21 i 64 Konstytucji)</h4>
              <p className="text-sm text-slate-600 dark:text-gray-300">Zasiedzenie przed 2008 r. bez decyzji administracyjnej i odszkodowania uznano za niezgodne z ustawą zasadniczą.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 mb-4">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2 dark:text-white">Rewizja starych spraw</h4>
              <p className="text-sm text-slate-600 dark:text-gray-300">Wyrok zakwestionował dotychczasową praktykę zasiedzenia służebności przesyłu
w złej wierze bez odszkodowania. Otwiera to drogę do ponownej analizy spraw
wcześniej uznanych za zamknięte - nawet jeśli słupy stoją od lat 80.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2 dark:text-white">Podstawa prawna</h4>
              <p className="text-sm text-slate-600 dark:text-gray-300">
                Wyrok TK z dnia 2.12.2025, sygn. P 10/16, opublikowany w Dzienniku Ustaw.{' '}
                <a
                  href="https://trybunal.gov.pl/postepowanie-i-orzeczenia/wyroki/art/13444-sluzebnosc-przesylu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Pełna treść orzeczenia
                </a>
                .
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}