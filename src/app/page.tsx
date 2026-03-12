import type { Metadata } from 'next'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ProblemContext } from '@/components/ProblemContext'
import { LegalAuthority } from '@/components/LegalAuthority'
import { WhoIsItFor } from '@/components/WhoIsItFor'
import { TransmissionDevices } from '@/components/TransmissionDevices'
import { HowOurProcessWorks } from '@/components/HowOurProcessWorks'
import { ContactSection } from '@/components/contact/ContactSection'
import { ClaimsCatalog } from '@/components/Claimscatalog'
import { WhyUs } from '@/components/WhyUs'

// ============================================================================
// SEO METADATA — krytyczne dla widoczności w wyszukiwarkach
// ============================================================================

export const metadata: Metadata = {
  title: 'Odszkodowanie za służebność przesyłu - bezpłatna analiza | [Nazwa Kancelarii]',
  description:
    'Sprawdź bezpłatnie, czy Twojej nieruchomości przysługuje wynagrodzenie za słupy energetyczne, gazociągi lub inne urządzenia przesyłowe. Analiza prawna w 24h, bez zobowiązań.',
  openGraph: {
    title: 'Odszkodowanie za służebność przesyłu - bezpłatna analiza',
    description:
      'Pomagamy właścicielom nieruchomości uzyskać wynagrodzenie za bezumowne korzystanie z gruntu. Bezpłatna analiza, bez zobowiązań.',
    type: 'website',
    locale: 'pl_PL',
    // TODO: dodać url i images po ustaleniu domeny
    // url: 'https://[domena].pl',
    // images: [{ url: 'https://[domena].pl/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: '/', // TODO: zmienić na pełny URL po ustaleniu domeny
  },
}

// ============================================================================
// ORGANIZATION SCHEMA — JSON-LD
// ============================================================================

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '[Nazwa Kancelarii]', // TODO: uzupełnić
  description:
    'Kancelaria specjalizująca się w odszkodowaniach za służebność przesyłu. Pomagamy właścicielom nieruchomości uzyskać wynagrodzenie za bezumowne korzystanie z gruntu.',
  areaServed: {
    '@type': 'Country',
    name: 'Polska',
  },
  serviceType: [
    'Odszkodowania za służebność przesyłu',
    'Wynagrodzenie za bezumowne korzystanie z nieruchomości',
    'Ustanowienie służebności przesyłu',
  ],
  // TODO: uzupełnić po ustaleniu danych
  // url: 'https://[domena].pl',
  // telephone: '+48-XXX-XXX-XXX',
  // address: { '@type': 'PostalAddress', addressLocality: '[Miasto]', addressCountry: 'PL' },
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LegalAuthority />
        <ProblemContext />
        <WhoIsItFor />
        <TransmissionDevices />
        <ClaimsCatalog />
        <HowOurProcessWorks />
        <WhyUs />
        <Faq />
        <ContactSection />
      </main>
      <Footer />

      {/* Organization Schema — global */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}