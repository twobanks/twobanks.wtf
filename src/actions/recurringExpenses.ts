"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { recurringExpenses, recurringPaymentLogs, transactions } from "@/db/schema"
import { getPrimaryHouseholdId, getUserHouseholdIds } from "@/lib/household"
import { and, eq, gte, inArray, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const REPLICATION_MONTHS = 12

export async function createRecurringExpense(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const name = String(formData.get("name") ?? "").trim()
  const amount = Number(formData.get("amount"))
  const dueDay = Number(formData.get("dueDay"))
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null
  const active = formData.get("active") === "on" || formData.get("active") === "true"
  const startMonth = String(formData.get("startMonth") ?? "").trim()

  if (!name) throw new Error("Nome é obrigatório")
  if (isNaN(amount) || amount <= 0) throw new Error("Valor inválido")
  if (isNaN(dueDay) || dueDay < 1 || dueDay > 31) throw new Error("Dia de vencimento inválido")
  if (!startMonth) throw new Error("Mês de início é obrigatório")

  const [startYear, startMonthNum] = startMonth.split("-").map(Number)
  if (!startYear || !startMonthNum || startMonthNum < 1 || startMonthNum > 12) {
    throw new Error("Mês de início inválido")
  }

  const householdId = await getPrimaryHouseholdId(userId)

  const [novaDespesa] = await db.insert(recurringExpenses).values({
    userId,
    householdId,
    name,
    amount: amount.toFixed(2),
    dueDay,
    categoryId,
    accountId,
    active,
  }).returning()

  if (active) {
    for (let i = 0; i < REPLICATION_MONTHS; i++) {
      const targetDate = new Date(startYear, startMonthNum - 1 + i, 1)
      const targetYear = targetDate.getFullYear()
      const targetMonth = targetDate.getMonth() + 1
      const monthStr = `${targetYear}-${String(targetMonth).padStart(2, "0")}`

      const [existente] = await db.select()
        .from(recurringPaymentLogs)
        .where(and(
          eq(recurringPaymentLogs.recurringExpenseId, novaDespesa.id),
          eq(recurringPaymentLogs.month, monthStr)
        ))
        .limit(1)

      if (existente) continue

      let dueDate = new Date(targetYear, targetMonth - 1, dueDay)
      if (dueDate.getMonth() !== targetMonth - 1) {
        dueDate = new Date(targetYear, targetMonth, 0)
      }

      const [transaction] = await db.insert(transactions).values({
        userId,
        householdId,
        description: name,
        amount: amount.toFixed(2),
        type: "expense",
        date: dueDate.toISOString().split("T")[0],
        source: "recurring",
        categoryId,
        accountId,
        paid: false,
      }).returning()

      await db.insert(recurringPaymentLogs).values({
        recurringExpenseId: novaDespesa.id,
        month: monthStr,
        transactionId: transaction.id,
      })
    }
  }

  console.log("Dados recebidos no createRecurringExpense:", {
  name,
  amount,
  dueDay,
  categoryId,
  accountId,
  active,
  startMonth,
});

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
  const active = formData.get("active") === "on" || formData.get("active") === "true"

  if (!id || !name || isNaN(amount) || !dueDay) throw new Error("Dados inválidos")

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(recurringExpenses.userId, userId),
    householdIds.length > 0 ? inArray(recurringExpenses.householdId, householdIds) : undefined
  )

  // Busca a despesa atual para verificar o status anterior
  const [despesaAtual] = await db.select()
    .from(recurringExpenses)
    .where(and(eq(recurringExpenses.id, id), canAccess))
    .limit(1)

  if (!despesaAtual) throw new Error("Despesa não encontrada")

  // Atualiza a despesa recorrente
  await db.update(recurringExpenses)
    .set({ name, amount: amount.toFixed(2), dueDay, categoryId, accountId, active })
    .where(and(eq(recurringExpenses.id, id), canAccess))

  const now = new Date()
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  // Se a despesa foi desativada, remove logs futuros
  if (despesaAtual.active && !active) {
    const logsFuturos = await db.query.recurringPaymentLogs.findMany({
      where: and(
        eq(recurringPaymentLogs.recurringExpenseId, id),
        gte(recurringPaymentLogs.month, currentMonthStr)
      ),
      with: { transaction: true }
    })

    for (const log of logsFuturos) {
      if (log.transaction) {
        await db.delete(transactions).where(eq(transactions.id, log.transactionId))
      }
      await db.delete(recurringPaymentLogs).where(eq(recurringPaymentLogs.id, log.id))
    }
  }
  // Se a despesa foi ativada, gera logs futuros a partir do mês atual
  else if (!despesaAtual.active && active) {
    for (let i = 0; i < REPLICATION_MONTHS; i++) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() + i, 1)
      const targetYear = targetDate.getFullYear()
      const targetMonth = targetDate.getMonth() + 1
      const monthStr = `${targetYear}-${String(targetMonth).padStart(2, "0")}`

      const [existente] = await db.select()
        .from(recurringPaymentLogs)
        .where(and(
          eq(recurringPaymentLogs.recurringExpenseId, id),
          eq(recurringPaymentLogs.month, monthStr)
        ))
        .limit(1)

      if (existente) continue

      let dueDate = new Date(targetYear, targetMonth - 1, dueDay)
      if (dueDate.getMonth() !== targetMonth - 1) {
        dueDate = new Date(targetYear, targetMonth, 0)
      }

      const [transaction] = await db.insert(transactions).values({
        userId,
        householdId: despesaAtual.householdId,
        description: name,
        amount: amount.toFixed(2),
        type: "expense",
        date: dueDate.toISOString().split("T")[0],
        source: "recurring",
        categoryId,
        accountId,
        paid: false,
      }).returning()

      await db.insert(recurringPaymentLogs).values({
        recurringExpenseId: id,
        month: monthStr,
        transactionId: transaction.id,
      })
    }
  }
  // Se o status não mudou, apenas atualiza os logs futuros existentes
  else {
    const logsFuturos = await db.query.recurringPaymentLogs.findMany({
      where: and(
        eq(recurringPaymentLogs.recurringExpenseId, id),
        gte(recurringPaymentLogs.month, currentMonthStr)
      ),
      with: { transaction: true }
    })

    for (const log of logsFuturos) {
      if (!log.transaction) continue

      const [year, month] = log.month.split("-").map(Number)
      let dueDate = new Date(year, month - 1, dueDay)
      if (dueDate.getMonth() !== month - 1) {
        dueDate = new Date(year, month, 0)
      }

      await db.update(transactions)
        .set({
          description: name,
          amount: amount.toFixed(2),
          date: dueDate.toISOString().split("T")[0],
          categoryId,
          accountId,
        })
        .where(eq(transactions.id, log.transactionId))
    }
  }

  revalidatePath("/admin/recorrentes")
  revalidatePath("/admin/carteira")
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

  const now = new Date()
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const logsFuturos = await db.query.recurringPaymentLogs.findMany({
    where: and(
      eq(recurringPaymentLogs.recurringExpenseId, id),
      gte(recurringPaymentLogs.month, currentMonthStr)
    ),
    with: { transaction: true }
  })

  for (const log of logsFuturos) {
    if (log.transaction) {
      await db.delete(transactions).where(eq(transactions.id, log.transactionId))
    }
    await db.delete(recurringPaymentLogs).where(eq(recurringPaymentLogs.id, log.id))
  }

  await db.delete(recurringExpenses)
    .where(and(eq(recurringExpenses.id, id), canAccess))

  revalidatePath("/admin/recorrentes")
  revalidatePath("/admin/carteira")
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