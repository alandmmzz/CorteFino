import { Heart } from "lucide-react"

export function About() {
  return (
    <section id="nosotras" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 text-primary">
          <Heart className="h-5 w-5" strokeWidth={1.2} aria-hidden="true" />
        </div>
        <p className="text-pretty font-serif text-3xl leading-snug text-foreground md:text-4xl">
          Un corte cambia cómo te ves. Un buen corte cambia cómo te sentís.
        </p>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
          En Corte Fino combinamos técnica, atención y productos de calidad para que cada visita tenga el resultado que buscás. Vení a encontrar tu próximo estilo.
        </p>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-primary">
          San Martín 2825 · Reducto · Montevideo
        </p>
      </div>
    </section>
  )
}
