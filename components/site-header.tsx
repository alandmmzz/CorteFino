"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

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
      className={`fixed inset-x-0 top-0 z-50 bg-background transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-background/90"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 sm:px-6 sm:py-3">
        <Link href="/" className="block shrink-0" aria-label="Corte Fino, inicio">
          <Image src="/corte-fino-logo.png" alt="Corte Fino Studio" width={220} height={58} priority className="h-auto w-[8.75rem] sm:w-[11rem]" />
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
          className="rounded-full bg-primary px-3.5 py-2 text-[0.65rem] font-medium tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 sm:px-5"
        >
          {isBookingPage ? "INICIO" : "RESERVÁ YA"}
        </Link>
      </div>
    </header>
  )
}
