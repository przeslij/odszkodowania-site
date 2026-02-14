import { InboxIcon, ClipboardDocumentCheckIcon, HandRaisedIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const processSteps = [
  {
    name: 'Zgłoszenie sprawy',
    description:
      'Klient zgłasza potencjalne roszczenie związane z urządzeniami przesyłowymi lub infrastrukturą.',
    icon: InboxIcon,
    color: 'bg-indigo-600 dark:bg-indigo-500',
  },
  {
    name: 'Analiza i wycena',
    description:
      'Nasz zespół dokonuje szczegółowej analizy sytuacji i wyceny możliwego odszkodowania.',
    icon: ClipboardDocumentCheckIcon,
    color: 'bg-green-600 dark:bg-green-500',
  },
  {
    name: 'Negocjacje z podmiotami',
    description:
      'Prowadzimy negocjacje z właścicielami infrastruktury w celu uzyskania możliwie najlepszego odszkodowania.',
    icon: HandRaisedIcon,
    color: 'bg-yellow-600 dark:bg-yellow-500',
  },
  {
    name: 'Wypłata odszkodowania',
    description:
      'Po zakończonym procesie klient otrzymuje należne odszkodowanie finansowe.',
    icon: CurrencyDollarIcon,
    color: 'bg-red-600 dark:bg-red-500',
  },
]

export function HowOurProcessWorks1() {
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

        {/* Grid kroków */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.name} className="flex flex-col items-center text-center">
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step.color}`}>
                <step.icon className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <p className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900 dark:text-white">
                {step.name}
              </p>
              <p className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}