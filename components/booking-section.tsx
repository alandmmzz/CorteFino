import Link from "next/link"
import { ArrowRight, Clock3, MapPin } from "lucide-react"

export function BookingSection() {
  return (
    <section id="agenda" className="bg-background px-5 py-12 sm:px-8 sm:py-16 lg:px-12 xl:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <p className="mb-4 inline-flex items-center gap-3 rounded-full border border-foreground/20 bg-foreground/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-primary soft-lights">
            <span className="size-1.5 rounded-full bg-destructive" aria-hidden="true" /> Reservá tu momento
          </p>
          <h2 className="max-w-xl text-balance font-serif text-5xl leading-[0.95] tracking-[-0.03em] text-foreground md:text-6xl">
            Agendá tu turno.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
            Elegí tu servicio, tu barbero y el horario que mejor te quede. Nos encargamos del resto.
          </p>
          <Link href="/reservar" className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3 text-xs font-medium uppercase tracking-[0.16em] text-background transition-transform hover:-translate-y-0.5">
            Reservá tu momento <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-foreground/15 bg-foreground/[0.035] p-5">
            <div className="mb-4 flex items-center gap-3 text-primary"><MapPin aria-hidden="true" className="size-4" /><span className="text-[10px] uppercase tracking-[0.25em]">Dónde encontrarnos</span></div>
            <p className="text-lg text-foreground">Santa Catalina · Montevideo</p>
          </div>
          <div className="rounded-2xl border border-foreground/15 bg-foreground/[0.035] p-5">
            <div className="mb-4 flex items-center gap-3 text-primary"><Clock3 aria-hidden="true" className="size-4" /><span className="text-[10px] uppercase tracking-[0.25em]">Horarios</span></div>
            <p className="text-lg text-foreground">Lun–vie 10:00–20:00</p>
            <p className="mt-1 text-sm text-muted-foreground">Sábados 10:00–18:00</p>
          </div>
        </div>
      </div>
    </section>
  )
}
