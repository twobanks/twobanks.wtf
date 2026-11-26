// src/services/recurringExpenseService.ts
import { db } from "@/db";
import { recurringExpenses, recurringPaymentLogs, transactions } from "@/db/schema";
import { and, eq, gte, inArray, or } from "drizzle-orm";

const REPLICATION_MONTHS = 12;

export async function createRecurringExpense(userId: string, data: {
  name: string;
  amount: number;
  dueDay: number;
  categoryId: number | null;
  accountId: number | null;
  active: boolean;
  startMonth: string;
}) {
  const { name, amount, dueDay, categoryId, accountId, active, startMonth } = data;

  const [startYear, startMonthNum] = startMonth.split("-").map(Number);

  const householdId = await getPrimaryHouseholdId(userId);

  const [novaDespesa] = await db.insert(recurringExpenses).values({
    userId,
    householdId,
    name,
    amount: amount.toFixed(2),
    dueDay,
    categoryId,
    accountId,
    active,
  }).returning();

  if (active) {
    for (let i = 0; i < REPLICATION_MONTHS; i++) {
      const targetDate = new Date(startYear, startMonthNum - 1 + i, 1);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;
      const monthStr = `${targetYear}-${String(targetMonth).padStart(2, "0")}`;

      const [existente] = await db.select()
        .from(recurringPaymentLogs)
        .where(and(
          eq(recurringPaymentLogs.recurringExpenseId, novaDespesa.id),
          eq(recurringPaymentLogs.month, monthStr),
        ))
        .limit(1);

      if (existente) continue;

      let dueDate = new Date(targetYear, targetMonth - 1, dueDay);
      if (dueDate.getMonth() !== targetMonth - 1) {
        dueDate = new Date(targetYear, targetMonth, 0);
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
      }).returning();

      await db.insert(recurringPaymentLogs).values({
        recurringExpenseId: novaDespesa.id,
        month: monthStr,
        transactionId: transaction.id,
      });
    }
  }

  return novaDespesa;
}

export async function updateRecurringExpense(userId: string, data: {
  id: number;
  name: string;
  amount: number;
  dueDay: number;
  categoryId: number | null;
  accountId: number | null;
  active: boolean;
}) {
  const { id, name, amount, dueDay, categoryId, accountId, active } = data;

  const householdIds = await getUserHouseholdIds(userId);
  const canAccess = or(
    eq(recurringExpenses.userId, userId),
    householdIds.length > 0 ? inArray(recurringExpenses.householdId, householdIds) : undefined,
  );

  const [despesaAtual] = await db.select()
    .from(recurringExpenses)
    .where(and(eq(recurringExpenses.id, id), canAccess))
    .limit(1);

  if (!despesaAtual) throw new Error("Despesa não encontrada");

  await db.update(recurringExpenses)
    .set({ name, amount: amount.toFixed(2), dueDay, categoryId, accountId, active })
    .where(and(eq(recurringExpenses.id, id), canAccess));

  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  if (despesaAtual.active && !active) {
    const logsFuturos = await db.query.recurringPaymentLogs.findMany({
      where: and(
        eq(recurringPaymentLogs.recurringExpenseId, id),
        gte(recurringPaymentLogs.month, currentMonthStr),
      ),
      with: { transaction: true },
    });

    for (const log of logsFuturos) {
      if (log.transaction) {
        await db.delete(transactions).where(eq(transactions.id, log.transactionId));
      }
      await db.delete(recurringPaymentLogs).where(eq(recurringPaymentLogs.id, log.id));
    }
  } else if (!despesaAtual.active && active) {
    for (let i = 0; i < REPLICATION_MONTHS; i++) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;
      const monthStr = `${targetYear}-${String(targetMonth).padStart(2, "0")}`;

      const [existente] = await db.select()
        .from(recurringPaymentLogs)
        .where(and(
          eq(recurringPaymentLogs.recurringExpenseId, id),
          eq(recurringPaymentLogs.month, monthStr),
        ))
        .limit(1);

      if (existente) continue;

      let dueDate = new Date(targetYear, targetMonth - 1, dueDay);
      if (dueDate.getMonth() !== targetMonth - 1) {
        dueDate = new Date(targetYear, targetMonth, 0);
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
      }).returning();

      await db.insert(recurringPaymentLogs).values({
        recurringExpenseId: id,
        month: monthStr,
        transactionId: transaction.id,
      });
    }
  } else {
    const logsFuturos = await db.query.recurringPaymentLogs.findMany({
      where: and(
        eq(recurringPaymentLogs.recurringExpenseId, id),
        gte(recurringPaymentLogs.month, currentMonthStr),
      ),
      with: { transaction: true },
    });

    for (const log of logsFuturos) {
      if (!log.transaction) continue;

      const [year, month] = log.month.split("-").map(Number);
      let dueDate = new Date(year, month - 1, dueDay);
      if (dueDate.getMonth() !== month - 1) {
        dueDate = new Date(year, month, 0);
      }

      await db.update(transactions)
        .set({
          description: name,
          amount: amount.toFixed(2),
          date: dueDate.toISOString().split("T")[0],
          categoryId,
          accountId,
        })
        .where(eq(transactions.id, log.transactionId));
    }
  }

  return { id, name, amount, dueDay, categoryId, accountId, active };
}

export async function deleteRecurringExpense(userId: string, data: {
  id: number;
}) {
  const { id } = data;

  const householdIds = await getUserHouseholdIds(userId);
  const canAccess = or(
    eq(recurringExpenses.userId, userId),
    householdIds.length > 0 ? inArray(recurringExpenses.householdId, householdIds) : undefined,
  );

  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const logsFuturos = await db.query.recurringPaymentLogs.findMany({
    where: and(
      eq(recurringPaymentLogs.recurringExpenseId, id),
      gte(recurringPaymentLogs.month, currentMonthStr),
    ),
    with: { transaction: true },
  });

  for (const log of logsFuturos) {
    if (log.transaction) {
      await db.delete(transactions).where(eq(transactions.id, log.transactionId));
    }
    await db.delete(recurringPaymentLogs).where(eq(recurringPaymentLogs.id, log.id));
  }

  await db.delete(recurringExpenses)
    .where(and(eq(recurringExpenses.id, id), canAccess));
}

export async function generateMonthlyRecurring(userId: string, data: {
  year: number;
  month: number;
}) {
  const { year, month } = data;

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) throw new Error("Mês inválido");
  const monthStr = `${year}-${String(month).padStart(2, "0")}`;

  const householdIds = await getUserHouseholdIds(userId);
  const acesso = or(
    eq(recurringExpenses.userId, userId),
    householdIds.length > 0 ? inArray(recurringExpenses.householdId, householdIds) : undefined,
  );

  const despesas = await db.query.recurringExpenses.findMany({
    where: and(
      acesso,
      eq(recurringExpenses.active, true),
    ),
    with: { category: true, account: true },
  });

  for (const despesa of despesas) {
    const [logExistente] = await db.select()
      .from(recurringPaymentLogs)
      .where(and(
        eq(recurringPaymentLogs.recurringExpenseId, despesa.id),
        eq(recurringPaymentLogs.month, monthStr),
      ))
      .limit(1);

    if (logExistente) continue;

    let dueDate = new Date(year, month - 1, despesa.dueDay);
    if (dueDate.getMonth() !== month - 1) {
      dueDate = new Date(year, month, 0);
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
    }).returning();

    await db.insert(recurringPaymentLogs).values({
      recurringExpenseId: despesa.id,
      month: monthStr,
      transactionId: transaction.id,
    });
  }
}

async function getPrimaryHouseholdId(userId: string): Promise<string | null> {
  const { getPrimaryHouseholdId } = await import("@/lib/household");
  return getPrimaryHouseholdId(userId);
}

async function getUserHouseholdIds(userId: string): Promise<string[]> {
  const { getUserHouseholdIds } = await import("@/lib/household");
  return getUserHouseholdIds(userId);
}