// src/components/sections/TransmissionDevices.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BoltIcon,
  FireIcon,
  SignalIcon,
  ArrowRightIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

interface DeviceCard {
  id: string
  title: string
  heading: string
  description: string
  details: string[]
  imageSrc: string
  imageAlt: string
  icon: React.ElementType
  gridClass: string
  href: string
}

const devices: DeviceCard[] = [
  {
    id: 'slupy-niskiego-i-sredniego-napiecia',
    title: 'Słupy nN i SN',
    heading: 'Infrastruktura Elektroenergetyczna nN i SN',
    description: `Najczęstsza przyczyna spadku wartości działek budowlanych. Słupy i napowietrzne linie energetyczne stanowią trwałe ograniczenie możliwości zabudowy oraz aranżacji Twojego gruntu.`,
    details: [
      'Odszkodowanie za bezumowne korzystanie',
      'Wynagrodzenie za pas technologiczny',
      'Wstępna analiza prawna w 24h'
    ],
    imageSrc: '/assets/odszkodowania/urzadzenia/slupy/srednie-napiecie/slup-srednie-napiecie-15-30kv-odszkodowanie.webp',
    imageAlt: 'Słup średniego i niskiego napięcia na działce budowlanej - podstawa do roszczeń o odszkodowanie za bezumowne korzystanie',
    icon: BoltIcon,
    gridClass: 'lg:col-span-3',
    href: '#slupy-niskiego-i-sredniego-napiecia'
  },
  {
    id: 'linie-wysokiego-napiecia',
    title: 'Linie i wieże WN',
    heading: 'Magistrale Przesyłowe 110kV–750kV',
    description: `Infrastruktura o największym stopniu uciążliwości. Szerokie strefy ochronne i promieniowanie elektromagnetyczne wyłączają ogromne połacie gruntu inwestycyjnego z bezpiecznego użytkowania.`,
    details: [
      'Najwyższe stawki odszkodowawcze',
      'Rekompensata za drastyczny spadek wartości',
      'Reprezentacja przed operatorami (np. PGE, PSE)'
    ],
    imageSrc: '/assets/odszkodowania/urzadzenia/slupy/wysokie-napiecie/slup-wysokie-napiecie-110kv-odszkodowanie.webp',
    imageAlt: 'Wieża wysokiego napięcia 110kV-750kV ograniczająca prawo własności nieruchomości',
    icon: BoltIcon,
    gridClass: 'lg:col-span-3',
    href: '#linie-wysokiego-napiecia'
  },
  {
    id: 'gazociagi-i-ropociagi',
    title: 'Gazociągi i ropociągi',
    heading: 'Infrastruktura Podziemna',
    description: `Niewidoczne ograniczenia o potężnym znaczeniu. Strefy kontrolowane rurociągów uniemożliwiają budowę fundamentów.`,
    details: [
      'Wszystkie klasy ciśnienia',
      'Odszkodowanie za rury przesyłowe',
      'Audyt decyzji administracyjnych'
    ],
    imageSrc: '/assets/odszkodowania/urzadzenia/gazociagi/niskie-cisnienie/gazociag-niskie-cisnienie-odszkodowanie-dom.webp',
    imageAlt: 'Gazociąg podziemny i ropociąg jako podstawa do roszczeń o wynagrodzenie za służebność przesyłu',
    icon: FireIcon,
    gridClass: 'lg:col-span-2',
    href: '#gazociagi-i-ropociagi'
  },
  {
    id: 'sieci-telekomunikacyjne',
    title: 'Kable i światłowody',
    heading: 'Sieci Teletechniczne',
    description: `Często ignorowane źródło roszczeń. Kable telekomunikacyjne zakopane bez zgody właściciela generują prawo do zapłaty.`,
    details: [
      'Roszczenia za linie nad/podziemne',
      'Szybka ścieżka ugodowa',
      'Analiza umów zasiedzenia'
    ],
    imageSrc: '/assets/odszkodowania/urzadzenia/telekomunikacja/kabel-telekomunikacyjny-sluzba-przesylu.webp',
    imageAlt: 'Kabel telekomunikacyjny i światłowód na działce - odszkodowanie i służebność',
    icon: SignalIcon,
    gridClass: 'lg:col-span-2',
    href: '#sieci-telekomunikacyjne'
  },
  {
    id: 'sieci-wodociagowe',
    title: 'Sieci wod-kan',
    heading: 'Urządzenia Wodociągowe',
    description: `Magistrale wodne i kanalizacyjne przebiegające przez prywatne posesje. Sprawdź, czy gmina wypłaciła Ci należne świadczenia.`,
    details: [
      'Audyt umów z zakładami',
      'Roszczenia za studnie i rury',
      'Ustanowienie służebności'
    ],
    imageSrc: '/assets/odszkodowania/urzadzenia/wodociagi/infrastruktura-wod-kan-odszkodowanie.webp',
    imageAlt: 'Infrastruktura wodociągowa i kanalizacyjna na prywatnej działce budowlanej',
    icon: BeakerIcon,
    gridClass: 'lg:col-span-2',
    href: '#sieci-wodociagowe'
  }
]

function DeviceCardComponent({ device }: { device: DeviceCard }) {
  const Icon = device.icon

  return (
    <article
      id={device.id}
      className={`
        ${device.gridClass}
        group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm
        border border-gray-200 transition-all duration-300
        hover:shadow-xl hover:border-indigo-300
        dark:bg-gray-800/80 dark:border-gray-700 dark:hover:border-indigo-500/50
      `}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
        <Image
          src={device.imageSrc}
          alt={device.imageAlt}
          fill
          loading="lazy"
          quality={85}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
            <Icon className="h-4 w-4" />
          </div>
          <span className="font-medium text-white text-sm tracking-wide shadow-sm">
            {device.title}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          {device.heading}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
          {device.description}
        </p>
        <ul className="space-y-2 mb-6 border-t border-gray-100 dark:border-gray-700/50 pt-4">
          {device.details.map((detail, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium"
            >
              <svg className="h-5 w-5 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {detail}
            </li>
          ))}
        </ul>
        <Link
          href="#kontakt"
          className="mt-auto inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          Sprawdź potencjał roszczeń
          <ArrowRightIcon className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export function TransmissionDevices() {
  return (
    <section
      id="urzadzenia"
      aria-labelledby="devices-heading"
      className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header — 2-column */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16 mb-16 sm:mb-20">
          <div>
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Audyt infrastruktury
            </p>
            <h2
              id="devices-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Urządzenia przesyłowe na Twojej działce
            </h2>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex lg:items-end">
            <p className="max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Każde urządzenie stanowiące <strong>trwałe ograniczenie korzystania z nieruchomości</strong> uprawnia Cię do wynagrodzenia. Wybierz rodzaj infrastruktury, z którym się mierzysz, aby sprawdzić swoje prawa.
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-6 lg:grid-rows-2">
          {devices.map((device) => (
            <DeviceCardComponent key={device.id} device={device} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <Link
            href="#kontakt"
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition-colors duration-200"
          >
            Zamów bezpłatną analizę →
          </Link>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Brak opłat wstępnych · Weryfikacja w 24h
          </p>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Czy słup energetyczny na działce uprawnia do odszkodowania?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tak, każdy słup energetyczny stanowiący trwałe ograniczenie korzystania z nieruchomości uprawnia właściciela do wynagrodzenia za bezumowne korzystanie. Wymaga to ustanowienia służebności przesyłu lub wypłaty odszkodowania.'
                }
              },
              {
                '@type': 'Question',
                name: 'Ile wynosi odszkodowanie za linię wysokiego napięcia?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Odszkodowanie za linię wysokiego napięcia jest najwyższe, ponieważ szerokie pasy technologiczne drastycznie obniżają wartość działek budowlanych. Kwoty są wyliczane indywidualnie przez rzeczoznawców majątkowych na podstawie wyceny operatu szacunkowego.'
                }
              }
            ]
          })
        }}
      />
    </section>
  )
}