import Image from "next/image"
import Link from "next/link"
import type { Staff } from "@/lib/db/schema"

export function Barbers({ staff }: { staff: Staff[] }) {
  return (
    <section id="barberos" className="bg-background px-5 py-12 sm:px-8 sm:py-16 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.32em] text-accent-foreground">Nuestro equipo</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-6xl">Conocé a nuestros barberos</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">Dos estilos, una misma obsesión por el detalle. Elegí a tu barbero y reservá tu próximo corte en Corte Fino.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {staff.map((barber) => (
            <article key={barber.id} className="group grid overflow-hidden border border-border bg-card sm:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-72 bg-secondary">
                {barber.photoUrl ? <Image src={barber.photoUrl} alt={`Foto de ${barber.name}`} fill className="object-cover grayscale transition duration-500 group-hover:grayscale-0" sizes="(min-width: 768px) 25vw, 90vw" /> : <div className="flex size-full min-h-72 items-center justify-center font-serif text-7xl text-muted-foreground">{barber.name.charAt(0)}</div>}
              </div>
              <div className="flex flex-col justify-between gap-8 p-7">
                <div><p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Barbero</p><h3 className="mt-3 font-serif text-3xl text-foreground">{barber.name}</h3>{barber.instagram && <a className="mt-3 inline-block text-sm text-accent-foreground underline underline-offset-4" href={`https://instagram.com/${barber.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer">@{barber.instagram.replace(/^@/, "")}</a>}</div>
                <Link href="/reservar" className="inline-flex w-fit items-center border-b-2 border-destructive pb-2 text-sm font-medium text-foreground transition-colors hover:text-destructive">Reservar con {barber.name.split(" ")[0]}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
