'use client'

import React, { useMemo } from 'react'
import {
  AdjustmentsHorizontalIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftEllipsisIcon,
  HandRaisedIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

// ============================================================================
// DATA
// ============================================================================

const values = [
  {
    icon: DocumentMagnifyingGlassIcon,
    name: 'Analiza przed zobowiązaniem',
    description:
      'Zanim podejmiesz jakąkolwiek decyzję, otrzymasz rzetelną ocenę potencjału roszczeń. Bezpłatnie. Jeśli nie widzimy podstaw do działania - powiemy Ci to wprost.',
  },
  {
    icon: AdjustmentsHorizontalIcon,
    name: 'Indywidualne podejście do sprawy',
    description:
      'Każda nieruchomość i każda sytuacja prawna jest inna. Nie stosujemy szablonowych rozwiązań - strategię działania dopasowujemy do specyfiki Twojej działki i rodzaju infrastruktury.',
  },
  {
    icon: ChatBubbleLeftEllipsisIcon,
    name: 'Stały kontakt, nie autoresponder',
    description:
      'Nie odsyłamy do infolinii. Na każdym etapie wiesz, co się dzieje i dlaczego. Odpowiadamy na wiadomości w rozsądnym czasie - bez zbędnego przeciągania.',
  },
  {
    icon: ShieldCheckIcon,
    name: 'Przejrzyste warunki współpracy',
    description:
      'Przed rozpoczęciem współpracy dokładnie omawiamy zakres działań i zasady rozliczenia. Żadnych ukrytych opłat, żadnych niespodzianek.',
  },
  {
    icon: DocumentTextIcon,
    name: 'Dokumentacja na każdym etapie',
    description:
      'Otrzymujesz pisemne podsumowania kluczowych ustaleń i decyzji. Wiesz, co zostało zrobione, co jest w toku i jakie są kolejne kroki - bez domysłów.',
  },
  {
    icon: HandRaisedIcon,
    name: 'Współpraca bez presji',
    description:
      'Nie stosujemy technik sprzedażowych ani sztucznych terminów. Dajesz nam tyle czasu na decyzję, ile potrzebujesz. Naszą rolą jest informować, nie naciskać.',
  },
]

const trustSignals = [
  'Bezpłatna wstępna analiza',
  'Bez długoterminowych zobowiązań',
  'Pełna poufność sprawy',
]

// ============================================================================
// SCHEMA.ORG — LegalService JSON-LD
// ============================================================================

function generateLegalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Kancelaria Adwokacka - Odszkodowania za służebność przesyłu',
    description:
      'Pomagamy właścicielom nieruchomości uzyskać wynagrodzenie za bezumowne korzystanie z gruntu oraz ustanowienie służebności przesyłu.',
    areaServed: {
      '@type': 'Country',
      name: 'Polska',
    },
    serviceType: [
      'Odszkodowania za służebność przesyłu',
      'Wynagrodzenie za bezumowne korzystanie z nieruchomości',
      'Ustanowienie służebności przesyłu',
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://twojadomena.pl/#kontakt',
      servicePhone: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'Polish',
      },
    },
    offers: {
      '@type': 'Offer',
      name: 'Bezpłatna analiza prawna nieruchomości',
      price: '0',
      priceCurrency: 'PLN',
      description: 'Wstępna analiza stanu prawnego nieruchomości i ocena potencjału roszczeń.',
    },
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function WhyUs() {
  const legalServiceSchema = useMemo(() => generateLegalServiceSchema(), [])

  return (
    <section
      id="dlaczego-my"
      aria-labelledby="why-us-heading"
      className="bg-white py-24 sm:py-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — 2-column */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16">
          <div>
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Nasze podejście
            </p>
            <h2
              id="why-us-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
            >
              Kancelaria, w której nie jesteś numerem sprawy
            </h2>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex lg:items-end">
            <p className="max-w-xl text-lg/8 text-slate-600 dark:text-slate-400">
              Mniej spraw, więcej uwagi. Stawiamy na bezpośredni kontakt, rzetelną analizę
              i pełną przejrzystość — zanim cokolwiek podpiszesz, będziesz wiedzieć, na czym stoisz.
            </p>
          </div>
        </div>

        {/* Features grid — 3x2 */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Nasze wartości"
          >
            {values.map((value) => (
              <div
                key={value.name}
                className="group flex flex-col"
                role="listitem"
                data-analytics="why-us-card"
                data-analytics-value={value.name}
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
                    <value.icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  {value.name}
                </dt>
                <dd className="mt-2 flex flex-auto flex-col text-sm/6 text-slate-600 dark:text-slate-400">
                  <p className="flex-auto">{value.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Trust footer */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
              <span>{signal}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="#kontakt"
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            data-analytics="cta-primary"
            data-analytics-location="why-us"
          >
            Sprawdź swoją sprawę →
          </a>
          <a
            href="#faq"
            className="text-sm/6 font-semibold text-gray-900 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            data-analytics="cta-secondary"
            data-analytics-location="why-us"
          >
            Najczęściej zadawane pytania <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Schema.org LegalService */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
    </section>
  )
}

export default WhyUs