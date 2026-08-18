"use server"

import { auth } from "@/auth"
import { db } from "@/database"
import { assets, investmentTransactions } from "@/database/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// CRUD de ativos
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

  await db.insert(assets).values({
    userId,
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

  await db.update(assets)
    .set({
      name,
      ticker,
      type,
      currentPrice: currentPrice ? currentPrice.toFixed(2) : null,
      quantity: quantity ? quantity.toFixed(2) : null,
      averagePrice: averagePrice ? averagePrice.toFixed(2) : null,
    })
    .where(and(eq(assets.id, id), eq(assets.userId, userId)))

  revalidatePath("/admin/investimentos")
}

export async function deleteAsset(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  await db.delete(assets)
    .where(and(eq(assets.id, id), eq(assets.userId, userId)))

  revalidatePath("/admin/investimentos")
}

// Lançamento de transação de investimento
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

  await db.insert(investmentTransactions).values({
    userId,
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
    const [asset] = await db.select().from(assets).where(eq(assets.id, assetId))
    if (asset) {
      const oldQuantity = Number(asset.quantity) || 0
      const oldAverage = Number(asset.averagePrice) || 0
      const newQuantity = oldQuantity + quantity
      const newAverage = ((oldQuantity * oldAverage) + (quantity * price)) / newQuantity
      await db.update(assets)
        .set({
          quantity: newQuantity.toFixed(2),
          averagePrice: newAverage.toFixed(2),
        })
        .where(eq(assets.id, assetId))
    }
  }

  revalidatePath("/admin/investimentos")
}

export async function deleteInvestmentTransaction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  await db.delete(investmentTransactions)
    .where(and(eq(investmentTransactions.id, id), eq(investmentTransactions.userId, userId)))

  revalidatePath("/admin/investimentos")
}