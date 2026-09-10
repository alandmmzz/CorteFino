import { MessageCircle } from "lucide-react"
import { whatsappUrl } from "@/lib/schedule"

const INSTAGRAM_URL = "https://instagram.com/cortefinoestudio2026"

// lucide-react quitó los íconos de marcas (Instagram, etc.) en versiones recientes,
// así que usamos el mismo trazado que usan sus íconos como SVG inline.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-6">
        <div className="flex justify-center">
          <img
            src="/corte-fino-logo.png"
            alt="Corte Fino Studio"
            className="h-auto w-56 sm:w-72"
          />
        </div>
        <p className="mx-auto mt-3 max-w-md text-sm italic leading-relaxed text-muted-foreground">
          Tu estilo, bien hecho.
        </p>
        <p className="mt-3 text-xs tracking-wide text-muted-foreground">
          Santa Catalina · Montevideo, Uruguay
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Seguinos en Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Escribinos por WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
          <p className="mt-2 text-xs tracking-wide text-muted-foreground">
          @cortefinoestudio2026
        </p>
      </div>
    </footer>
  )
}
