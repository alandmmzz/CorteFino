"use client"

import { updateServiceDuration, updateServiceSchedules } from "@/app/actions/appointments"
import { ONLINE_CATEGORIES } from "@/lib/schedule"
import { useState, useTransition } from "react"

type Catalog = Awaited<ReturnType<typeof import("@/lib/db/services").getServiceCatalog>>
type Schedule = { serviceCategory: string; dayOfWeek: number; startTime: string }

const DEFAULT_TIMES = (day: number) => Array.from({ length: day === 6 ? 16 : 20 }, (_, index) => { const minutes = 10 * 60 + index * 30; return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}` })

const DAYS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
]

export function AdminSchedules({ schedules, catalog }: { schedules: Schedule[]; catalog: Catalog }) {
  const [day, setDay] = useState(1)
  const [values, setValues] = useState<Record<string, string[]>>(() => Object.fromEntries(ONLINE_CATEGORIES.map((category) => [category, (schedules.filter((item) => item.serviceCategory === category && item.dayOfWeek === 1).map((item) => item.startTime).length ? schedules.filter((item) => item.serviceCategory === category && item.dayOfWeek === 1).map((item) => item.startTime) : DEFAULT_TIMES(1))])))
  const [pending, startTransition] = useTransition()
  const [message, setMessage] = useState("")
  const [durations, setDurations] = useState<Record<string, string>>(() => Object.fromEntries(ONLINE_CATEGORIES.map((category) => [category, String(catalog.find((item) => item.name === category)?.durationMinutes ?? 90)])))

  function selectDay(nextDay: number) {
    setDay(nextDay)
    setValues(Object.fromEntries(ONLINE_CATEGORIES.map((category) => [category, (schedules.filter((item) => item.serviceCategory === category && item.dayOfWeek === nextDay).map((item) => item.startTime).length ? schedules.filter((item) => item.serviceCategory === category && item.dayOfWeek === nextDay).map((item) => item.startTime) : DEFAULT_TIMES(nextDay))])))
  }
  function save(category: string) { startTransition(async () => { await updateServiceSchedules(category, day, values[category] ?? []); setMessage("Horarios actualizados") }) }
  function add(category: string) { setValues((current) => ({ ...current, [category]: [...(current[category] ?? []), day === 6 ? "10:00" : "10:00"] })) }

  return <section aria-labelledby="gestionar-horarios">
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs uppercase tracking-[0.3em] text-primary">Agenda configurable</p><h2 id="gestionar-horarios" className="mt-2 font-serif text-4xl text-foreground">Horarios por servicio</h2></div>{message && <p role="status" className="text-sm text-primary">{message}</p>}</div>
    <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Día de la semana">{DAYS.map((item) => <button key={item.value} type="button" role="tab" aria-selected={day === item.value} onClick={() => selectDay(item.value)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${day === item.value ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary"}`}>{item.label}</button>)}</div>
    <p className="mb-5 text-sm text-muted-foreground">Configurá los turnos de <strong className="text-foreground">{DAYS.find((item) => item.value === day)?.label}</strong>. El sábado puede cerrar antes que el resto de la semana.</p>
    <div className="grid gap-5 md:grid-cols-3">{ONLINE_CATEGORIES.map((category) => <article key={category} className="rounded-xl border border-border bg-card p-5"><h3 className="font-serif text-2xl text-foreground">{category}</h3><div className="mt-3 flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-4"><div><p className="text-xs text-muted-foreground">Duración de cada turno.</p><p className="mt-2 text-sm text-primary">Duración de agenda</p></div><div className="flex items-center gap-2"><label className="sr-only" htmlFor={`duration-${category}`}>Duración de agenda para {category}</label><input id={`duration-${category}`} type="number" min="15" max="480" step="15" value={durations[category] ?? "90"} onChange={(event) => setDurations((current) => ({ ...current, [category]: event.target.value }))} className="w-20 rounded-md border border-input bg-background px-2 py-1 text-sm" /><span className="text-xs text-muted-foreground">min</span><button type="button" disabled={pending} onClick={() => startTransition(async () => { const result = await updateServiceDuration(catalog.find((item) => item.name === category)?.id ?? 0, Number(durations[category])); setMessage(result.ok ? "Duración actualizada" : result.error ?? "No se pudo actualizar") })} className="rounded-md border border-border px-2 py-1 text-xs">Guardar</button></div></div><div className="mt-5 flex flex-col gap-3">{(values[category] ?? []).map((time, index) => <div key={`${category}-${index}`} className="flex items-center gap-2"><input type="time" value={time} onChange={(event) => setValues((current) => ({ ...current, [category]: (current[category] ?? []).map((value, itemIndex) => itemIndex === index ? event.target.value : value) }))} className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" /><button type="button" onClick={() => setValues((current) => ({ ...current, [category]: (current[category] ?? []).filter((_, itemIndex) => itemIndex !== index) }))} className="text-sm text-muted-foreground hover:text-destructive">Eliminar</button></div>)}</div><div className="mt-4 flex items-center justify-between gap-3"><button type="button" onClick={() => add(category)} className="text-sm text-primary">+ Agregar horario</button><button type="button" disabled={pending} onClick={() => save(category)} className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Guardar día</button></div></article>)}</div>
  </section>
}
