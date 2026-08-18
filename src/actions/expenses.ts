"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { recurringExpenses, recurringPaymentLogs, transactions } from "@/db/schema"
import { and, eq } from "drizzle-orm"

import { revalidatePath } from "next/cache"

export async function createExpense(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const description = String(formData.get("description"))
  const amount = Number(formData.get("amount"))
  const type = "expense"
  const date = new Date(String(formData.get("date")))
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null
  const paid = formData.get("paid") === "on"
  const isRecurring = formData.get("isRecurring") === "on"

  if (!description || isNaN(amount) || !date) throw new Error("Dados inválidos")

  if (isRecurring) {
    const dueDay = Number(formData.get("dueDay"))
    if (!dueDay || dueDay < 1 || dueDay > 31) throw new Error("Dia de vencimento inválido")

    // 1. Cria a despesa recorrente e obtém o id
    const [recurringExpense] = await db.insert(recurringExpenses).values({
      userId,
      name: description,
      amount: amount.toFixed(2),
      dueDay,
      categoryId,
      accountId,
      active: true,
    }).returning()

    // 2. Gera a transação do mês atual com data de vencimento ajustada
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    const monthStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}`

    let dueDate = new Date(currentYear, currentMonth - 1, dueDay)
    if (dueDate.getMonth() !== currentMonth - 1) {
      // Se o dia não existir no mês, usar último dia
      dueDate = new Date(currentYear, currentMonth, 0)
    }

    const [transaction] = await db.insert(transactions).values({
      userId,
      description,
      amount: amount.toFixed(2),
      type,
      date: dueDate.toISOString().split("T")[0],
      categoryId,
      accountId,
      paid,
    }).returning()

    // 3. Registra o log com os IDs corretos
    await db.insert(recurringPaymentLogs).values({
      recurringExpenseId: recurringExpense.id,
      month: monthStr,
      transactionId: transaction.id,
    })
  } else {
    // Despesa avulsa
    await db.insert(transactions).values({
      userId,
      description,
      amount: amount.toFixed(2),
      type,
      date: date.toISOString().split("T")[0],
      categoryId,
      accountId,
      paid,
    })
  }

  revalidatePath("/admin/carteira")
  revalidatePath("/admin/recorrentes")
}

export async function updateExpense(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  const description = String(formData.get("description"))
  const amount = Number(formData.get("amount"))
  const date = new Date(String(formData.get("date")))
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null
  const paid = formData.get("paid") === "on"

  if (!id || !description || isNaN(amount) || !date) throw new Error("Dados inválidos")

  await db.update(transactions)
    .set({
      description,
      amount: amount.toFixed(2),
      type: "expense",
      date: date.toISOString().split("T")[0],
      categoryId,
      accountId,
      paid,
    })
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))

  revalidatePath("/admin/carteira")
}