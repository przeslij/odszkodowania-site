'use client'

import React from 'react'
import {
  ScaleIcon,
  DocumentMagnifyingGlassIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'

const protocols = [
  {
    name: 'Maksymalizacja kapitału (0% prowizji)',
    description:
      'W przeciwieństwie do masowych kancelarii, nie pobieramy od 30% do 50% Twojego odszkodowania. Rozliczamy się za faktycznie wykonaną ekspertyzę. Dzięki temu 100% kwoty wynegocjowanej z operatorem trafia bezpośrednio do Ciebie.',
    icon: ScaleIcon,
    iconBg: 'bg-slate-900',
    iconShadow: 'shadow-slate-900/20',
  },
  {
    name: '15-punktowy protokół weryfikacji',
    description:
      'Każda nieruchomość przechodzi rygorystyczny proces audytu 360°. Analizujemy historię ksiąg wieczystych, mapy wysokiej rozdzielczości oraz aktualną linię orzeczniczą Sądu Najwyższego, eliminując błędy interpretacyjne.',
    icon: DocumentMagnifyingGlassIcon,
    iconBg: 'bg-indigo-600',
    iconShadow: 'shadow-indigo-600/20',
  },
  {
    name: 'Metodologia Data-Driven',
    description:
      'Nie polegamy na intuicji. Nasze wyceny i strategie negocjacyjne opieramy na twardych danych rynkowych i operatach szacunkowych. Jeśli analiza wykaże ryzyko zasiedzenia, otrzymasz od nas klarowny raport zamiast płonnych nadziei.',
    icon: CpuChipIcon,
    iconBg: 'bg-blue-600',
    iconShadow: 'shadow-blue-600/20',
  },
]

export function WhyUs() {
  return (
    <section
      id="metodologia"
      className="bg-white py-24 sm:py-32 dark:bg-gray-900"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Standardy i Metodologia
          </h2>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Precyzja tam, gdzie inni zgadują
          </p>
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-400">
            W branży odszkodowań przesyłowych różnica między &quot;sukcesem&quot; a &quot;stratą czasu&quot; tkwi w detalach.
            Nasze procedury zostały zaprojektowane tak, aby wycisnąć maksimum wartości z każdego m² Twojej działki.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {protocols.map((protocol) => (
              <div key={protocol.name} className="group flex flex-col transition-all duration-300">
                <dt className="text-lg font-bold text-slate-900 dark:text-white">
                  <div className={`
                    mb-8 flex h-14 w-14 items-center justify-center rounded-2xl
                    text-white shadow-xl transition-all duration-500
                    group-hover:rotate-[360deg] ${protocol.iconBg} ${protocol.iconShadow}
                  `}>
                    <protocol.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  {protocol.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                  <p className="flex-auto border-l-2 border-slate-100 pl-6 dark:border-slate-800">
                    {protocol.description}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Enterprise Trust Footer */}
        <div className="mt-20 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-slate-100 pt-10 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Gwarancja SLA: Reakcja w 24h
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Pełna transparentność kosztowa
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Bezpośredni nadzór ekspercki
          </div>
        </div>
      </Container>
    </section>
  )
}

export default WhyUs
