import { ChevronRightIcon } from '@heroicons/react/24/solid'

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* TŁO */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
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
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-700/20">
              Bezpłatna analiza sprawy
            </span>
          </div>

          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Masz słupy przesyłowe na działce?
            <span className="block text-indigo-600">
              Masz prawo do odszkodowania.
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 sm:text-xl">
            Pomagamy właścicielom nieruchomości skutecznie uzyskać
            wynagrodzenie za bezumowne korzystanie z gruntu oraz ustanowienie
            służebności przesyłu.
          </p>

          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#kontakt"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            >
              Sprawdź swoją sprawę
            </a>
            <a
              href="#jak-dzialamy"
              className="text-sm font-semibold text-gray-900"
            >
              Jak to działa <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* PRAWA KOLUMNA (OBRAZ) */}
        <div className="mx-auto mt-16 flex max-w-2xl lg:mt-0 lg:ml-20 lg:max-w-none">
          <img
            src="/linie-energetyczne.jpg"
            alt="Działka z infrastrukturą przesyłową"
            className="w-full max-w-xl rounded-xl shadow-xl ring-1 ring-gray-200"
          />
        </div>
      </div>
    </div>
  )
}