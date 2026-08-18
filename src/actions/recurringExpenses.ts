"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { recurringExpenses, recurringPaymentLogs, transactions } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// CRUD
export async function createRecurringExpense(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const name = String(formData.get("name"))
  const amount = Number(formData.get("amount"))
  const dueDay = Number(formData.get("dueDay"))
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null
  const active = formData.get("active") === "on"

  if (!name || isNaN(amount) || !dueDay) throw new Error("Dados inválidos")

  await db.insert(recurringExpenses).values({
    userId,
    name,
    amount: amount.toFixed(2),
    dueDay,
    categoryId,
    accountId,
    active,
  })

  revalidatePath("/admin/recorrentes")
}

export async function updateRecurringExpense(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  const name = String(formData.get("name"))
  const amount = Number(formData.get("amount"))
  const dueDay = Number(formData.get("dueDay"))
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null
  const active = formData.get("active") === "on"

  if (!id || !name || isNaN(amount) || !dueDay) throw new Error("Dados inválidos")

  await db.update(recurringExpenses)
    .set({
      name,
      amount: amount.toFixed(2),
      dueDay,
      categoryId,
      accountId,
      active,
    })
    .where(and(eq(recurringExpenses.id, id), eq(recurringExpenses.userId, userId)))

  revalidatePath("/admin/recorrentes")
}

export async function deleteRecurringExpense(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  await db.delete(recurringExpenses)
    .where(and(eq(recurringExpenses.id, id), eq(recurringExpenses.userId, userId)))

  revalidatePath("/admin/recorrentes")
}

// Geração das transações do mês
export async function generateMonthlyRecurring(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const now = new Date()
  const year = Number(formData.get("year") || now.getFullYear())
  const month = Number(formData.get("month") || now.getMonth() + 1) // 1-12

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    throw new Error("Mês inválido")
  }

  const monthStr = `${year}-${String(month).padStart(2, "0")}`

  // Buscar despesas recorrentes ativas do usuário
  const despesas = await db.query.recurringExpenses.findMany({
    where: and(
      eq(recurringExpenses.userId, userId),
      eq(recurringExpenses.active, true)
    ),
    with: {
      category: true,
      account: true,
    },
  })

  for (const despesa of despesas) {
    // Verificar se já foi gerada para este mês
    const [logExistente] = await db.select()
      .from(recurringPaymentLogs)
      .where(and(
        eq(recurringPaymentLogs.recurringExpenseId, despesa.id),
        eq(recurringPaymentLogs.month, monthStr)
      ))
      .limit(1)

    if (logExistente) continue // pular

    // Criar transação
    const dueDate = new Date(year, month - 1, despesa.dueDay)
    if (dueDate.getMonth() !== month - 1) {
      // Se o dia não existir no mês (ex: 31/02), usa o último dia do mês
      dueDate.setDate(0) // último dia do mês anterior
      dueDate.setMonth(month - 1)
      dueDate.setDate(new Date(year, month, 0).getDate())
    }

    const [transaction] = await db.insert(transactions).values({
      userId,
      description: despesa.name,
      amount: despesa.amount,
      type: "expense",
      date: dueDate.toISOString().split("T")[0],
      categoryId: despesa.categoryId,
      accountId: despesa.accountId,
      paid: false,
    }).returning()

    // Registrar log
    await db.insert(recurringPaymentLogs).values({
      recurringExpenseId: despesa.id,
      month: monthStr,
      transactionId: transaction.id,
    })
  }

  revalidatePath("/admin/recorrentes")
  revalidatePath("/admin/carteira")
}