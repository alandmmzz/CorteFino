import { Barbers } from "@/components/barbers"
import { BookingSection } from "@/components/booking-section"
import { Membership } from "@/components/membership"
import { getMembership } from "@/app/actions/membership"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ScrollReveal } from "@/components/scroll-reveal"
import { getServiceCatalog } from "@/lib/db/services"
import { getStaff } from "@/app/actions/appointments"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [dbCatalog, staff, membership] = await Promise.all([getServiceCatalog(), getStaff(), getMembership()])
  const catalog = dbCatalog.map((category) => ({
    name: category.name,
    description: category.description,
    treatments: category.treatments.map((treatment) => ({
      id: String(treatment.id),
      name: treatment.name,
      price: treatment.price,
      promoPrice: treatment.promoPrice,
      note: treatment.note,
    })),
  }))
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <div className="barber-stripe h-3" aria-hidden="true" />
      <div className="snap-section"><ScrollReveal delay={40}><Barbers staff={staff} /></ScrollReveal></div>
      <div className="barber-stripe h-3" aria-hidden="true" />
      <div className="snap-section"><ScrollReveal delay={120}><Services catalog={catalog} /></ScrollReveal></div>
      <div className="barber-stripe membership-stripe h-3" aria-hidden="true" />
      <div className="snap-section"><ScrollReveal delay={80}><Membership membership={membership} /></ScrollReveal></div>
      <div className="barber-stripe membership-stripe h-3" aria-hidden="true" />
      <div className="snap-section"><ScrollReveal delay={160}><BookingSection /></ScrollReveal></div>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  )
}
