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
    </>
  )
}