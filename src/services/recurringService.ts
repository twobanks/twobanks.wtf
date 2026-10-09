// src/services/recurringService.ts
import { db } from "@/db";
import { recurringExpenses, transactions } from "@/db/schema";
import { and, eq, gte, lte } from "drizzle-orm";

export async function ensureRecurringExpensesGenerated(userId: string, year: number, monthNum: number) {
  const primeiroDia = new Date(year, monthNum - 1, 1);
  const ultimoDia = new Date(year, monthNum, 0);
  const firstDayStr = primeiroDia.toISOString().split("T")[0];
  const lastDayStr = ultimoDia.toISOString().split("T")[0];

  const activeRules = await db.query.recurringExpenses.findMany({
    where: and(
      eq(recurringExpenses.userId, userId),
      eq(recurringExpenses.active, true)
    ),
  });

  if (activeRules.length === 0) return;

  const existingTransactions = await db.query.transactions.findMany({
    where: and(
      eq(transactions.userId, userId),
      gte(transactions.date, firstDayStr),
      lte(transactions.date, lastDayStr),
      eq(transactions.source, "recurring")
    ),
  });

  const existingDescriptions = new Set(existingTransactions.map((t) => t.description));

  const rulesToGenerate = activeRules.filter(
    (rule) => !existingDescriptions.has(rule.name)
  );

  if (rulesToGenerate.length === 0) return;

  const newTransactionsToInsert = rulesToGenerate.map((rule) => {
    const day = rule.dueDay || 1;
    const targetDate = new Date(year, monthNum - 1, Math.min(day, ultimoDia.getDate()));
    const targetDateStr = targetDate.toISOString().split("T")[0];

    return {
      userId: rule.userId,
      householdId: rule.householdId,
      description: rule.name,
      amount: rule.amount,
      type: "expense" as const,
      categoryId: rule.categoryId,
      accountId: rule.accountId,
      date: targetDateStr,
      paid: false, 
      source: "recurring" as const,
    };
  });

  if (newTransactionsToInsert.length > 0) {
    await db.insert(transactions).values(newTransactionsToInsert);
  }
}