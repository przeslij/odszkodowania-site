export function TransmissionDevices() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Sekcja nagłówka */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Jakie urządzenia powodują roszczenia
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Sprawdź, które elementy infrastruktury mogą generować roszczenia finansowe
          </p>
        </div>

        {/* Grid Bento */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {/* Słupy niskiego napięcia */}
          <div className="flex p-px lg:col-span-4">
            <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
              <img
                alt="Słupy niskiego napięcia"
                src="/images/low-voltage-poles.jpg"
                className="h-80 object-cover object-left dark:hidden"
              />
              <img
                alt="Słupy niskiego napięcia"
                src="/images/dark-low-voltage-poles.jpg"
                className="h-80 object-cover object-left not-dark:hidden"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">
                  Słupy niskiego napięcia
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                  Podstawowe instalacje energetyczne
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                  Roszczenia mogą dotyczyć ograniczeń zabudowy i użytkowania działki, utraty wartości nieruchomości oraz wynagrodzenia za bezumowne korzystanie.
                </p>
              </div>
            </div>
          </div>

          {/* Linie średnie i wysokie napięcia */}
          <div className="flex p-px lg:col-span-2">
            <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:rounded-tr-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
              <img
                alt="Linie średniego i wysokiego napięcia"
                src="/images/high-voltage-lines.jpg"
                className="h-80 object-cover dark:hidden"
              />
              <img
                alt="Linie średniego i wysokiego napięcia"
                src="/images/dark-high-voltage-lines.jpg"
                className="h-80 object-cover not-dark:hidden"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">
                  Linie średnie i wysokie napięcia
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                  Infrastruktura większego napięcia
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                  Ograniczenia w zabudowie, spadek wartości działki i możliwe roszczenia o odszkodowanie.
                </p>
              </div>
            </div>
          </div>

          {/* Gazociągi i ropociągi */}
          <div className="flex p-px lg:col-span-2">
            <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 lg:rounded-bl-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
              <img
                alt="Gazociągi i ropociągi"
                src="/images/pipelines.jpg"
                className="h-80 object-cover dark:hidden"
              />
              <img
                alt="Gazociągi i ropociągi"
                src="/images/dark-pipelines.jpg"
                className="h-80 object-cover not-dark:hidden"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">
                  Gazociągi i ropociągi
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                  Rurociągi przesyłowe
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                  Mogą ograniczać użytkowanie gruntów rolnych lub inwestycyjnych, przysługują roszczenia finansowe za bezumowne korzystanie.
                </p>
              </div>
            </div>
          </div>

          {/* Inne urządzenia przesyłowe */}
          <div className="flex p-px lg:col-span-4">
            <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl dark:bg-gray-800 dark:shadow-none dark:outline-white/15">
              <img
                alt="Inne urządzenia przesyłowe"
                src="/images/other-devices.jpg"
                className="h-80 object-cover object-left dark:hidden"
              />
              <img
                alt="Inne urządzenia przesyłowe"
                src="/images/dark-other-devices.jpg"
                className="h-80 object-cover object-left not-dark:hidden"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-500 dark:text-gray-400">
                  Inne urządzenia przesyłowe
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                  Kable telekomunikacyjne, linie światłowodowe
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400">
                  Nawet niewielkie urządzenia mogą ograniczać inwestycje i generować roszczenia finansowe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}