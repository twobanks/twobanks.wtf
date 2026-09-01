"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { recurringExpenses, recurringPaymentLogs, transactions } from "@/db/schema"
import { and, eq, gte } from "drizzle-orm"

import { revalidatePath } from "next/cache"

const REPLICATION_MONTHS = 12;

export async function createExpense(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado");
  const userId = session.user.id;

  const description = String(formData.get("description") ?? "").trim();
  const amount = Number(formData.get("amount"));
  const type = "expense";
  const dateStr = String(formData.get("date") ?? "");
  const date = new Date(dateStr);
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null;
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null;
  const paid = formData.get("paid") === "on";
  const isRecurring = formData.get("isRecurring") === "on";

  if (!description || isNaN(amount) || !dateStr) throw new Error("Dados inválidos");

  if (isRecurring) {
    const dueDay = Number(formData.get("dueDay"));
    if (!dueDay || dueDay < 1 || dueDay > 31) throw new Error("Dia de vencimento inválido");

    // Determinar mês inicial: usa startMonth se enviado, senão usa mês/ano da data fornecida
    const startMonthValue = String(formData.get("startMonth") ?? "").trim();
    let startYear: number, startMonthNum: number;
    if (startMonthValue) {
      const [year, month] = startMonthValue.split("-").map(Number);
      if (!year || !month || month < 1 || month > 12) throw new Error("Mês inicial inválido");
      startYear = year;
      startMonthNum = month;
    } else {
      startYear = date.getFullYear();
      startMonthNum = date.getMonth() + 1;
    }

    // 1. Criar a despesa recorrente
    const [recurringExpense] = await db.insert(recurringExpenses).values({
      userId,
      name: description,
      amount: amount.toFixed(2),
      dueDay,
      categoryId,
      accountId,
      active: true,
    }).returning();

    // 2. Gerar transações e logs para os próximos REPLICATION_MONTHS meses
    for (let i = 0; i < REPLICATION_MONTHS; i++) {
      const targetDate = new Date(startYear, startMonthNum - 1 + i, 1);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;
      const monthStr = `${targetYear}-${String(targetMonth).padStart(2, "0")}`;

      // Evitar duplicatas
      const [existente] = await db.select()
        .from(recurringPaymentLogs)
        .where(and(
          eq(recurringPaymentLogs.recurringExpenseId, recurringExpense.id),
          eq(recurringPaymentLogs.month, monthStr)
        ))
        .limit(1);
      if (existente) continue;

      // Calcular data de vencimento ajustada
      let dueDate = new Date(targetYear, targetMonth - 1, dueDay);
      if (dueDate.getMonth() !== targetMonth - 1) {
        dueDate = new Date(targetYear, targetMonth, 0); // último dia do mês
      }

      // Inserir transação
      const [transaction] = await db.insert(transactions).values({
        userId,
        description,
        amount: amount.toFixed(2),
        type,
        date: dueDate.toISOString().split("T")[0],
        source: "recurring", // importante para identificar recorrência
        categoryId,
        accountId,
        paid: false,
      }).returning();

      // Inserir log
      await db.insert(recurringPaymentLogs).values({
        recurringExpenseId: recurringExpense.id,
        month: monthStr,
        transactionId: transaction.id,
      });
    }
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
      source: "manual",
    });
  }

  revalidatePath("/admin/carteira");
  revalidatePath("/admin/recorrentes");
}

export async function updateExpense(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado");
  const userId = session.user.id;

  const id = Number(formData.get("id"));
  const description = String(formData.get("description"));
  const amount = Number(formData.get("amount"));
  const dateStr = String(formData.get("date"));
  const date = new Date(dateStr);
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null;
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null;
  const paid = formData.get("paid") === "on";

  if (!id || !description || isNaN(amount) || !dateStr) throw new Error("Dados inválidos");

  // Buscar a transação existente
  const [transaction] = await db.select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!transaction) throw new Error("Transação não encontrada");

  if (transaction.source === "recurring") {
    // Encontrar o log vinculado
    const [log] = await db.select()
      .from(recurringPaymentLogs)
      .where(eq(recurringPaymentLogs.transactionId, id))
      .limit(1);

    if (!log) throw new Error("Log de despesa recorrente não encontrado");

    // Atualizar a despesa recorrente
    await db.update(recurringExpenses)
      .set({
        name: description,
        amount: amount.toFixed(2),
        categoryId,
        accountId,
      })
      .where(eq(recurringExpenses.id, log.recurringExpenseId));

    // Atualizar logs/transações futuros (mês atual em diante)
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const logsFuturos = await db.query.recurringPaymentLogs.findMany({
      where: and(
        eq(recurringPaymentLogs.recurringExpenseId, log.recurringExpenseId),
        gte(recurringPaymentLogs.month, currentMonthStr)
      ),
      with: { transaction: true }
    });

    // Obter a despesa recorrente atualizada para pegar o dueDay atual
    const [recurring] = await db.select()
      .from(recurringExpenses)
      .where(eq(recurringExpenses.id, log.recurringExpenseId))
      .limit(1);

    if (!recurring) throw new Error("Despesa recorrente não encontrada");

    for (const logFuturo of logsFuturos) {
      if (!logFuturo.transaction) continue;

      const [year, month] = logFuturo.month.split("-").map(Number);
      let dueDate = new Date(year, month - 1, recurring.dueDay);
      if (dueDate.getMonth() !== month - 1) {
        dueDate = new Date(year, month, 0);
      }

      await db.update(transactions)
        .set({
          description,
          amount: amount.toFixed(2),
          date: dueDate.toISOString().split("T")[0],
          categoryId,
          accountId,
        })
        .where(eq(transactions.id, logFuturo.transactionId));
    }
  } else {
    // Despesa avulsa: atualizar normalmente
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
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }

  revalidatePath("/admin/carteira");
  revalidatePath("/admin/recorrentes");
}

export async function deleteExpense(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado");
  const userId = session.user.id;

  const id = Number(formData.get("id"));
  if (!id) throw new Error("ID inválido");

  const [transaction] = await db.select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!transaction) throw new Error("Transação não encontrada");

  if (transaction.source === "recurring") {
    // Encontrar log
    const [log] = await db.select()
      .from(recurringPaymentLogs)
      .where(eq(recurringPaymentLogs.transactionId, id))
      .limit(1);

    if (!log) throw new Error("Log de despesa recorrente não encontrado");

    // Excluir logs e transações futuros (mês atual em diante)
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const logsFuturos = await db.query.recurringPaymentLogs.findMany({
      where: and(
        eq(recurringPaymentLogs.recurringExpenseId, log.recurringExpenseId),
        gte(recurringPaymentLogs.month, currentMonthStr)
      ),
      with: { transaction: true }
    });

    for (const logFuturo of logsFuturos) {
      if (logFuturo.transaction) {
        await db.delete(transactions).where(eq(transactions.id, logFuturo.transactionId));
      }
      await db.delete(recurringPaymentLogs).where(eq(recurringPaymentLogs.id, logFuturo.id));
    }

    // Excluir a despesa recorrente
    await db.delete(recurringExpenses).where(eq(recurringExpenses.id, log.recurringExpenseId));
  } else {
    // Excluir transação avulsa
    await db.delete(transactions).where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }

  revalidatePath("/admin/carteira");
  revalidatePath("/admin/recorrentes");
}