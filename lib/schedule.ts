export type OnlineCategory = "Barbería"
export const ONLINE_CATEGORIES: OnlineCategory[] = ["Barbería"]
export const BARBERIA_SCHEDULE = Array.from({ length: 22 }, (_, index) => { const minutes = 9 * 60 + index * 30; return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}` })
export const CATEGORY_SCHEDULES: Record<OnlineCategory, string[]> = { Barbería: BARBERIA_SCHEDULE }
export const WHATSAPP_NUMBER = "5490000000000"
export const WHATSAPP_DISPLAY = "+54"
export function getScheduleForCategory(category: string) { return category === "Barbería" ? BARBERIA_SCHEDULE : [] }
function toMinutes(time: string) { const [hours, minutes] = time.trim().split(":").map(Number); return hours * 60 + (minutes || 0) }
export function intervalsOverlap(startA: number, endA: number, startB: number, endB: number) { return startA < endB && startB < endA }
export function isTimeAvailable(_category: string, time: string, booked: Array<{ time: string; durationMinutes: number }>, durationMinutes = 30) { const start = toMinutes(time); return !booked.some((item) => intervalsOverlap(start, start + durationMinutes, toMinutes(item.time), toMinutes(item.time) + item.durationMinutes)) }
export function isOnlineCategory(category: string): category is OnlineCategory { return category === "Barbería" }
export function whatsappUrl(message = "Hola, quisiera consultar por horarios.") { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` }
