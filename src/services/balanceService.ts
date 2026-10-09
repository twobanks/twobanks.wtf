// src/services/balanceService.ts
import { db } from '@/db'; // Ajuste o caminho do seu banco se necessário (ex: '@/db/index')
import { financialAccounts, installments, purchases, transactions } from '@/db/schema';
import { toCents } from '@/utils/currency';
import { and, eq, gte, lte, or } from 'drizzle-orm';

export async function getDashboardSummary(userId: string, householdId: string | null, targetMonth: Date) {
  // 1. Delimitar o mês atual
  const startOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);
  const endOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0, 23, 59, 59, 999);

  const householdCondition = householdId
    ? or(eq(financialAccounts.userId, userId), eq(financialAccounts.householdId, householdId))
    : eq(financialAccounts.userId, userId);

  const txHouseholdCondition = householdId
    ? or(eq(transactions.userId, userId), eq(transactions.householdId, householdId))
    : eq(transactions.userId, userId);

  // --- A. SALDO BANCÁRIO ATUAL (Histórico Completo) ---
  const accounts = await db.select().from(financialAccounts).where(householdCondition);
  const allTransactions = await db.select().from(transactions).where(txHouseholdCondition);

  let bankBalanceCents = 0;

  // Soma saldos iniciais
  accounts.forEach((acc) => {
    bankBalanceCents += toCents(acc.initialBalance);
  });

  // Soma movimentações efetivadas (ignoramos 'transfer' para o saldo consolidado global)
  allTransactions.forEach((tx) => {
    if (tx.paid === true) {
      if (tx.type === 'income') bankBalanceCents += toCents(tx.amount);
      if (tx.type === 'expense') bankBalanceCents -= toCents(tx.amount);
    }
  });


  // --- B. COMPROMISSOS PENDENTES DO MÊS ---
  let pendingExpensesCents = 0;
  
  // Despesas pendentes
  allTransactions.forEach((tx) => {
    if (
      tx.type === 'expense' &&
      tx.paid === false &&
      new Date(tx.date) >= startOfMonth &&
      new Date(tx.date) <= endOfMonth
    ) {
      pendingExpensesCents += toCents(tx.amount);
    }
  });

  // Faturas de Cartão (Parcelas abertas do mês)
  // Como `installments` não tem userId direto, precisamos fazer um join com `purchases`
  const monthlyInstallments = await db
    .select({
      amount: installments.amount,
      paid: installments.paid,
    })
    .from(installments)
    .innerJoin(purchases, eq(installments.purchaseId, purchases.id))
    .where(
      and(
        householdId
          ? or(eq(purchases.userId, userId), eq(transactions.householdId, householdId)) // Nota: se purchases não tem householdId, use userId
          : eq(purchases.userId, userId),
        eq(installments.paid, false),
        gte(installments.dueDate, startOfMonth.toISOString()), // Ajuste de formatação de data dependendo do seu DB
        lte(installments.dueDate, endOfMonth.toISOString())
      )
    );

  let pendingCardObligationsCents = 0;
  monthlyInstallments.forEach((inst) => {
    pendingCardObligationsCents += toCents(inst.amount);
  });


  // --- C. SALDO DISPONÍVEL PREVISTO ---
  const totalPendingObligationsCents = pendingExpensesCents + pendingCardObligationsCents;
  const expectedAvailableBalanceCents = bankBalanceCents - totalPendingObligationsCents;

  return {
    bankBalanceCents,
    pendingExpensesCents,
    pendingCardObligationsCents,
    totalPendingObligationsCents,
    expectedAvailableBalanceCents,
  };
}