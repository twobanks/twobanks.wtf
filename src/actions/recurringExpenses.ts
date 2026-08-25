"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { recurringExpenses, recurringPaymentLogs, transactions } from "@/db/schema"
import { getPrimaryHouseholdId, getUserHouseholdIds } from "@/lib/household"
import { and, eq, inArray, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

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

  const householdId = await getPrimaryHouseholdId(userId)

  await db.insert(recurringExpenses).values({
    userId,
    householdId,
    name,
    amount: amount.toFixed(2),
    dueDay,
    categoryId,
    accountId,
    active,
  })

  revalidatePath("/admin/recorrentes")
  revalidatePath("/admin/carteira")
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

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(recurringExpenses.userId, userId),
    householdIds.length > 0 ? inArray(recurringExpenses.householdId, householdIds) : undefined
  )

  await db.update(recurringExpenses)
    .set({ name, amount: amount.toFixed(2), dueDay, categoryId, accountId, active })
    .where(and(eq(recurringExpenses.id, id), canAccess))

  revalidatePath("/admin/recorrentes")
}

export async function deleteRecurringExpense(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(recurringExpenses.userId, userId),
    householdIds.length > 0 ? inArray(recurringExpenses.householdId, householdIds) : undefined
  )

  await db.delete(recurringExpenses)
    .where(and(eq(recurringExpenses.id, id), canAccess))

  revalidatePath("/admin/recorrentes")
}

export async function generateMonthlyRecurring(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const now = new Date()
  const year = Number(formData.get("year") || now.getFullYear())
  const month = Number(formData.get("month") || now.getMonth() + 1)

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) throw new Error("Mês inválido")
  const monthStr = `${year}-${String(month).padStart(2, "0")}`

  const householdIds = await getUserHouseholdIds(userId)
  const acesso = or(
    eq(recurringExpenses.userId, userId),
    householdIds.length > 0 ? inArray(recurringExpenses.householdId, householdIds) : undefined
  )

  const despesas = await db.query.recurringExpenses.findMany({
    where: and(
      acesso,
      eq(recurringExpenses.active, true)
    ),
    with: { category: true, account: true },
  })

  for (const despesa of despesas) {
    const [logExistente] = await db.select()
      .from(recurringPaymentLogs)
      .where(and(
        eq(recurringPaymentLogs.recurringExpenseId, despesa.id),
        eq(recurringPaymentLogs.month, monthStr)
      ))
      .limit(1)

    if (logExistente) continue

    let dueDate = new Date(year, month - 1, despesa.dueDay)
    if (dueDate.getMonth() !== month - 1) {
      dueDate = new Date(year, month, 0)
    }

    const [transaction] = await db.insert(transactions).values({
      userId,
      householdId: despesa.householdId,
      description: despesa.name,
      amount: despesa.amount,
      type: "expense",
      date: dueDate.toISOString().split("T")[0],
      source: "recurring",
      categoryId: despesa.categoryId,
      accountId: despesa.accountId,
      paid: false,
    }).returning()

    await db.insert(recurringPaymentLogs).values({
      recurringExpenseId: despesa.id,
      month: monthStr,
      transactionId: transaction.id,
    })
  }

  revalidatePath("/admin/recorrentes")
  revalidatePath("/admin/carteira")
}