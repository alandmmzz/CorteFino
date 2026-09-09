"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isBookingPage = pathname === "/reservar"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="block shrink-0" aria-label="Corte Fino, inicio">
          <span className="font-serif text-[1.65rem] font-medium tracking-[0.16em] text-foreground sm:text-3xl sm:tracking-[0.22em]">CORTE FINO</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm tracking-wide text-foreground md:flex">
          <Link href="/#nosotras" className="transition-colors hover:text-primary">
            La barbería
          </Link>
          <Link href="/#servicios" className="transition-colors hover:text-primary">
            Servicios
          </Link>
          <Link href="/reservar" className="transition-colors hover:text-primary">
            Agendar
          </Link>
        </nav>
        <Link
          href={isBookingPage ? "/" : "/reservar"}
          className="rounded-full bg-primary px-4 py-3 text-[0.7rem] font-medium tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 sm:px-5"
        >
          {isBookingPage ? "VOLVER AL INICIO" : "RESERVÁ YA"}
        </Link>
      </div>
    </header>
  )
}
