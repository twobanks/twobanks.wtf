"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { financialAccounts } from "@/db/schema"
import { getPrimaryHouseholdId, getUserHouseholdIds } from "@/lib/household"
import { and, eq, inArray, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createAccount(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const name = String(formData.get("name"))
  const type = String(formData.get("type"))
  const initialBalance = Number(formData.get("initialBalance")) || 0

  if (!name || !type) throw new Error("Dados inválidos")

  const householdId = await getPrimaryHouseholdId(userId)

  await db.insert(financialAccounts).values({
    userId,
    householdId,
    name,
    type: type as any,
    initialBalance: initialBalance.toFixed(2),
  })

  revalidatePath("/admin/contas")
  revalidatePath("/admin/carteira")
}

export async function updateAccount(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  const name = String(formData.get("name"))
  const type = String(formData.get("type"))
  const initialBalance = Number(formData.get("initialBalance")) || 0

  if (!id || !name || !type) throw new Error("Dados inválidos")

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(financialAccounts.userId, userId),
    householdIds.length > 0 ? inArray(financialAccounts.householdId, householdIds) : undefined
  )

  await db.update(financialAccounts)
    .set({ name, type: type as any, initialBalance: initialBalance.toFixed(2) })
    .where(and(eq(financialAccounts.id, id), canAccess))

  revalidatePath("/admin/contas")
  revalidatePath("/admin/carteira")
}

export async function deleteAccount(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(financialAccounts.userId, userId),
    householdIds.length > 0 ? inArray(financialAccounts.householdId, householdIds) : undefined
  )

  await db.delete(financialAccounts)
    .where(and(eq(financialAccounts.id, id), canAccess))

  revalidatePath("/admin/contas")
  revalidatePath("/admin/carteira")
}