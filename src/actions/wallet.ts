"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { installments, purchases, transactions } from "@/db/schema"
import { and, eq, inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createTransaction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const description = String(formData.get("description"))
  const amount = Number(formData.get("amount"))
  const type = String(formData.get("type")) as "income" | "expense"
  const date = new Date(String(formData.get("date")))
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null

  // Validações básicas
  if (!description || isNaN(amount) || !date) {
    throw new Error("Dados inválidos")
  }

  await db.insert(transactions).values({
    userId,
    description,
    amount: amount.toFixed(2),
    type,
    date: date.toISOString().split("T")[0],
    categoryId,
    accountId,
    paid: true,
  })

  revalidatePath("/admin/carteira")
}

export async function createInstallmentPurchase(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const creditCardId = Number(formData.get("creditCardId"))
  const description = String(formData.get("description"))
  const totalAmount = Number(formData.get("totalAmount"))
  const installmentsCount = Number(formData.get("installments"))
  const firstDueDate = formData.get("firstDueDate") as string
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null

  if (!/^\d{4}-\d{2}-\d{2}$/.test(firstDueDate)) {
    throw new Error("Data inválida")
  }

  if (!creditCardId || !description || isNaN(totalAmount) || !installmentsCount) {
    throw new Error("Dados inválidos")
  }

  const [purchase] = await db.insert(purchases).values({
    userId,
    creditCardId,
    description,
    totalAmount: totalAmount.toFixed(2),
    installments: installmentsCount,
    firstDueDate,
    categoryId,
  }).returning()

  const installmentAmount = totalAmount / installmentsCount
  const installmentsData = []

  for (let i = 0; i < installmentsCount; i++) {
    const dueDate = new Date(firstDueDate)
    dueDate.setMonth(dueDate.getMonth() + i)

    installmentsData.push({
      purchaseId: purchase.id,
      number: i + 1,
      amount: installmentAmount.toFixed(2),
      dueDate: dueDate.toISOString().split("T")[0],
    })
  }

  await db.insert(installments).values(installmentsData)

  revalidatePath("/admin/carteira")
}

export async function updateTransaction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const id = Number(formData.get("id"))
  const description = String(formData.get("description"))
  const amount = Number(formData.get("amount"))
  const type = String(formData.get("type")) as "income" | "expense"
  const date = new Date(String(formData.get("date")))
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null
  const paid = formData.get("paid") === "on" ? true : false

  if (!id || !description || isNaN(amount) || !date) {
    throw new Error("Dados inválidos")
  }

  await db
    .update(transactions)
    .set({
      description,
      amount: amount.toFixed(2),
      type,
      date: date.toISOString().split("T")[0],
      categoryId,
      accountId,
      paid,
    })
    .where(eq(transactions.id, id))

  revalidatePath("/admin/carteira")
}

export async function deleteTransaction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const id = Number(formData.get("id"))

  if (!id) throw new Error("ID inválido")

  await db.delete(transactions).where(eq(transactions.id, id))

  revalidatePath("/admin/carteira")
}

export async function toggleInstallmentPaid(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const installmentId = Number(formData.get("id"))
  const paid = formData.get("paid") === "true"

  if (!installmentId) throw new Error("ID inválido")

  // Verificar se a parcela pertence a uma compra do usuário
  const [purchase] = await db
    .select({ userId: purchases.userId })
    .from(purchases)
    .innerJoin(installments, eq(installments.purchaseId, purchases.id))
    .where(and(eq(installments.id, installmentId), eq(purchases.userId, userId)))
    .limit(1)

  if (!purchase) throw new Error("Parcela não encontrada")

  await db
    .update(installments)
    .set({ paid, paidAt: paid ? new Date() : null })
    .where(eq(installments.id, installmentId))

  revalidatePath("/admin/cartoes/[id]", "page")
}

export async function markInvoiceAsPaid(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const cardId = Number(formData.get("cardId"))
  const month = String(formData.get("month") || "")
  if (!cardId || !month) throw new Error("Dados inválidos")

  const [year, monthNum] = month.split("-").map(Number)
  const primeiroDia = new Date(year, monthNum - 1, 1)
  const ultimoDia = new Date(year, monthNum, 0)

  // Buscar todas as parcelas do cartão no mês
  const compras = await db.query.purchases.findMany({
    where: and(
      eq(purchases.creditCardId, cardId),
      eq(purchases.userId, userId)
    ),
    with: { installments: true },
  })

  const parcelasDoMes = compras.flatMap((compra) =>
    compra.installments.filter((parcela) => {
      const dueDate = new Date(parcela.dueDate + "T00:00:00")
      return dueDate >= primeiroDia && dueDate <= ultimoDia
    })
  )

  if (parcelasDoMes.length === 0) return

  const ids = parcelasDoMes.map(p => p.id)
  await db.update(installments)
    .set({ paid: true, paidAt: new Date() })
    .where(inArray(installments.id, ids))

  revalidatePath("/admin/cartoes/[id]", "page")
}