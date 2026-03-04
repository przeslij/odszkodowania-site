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
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-gray-900">
      {/* Subtelne tło z paragrafem konstytucji dla efektu "Enterprise" */}
      <div className="absolute top-0 left-0 hidden h-full w-1/3 opacity-5 lg:block">
        <span className="text-[10rem] font-bold leading-none select-none">Art. 21</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
          
          {/* Content Left: The Argument */}
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-4">
              <ShieldCheckIcon className="h-6 w-6" />
              <span className="text-sm font-bold uppercase tracking-wider">Status: Przełom Prawny 2026</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Koniec ery „darmowego” zasiedzenia. <br />
              <span className="text-indigo-600 dark:text-indigo-400">Twoja własność jest chroniona.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Przez lata sądy pozwalały korporacjom na darmowe korzystanie z prywatnych gruntów przez tzw. zasiedzenie. 
              <strong> Wyrok Trybunału Konstytucyjnego (sygn. P 10/16)</strong> definitywnie zakwestionował tę praktykę.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                  <ScaleIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Ochrona Własności (Art. 21 i 64 Konstytucji)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Zasiedzenie przed 2008 r. bez decyzji administracyjnej i odszkodowania uznano za niezgodne z ustawą zasadniczą.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                  <AcademicCapIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Rewizja Starych Spraw</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nawet jeśli słupy stoją od lat 80., wyrok otwiera drogę do roszczeń, które wcześniej uznawano za przedawnione.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Trust Badge / Fact Sheet */}
          <div className="relative rounded-3xl bg-indigo-600 p-8 shadow-2xl lg:p-12">
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-indigo-500/50 blur-2xl"></div>
            <div className="relative">
              <div className="mb-6 inline-flex items-center rounded-full bg-indigo-500 px-3 py-1 text-xs font-medium text-indigo-100 ring-1 ring-inset ring-indigo-400">
                Dokumentacja Prawna
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Kluczowe tezy Wyroku P 10/16</h3>
              <ul className="space-y-4 text-indigo-100">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">1</span>
                  <p className="text-sm">Interpretacja pozwalająca na „bezkosztowe” zasiedzenie przed 2008 r. została uznana za <strong>niekonstytucyjną</strong>.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">2</span>
                  <p className="text-sm">Ograniczenie prawa własności nie może opierać się wyłącznie na analogii i orzecznictwie – wymaga jasnej podstawy ustawowej.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">3</span>
                  <p className="text-sm">Brak decyzji wywłaszczeniowej i brak wypłaty odszkodowania uniemożliwia firmom przesyłowym skuteczną obronę zarzutem zasiedzenia.</p>
                </li>
              </ul>
              <div className="mt-10 border-t border-indigo-500 pt-8">
                <p className="text-xs text-indigo-200 uppercase tracking-tighter">Podstawa prawna: Wyrok TK z dnia 2.12.2025 r., sygn. P 10/16.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}