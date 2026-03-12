export function ProblemContext() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="bg-white py-24 sm:py-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          {/* Overline */}
          <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Problem prawny
          </p>

          {/* Heading */}
          <h2
            id="problem-heading"
            className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white"
          >
            Czym jest służebność przesyłu i dlaczego dotyczy tysięcy właścicieli
            nieruchomości
          </h2>

          {/* Narrative — 2 columns */}
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2 dark:text-gray-300">
            {/* Column 1 — definicja (AEO) */}
            <div>
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Służebność przesyłu
                </strong>{' '}
                to prawo przysługujące przedsiębiorstwom energetycznym, gazowym
                lub telekomunikacyjnym do korzystania z cudzej nieruchomości
                w celu posadowienia oraz eksploatacji infrastruktury
                przesyłowej - takiej jak słupy, linie energetyczne, rurociągi
                czy kable.
              </p>
              <p className="mt-8">
                W bardzo wielu przypadkach infrastruktura ta została wybudowana
                kilkanaście lub kilkadziesiąt lat temu{' '}
                <strong className="text-gray-900 dark:text-white">
                  bez zawarcia umowy z właścicielem gruntu i bez wypłaty
                  jakiegokolwiek wynagrodzenia
                </strong>
                .
              </p>
            </div>

            {/* Column 2 — skutki + brak świadomości */}
            <div className="border-l-4 border-indigo-500 pl-8 dark:border-indigo-400">
              <p className="font-semibold text-gray-900 dark:text-white">
                Dla właściciela nieruchomości oznacza to realne ograniczenia:
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <span>Brak możliwości zabudowy części działki</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <span>Spadek wartości rynkowej nieruchomości</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <span>Problemy przy sprzedaży lub planowaniu inwestycji</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[11px] h-1.5 w-1.5 flex-none rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <span>Brak wynagrodzenia za wieloletnie korzystanie z gruntu</span>
                </li>
              </ul>
              <p className="mt-6">
                Co istotne, wielu właścicieli nie ma świadomości, że w takich
                sytuacjach przysługuje im{' '}
                <strong className="text-gray-900 dark:text-white">
                  roszczenie o wynagrodzenie, odszkodowanie lub uregulowanie
                  stanu prawnego
                </strong>
                . Przedsiębiorstwa przesyłowe rzadko informują o tych prawach -
                dlatego sprawy te często latami pozostają nierozwiązane.
              </p>
            </div>
          </div>

          {/* Answer unit — AEO podsumowanie */}
          <p className="mt-10 max-w-3xl text-base/7 font-semibold text-gray-900 dark:text-white">
            Jeżeli na Twojej działce znajdują się słupy, linie, rurociągi lub
            inne urządzenia przesyłowe - istnieje duże prawdopodobieństwo, że
            możesz dochodzić wynagrodzenia lub odszkodowania.
          </p>

          {/* CTA — standardized */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#kontakt"
              className="rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Sprawdź swoją sprawę →
            </a>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Bezpłatnie i bez zobowiązań
            </span>
          </div>
        </div>
      </div>

      {/* Schema.org — FAQPage dla AEO / Featured Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Czym jest służebność przesyłu?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Służebność przesyłu to prawo przysługujące przedsiębiorstwom energetycznym, gazowym lub telekomunikacyjnym do korzystania z cudzej nieruchomości w celu posadowienia oraz eksploatacji infrastruktury przesyłowej — takiej jak słupy, linie energetyczne, rurociągi czy kable.',
                },
              },
              {
                '@type': 'Question',
                name: 'Czy właściciel nieruchomości może żądać odszkodowania za słupy energetyczne?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tak. Właścicielowi nieruchomości, przez którą przebiega infrastruktura przesyłowa posadowiona bez umowy i bez wynagrodzenia, przysługuje roszczenie o wynagrodzenie za bezumowne korzystanie, odszkodowanie lub uregulowanie stanu prawnego poprzez ustanowienie służebności przesyłu.',
                },
              },
            ],
          }),
        }}
      />
    </section>
  )
}