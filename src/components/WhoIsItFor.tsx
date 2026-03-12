'use client'

import React, { useMemo } from 'react'
import {
  HomeIcon,
  SunIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'

// ============================================================================
// CUSTOM ICON — matches Heroicons 24/outline style
// ============================================================================

function TractorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 10V7.5A1.5 1.5 0 018.5 6H11l1.5 4H7z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.5 10H18a1 1 0 011 1v2.5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13.5h14"
      />
      <circle cx="7.5" cy="17" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.5" cy="17.5" r="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 6v4"
      />
    </svg>
  )
}

// ============================================================================
// DATA
// ============================================================================

const segments = [
  {
    name: 'Właściciele działek budowlanych',
    description:
      'Jeśli na Twojej działce stoją słupy lub przebiegają kable, może to blokować zabudowę i obniżać wartość nieruchomości. Pomagamy uzyskać odszkodowanie za ograniczenia w dysponowaniu gruntem.',
    icon: HomeIcon,
  },
  {
    name: 'Właściciele gruntów rolnych',
    description:
      'Infrastruktura przesyłowa ogranicza uprawę i dojazd maszynami na gruntach rolnych. Prawo przewiduje wynagrodzenie za bezumowne korzystanie z gruntu oraz za obniżenie jego użyteczności.',
    icon: TractorIcon,
  },
  {
    name: 'Działki rekreacyjne i siedliska',
    description:
      'Obecność linii wysokiego napięcia lub rurociągów wpływa na walory wypoczynkowe, komfort życia i cenę sprzedaży. Nawet działki niezabudowane mogą być objęte roszczeniami z tytułu służebności przesyłu.',
    icon: SunIcon,
  },
  {
    name: 'Tereny inwestycyjne i komercyjne',
    description:
      'Służebność przesyłu na terenach pod aktywizację gospodarczą może blokować budowę hal i magazynów. Pomagamy dochodzić rekompensaty za realną stratę wartości rynkowej gruntu.',
    icon: BuildingOffice2Icon,
  },
]

// ============================================================================
// SCHEMA.ORG — ItemList (segmenty klientów)
// ============================================================================

function generateAudienceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Grupy właścicieli nieruchomości uprawnionych do odszkodowania za służebność przesyłu',
    itemListElement: segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: segment.name,
      description: segment.description,
    })),
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function WhoIsItFor() {
  const audienceSchema = useMemo(() => generateAudienceSchema(), [])

  return (
    <section
      id="dla-kogo"
      className="bg-slate-50 py-24 sm:py-32 dark:bg-gray-900/50"
      aria-labelledby="who-is-it-for-heading"
    >
      <Container>
        {/* Header — 2-column */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16">
          <div>
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Kogo reprezentujemy
            </p>
            <h2
              id="who-is-it-for-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
            >
              Dla kogo to jest?
            </h2>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex lg:items-end">
            <p className="max-w-xl text-lg/8 text-slate-600 dark:text-slate-400">
              Sprawdź, czy Twoja nieruchomość kwalifikuje się do uzyskania wynagrodzenia lub
              odszkodowania.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
            aria-label="Segmenty klientów"
          >
            {segments.map((segment) => (
              <div
                key={segment.name}
                className="group flex flex-col"
                role="listitem"
                data-analytics="segment-card"
                data-analytics-segment={segment.name}
              >
                <dt className="text-base font-semibold text-gray-900 dark:text-white">
                  <div
                    className="
                      mb-6 flex h-12 w-12 items-center justify-center rounded-xl
                      bg-indigo-600 text-white shadow-md shadow-indigo-600/20
                      transition-transform duration-300 group-hover:scale-110
                      dark:bg-indigo-500 dark:shadow-indigo-500/20
                    "
                  >
                    <segment.icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  {segment.name}
                </dt>
                <dd className="mt-2 flex flex-auto flex-col text-sm/6 text-slate-600 dark:text-slate-400">
                  <p className="flex-auto">{segment.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-6 sm:mt-20 sm:flex-row sm:justify-center sm:gap-8">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#kontakt"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
              data-analytics="cta-primary"
              data-analytics-location="who-is-it-for"
            >
              Sprawdź swoją sprawę <span aria-hidden="true">&rarr;</span>
            </a>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-4 h-4 text-emerald-500"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span>Bezpłatna weryfikacja w 24h</span>
            </div>
          </div>
          
          <div className="flex items-center sm:pb-6">
            <a
              href="#jak-dzialamy"
              className="text-sm/6 font-semibold text-gray-900 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              data-analytics="cta-secondary"
              data-analytics-location="who-is-it-for"
            >
              Jak wygląda proces <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </Container>

      {/* Schema.org ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(audienceSchema) }}
      />
    </section>
  )
}