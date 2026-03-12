import Image from 'next/image'

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* TŁO */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200 dark:stroke-gray-800"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="grid-pattern"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect fill="url(#grid-pattern)" width="100%" height="100%" />
      </svg>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 lg:flex lg:px-8">
        {/* LEWA KOLUMNA */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:pt-8">
          <div className="mt-16">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/20 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-400/30">
              Bezpłatna analiza prawna
            </span>
          </div>

          <h1
            id="hero-heading"
            className="mt-10 text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
          >
            Masz słupy przesyłowe na działce?
            <span className="block text-indigo-600 dark:text-indigo-400">
              Masz prawo do odszkodowania.
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            Pomagamy właścicielom nieruchomości uzyskać wynagrodzenie za
            bezumowne korzystanie z gruntu oraz ustanowienie służebności
            przesyłu. Analizujemy Twoją sprawę bezpłatnie — bez zobowiązań.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-x-6">
            <a
              href="#kontakt"
              className="rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Sprawdź swoją sprawę →
            </a>
            <a
              href="#jak-dzialamy"
              className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Jak to działa <span aria-hidden="true">↓</span>
            </a>
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Bezpłatnie i bez zobowiązań. Odpowiadamy w ciągu jednego dnia roboczego.
          </p>
        </div>

        {/* PRAWA KOLUMNA (OBRAZ) */}
        <div className="mx-auto mt-16 flex max-w-2xl lg:mt-0 lg:ml-20 lg:max-w-none">
          <Image
            src="/linie-energetyczne.jpg"
            alt="Słupy energetyczne na działce - odszkodowanie za służebność przesyłu"
            width={600}
            height={400}
            priority
            className="w-full max-w-xl rounded-xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 object-cover"
          />
        </div>
      </div>
    </section>
  )
}