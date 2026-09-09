export type Treatment = { id: string; name: string; price: number | null; promoPrice?: number | null; note?: string }
export type ServiceCategory = { name: string; description: string; treatments: readonly Treatment[] }

export const SERVICE_CATEGORIES = [{
  name: "Barbería",
  description: "Cortes precisos, barba y estilos a tu medida",
  treatments: [
    { id: "corte", name: "Corte", price: 350 },
    { id: "corte-barba", name: "Corte y barba", price: 400 },
    { id: "solo-maquina", name: "Solo máquina", price: 250 },
    { id: "corte-mechas", name: "Corte y mechas", price: 1400 },
    { id: "corte-platinado", name: "Corte y platinado", price: 2000 },
  ],
}] as const satisfies readonly ServiceCategory[]

export const SERVICES = SERVICE_CATEGORIES.map((category) => ({ name: category.name, price: category.treatments.reduce((total, treatment) => total + (treatment.price ?? 0), 0) }))
export const SERVICE_NAMES = SERVICE_CATEGORIES.map((category) => category.name)
export const DEPOSIT_OPTIONS = [30, 50, 80, 100] as const
export const DEPOSIT_ENABLED = process.env.NEXT_PUBLIC_DEPOSIT_ENABLED !== "false"

export function getServicePrice(service: string): number {
  try { const selected = JSON.parse(service) as { category?: string; treatmentIds?: string[] }; const category = SERVICE_CATEGORIES.find((item) => item.name === selected.category); return category?.treatments.filter((treatment) => selected.treatmentIds?.includes(treatment.id)).reduce((total, treatment) => total + (treatment.price ?? 0), 0) ?? 0 } catch { return 0 }
}
export function formatServiceLabel(service: string): string { try { const selected = JSON.parse(service) as { category?: string; treatmentIds?: string[] }; const category = SERVICE_CATEGORIES.find((item) => item.name === selected.category); const names = category?.treatments.filter((treatment) => selected.treatmentIds?.includes(treatment.id)).map((treatment) => treatment.name); return names?.length ? `${selected.category}: ${names.join(", ")}` : service } catch { return service } }
export function formatUYU(amount: number): string { return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(amount) }
export const BANK_ACCOUNT = { bank: "", accountHolder: "Corte Fino", accountType: "", accountNumber: "", documentId: "", alias: "", whatsapp: "" }
export const MERCADO_PAGO_PUBLIC_TOKEN = ""

export const BARBERSHOP_HOURS = { opening: "10:00", closing: "20:00", saturdayClosing: "18:00", durationMinutes: 30 }
export const BARBERSHOP_SCHEDULE = Array.from({ length: 20 }, (_, index) => { const minutes = 10 * 60 + index * 30; return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}` })

