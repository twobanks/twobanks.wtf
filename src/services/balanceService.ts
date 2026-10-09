// src/services/balanceService.ts
import { db } from "@/db";
import { financialAccounts, installments, purchases, transactions } from "@/db/schema";
import { and, eq, lte, or, sql } from "drizzle-orm";

export async function getDashboardSummary(userId: string, householdId: string | null, date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const currentMonthStr = `${year}-${String(month).padStart(2, "0")}`;

  // Data limite do último dia do mês vigente (ex: "2026-10-31")
  const lastDayOfCurrentMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lastDayOfCurrentMonthStr = `${currentMonthStr}-${String(lastDayOfCurrentMonth).padStart(2, "0")}`;

  const accessAccounts = householdId
    ? or(eq(financialAccounts.userId, userId), eq(financialAccounts.householdId, householdId))
    : eq(financialAccounts.userId, userId);

  const accessTransactions = householdId
    ? or(eq(transactions.userId, userId), eq(transactions.householdId, householdId))
    : eq(transactions.userId, userId);

  // 1. Saldo inicial base das contas bancárias
  const [initialBalanceRes] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${financialAccounts.initialBalance} AS DECIMAL)), 0)`,
    })
    .from(financialAccounts)
    .where(accessAccounts);

  // 2. Total de receitas pagas ATÉ O FIM DO MÊS VIGENTE
  const [paidIncomeRes] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${transactions.amount} AS DECIMAL)), 0)`,
    })
    .from(transactions)
    .where(
      and(
        accessTransactions,
        eq(transactions.type, "income"),
        eq(transactions.paid, true),
        lte(transactions.date, lastDayOfCurrentMonthStr)
      )
    );

  // 3. Total de despesas pagas (inclui pagamentos de faturas efetuados) ATÉ O FIM DO MÊS VIGENTE
  const [paidExpenseRes] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${transactions.amount} AS DECIMAL)), 0)`,
    })
    .from(transactions)
    .where(
      and(
        accessTransactions,
        eq(transactions.type, "expense"),
        eq(transactions.paid, true),
        lte(transactions.date, lastDayOfCurrentMonthStr)
      )
    );

  // 4. Despesas avulsas/recorrentes pendentes do mês vigente
  const [pendingExpensesRes] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${transactions.amount} AS DECIMAL)), 0)`,
    })
    .from(transactions)
    .where(
      and(
        accessTransactions,
        eq(transactions.type, "expense"),
        eq(transactions.paid, false),
        sql`TO_CHAR(CAST(${transactions.date} AS DATE), 'YYYY-MM') = ${currentMonthStr}`
      )
    );

  // 5. Parcelas de Cartão de Crédito pendentes no mês vigente
  const [pendingCardRes] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${installments.amount} AS DECIMAL)), 0)`,
    })
    .from(installments)
    .innerJoin(purchases, eq(installments.purchaseId, purchases.id))
    .where(
      and(
        eq(purchases.userId, userId),
        eq(installments.paid, false),
        sql`TO_CHAR(CAST(${installments.dueDate} AS DATE), 'YYYY-MM') = ${currentMonthStr}`
      )
    );

  const initialBalance = Number(initialBalanceRes?.total || 0);
  const paidIncome = Number(paidIncomeRes?.total || 0);
  const paidExpense = Number(paidExpenseRes?.total || 0);
  const pendingExpenses = Number(pendingExpensesRes?.total || 0);
  const pendingCard = Number(pendingCardRes?.total || 0);

  // Saldo bancário em conta
  const realBankBalance = initialBalance + paidIncome - paidExpense;
  const bankBalanceCents = Math.round(realBankBalance * 100);

  // Obrigações pendentes (Outras despesas + Faturas de cartão do mês)
  const pendingExpensesCents = Math.round(pendingExpenses * 100);
  const pendingCardObligationsCents = Math.round(pendingCard * 100);
  const totalPendingObligationsCents = pendingExpensesCents + pendingCardObligationsCents;

  return {
    bankBalanceCents,
    totalPendingObligationsCents,
    pendingExpensesCents,
    pendingCardObligationsCents,
    expectedAvailableBalanceCents: bankBalanceCents - totalPendingObligationsCents,
  };
}