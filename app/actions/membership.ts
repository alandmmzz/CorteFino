"use server"

import { db } from "@/lib/db"
import { membershipConfig } from "@/lib/db/schema"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const defaultMembership = { id: 1, name: "Corte + Fino", price: 0, chemicalDiscount: 20, monthlyCuts: 4, description: "Una forma simple de cuidar tu estilo todo el mes.", active: true }

export async function getMembership() {
  const [membership] = await db.select().from(membershipConfig).where(eq(membershipConfig.id, 1))
  return membership ?? defaultMembership
}

export async function updateMembership(data: { name: string; price: number; chemicalDiscount: number; monthlyCuts: number; description: string; active: boolean }) {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "No autorizado." }
  if (!data.name.trim() || data.price < 0 || data.chemicalDiscount < 0 || data.chemicalDiscount > 100 || data.monthlyCuts < 1) return { ok: false, error: "Revisá los datos de la membresía." }
  await db.insert(membershipConfig).values({ id: 1, name: data.name.trim(), price: Math.round(data.price), chemicalDiscount: Math.round(data.chemicalDiscount), monthlyCuts: Math.round(data.monthlyCuts), description: data.description.trim(), active: data.active }).onConflictDoUpdate({ target: membershipConfig.id, set: { name: data.name.trim(), price: Math.round(data.price), chemicalDiscount: Math.round(data.chemicalDiscount), monthlyCuts: Math.round(data.monthlyCuts), description: data.description.trim(), active: data.active, updatedAt: new Date() } })
  revalidatePath("/")
  revalidatePath("/admin")
  return { ok: true }
}
