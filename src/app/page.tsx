import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { ProblemContext } from '@/components/ProblemContext'
import { AudienceCTA} from '@/components/AudienceCTA'
import { WhoIsItFor } from '@/components/WhoIsItFor'
import { TransmissionDevices } from '@/components/TransmissionDevices'
import { HowOurProcessWorks } from '@/components/HowOurProcessWorks'
import { Testimonials } from '@/components/Testimonials'
import { ContactSection } from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemContext />
        <AudienceCTA />
        <WhoIsItFor />
        <TransmissionDevices />
        <HowOurProcessWorks /> 
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}