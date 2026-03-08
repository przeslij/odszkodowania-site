import { CallToAction } from '@/components/CallToAction'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { ProblemContext } from '@/components/ProblemContext'
import { LegalAuthority } from '@/components/LegalAuthority'
import { AudienceCTA} from '@/components/AudienceCTA'
import { WhoIsItFor } from '@/components/WhoIsItFor'
import { TransmissionDevices } from '@/components/TransmissionDevices'
import { HowOurProcessWorks } from '@/components/HowOurProcessWorks'
import { Testimonials } from '@/components/Testimonials'
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
        <TransmissionDevices />
        <ProblemContext />
        <ClaimsCatalog />
        <HowOurProcessWorks />
        <AudienceCTA />
        <WhoIsItFor />
        <WhyUs />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faq />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}