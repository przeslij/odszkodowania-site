'use client'

import React from 'react'

const faqs = [
  {
    question: 'Ile kosztuje wstępna analiza mojej sprawy?',
    answer:
      'Wstępna weryfikacja stanu prawnego nieruchomości oraz\u00A0analiza potencjału roszczeń są\u00A0całkowicie bezpłatne. Nie\u00A0ponosisz żadnego ryzyka finansowego do\u00A0momentu, w\u00A0którym zdecydujesz się na\u00A0oficjalne rozpoczęcie współpracy.',
  },
  {
    question: 'Czy urządzenia przesyłowe na działce zawsze dają prawo do odszkodowania?',
    answer:
      'To\u00A0zależy od\u00A0wielu czynników, takich jak\u00A0data posadowienia infrastruktury oraz\u00A0istniejące decyzje administracyjne. Dzięki wyrokowi TK z\u00A02025 roku, otworzyły się jednak drogi do\u00A0roszczeń, które wcześniej były uznawane za\u00A0przedawnione.',
  },
  {
    question: 'Jak długo trwa proces uzyskiwania wynagrodzenia?',
    answer:
      'Czas trwania sprawy jest uzależniony od\u00A0postawy operatora sieci. W\u00A0modelu polubownym proces zamyka się zazwyczaj w\u00A0kilku miesiącach. W\u00A0przypadku drogi sądowej, dzięki naszej precyzyjnej dokumentacji, dążymy do\u00A0maksymalnego skrócenia wszystkich procedur.',
  },
  {
    question: 'Czy muszę przygotować mapy lub dokumenty z ksiąg wieczystych?',
    answer:
      'Nie\u00A0jest to\u00A0konieczne na\u00A0start. Jako butikowa kancelaria bierzemy na\u00A0siebie większość formalności. Wystarczy numer działki, a\u00A0nasz zespół samodzielnie zweryfikuje niezbędne dane w\u00A0rejestrach publicznych i\u00A0bazach geodezyjnych.',
  },
  {
    question: 'Co jeśli operator powołuje się na zasiedzenie służebności?',
    answer:
      'Zasiedzenie to\u00A0najczęstsza linia obrony korporacji, która po\u00A0ostatnich zmianach prawnych stała się znacznie trudniejsza do\u00A0ostania. Analizujemy każdy dokument pod\u00A0kątem wad prawnych, które mogą skutecznie przerwać bieg zasiedzenia i\u00A0przywrócić Ci\u00A0prawo do\u00A0zapłaty.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          <div className="lg:col-span-5">
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Baza wiedzy
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Często zadawane pytania
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
              <span className="block">Nie znalazłeś odpowiedzi na swoje wątpliwości?</span>
              <span className="block">Skontaktuj się z nami, aby uzyskać bezpłatną</span>
              <span className="block">interpretację Twojej sytuacji prawnej.</span>
            </p>
            <div className="mt-8">
              <a
                href="#kontakt"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors"
              >
                Zadaj pytanie prawnikowi <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-12">
              {faqs.map((faq) => (
                <div 
                  key={faq.question} 
                  className="border-b border-gray-100 pb-8 last:border-0 dark:border-gray-800"
                >
                  <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </dt>
                  <dd className="mt-4 text-base/7 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </div>
    </section>
  )
}