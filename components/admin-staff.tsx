"use client"

import { createStaff, updateStaff, updateStaffAdminAccess } from "@/app/actions/appointments"
import type { Staff } from "@/lib/db/schema"
import { useState, useTransition } from "react"

export function AdminStaff({ staff, adminEmails = [] }: { staff: Staff[]; adminEmails?: string[] }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [instagram, setInstagram] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [message, setMessage] = useState("")
  const [adminAccess, setAdminAccess] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Staff | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function uploadPhoto(file: File) {
    setMessage("")
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response = await fetch("/api/admin/staff-photo", { method: "POST", body: formData })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "No se pudo subir la foto.")
      setPhotoUrl(result.url)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo subir la foto.")
    } finally {
      setIsUploading(false)
    }
  }

  function submit() {
    startTransition(async () => {
      const result = await createStaff(name, email, adminAccess, photoUrl, instagram)
      setMessage(result.ok ? "Personal agregado. Recargá para verlo." : result.error ?? "No se pudo guardar.")
      if (result.ok) {
        setName(""); setEmail(""); setInstagram(""); setPhotoUrl(""); setAdminAccess(false); setIsModalOpen(false)
      }
    })
  }

  function openEdit(person: Staff) {
    setEditingPerson(person)
    setName(person.name)
    setEmail(person.email ?? "")
    setInstagram(person.instagram ?? "")
    setPhotoUrl(person.photoUrl ?? "")
    setMessage("")
  }

  function submitEdit() {
    if (!editingPerson) return
    startTransition(async () => {
      const result = await updateStaff(editingPerson.id, { name, email, instagram, photoUrl })
      setMessage(result.ok ? "Datos actualizados." : result.error ?? "No se pudo actualizar.")
      if (result.ok) setEditingPerson(null)
    })
  }

  function toggleAdmin(id: number, enabled: boolean) {
    startTransition(async () => {
      const result = await updateStaffAdminAccess(id, enabled)
      setMessage(result.ok ? "Permiso actualizado." : result.error ?? "No se pudo actualizar.")
    })
  }

  const emailForPerson = (person: Staff) => {
    if (person.email) return person.email
    const normalizedName = person.name.toLowerCase()
    if (normalizedName.includes("julieta")) return adminEmails.find((value) => value.includes("julieta"))
    if (normalizedName.includes("roxana")) return adminEmails.find((value) => value.includes("roxi"))
    return undefined
  }

  return (
    <section aria-labelledby="personal-admin">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">Equipo</p>
      <h2 id="personal-admin" className="mt-2 font-serif text-4xl text-foreground">Personal</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {staff.map((person) => (
          <div key={person.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            {person.photoUrl ? <img src={person.photoUrl} alt={`Foto de perfil de ${person.name}`} className="size-14 rounded-full object-cover" /> : <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-xl text-secondary-foreground">{person.name.charAt(0).toUpperCase()}</div>}
            <div className="min-w-0"><p className="font-serif text-xl text-foreground">{person.name}</p><p className="mt-1 truncate text-sm text-muted-foreground">{emailForPerson(person) ?? "Email pendiente"}</p>{person.instagram && <p className="mt-1 text-sm text-accent-foreground">@{person.instagram.replace(/^@/, "")}</p>}<button type="button" onClick={() => openEdit(person)} className="mt-3 rounded-full border border-border px-3 py-1 text-xs text-foreground">Editar datos</button><label className="mt-3 flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={person.adminAccess || adminEmails.includes(person.email?.toLowerCase().trim() ?? "")} onChange={(event) => toggleAdmin(person.id, event.target.checked)} disabled={!person.email || isPending} />Acceso admin</label></div>
          </div>
        ))}
      </div>
      <div className="mt-8"><button type="button" onClick={() => setIsModalOpen(true)} className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Agregar personal</button></div>
      {message && <p className="mt-3 text-sm text-primary" role="status">{message}</p>}
      {editingPerson && <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditingPerson(null) }}><section role="dialog" aria-modal="true" aria-labelledby="edit-staff-title" className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.2em] text-primary">Equipo</p><h3 id="edit-staff-title" className="mt-2 font-serif text-3xl text-foreground">Editar personal</h3></div><button type="button" onClick={() => setEditingPerson(null)} aria-label="Cerrar" className="text-2xl text-muted-foreground">×</button></div><div className="mt-6 flex flex-col gap-4"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre" className="rounded-lg border border-input bg-background px-4 py-3 text-foreground" /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email (opcional)" className="rounded-lg border border-input bg-background px-4 py-3 text-foreground" /><input value={instagram} onChange={(event) => setInstagram(event.target.value)} placeholder="Instagram (opcional)" className="rounded-lg border border-input bg-background px-4 py-3 text-foreground" /><label className="flex flex-col gap-2 text-sm text-foreground">Foto de perfil<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadPhoto(file) }} disabled={isUploading} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />{isUploading && <span className="text-muted-foreground">Subiendo foto...</span>}{photoUrl && <img src={photoUrl} alt="Vista previa de la foto de perfil" className="size-20 rounded-full object-cover" />}</label><button type="button" onClick={submitEdit} disabled={isPending || isUploading} className="rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground">{isPending ? "Guardando..." : "Guardar cambios"}</button></div></section></div>}
      {isModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}><section role="dialog" aria-modal="true" aria-labelledby="add-staff-title" className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.2em] text-primary">Equipo</p><h3 id="add-staff-title" className="mt-2 font-serif text-3xl text-foreground">Agregar personal</h3></div><button type="button" onClick={() => setIsModalOpen(false)} aria-label="Cerrar" className="text-2xl text-muted-foreground">×</button></div><div className="mt-6 flex flex-col gap-4"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre" className="rounded-lg border border-input bg-background px-4 py-3 text-foreground" /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email (opcional)" className="rounded-lg border border-input bg-background px-4 py-3 text-foreground" /><input value={instagram} onChange={(event) => setInstagram(event.target.value)} placeholder="Instagram (opcional)" className="rounded-lg border border-input bg-background px-4 py-3 text-foreground" /><label className="flex flex-col gap-2 text-sm text-foreground">Foto de perfil<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadPhoto(file) }} disabled={isUploading} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />{isUploading && <span className="text-muted-foreground">Subiendo foto...</span>}{photoUrl && <img src={photoUrl} alt="Vista previa de la foto de perfil" className="size-20 rounded-full object-cover" />}</label><label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={adminAccess} onChange={(event) => setAdminAccess(event.target.checked)} />Acceso admin</label><button type="button" onClick={submit} disabled={isPending || isUploading || !name.trim()} className="rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground disabled:opacity-50">{isPending ? "Guardando..." : "Guardar personal"}</button></div></section></div>}
    </section>
  )
}
