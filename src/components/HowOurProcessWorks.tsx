const processSteps = [
  {
    name: 'Zgłoszenie sprawy',
    description:
      'Klient zgłasza potencjalne roszczenie związane z urządzeniami przesyłowymi lub infrastrukturą.',
    date: 'Krok 1',
    dateTime: 'step-1',
  },
  {
    name: 'Analiza i wycena',
    description:
      'Nasz zespół dokonuje szczegółowej analizy sytuacji i wyceny możliwego odszkodowania.',
    date: 'Krok 2',
    dateTime: 'step-2',
  },
  {
    name: 'Negocjacje z podmiotami',
    description:
      'Prowadzimy negocjacje z właścicielami infrastruktury w celu uzyskania możliwie najlepszego odszkodowania.',
    date: 'Krok 3',
    dateTime: 'step-3',
  },
  {
    name: 'Wypłata odszkodowania',
    description:
      'Po zakończonym procesie klient otrzymuje należne odszkodowanie finansowe.',
    date: 'Krok 4',
    dateTime: 'step-4',
  },
]

export function HowOurProcessWorks() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Nagłówek */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Jak działa nasz proces
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Przejrzyste 4 kroki do uzyskania odszkodowania
          </p>
        </div>

        {/* Timeline / Grid kroków */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.name}>
              <time
                dateTime={step.dateTime}
                className="flex items-center text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400"
              >
                <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 h-2 w-2 flex-none">
                  <circle r={2} cx={2} cy={2} fill="currentColor" />
                </svg>
                {step.date}
                <div
                  aria-hidden="true"
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0 dark:bg-white/15"
                />
              </time>
              <p className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900 dark:text-white">{step.name}</p>
              <p className="mt-1 text-base/7 text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}