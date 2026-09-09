import { SERVICE_CATEGORIES, formatUYU } from "@/lib/services"
import Link from "next/link"

type PublicService = { name: string; description: string; treatments: readonly { id: string; name: string; price: number | null; promoPrice?: number | null; note?: string }[] }

const services: PublicService[] = SERVICE_CATEGORIES.map((category) => ({
  name: category.name,
  description: category.description,
  treatments: category.treatments,
}))

export function Services({ catalog = services }: { catalog?: PublicService[] } = {}) {
  return (
    <section id="servicios" className="bg-foreground px-5 py-16 text-background sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">Lo que hacemos</p>
            <h2 className="font-serif text-4xl leading-none text-background sm:text-5xl">Nuestros servicios</h2>
          </div>
          <Link href="/reservar" className="w-fit rounded-full border border-primary px-5 py-2.5 text-xs font-medium tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">VER TODOS</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {catalog.map((service, index) => (
            <article key={service.name} className="flex min-h-56 flex-col rounded-2xl border border-background/15 bg-background/[0.04] p-5 transition-colors hover:border-primary/60 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3"><span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="font-serif text-2xl text-background">{service.name}</h3></div>
                <span className="shrink-0 text-xs text-background/55">{service.treatments.length * 30} min</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-6 text-background/65">{service.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`Precios de ${service.name}`}>
                {service.treatments.map((treatment) => (
                  <span key={treatment.id} className="inline-flex items-center gap-1.5 rounded-full border border-background/20 px-3 py-2 text-xs text-background/85">
                    {treatment.name}{treatment.price !== null && <span className="font-medium text-primary">{formatUYU(treatment.promoPrice ?? treatment.price)}</span>}
                  </span>
                ))}
              </div>
              <Link href={`/reservar?service=${encodeURIComponent(service.name)}`} className="mt-5 text-sm text-primary transition-colors hover:text-background">Ver precio y reservar →</Link>
            </article>
          ))}
        </div>
        <div className="mt-7 flex justify-center gap-2" aria-hidden="true"><span className="size-2 rounded-full bg-primary" /><span className="size-2 rounded-full bg-background/25" /><span className="size-2 rounded-full bg-background/25" /></div>
      </div>
    </section>
  )
}
