import Link from "next/link"
import { Check, Crown } from "lucide-react"

type Membership = { name: string; price: number; chemicalDiscount: number; monthlyCuts: number; description: string; active: boolean }

export function Membership({ membership }: { membership: Membership }) {
  if (!membership.active) return null

  const benefits = [
    `${membership.monthlyCuts} cortes mensuales`,
    "Prioridad en agenda",
    `${membership.chemicalDiscount}% de descuento en productos`,
    `${membership.chemicalDiscount}% de descuento en trabajos químicos`,
    "Full service gratuito en tu cumpleaños",
  ]

  return (
    <section className="membership-premium relative overflow-hidden bg-background px-5 py-12 text-foreground sm:px-8 sm:py-16">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.32em] text-foreground/55">
          <span className="h-px flex-1 bg-foreground/15" />
          <span>Sector exclusivo</span>
          <span className="h-px flex-1 bg-foreground/15" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="text-center lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <span className="inline-flex items-center gap-2 rounded-full border membership-gold-badge px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] membership-gold-text shadow-[0_0_22px_oklch(0.72_0.14_78/0.12)]"><Crown aria-hidden="true" className="size-3.5" /> Deluxe</span>
              <h2 className="membership-metal max-w-xl font-serif text-5xl font-bold leading-[0.88] tracking-[-0.035em] text-balance sm:text-8xl lg:mx-0 mx-auto">{membership.name}</h2>
            </div>
            <p className="mt-6 max-w-md text-base leading-7 text-foreground/70 lg:mx-0 mx-auto">{membership.description}</p>
            <p className="mt-5 font-serif text-2xl font-semibold text-foreground">{membership.price ? `$${membership.price.toLocaleString("es-AR")}` : "A consultar"}<span className="ml-2 font-sans text-sm font-normal text-foreground/60">por mes</span></p>
          </div>
          <div className="border border-foreground/15 bg-foreground/[0.03] p-4 sm:p-5">
            <p className="font-serif text-2xl font-semibold text-foreground">Incluye:</p>
            <div className="mt-4 grid gap-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex min-h-14 items-center gap-3 rounded-xl membership-gold-card border bg-background px-4 py-3 shadow-sm sm:px-5">
                  <Check aria-hidden="true" className="size-5 shrink-0 membership-gold-text" strokeWidth={2.5} />
                  <span className="text-base leading-6 text-foreground sm:text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            <Link href="/reservar" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full membership-gold-button px-6 py-3 text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5">Quiero mi membresía VIP</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
