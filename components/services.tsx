import { SERVICE_CATEGORIES, formatUYU } from "@/lib/services"
import Link from "next/link"

type PublicService = { name: string; description: string; treatments: readonly { id: string; name: string; price: number | null; promoPrice?: number | null; note?: string }[] }

const treatmentImages: Record<string, string> = {
  corte: "/treatments/corte.png?v=2",
  "corte-barba": "/treatments/corte-barba.png?v=2",
  "solo-maquina": "/treatments/solo-maquina.png?v=2",
  "corte-mechas": "/treatments/corte-mechas.png?v=2",
  "corte-platinado": "/treatments/corte-platinado.png?v=2",
}

const services: PublicService[] = SERVICE_CATEGORIES.map((category) => ({
  name: category.name,
  description: category.description,
  treatments: category.treatments,
}))

function getTreatmentImage(treatment: { id: string; name: string }) {
  const slug = treatment.name.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/\\s+/g, "-")
  return treatmentImages[treatment.id] ?? treatmentImages[slug] ?? "/treatments/corte.png?v=3"
}

export function Services({ catalog = services }: { catalog?: PublicService[] } = {}) {
  return (
    <section id="servicios" className="bg-background px-5 py-12 text-foreground sm:px-8 sm:py-16 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">Lo que hacemos</p>
            <h2 className="font-serif text-4xl leading-none text-foreground sm:text-5xl">Nuestros servicios</h2>
          </div>
          <Link href="/reservar" className="w-fit rounded-full border border-primary px-5 py-2.5 text-xs font-medium tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">VER TODOS</Link>
        </div>
        <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/55"><span className="h-px w-10 bg-primary" /><span>Barbería</span></div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-2">
          {catalog.flatMap((service) => service.treatments.map((treatment, index) => (
            <article key={treatment.id} className="group flex min-h-56 min-w-[calc(100vw-2.5rem)] snap-start flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-foreground/[0.045] shadow-[0_16px_40px_oklch(0_0_0/0.2)] transition-colors hover:border-primary/60 sm:min-w-[22rem] md:min-w-0">
              <img src={getTreatmentImage(treatment)} alt={`Foto ilustrativa de ${treatment.name}`} className="h-28 w-full object-cover opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><span className="font-mono text-xs text-primary/80">{String(index + 1).padStart(2, "0")}</span><h3 className="font-serif text-2xl text-foreground">{treatment.name}</h3></div><span className="inline-flex shrink-0 rounded-full border border-foreground/15 bg-foreground/[0.06] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-foreground/65">30 min</span></div>
              <p className="mt-4 max-w-md text-sm leading-6 text-foreground/65">{service.description}</p>
              <div className="mt-auto flex items-end justify-between gap-4 pt-6"><div><p className="text-xs uppercase tracking-[0.14em] text-foreground/65">Desde</p><p className="mt-1 inline-flex rounded-full bg-primary/10 px-2.5 py-1 font-serif text-xl font-semibold text-primary">{treatment.price !== null ? formatUYU(treatment.promoPrice ?? treatment.price) : "Consultar"}</p></div><Link href={`/reservar?service=${encodeURIComponent(JSON.stringify({ category: service.name, treatmentIds: [treatment.id] }))}`} className="inline-flex rounded-full border border-foreground/20 px-3 py-2 text-right text-sm font-medium text-foreground/85 transition-colors hover:border-primary hover:text-primary">Reservá ya →</Link></div>
              </div>
            </article>
          ))) }
        </div>
        <div className="mt-7 flex justify-center gap-2" aria-hidden="true"><span className="size-2 rounded-full bg-primary" /><span className="size-2 rounded-full bg-background/25" /><span className="size-2 rounded-full bg-background/25" /></div>
      </div>
    </section>
  )
}
