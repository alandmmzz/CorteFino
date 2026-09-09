import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function BookingSection() {
  return (
    <section id="agenda" className="bg-background px-5 py-12 sm:px-8 sm:py-16 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-0 text-center">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">
            Reservá tu momento
          </p>
          <h2 className="text-balance font-serif text-4xl text-foreground md:text-5xl">
            Agendá tu turno
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Completá tus datos y elegí el día y horario que mejor te queden. Nos
            pondremos en contacto para confirmar tu cita y recibirte como te
            merecés.
          </p>
          <div className="mt-8 space-y-3 text-sm text-foreground">
            <p className="flex items-center gap-3">
              <span className="text-primary">·</span> Santa Catalina · Montevideo
            </p>
            <p className="flex items-center gap-3">
              <span className="text-primary">·</span> Lun–vie 10:00–20:00 · sáb 10:00–18:00
            </p>
          </div>
        </div>
        <Link href="/reservar" className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3 text-sm tracking-[0.12em] text-primary-foreground transition-transform hover:scale-[1.02]">
          RESERVÁ TU MOMENTO <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
