// src/services/expenseService.ts
import { db } from "@/db";
import { recurringExpenses, recurringPaymentLogs, transactions } from "@/db/schema";
import { and, eq, gte, or } from "drizzle-orm";

const DEFAULT_RECURRING_MONTHS = 12;
const MAX_RECURRING_MONTHS = 60;

function getFormattedDate(y: number, m: number, d: number): string {
  const lastDayOfTargetMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const finalDay = Math.min(d, lastDayOfTargetMonth);
  const monthStr = String(m).padStart(2, "0");
  const dayStr = String(finalDay).padStart(2, "0");
  return `${y}-${monthStr}-${dayStr}`;
}

export async function createExpense(userId: string, data: {
  description: string;
  amount: number;
  date: string;
  categoryId: number | null;
  accountId: number | null;
  paid: boolean;
  isRecurring: boolean;
  recurringMonths: number;
}) {
  const { description, amount, date, categoryId, accountId, paid, isRecurring, recurringMonths } = data;

  const [year, month, day] = date.split("-").map(Number);

  let dueDay = day;
  if (isRecurring) {
    const raw = day;
    if (raw >= 1 && raw <= 31) dueDay = raw;
  }

  const seedDateStr = getFormattedDate(year, month, dueDay);

  const [seed] = await db
    .insert(transactions)
    .values({
      userId,
      description,
      amount: amount.toFixed(2),
      type: "expense",
      date: seedDateStr,
      source: "manual",
      categoryId,
      accountId,
      paid,
      isRecurring,
      recurringParentId: null,
    })
    .returning();

  if (isRecurring && seed) {
    const children = Array.from({ length: recurringMonths - 1 }, (_, i) => {
      const targetMonthRaw = month + i + 1;
      const targetYear = year + Math.floor((targetMonthRaw - 1) / 12);
      const normalizedMonth = ((targetMonthRaw - 1) % 12) + 1;

      const childDateStr = getFormattedDate(targetYear, normalizedMonth, dueDay);

      return {
        userId,
        description,
        amount: amount.toFixed(2),
        type: "expense" as const,
        date: childDateStr,
        source: "recurring",
        categoryId,
        accountId,
        paid: false,
        isRecurring: false,
        recurringParentId: seed.id,
      };
    });

    if (children.length > 0) {
      await db.insert(transactions).values(children);
    }
  }

  return seed;
}

export async function updateExpense(userId: string, data: {
  id: number;
  description: string;
  amount: number;
  date: string;
  categoryId: number | null;
  accountId: number | null;
  paid: boolean;
}) {
  const { id, description, amount, date, categoryId, accountId, paid } = data;

  const [tx] = await db
    .select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!tx) throw new Error("Transação não encontrada");

  const seedId = tx.isRecurring ? tx.id : tx.recurringParentId;

  const patch = {
    description,
    amount: amount.toFixed(2),
    categoryId,
    accountId,
    paid,
  };

  if (seedId) {
    await db
      .update(transactions)
      .set(patch)
      .where(
        and(
          eq(transactions.userId, userId),
          or(
            eq(transactions.id, seedId),
            eq(transactions.recurringParentId, seedId),
          ),
          gte(transactions.date, tx.date),
        ),
      );
  } else {
    await db
      .update(transactions)
      .set({ ...patch, date })
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }
}

export async function deleteExpense(userId: string, data: {
  id: number;
}) {
  const { id } = data;

  const [transaction] = await db.select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!transaction) throw new Error("Transação não encontrada");

  if (transaction.source === "recurring") {
    const [log] = await db.select()
      .from(recurringPaymentLogs)
      .where(eq(recurringPaymentLogs.transactionId, id))
      .limit(1);

    if (!log) throw new Error("Log de despesa recorrente não encontrado");

    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const logsFuturos = await db.query.recurringPaymentLogs.findMany({
      where: and(
        eq(recurringPaymentLogs.recurringExpenseId, log.recurringExpenseId),
        gte(recurringPaymentLogs.month, currentMonthStr),
      ),
      with: { transaction: true },
    });

    for (const logFuturo of logsFuturos) {
      if (logFuturo.transaction) {
        await db.delete(transactions).where(eq(transactions.id, logFuturo.transactionId));
      }
      await db.delete(recurringPaymentLogs).where(eq(recurringPaymentLogs.id, logFuturo.id));
    }

    await db.delete(recurringExpenses).where(eq(recurringExpenses.id, log.recurringExpenseId));
  } else {
    await db.delete(transactions).where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }
}

export async function deleteExpenseSeries(userId: string, seedId: number) {
  await db
    .delete(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        or(
          eq(transactions.id, seedId),
          eq(transactions.recurringParentId, seedId),
        ),
      ),
    );
}