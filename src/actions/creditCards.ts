"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { creditCards, installments, purchases } from "@/db/schema"
import { and, eq, inArray } from "drizzle-orm"
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
  const lastFourDigits = formData.get("lastFourDigits") as string | null;

  if (!name) throw new Error("Nome é obrigatório")

  await db.insert(creditCards).values({
    userId,
    name,
    brand: brand || null,
    lastFourDigits: lastFourDigits || null,
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

  // Garante que o cartão pertence ao usuário antes de excluir
  const [card] = await db
    .select()
    .from(creditCards)
    .where(and(eq(creditCards.id, id), eq(creditCards.userId, userId)))
    .limit(1)

  if (!card) throw new Error("Cartão não encontrado ou sem permissão")

  // Busca todas as compras associadas a este cartão
  const cardPurchases = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(eq(purchases.creditCardId, id))

  const purchaseIds = cardPurchases.map(p => p.id)

  // Execução compatível com o driver HTTP do Neon (sequencial segura)
  if (purchaseIds.length > 0) {
    await db.delete(installments).where(inArray(installments.purchaseId, purchaseIds))
    await db.delete(purchases).where(eq(purchases.creditCardId, id))
  }

  await db
    .delete(creditCards)
    .where(and(eq(creditCards.id, id), eq(creditCards.userId, userId)))

  revalidatePath("/admin/cartoes")
  revalidatePath("/admin/carteira")
  revalidatePath("/admin/carteira/faturas")
}