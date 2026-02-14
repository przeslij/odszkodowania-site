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

          {/* Narrative – 2 columns */}
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2 dark:text-gray-300">
            {/* Column 1 */}
            <div>
              <p>
                <strong>Służebność przesyłu</strong> to prawo przysługujące
                przedsiębiorstwom energetycznym, gazowym lub
                telekomunikacyjnym do korzystania z cudzej nieruchomości w celu
                posadowienia oraz eksploatacji infrastruktury przesyłowej —
                takiej jak słupy, linie energetyczne, rurociągi czy kable.
              </p>
              <p className="mt-8">
                W bardzo wielu przypadkach infrastruktura ta została wybudowana
                kilkanaście lub kilkadziesiąt lat temu{' '}
                <strong>
                  bez zawarcia umowy z właścicielem gruntu
                </strong>{' '}
                i bez wypłaty jakiegokolwiek wynagrodzenia.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <p>
                Dla właściciela nieruchomości oznacza to realne ograniczenia:
                brak możliwości zabudowy części działki, spadek jej wartości,
                problemy przy sprzedaży lub planowaniu inwestycji.
              </p>
              <p className="mt-8">
                Co istotne, wielu właścicieli nie ma świadomości, że w takich
                sytuacjach przysługuje im{' '}
                <strong>
                  roszczenie o wynagrodzenie, odszkodowanie lub uregulowanie
                  stanu prawnego
                </strong>
                . Przedsiębiorstwa przesyłowe rzadko informują o tych prawach —
                dlatego sprawy te często latami pozostają nierozwiązane.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex">
            <a
              href="#kontakt"
              className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
            >
              Sprawdź, czy przysługuje Ci odszkodowanie
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
