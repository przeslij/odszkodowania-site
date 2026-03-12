import { ClockIcon, DocumentTextIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'

const claims = [
  {
    name: 'Wynagrodzenie za bezumowne korzystanie z gruntu',
    description:
      'Jeżeli przedsiębiorstwo przesyłowe eksploatuje urządzenia na\u00A0Twoim gruncie bez umowy lub bez ustanowionej służebności, możesz domagać się zapłaty za\u00A0dotychczasowy okres korzystania - co\u00A0do\u00A0zasady za\u00A0ostatnie 6\u00A0lat. To\u00A0jednorazowe świadczenie za\u00A0przeszłość.',
    href: '#kontakt',
    icon: ClockIcon,
  },
  {
    name: 'Ustanowienie służebności przesyłu za wynagrodzeniem',
    description:
      'Ustanawiamy formalne prawo operatora do\u00A0korzystania z\u00A0Twojego gruntu - ale na\u00A0Twoich warunkach i\u00A0za\u00A0odpłatnością. Wynagrodzenie może mieć charakter jednorazowy lub okresowy (cykliczny). To\u00A0regulacja na\u00A0przyszłość.',
    href: '#kontakt',
    icon: DocumentTextIcon,
  },
  {
    name: 'Odszkodowanie za spadek wartości nieruchomości',
    description:
      'Obecność infrastruktury przesyłowej obniża wartość rynkową działki - co\u00A0jest szczególnie dotkliwe w\u00A0przypadku gruntów budowlanych i\u00A0inwestycyjnych. Dochodzenie odszkodowania z\u00A0tego tytułu jest niezależne od\u00A0wynagrodzenia za\u00A0służebność.',
    href: '#kontakt',
    icon: ArrowTrendingDownIcon,
  },
]

export function ClaimsCatalog() {
  return (
    <section
      id="roszczenia"
      aria-labelledby="claims-heading"
      className="bg-white py-24 sm:py-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16">
          <div>
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
              Twoje prawa
            </p>
            <h2
              id="claims-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl dark:text-white"
            >
              Roszczenia przysługujące właścicielom&nbsp;nieruchomości
            </h2>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex lg:items-end">
            <p className="max-w-xl text-lg/8 text-gray-600 dark:text-gray-300">
              <span className="block">Infrastruktura przesyłowa na&nbsp;Twojej działce to&nbsp;nie tylko ograniczenie.</span>
              <span className="block">To&nbsp;konkretna podstawa prawna do&nbsp;uzyskania wynagrodzenia.</span>
              <span className="block">Oto&nbsp;roszczenia z tytułu służebności przesyłu, które analizujemy&nbsp;w każdej sprawie.</span>
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {claims.map((claim) => (
              <div key={claim.name} className="group flex flex-col">
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-600/20 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-500 dark:shadow-indigo-500/20">
                    <claim.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {claim.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">{claim.description}</p>
                  <p className="mt-6">
                    <a
                      href={claim.href}
                      className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Sprawdź swoje roszczenia <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
            W jednej sprawie często łączymy kilka roszczeń jednocześnie - dobieramy strategię do&nbsp;sytuacji Twojej nieruchomości.
          </p>
        </div>
      </div>
    </section>
  )
}