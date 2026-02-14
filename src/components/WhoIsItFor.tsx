'use client'

import { InboxIcon, UsersIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'

const segments = [
  {
    name: 'Właściciele działek budowlanych',
    description:
      'Jeśli na Twojej działce stoją słupy, linie energetyczne lub przebiegają kable, może to blokować zabudowę, obniżać wartość nieruchomości i utrudniać sprzedaż. W takich przypadkach często przysługuje wynagrodzenie lub odszkodowanie.',
    icon: HomeIcon,
  },
  {
    name: 'Właściciele gruntów rolnych',
    description:
      'Infrastruktura przesyłowa na gruntach rolnych często ogranicza uprawę, dojazd maszynami lub zmniejsza powierzchnię użytkową działki. Prawo przewiduje wynagrodzenie za bezumowne korzystanie z gruntu rolnego.',
    icon: UsersIcon,
  },
  {
    name: 'Właściciele działek rekreacyjnych i siedlisk',
    description:
      'Nawet jeśli działka nie jest intensywnie zabudowana, obecność słupów, linii lub rurociągów wpływa na jej wartość i sposób korzystania. Tego typu nieruchomości również mogą być objęte roszczeniami.',
    icon: InboxIcon, // tymczasowo ikonę zastępczą, można zmienić
  },
]

export function WhoIsItFor() {
  return (
    <section
      id="who-is-it-for"
      className="bg-gray-50 py-24 sm:py-32"
      aria-labelledby="who-is-it-for-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="who-is-it-for-heading"
            className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
          >
            Dla kogo to jest?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Sprawdź, czy Twoja nieruchomość może generować roszczenia z tytułu służebności przesyłu.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {segments.map((segment) => (
              <div key={segment.name} className="flex flex-col">
                <dt className="text-base font-semibold text-gray-900">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
                    <segment.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {segment.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base text-gray-600">
                  <p className="flex-auto">{segment.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}