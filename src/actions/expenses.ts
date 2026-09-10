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
  const dateStr = String(formData.get('date') ?? '');
  const baseDate = new Date(dateStr);
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

  if (!description || isNaN(amount) || isNaN(baseDate.getTime())) {
    throw new Error('Dados inválidos');
  }

  // ─── Dia de vencimento (só faz sentido para recorrente) ──────────
  // Se o usuário informou `dueDay`, usa. Senão, usa o dia da data-base.
  let dueDay = baseDate.getDate();
  if (isRecurring) {
    const raw = Number(formData.get('dueDay'));
    if (raw >= 1 && raw <= 31) dueDay = raw;
  }

  // Retorna a data-alvo ajustando para o último dia quando o mês é mais curto
  // (ex.: dueDay=31 em fev vira 28/29)
  function targetDate(year: number, monthIndex: number) {
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    return new Date(year, monthIndex, Math.min(dueDay, lastDay));
  }

  const seedDate = isRecurring
    ? targetDate(baseDate.getFullYear(), baseDate.getMonth())
    : baseDate;

  // ─── 1) Semente ──────────────────────────────────────────────────
  const [seed] = await db
    .insert(transactions)
    .values({
      userId,
      description,
      amount: amount.toFixed(2),
      type: 'expense',
      date: seedDate.toISOString().split('T')[0],
      source: 'manual',
      categoryId,
      accountId,
      paid,
      isRecurring,
      recurringParentId: null,
    })
    .returning();

  // ─── 2) Filhos ───────────────────────────────────────────────────
  if (isRecurring && seed) {
    const children = Array.from({ length: recurringMonths }, (_, i) => {
      const d = targetDate(
        baseDate.getFullYear(),
        baseDate.getMonth() + i + 1,
      );
      return {
        userId,
        description,
        amount: amount.toFixed(2),
        type: 'expense' as const,
        date: d.toISOString().split('T')[0],
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
  const date = new Date(dateStr);
  const categoryId = formData.get('categoryId')
    ? Number(formData.get('categoryId'))
    : null;
  const accountId = formData.get('accountId')
    ? Number(formData.get('accountId'))
    : null;
  const paid = formData.get('paid') === 'on';

  if (!id || !description || isNaN(amount) || isNaN(date.getTime())) {
    throw new Error('Dados inválidos');
  }

  await db
    .update(transactions)
    .set({
      description,
      amount: amount.toFixed(2),
      date: date.toISOString().split('T')[0],
      categoryId,
      accountId,
      paid,
    })
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));

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