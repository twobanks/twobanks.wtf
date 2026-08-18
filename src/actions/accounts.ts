"use server"

import { auth } from "@/auth"
import { db } from "@/database"
import { financialAccounts } from "@/database/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createAccount(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const name = String(formData.get("name"))
  const type = String(formData.get("type"))
  const initialBalance = Number(formData.get("initialBalance")) || 0

  if (!name || !type) throw new Error("Dados inválidos")

  await db.insert(financialAccounts).values({
    userId,
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
  const id = Number(formData.get("id"))
  const name = String(formData.get("name"))
  const type = String(formData.get("type"))
  const initialBalance = Number(formData.get("initialBalance")) || 0

  if (!id || !name || !type) throw new Error("Dados inválidos")

  await db.update(financialAccounts)
    .set({ name, type: type as any, initialBalance: initialBalance.toFixed(2) })
    .where(eq(financialAccounts.id, id))

  revalidatePath("/admin/contas")
  revalidatePath("/admin/carteira")
}

export async function deleteAccount(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const id = Number(formData.get("id"))

  if (!id) throw new Error("ID inválido")

  await db.delete(financialAccounts).where(eq(financialAccounts.id, id))

  revalidatePath("/admin/contas")
  revalidatePath("/admin/carteira")
}