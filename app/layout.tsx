import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600','700'], style: ['normal','italic'], variable: '--font-cormorant' })
const jost = Jost({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-jost' })
export const metadata: Metadata = { metadataBase: new URL('https://cortefino.com'), title: { default: 'Corte Fino · Barbería', template: '%s | Corte Fino' }, description: 'Barbería Corte Fino. Cortes, barba, mechas y platinado. Reservá tu turno online.', keywords: ['barbería','cortes','barba','Corte Fino'], openGraph: { type: 'website', locale: 'es_AR', url: 'https://cortefino.com/', siteName: 'Corte Fino', title: 'Corte Fino · Barbería', description: 'Tu estilo, bien hecho.' }, generator: 'v0.app', icons: { icon: [{ url: '/favicon.ico' }, { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }, { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }], apple: '/apple-touch-icon.png' }, manifest: '/site.webmanifest' }
export const viewport: Viewport = { themeColor: '#111111' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es" className={`dark ${cormorant.variable} ${jost.variable} bg-background`}><body className="font-sans antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org','@type':'BarberShop',name:'Corte Fino',description:'Barbería con cortes, barba y color.',priceRange:'$$' }) }} />{children}<Toaster position="top-right" richColors closeButton />{process.env.NODE_ENV === 'production' && <Analytics />}{process.env.NODE_ENV === 'production' && <SpeedInsights />}</body></html> }
