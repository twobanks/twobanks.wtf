"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { assets, investmentTransactions } from "@/db/schema"
import { getPrimaryHouseholdId, getUserHouseholdIds } from "@/lib/household"
import { and, eq, inArray, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createAsset(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const name = String(formData.get("name"))
  const ticker = formData.get("ticker") ? String(formData.get("ticker")) : null
  const type = String(formData.get("type"))
  const currentPrice = formData.get("currentPrice") ? Number(formData.get("currentPrice")) : null
  const quantity = formData.get("quantity") ? Number(formData.get("quantity")) : null
  const averagePrice = formData.get("averagePrice") ? Number(formData.get("averagePrice")) : null

  if (!name || !type) throw new Error("Dados inválidos")

  const householdId = await getPrimaryHouseholdId(userId)

  await db.insert(assets).values({
    userId,
    householdId,
    name,
    ticker,
    type,
    currentPrice: currentPrice ? currentPrice.toFixed(2) : null,
    quantity: quantity ? quantity.toFixed(2) : null,
    averagePrice: averagePrice ? averagePrice.toFixed(2) : null,
  })

  revalidatePath("/admin/investimentos")
}

export async function updateAsset(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  const name = String(formData.get("name"))
  const ticker = formData.get("ticker") ? String(formData.get("ticker")) : null
  const type = String(formData.get("type"))
  const currentPrice = formData.get("currentPrice") ? Number(formData.get("currentPrice")) : null
  const quantity = formData.get("quantity") ? Number(formData.get("quantity")) : null
  const averagePrice = formData.get("averagePrice") ? Number(formData.get("averagePrice")) : null

  if (!id || !name || !type) throw new Error("Dados inválidos")

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(assets.userId, userId),
    householdIds.length > 0 ? inArray(assets.householdId, householdIds) : undefined
  )

  await db.update(assets)
    .set({
      name,
      ticker,
      type,
      currentPrice: currentPrice ? currentPrice.toFixed(2) : null,
      quantity: quantity ? quantity.toFixed(2) : null,
      averagePrice: averagePrice ? averagePrice.toFixed(2) : null,
    })
    .where(and(eq(assets.id, id), canAccess))

  revalidatePath("/admin/investimentos")
}

export async function deleteAsset(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(assets.userId, userId),
    householdIds.length > 0 ? inArray(assets.householdId, householdIds) : undefined
  )

  await db.delete(assets)
    .where(and(eq(assets.id, id), canAccess))

  revalidatePath("/admin/investimentos")
}

export async function createInvestmentTransaction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const assetId = Number(formData.get("assetId"))
  const type = String(formData.get("type"))
  const date = new Date(String(formData.get("date")))
  const quantity = formData.get("quantity") ? Number(formData.get("quantity")) : null
  const price = formData.get("price") ? Number(formData.get("price")) : null
  const amount = Number(formData.get("amount"))
  const fees = formData.get("fees") ? Number(formData.get("fees")) : 0
  const notes = formData.get("notes") ? String(formData.get("notes")) : null

  if (!assetId || !type || !date || isNaN(amount)) throw new Error("Dados inválidos")

  // Busca o ativo e verifica acesso (próprio ou compartilhado)
  const householdIds = await getUserHouseholdIds(userId)
  const [asset] = await db.select().from(assets).where(
    and(
      eq(assets.id, assetId),
      or(
        eq(assets.userId, userId),
        householdIds.length > 0 ? inArray(assets.householdId, householdIds) : undefined
      )
    )
  ).limit(1)

  if (!asset) throw new Error("Ativo não encontrado ou sem permissão")

  const householdId = asset.householdId ?? null

  await db.insert(investmentTransactions).values({
    userId,
    householdId,
    assetId,
    type,
    date: date.toISOString().split("T")[0],
    quantity: quantity ? quantity.toFixed(2) : null,
    price: price ? price.toFixed(2) : null,
    amount: amount.toFixed(2),
    fees: fees.toFixed(2),
    notes,
  })

  // Atualizar quantidade média e preço médio do ativo (se aplicável)
  if (type === "buy" && quantity && price) {
    const oldQuantity = Number(asset.quantity) || 0
    const oldAverage = Number(asset.averagePrice) || 0
    const newQuantity = oldQuantity + quantity
    const newAverage = ((oldQuantity * oldAverage) + (quantity * price)) / newQuantity

    await db.update(assets)
      .set({
        quantity: newQuantity.toFixed(2),
        averagePrice: newAverage.toFixed(2),
      })
      .where(and(eq(assets.id, assetId), or(
        eq(assets.userId, userId),
        householdIds.length > 0 ? inArray(assets.householdId, householdIds) : undefined
      )))
  }

  revalidatePath("/admin/investimentos")
}

export async function deleteInvestmentTransaction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(investmentTransactions.userId, userId),
    householdIds.length > 0 ? inArray(investmentTransactions.householdId, householdIds) : undefined
  )

  await db.delete(investmentTransactions)
    .where(and(eq(investmentTransactions.id, id), canAccess))

  revalidatePath("/admin/investimentos")
}