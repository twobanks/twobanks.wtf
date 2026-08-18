"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { creditCards } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createCreditCard(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const name = String(formData.get("name"))
  const brand = String(formData.get("brand") || "")
  const creditLimit = Number(formData.get("creditLimit") || 0)
  const dueDay = Number(formData.get("dueDay") || 0)
  const closingDay = Number(formData.get("closingDay") || 0)

  if (!name) throw new Error("Nome é obrigatório")

  await db.insert(creditCards).values({
    userId,
    name,
    brand: brand || null,
    creditLimit: creditLimit > 0 ? creditLimit.toFixed(2) : null,
    dueDay: dueDay > 0 ? dueDay : null,
    closingDay: closingDay > 0 ? closingDay : null,
  })

  revalidatePath("/admin/cartoes")
  revalidatePath("/admin/carteira")
}

export async function updateCreditCard(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  const name = String(formData.get("name"))
  const brand = String(formData.get("brand") || "")
  const creditLimit = Number(formData.get("creditLimit") || 0)
  const dueDay = Number(formData.get("dueDay") || 0)
  const closingDay = Number(formData.get("closingDay") || 0)

  if (!id || !name) throw new Error("Dados inválidos")

  await db
    .update(creditCards)
    .set({
      name,
      brand: brand || null,
      creditLimit: creditLimit > 0 ? creditLimit.toFixed(2) : null,
      dueDay: dueDay > 0 ? dueDay : null,
      closingDay: closingDay > 0 ? closingDay : null,
    })
    .where(and(eq(creditCards.id, id), eq(creditCards.userId, userId)))

  revalidatePath("/admin/cartoes")
  revalidatePath("/admin/carteira")
}

export async function deleteCreditCard(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  await db
    .delete(creditCards)
    .where(and(eq(creditCards.id, id), eq(creditCards.userId, userId)))

  revalidatePath("/admin/cartoes")
  revalidatePath("/admin/carteira")
}