// src/actions/expenses.ts
"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { recurringExpenses, recurringPaymentLogs, transactions } from "@/db/schema"
import { and, eq, gte, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const DEFAULT_RECURRING_MONTHS = 12;
const MAX_RECURRING_MONTHS = 60;

export async function createExpense(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');
  const userId = session.user.id;

  const description = String(formData.get('description') ?? '').trim();
  const amount = Number(formData.get('amount'));
  const dateStr = String(formData.get('date') ?? ''); // Formato "YYYY-MM-DD"
  const categoryId = formData.get('categoryId')
    ? Number(formData.get('categoryId'))
    : null;
  const accountId = formData.get('accountId')
    ? Number(formData.get('accountId'))
    : null;
  const paid = formData.get('paid') === 'on';
  const isRecurring = formData.get('isRecurring') === 'on';
  const recurringMonths = Math.min(
    Math.max(
      Number(formData.get('recurringMonths') ?? DEFAULT_RECURRING_MONTHS),
      1,
    ),
    MAX_RECURRING_MONTHS,
  );

  if (!description || isNaN(amount) || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error('Dados inválidos');
  }

  // 1. Desestruturação direta da string sem usar new Date(dateStr)
  const [year, month, day] = dateStr.split('-').map(Number);

  let dueDay = day;
  if (isRecurring) {
    const raw = Number(formData.get('dueDay'));
    if (raw >= 1 && raw <= 31) dueDay = raw;
  }

  // Helper imutável para formatar datas YYYY-MM-DD sem desvio de timezone
  function getFormattedDate(y: number, m: number, d: number) {
    const lastDayOfTargetMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const finalDay = Math.min(d, lastDayOfTargetMonth);
    const monthStr = String(m).padStart(2, '0');
    const dayStr = String(finalDay).padStart(2, '0');
    return `${y}-${monthStr}-${dayStr}`;
  }

  const seedDateStr = getFormattedDate(year, month, dueDay);

  // ─── 2. Inserção da Semente ─────────────────────────────────────────
  const [seed] = await db
    .insert(transactions)
    .values({
      userId,
      description,
      amount: amount.toFixed(2),
      type: 'expense',
      date: seedDateStr,
      source: 'manual',
      categoryId,
      accountId,
      paid,
      isRecurring,
      recurringParentId: null,
    })
    .returning();

  // ─── 3. Inserção das Filhas Recorrentes ──────────────────────────────
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
        type: 'expense' as const,
        date: childDateStr,
        source: 'recurring',
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

  revalidatePath('/admin/carteira');
  revalidatePath('/admin/recorrentes');
}

export async function updateExpense(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');
  const userId = session.user.id;

  const id = Number(formData.get('id'));
  const description = String(formData.get('description') ?? '').trim();
  const amount = Number(formData.get('amount'));
  const dateStr = String(formData.get('date') ?? '');
  const categoryId = formData.get('categoryId')
    ? Number(formData.get('categoryId'))
    : null;
  const accountId = formData.get('accountId')
    ? Number(formData.get('accountId'))
    : null;
  const paid = formData.get('paid') === 'on';

  if (!id || !description || isNaN(amount) || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error('Dados inválidos');
  }

  const [tx] = await db
    .select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!tx) throw new Error('Transação não encontrada');

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
      .set({ ...patch, date: dateStr })
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }

  revalidatePath('/admin/carteira');
  revalidatePath('/admin/recorrentes');
}

export async function deleteExpenseSeries(seedId: number) {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');

  await db
    .delete(transactions)
    .where(
      and(
        eq(transactions.userId, session.user.id),
        or(
          eq(transactions.id, seedId),
          eq(transactions.recurringParentId, seedId),
        ),
      ),
    );

  revalidatePath('/admin/carteira');
  revalidatePath('/admin/recorrentes');
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

    await db.delete(recurringExpenses).where(eq(recurringExpenses.id, log.recurringExpenseId));
  } else {
    await db.delete(transactions).where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }

  revalidatePath("/admin/carteira");
  revalidatePath("/admin/recorrentes");
}