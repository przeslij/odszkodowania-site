'use client'

import React, { useMemo } from 'react'

const faqs = [
  {
    question: 'Czym jest służebność przesyłu?',
    answer:
      'Służebność przesyłu to\u00A0ograniczone prawo rzeczowe, które umożliwia przedsiębiorcy przesyłowemu korzystanie z\u00A0cudzej nieruchomości w\u00A0zakresie niezbędnym do\u00A0eksploatacji urządzeń przesyłowych. Została uregulowana w\u00A0art.\u00A0305\u00B9-305\u2074 Kodeksu cywilnego i\u00A0obowiązuje od\u00A03\u00A0sierpnia 2008\u00A0r.',
  },
  {
    question: 'Jakie odszkodowanie mogę uzyskać za słupy energetyczne na działce?',
    answer:
      'Wysokość świadczeń zależy od\u00A0wielu czynników: rodzaju i\u00A0parametrów urządzenia, powierzchni zajętej przez infrastrukturę, wartości rynkowej nieruchomości oraz stopnia ograniczenia w\u00A0korzystaniu z\u00A0gruntu. Świadczenia mogą obejmować wynagrodzenie za\u00A0dotychczasowe bezumowne korzystanie (do\u00A06\u00A0lat wstecz), wynagrodzenie za\u00A0ustanowienie służebności na\u00A0przyszłość oraz odszkodowanie za\u00A0spadek wartości. Kwota ustalana jest indywidualnie po\u00A0analizie dokumentów.',
  },
  {
    question: 'Czy mogę ubiegać się o odszkodowanie, jeśli słupy stoją na działce od wielu lat?',
    answer:
      'Tak. Wieloletnia obecność urządzeń przesyłowych nie oznacza automatycznej utraty praw. Kluczowe jest ustalenie, czy operatorowi przysługuje ważny tytuł prawny do\u00A0korzystania z\u00A0gruntu. Wyrok Trybunału Konstytucyjnego z\u00A02025\u00A0r. (sygn.\u00A0P\u00A010/16) zakwestionował dotychczasową praktykę zasiedzenia, co\u00A0otwiera drogę do\u00A0wielu spraw wcześniej uznawanych za\u00A0zamknięte.',
  },
  {
    question: 'Czy za gazociąg lub rurociąg pod ziemią też przysługuje odszkodowanie?',
    answer:
      'Tak. To, że\u00A0instalacja przebiega pod ziemią i\u00A0nie jest widoczna, nie oznacza braku roszczeń. Podziemne rurociągi tworzą strefy ochronne, w\u00A0których nie można dowolnie budować ani prowadzić prac ziemnych. Ogranicza to\u00A0sposób korzystania z\u00A0nieruchomości i\u00A0może stanowić podstawę do\u00A0dochodzenia wynagrodzenia za\u00A0służebność oraz odszkodowania za\u00A0spadek wartości.',
  },
  {
    question: 'Jak wygląda proces zgłoszenia sprawy?',
    answer:
      'Wystarczy wypełnić formularz na\u00A0naszej stronie lub zadzwonić pod wskazany numer. Podajesz lokalizację nieruchomości i\u00A0rodzaj infrastruktury. Nasi specjaliści przeprowadzą wstępną analizę i\u00A0skontaktują się z\u00A0Tobą z\u00A0wynikami. Bezpłatna analiza nie wiąże się z\u00A0żadnymi zobowiązaniami.',
  },
  {
    question: 'Czy analiza mojej sprawy jest naprawdę bezpłatna?',
    answer:
      'Tak. Wstępna analiza stanu prawnego nieruchomości, weryfikacja potencjału roszczeń i\u00A0kontakt zwrotny z\u00A0informacją o\u00A0wynikach - to\u00A0wszystko realizujemy bez żadnych opłat. Dopiero po\u00A0przedstawieniu wyników analizy uzgadniamy warunki ewentualnej dalszej współpracy.',
  },
  {
    question: 'Czy mogę żądać usunięcia słupów lub kabli z mojej działki?',
    answer:
      'Co\u00A0do\u00A0zasady istnieje taka możliwość, jeśli operator nie dysponuje tytułem prawnym do\u00A0korzystania z\u00A0gruntu. W\u00A0praktyce fizyczne usunięcie infrastruktury jest jednak trudne do\u00A0wyegzekwowania. W\u00A0większości przypadków efektywniejsze jest dochodzenie wynagrodzenia finansowego za\u00A0korzystanie z\u00A0nieruchomości lub ustanowienie służebności na\u00A0warunkach korzystnych dla\u00A0właściciela.',
  },
  {
    question: 'Jakie dokumenty są potrzebne do rozpoczęcia analizy?',
    answer:
      'Na\u00A0początku wystarczy numer działki, adres nieruchomości i\u00A0informacja o\u00A0rodzaju infrastruktury. Jeśli posiadasz numer księgi wieczystej, decyzje administracyjne lub korespondencję z\u00A0operatorem - przygotuj je, ale nie są one warunkiem rozpoczęcia analizy. Brakujące dokumenty możemy pomóc pozyskać.',
  },
]

// ============================================================================
// SCHEMA.ORG - FAQPage JSON-LD
// ============================================================================

function generateFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/\u00A0/g, ' '),
      },
    })),
  }
}

export function Faq() {
  const faqSchema = useMemo(() => generateFaqSchema(), [])

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-24 sm:py-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">

          <div className="lg:col-span-5">
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Baza wiedzy
            </p>
            <h2
              id="faq-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
            >
              Często zadawane pytania
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
              <span className="block">Nie znalazłeś odpowiedzi na&nbsp;swoje wątpliwości?</span>
              <span className="block">Skontaktuj się z&nbsp;nami, aby uzyskać bezpłatną</span>
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

      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}