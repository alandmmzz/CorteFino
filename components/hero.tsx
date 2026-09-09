import Image from "next/image"
import { ArrowRight, Check, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden bg-background text-foreground">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1600px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 lg:pb-8 lg:pt-20 xl:px-16">
          <div className="mb-5 flex flex-wrap gap-3">
            <p className="location-badge inline-flex w-fit items-center gap-2 rounded-full border border-foreground/25 bg-foreground/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-foreground/80">
              <MapPin aria-hidden="true" className="size-3.5" /> Santa Catalina · Montevideo
            </p>
          </div>
          <h1 className="max-w-3xl font-serif text-5xl leading-[0.9] tracking-[-0.035em] text-balance sm:text-6xl xl:text-7xl">
            Tu estilo, <span className="text-foreground/80">tu sello.</span>
          </h1>
          <h2 className="mt-5 max-w-2xl text-2xl font-semibold leading-[1.05] text-balance sm:text-3xl xl:text-4xl">
            Barbería de precisión en Santa Catalina.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/reservar" className="hero-button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5">
              Reservá ya <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a href="#barberos" className="inline-flex min-h-12 items-center justify-center rounded-full border border-foreground/30 bg-foreground/[0.04] px-7 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-foreground/10">
              Ver barberos
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-xs text-foreground/60" aria-label="Beneficios de Corte Fino">
            <li className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-2"><Check aria-hidden="true" className="size-3.5 text-foreground/80" /> Agenda online</li>
            <li className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-2"><Check aria-hidden="true" className="size-3.5 text-foreground/80" /> Atención personalizada</li>
            <li className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-2"><Check aria-hidden="true" className="size-3.5 text-foreground/80" /> Profesionales calificados</li>
          </ul>
        </div>
        <div className="relative min-h-[28rem] overflow-hidden border-l border-background/10 lg:min-h-full">
          <Image src="/barber-shop-hero.png" alt="Interior de la barbería Corte Fino en Santa Catalina" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-background/20" />
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl border border-foreground/20 bg-background/80 p-3 shadow-[0_0_36px_oklch(0.9_0_0/0.1)] backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:p-4">
            <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-background text-sm text-foreground">✦</span><div><p className="text-[10px] uppercase tracking-[0.2em] text-foreground/55">Corte Fino</p><p className="text-sm font-medium text-foreground">Tu próximo corte empieza acá</p></div></div>
            <a href="/reservar" className="rounded-full bg-background px-4 py-2 text-xs font-semibold text-foreground">Reservá ya</a>
          </div>
        </div>
      </div>
    </section>
  )
}
