'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import {
  ClipboardDocumentCheckIcon,
  MagnifyingGlassCircleIcon,
  ChatBubbleLeftRightIcon,
  BanknotesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

// ============================================================================
// TYPES
// ============================================================================

type HeroIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & React.RefAttributes<SVGSVGElement>
>

interface ProcessStep {
  name: string
  description: string
  step: string
  stepNumber: string
  icon: HeroIcon
  iconBg: string
  badgeBg: string
  badgeBorder: string
  badgeShadow: string
  connectorGradient: string
  duration: string
  tools: string[]
}

interface StepCardProps {
  step: ProcessStep
  index: number
  isVisible: boolean
  isLast: boolean
}

// ============================================================================
// DATA
// ============================================================================

const processSteps: ProcessStep[] = [
  {
    name: 'Zgłoszenie sprawy',
    description:
      'Wystarczy podać lokalizację nieruchomości i rodzaj urządzenia - resztą zajmuje się nasz zespół. Wstępną analizę Twojej sytuacji przeprowadzimy bezpłatnie w ciągu 48 godzin.',
    step: 'Krok 1',
    stepNumber: '01',
    icon: ClipboardDocumentCheckIcon,
    iconBg: 'bg-indigo-600 dark:bg-indigo-500',
    badgeBg: 'border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-500',
    badgeBorder: 'border-indigo-600 dark:border-indigo-400',
    badgeShadow: 'shadow-indigo-600/25',
    connectorGradient: 'linear-gradient(to right, #4f46e5, #2563eb)',
    duration: 'PT5M',
    tools: ['Formularz online', 'Telefon', 'Email'],
  },
  {
    name: 'Analiza i wycena',
    description:
      'Weryfikujemy księgę wieczystą, mapy geodezyjne, decyzje administracyjne i dokumentację operatora. Na tej podstawie określamy potencjał roszczeń i przedstawiamy Ci jasną wycenę - bez ukrytych kosztów.',
    step: 'Krok 2',
    stepNumber: '02',
    icon: MagnifyingGlassCircleIcon,
    iconBg: 'bg-blue-600 dark:bg-blue-500',
    badgeBg: 'border-blue-600 bg-blue-600 dark:border-blue-400 dark:bg-blue-500',
    badgeBorder: 'border-blue-600 dark:border-blue-400',
    badgeShadow: 'shadow-blue-600/25',
    connectorGradient: 'linear-gradient(to right, #2563eb, #0d9488)',
    duration: 'P1D',
    tools: ['Analiza KW', 'Mapy geodezyjne', 'Wycena'],
  },
  {
    name: 'Negocjacje z operatorem',
    description:
      'Prowadzimy negocjacje z właścicielem infrastruktury przesyłowej w Twoim imieniu. Jeśli negocjacje nie przyniosą rezultatu, możemy podjąć dalsze kroki prawne - ale zawsze po konsultacji z Tobą.',
    step: 'Krok 3',
    stepNumber: '03',
    icon: ChatBubbleLeftRightIcon,
    iconBg: 'bg-teal-600 dark:bg-teal-500',
    badgeBg: 'border-teal-600 bg-teal-600 dark:border-teal-400 dark:bg-teal-500',
    badgeBorder: 'border-teal-600 dark:border-teal-400',
    badgeShadow: 'shadow-teal-600/25',
    connectorGradient: 'linear-gradient(to right, #0d9488, #059669)',
    duration: 'P14D',
    tools: ['Negocjacje', 'Mediacje', 'Postępowanie sądowe (w razie potrzeby)'],
  },
  {
    name: 'Wypłata odszkodowania',
    description:
      'Po zakończonym procesie otrzymujesz należne odszkodowanie. Kontrolujesz przebieg sprawy na każdym etapie - o wynikach informujemy niezwłocznie.',
    step: 'Krok 4',
    stepNumber: '04',
    icon: BanknotesIcon,
    iconBg: 'bg-emerald-600 dark:bg-emerald-500',
    badgeBg: 'border-emerald-600 bg-emerald-600 dark:border-emerald-400 dark:bg-emerald-500',
    badgeBorder: 'border-emerald-600 dark:border-emerald-400',
    badgeShadow: 'shadow-emerald-600/25',
    connectorGradient: 'linear-gradient(to right, #059669, #059669)',
    duration: 'P7D',
    tools: ['Umowa', 'Wypłata', 'Zamknięcie sprawy'],
  },
]

const trustSignals = [
  'Bezpłatna wstępna analiza',
  'Pełna kontrola na każdym etapie',
  'Stały kontakt z prowadzącym sprawę',
]

// ============================================================================
// HOOK — optimized staggered reveal
// ============================================================================

function useStaggeredReveal(count: number, staggerMs = 150) {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const hasTriggered = useRef(false)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          timeoutsRef.current.forEach(clearTimeout)
          timeoutsRef.current = []

          for (let i = 0; i < count; i++) {
            const timeout = setTimeout(() => {
              setVisibleCount((prev) => Math.max(prev, i + 1))
            }, i * staggerMs)
            timeoutsRef.current.push(timeout)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [count, staggerMs])

  const visibleItems = useMemo(
    () => Array.from({ length: count }, (_, i) => i < visibleCount),
    [count, visibleCount],
  )

  return { ref, visibleItems, visibleCount }
}

// ============================================================================
// SUBCOMPONENTS — memoized
// ============================================================================

const ToolLabels = React.memo(function ToolLabels({ tools }: { tools: string[] }) {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
        {tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
})

const DesktopStep = React.memo(function DesktopStep({
  step,
  index,
  isVisible,
  isLast,
}: StepCardProps) {
  const Icon = step.icon

  return (
    <div
      className={`
        group relative flex h-full flex-col
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      data-analytics="process-step"
      data-analytics-position={index + 1}
    >
      <div className="relative mb-8 flex items-center">
        <div
          className={`
            relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full
            border-2 text-sm font-bold transition-all duration-500 ease-out
            ${isVisible
              ? `${step.badgeBg} text-white shadow-md ${step.badgeShadow}`
              : 'border-slate-300 bg-white text-slate-400 scale-90 opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-500'
            }
          `}
          aria-hidden="true"
        >
          {step.stepNumber}
        </div>

        {!isLast && (
          <div className="relative ml-3 h-0.5 flex-1" aria-hidden="true">
            <div className="absolute inset-0 bg-slate-200 dark:bg-gray-700" />
            <div
              className={`
                absolute inset-y-0 left-0 right-0 origin-left
                transition-all duration-700 ease-out
                ${isVisible ? 'scale-x-100' : 'scale-x-0'}
              `}
              style={{ background: step.connectorGradient }}
            />
          </div>
        )}
      </div>

      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${step.iconBg}`}>
        <Icon aria-hidden="true" className="h-6 w-6 text-white" />
      </div>

      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        {step.name}
      </h3>
      <p className="mt-2 min-h-[10rem] text-sm/6 text-slate-600 dark:text-slate-400">
        {step.description}
      </p>

      <ToolLabels tools={step.tools} />
    </div>
  )
})

const MobileStep = React.memo(function MobileStep({
  step,
  index,
  isVisible,
}: StepCardProps) {
  const Icon = step.icon

  return (
    <div
      className={`
        relative transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
      `}
      data-analytics="process-step-mobile"
      data-analytics-position={index + 1}
    >
      <div
        className={`
          absolute -left-14 sm:-left-16 flex h-10 w-10 items-center justify-center rounded-full
          border-2 text-sm font-bold transition-all duration-500
          ${isVisible
            ? `${step.badgeBg} text-white shadow-md ${step.badgeShadow}`
            : 'border-slate-300 bg-white text-slate-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-500'
          }
        `}
        aria-hidden="true"
      >
        {step.stepNumber}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-3 flex items-center gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${step.iconBg}`}>
            <Icon aria-hidden="true" className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {step.step}
            </span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {step.name}
            </h3>
          </div>
        </div>
        <p className="text-sm/6 text-slate-600 dark:text-slate-400">
          {step.description}
        </p>
        <ToolLabels tools={step.tools} />
      </div>
    </div>
  )
})

// ============================================================================
// SCHEMA.ORG — HowTo JSON-LD
// ============================================================================

function generateHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '4 kroki do uzyskania odszkodowania za służebność przesyłu',
    description:
      'Proces uzyskiwania odszkodowania za urządzenia przesyłowe na działce - od zgłoszenia do wypłaty.',
    totalTime: 'P30D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'PLN',
      value: '0',
    },
    step: processSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.description,
    })),
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function HowOurProcessWorks() {
  const { ref: gridRef, visibleItems, visibleCount } = useStaggeredReveal(
    processSteps.length,
    180,
  )

  const howToSchema = useMemo(() => generateHowToSchema(), [])

  const mobileProgressHeight = useMemo(
    () => (visibleCount / processSteps.length) * 100,
    [visibleCount],
  )

  return (
    <section
      id="jak-dzialamy"
      aria-labelledby="process-heading"
      className="relative bg-slate-50 py-24 sm:py-32 dark:bg-gray-900"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-gray-700" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — 2-column */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16">
          <div>
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Jak działa nasz proces
            </p>
            <h2
              id="process-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
            >
              Przejrzyste 4 kroki do uzyskania odszkodowania
            </h2>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex lg:items-end">
            <p className="max-w-xl text-lg/8 text-slate-600 dark:text-slate-300">
              Od zgłoszenia do wypłaty - każdy etap jest transparentny. Nie musisz znać przepisów,
              wystarczy że znasz swoją działkę.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div ref={gridRef} className="mx-auto mt-16 sm:mt-20 lg:mt-24">
          {/* Desktop */}
          <div
            className="hidden lg:grid lg:grid-cols-4 lg:gap-x-8 lg:items-stretch overflow-hidden"
            role="list"
            aria-label="Kroki procesu"
          >
            {processSteps.map((step, index) => (
              <DesktopStep
                key={step.stepNumber}
                step={step}
                index={index}
                isVisible={visibleItems[index] ?? false}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </div>

          {/* Mobile / Tablet */}
          <div className="lg:hidden" role="list" aria-label="Kroki procesu">
            <div className="relative space-y-10 pl-14 sm:pl-16">
              <div
                className="absolute left-[1.1875rem] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-gray-700"
                aria-hidden="true"
              />
              <div
                className="absolute left-[1.1875rem] top-0 w-0.5 transition-all duration-1000 ease-out"
                style={{
                  height: `${mobileProgressHeight}%`,
                  background: 'linear-gradient(to bottom, #4f46e5, #2563eb, #0d9488, #059669)',
                }}
                aria-hidden="true"
              />

              {processSteps.map((step, index) => (
                <MobileStep
                  key={step.stepNumber}
                  step={step}
                  index={index}
                  isVisible={visibleItems[index] ?? false}
                  isLast={index === processSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-green-500" aria-hidden="true" />
              <span>{signal}</span>
            </div>
          ))}
        </div>

        {/* CTA — standardized to Hero button */}
        <div className="mt-10 flex justify-center">
          <a
            href="#kontakt"
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            data-analytics="cta-primary"
            data-analytics-location="process-section"
          >
            Sprawdź swoją sprawę →
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-gray-700" />

      {/* Schema.org HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </section>
  )
}

export default HowOurProcessWorks