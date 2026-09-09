import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1600px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 xl:px-20">
          <p className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-background/40 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-background/75">
            <span aria-hidden="true" className="text-background/80">✦</span> Santa Catalina · Montevideo
          </p>
          <h1 className="max-w-3xl font-serif text-6xl leading-[0.9] tracking-[-0.035em] text-balance sm:text-7xl xl:text-8xl">
            Tu estilo, <span className="text-background/80">tu sello.</span>
          </h1>
          <h2 className="mt-8 max-w-2xl text-3xl font-semibold leading-[1.05] text-balance sm:text-4xl xl:text-5xl">
            Barbería de precisión en Santa Catalina.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-background/70 sm:text-lg">
            Elegí tu servicio, tu barbero y tu horario. Una experiencia cuidada para que salgas sintiéndote tan bien como te ves.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/reservar" className="inline-flex min-h-12 items-center justify-center rounded-full bg-background px-7 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5">
              Reservá ya <span aria-hidden="true" className="ml-2">→</span>
            </a>
            <a href="#barberos" className="inline-flex min-h-12 items-center justify-center rounded-full border border-background/25 px-7 py-3 text-sm font-medium text-background transition-colors hover:border-background hover:bg-background/10">
              Ver barberos
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-background/60" aria-label="Beneficios de Corte Fino">
            <li className="flex items-center gap-2"><span className="text-background/80">✓</span> Agenda online</li>
            <li className="flex items-center gap-2"><span className="text-background/80">✓</span> Atención personalizada</li>
            <li className="flex items-center gap-2"><span className="text-background/80">✓</span> Profesionales calificados</li>
          </ul>
        </div>
        <div className="relative min-h-[28rem] overflow-hidden border-l border-background/10 lg:min-h-full">
          <Image src="/barber-shop-hero.png" alt="Interior de la barbería Corte Fino en Santa Catalina" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-foreground/20" />
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl border border-background/20 bg-foreground/75 p-3 backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:p-4">
            <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-background text-sm text-foreground">✦</span><div><p className="text-[10px] uppercase tracking-[0.2em] text-background/55">Corte Fino</p><p className="text-sm font-medium text-background">Tu próximo corte empieza acá</p></div></div>
            <a href="/reservar" className="rounded-full bg-background px-4 py-2 text-xs font-semibold text-foreground">Reservá ya</a>
          </div>
        </div>
      </div>
    </section>
  )
}
