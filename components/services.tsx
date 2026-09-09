"use client"

import { useEffect, useRef, useState } from "react"
import { SERVICE_CATEGORIES, formatUYU } from "@/lib/services"
import { ArrowLeft, ArrowRight, Brush, Scissors, Sparkles } from "lucide-react"
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

const serviceIcons = [Scissors, Brush, Sparkles]

function getTreatmentImage(treatment: { id: string; name: string }) {
  const slug = treatment.name.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/\\s+/g, "-")
  return treatmentImages[treatment.id] ?? treatmentImages[slug] ?? "/treatments/corte.png?v=3"
}

export function Services({ catalog = services }: { catalog?: PublicService[] } = {}) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activePage, setActivePage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(1)
  const treatments = catalog.flatMap((service) => service.treatments.map((treatment, index) => ({ service, treatment, index })))
  const pageCount = Math.max(1, Math.ceil(treatments.length / cardsPerPage))

  useEffect(() => {
    const updateCardsPerPage = () => setCardsPerPage(window.matchMedia("(min-width: 768px)").matches ? 3 : 1)
    updateCardsPerPage()
    window.addEventListener("resize", updateCardsPerPage)
    return () => window.removeEventListener("resize", updateCardsPerPage)
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    const updateActivePage = () => {
      const cards = Array.from(carousel.children)
      const nearest = cards.reduce((closest, card, index) => {
        const distance = Math.abs((card as HTMLElement).offsetLeft - carousel.scrollLeft)
        return distance < closest.distance ? { index, distance } : closest
      }, { index: 0, distance: Number.POSITIVE_INFINITY })
      setActivePage(Math.floor(nearest.index / cardsPerPage))
    }
    carousel.addEventListener("scroll", updateActivePage, { passive: true })
    updateActivePage()
    return () => carousel.removeEventListener("scroll", updateActivePage)
  }, [cardsPerPage, treatments.length])

  useEffect(() => {
    if (pageCount < 2) return
    const timer = window.setInterval(() => {
      setActivePage((page) => (page + 1) % pageCount)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [pageCount])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    const card = carousel.children[activePage * cardsPerPage] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
  }, [activePage, cardsPerPage])

  const goToPage = (page: number) => setActivePage(Math.max(0, Math.min(page, pageCount - 1)))
  const previousPage = () => goToPage(activePage === 0 ? pageCount - 1 : activePage - 1)
  const nextPage = () => goToPage((activePage + 1) % pageCount)

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
        <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/55"><Scissors aria-hidden="true" className="size-4 text-primary" /><span className="h-px w-10 bg-primary" /><span>Barbería</span></div>
        <div className="relative">
        <div ref={carouselRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-x-auto">
          {treatments.map(({ service, treatment, index }) => {
            const TreatmentIcon = serviceIcons[index % serviceIcons.length]
            return (
            <article key={treatment.id} className="group flex min-h-56 min-w-[calc(100vw-2.5rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-foreground/[0.045] shadow-[0_16px_40px_oklch(0_0_0/0.2)] transition-colors hover:border-primary/60 sm:min-w-[22rem] md:min-w-0 md:basis-[calc((100%-2rem)/3)]">
              <img src={getTreatmentImage(treatment)} alt={`Foto ilustrativa de ${treatment.name}`} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/treatments/corte.png?v=4" }} className="h-28 w-full object-cover opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><TreatmentIcon aria-hidden="true" className="size-3.5" /></span><div><span className="font-mono text-[10px] text-primary/80">{String(index + 1).padStart(2, "0")}</span><h3 className="font-serif text-2xl text-foreground">{treatment.name}</h3></div></div><span className="inline-flex shrink-0 rounded-full border border-foreground/15 bg-foreground/[0.06] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-foreground/65">30 min</span></div>
              <p className="mt-4 max-w-md text-sm leading-6 text-foreground/65">{service.description}</p>
              <div className="mt-auto flex items-end justify-between gap-4 pt-6"><div><p className="text-xs uppercase tracking-[0.14em] text-foreground/65">Desde</p><p className="mt-1 inline-flex rounded-full bg-primary/10 px-2.5 py-1 font-serif text-xl font-semibold text-primary">{treatment.price !== null ? formatUYU(treatment.promoPrice ?? treatment.price) : "Consultar"}</p></div><Link href={`/reservar?service=${encodeURIComponent(JSON.stringify({ category: service.name, treatmentIds: [treatment.id] }))}`} className="inline-flex rounded-full border border-foreground/20 px-3 py-2 text-right text-sm font-medium text-foreground/85 transition-colors hover:border-primary hover:text-primary">Reservá ya →</Link></div>
              </div>
            </article>
            )
          })}
        </div>
        <button type="button" onClick={previousPage} aria-label="Tratamientos anteriores" className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-foreground/20 bg-background/90 p-2 text-foreground transition-colors hover:border-primary hover:text-primary md:block"><ArrowLeft aria-hidden="true" className="size-4" /></button>
        <button type="button" onClick={nextPage} aria-label="Siguientes tratamientos" className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-foreground/20 bg-background/90 p-2 text-foreground transition-colors hover:border-primary hover:text-primary md:block"><ArrowRight aria-hidden="true" className="size-4" /></button>
        </div>
        <div className="mt-7 flex justify-center gap-2" aria-label={`Página ${activePage + 1} de ${pageCount}`}>
          {Array.from({ length: pageCount }, (_, page) => (
            <button key={page} type="button" onClick={() => goToPage(page)} aria-label={`Ver página ${page + 1}`} aria-current={activePage === page ? "true" : undefined} className={`size-2 rounded-full transition-colors ${activePage === page ? "bg-primary" : "bg-foreground/25"}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
