// src/components/seo/SEOHead.tsx
import Head from 'next/head'

/**
 * SEO Head Component
 * 
 * Zawiera:
 * - Preload Hero Image (LCP optimization)
 * - Canonical URL
 * - Open Graph tags
 * - Twitter Cards
 * - Schema.org Organization
 */

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

export function SEOHead({
  title = 'Odszkodowanie za Służebność Przesyłu | Aston Legal',
  description = 'Odzyskaj należne wynagrodzenie za bezumowne korzystanie z Twojej nieruchomości. Słupy energetyczne, gazociągi, ropociągi - bezpłatna analiza prawna w 24h. 95% wygranych spraw.',
  canonical = 'https://astonlegal.pl',
  ogImage = 'https://astonlegal.pl/images/og/odszkodowanie-sluzba-przesylu-og.jpg'
}: SEOHeadProps) {
  return (
    <Head>
      {/* Preload Hero Image - LCP Optimization */}
      <link
        rel="preload"
        href="/assets/odszkodowania/hero/desktop/sluzebnosc-przesylu-hero-desktop.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        href="/assets/odszkodowania/hero/mobile/sluzebnosc-przesylu-hero-mobile.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
        media="(max-width: 768px)"
      />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="służebność przesyłu, odszkodowanie za słupy, bezumowne korzystanie z nieruchomości, wynagrodzenie za gazociąg, odszkodowanie za ropociąg, trwałe ograniczenie korzystania, roszczenia odsetkowe, operat szacunkowy" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="Aston Legal" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Schema.org - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Aston Legal sp. z o.o.',
            description: 'Kancelaria prawna specjalizująca się w odszkodowaniach za służebność przesyłu',
            url: 'https://astonlegal.pl',
            logo: 'https://astonlegal.pl/logo.png',
            image: ogImage,
            telephone: '+48 123 456 789',
            email: 'kontakt@astonlegal.pl',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'PL'
            },
            areaServed: 'PL',
            serviceType: 'Odszkodowania za służebność przesyłu',
            priceRange: '$$',
            openingHours: 'Mo-Fr 08:00-18:00',
            sameAs: [
              'https://www.facebook.com/astonlegal',
              'https://www.linkedin.com/company/astonlegal'
            ]
          })
        }}
      />

      {/* Schema.org - Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Odszkodowanie za służebność przesyłu',
            provider: {
              '@type': 'LegalService',
              name: 'Aston Legal sp. z o.o.'
            },
            description: 'Pomoc prawna w uzyskaniu odszkodowania za bezumowne korzystanie z nieruchomości przez zakłady energetyczne i gazowe',
            areaServed: {
              '@type': 'Country',
              name: 'Polska'
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Rodzaje odszkodowań',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Odszkodowanie za słupy energetyczne'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Odszkodowanie za gazociągi'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Odszkodowanie za ropociągi'
                  }
                }
              ]
            }
          })
        }}
      />
    </Head>
  )
}
