'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Wyrok TK', href: '#wyrok-tk' },
  { name: 'Dla kogo', href: '#dla-kogo' },
  { name: 'Urządzenia', href: '#urzadzenia' },
  { name: 'Roszczenia', href: '#roszczenia' },
  { name: 'Jak działamy', href: '#jak-dzialamy' },
  { name: 'Dlaczego my', href: '#dlaczego-my' },
  { name: 'FAQ', href: '#faq' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top trust bar - Skoncentrowany na autorytecie */}
      <div className="bg-slate-900 py-2">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
          <p className="flex items-center gap-x-2 text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase font-bold text-white text-[10px] mr-1">Status:</span> 
            Przełomowy wyrok TK otwiera drogę do odszkodowań za zasiedzenie w złej wierze.
          </p>
          <a href="tel:+48000000000" className="hidden sm:flex items-center gap-x-1.5 text-xs text-white hover:text-indigo-300 transition-colors">
            <PhoneIcon className="h-3.5 w-3.5" />
            Zadzwoń: +48 000 000 000
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 dark:bg-gray-950/95 dark:border-gray-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 py-4 lg:px-8">
          
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Służebność Przesyłu - Kancelaria Odszkodowawcza</span>
              <Image
                src="/logo.png"
                alt="Służebność Przesyłu"
                width={140}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white transition-all relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA: Bezpłatna Analiza */}
          <div className="flex flex-1 items-center justify-end gap-x-4">
            <a
              href="#kontakt"
              className="relative overflow-hidden rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95 transition-all dark:shadow-none"
            >
              <span className="relative z-10 text-white">Bezpłatna analiza</span>
              {/* Sygnał "Live" */}
              <span className="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200"
            >
              <Bars3Icon className="h-7 w-7" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <Image src="/logo.png" alt="Służebność Przesyłu" width={120} height={34} className="h-8 w-auto" />
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-700 dark:text-slate-200">
                <XMarkIcon className="h-7 w-7" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-4 text-base font-bold text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <a href="tel:+48000000000" className="flex items-center justify-center gap-x-2 w-full rounded-xl bg-slate-100 px-4 py-4 text-lg font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
                  <PhoneIcon className="h-6 w-6 text-indigo-600" />
                  +48 000 000 000
                </a>
                <p className="text-center text-xs text-slate-500">
                  Konsultacja telefoniczna jest całkowicie bezpłatna.
                </p>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  )
}

export default Header