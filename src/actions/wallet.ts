"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { installments, purchases, transactions } from "@/db/schema"
import { getPrimaryHouseholdId, getUserHouseholdIds } from "@/lib/household"
import { and, eq, inArray, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const DEFAULT_RECURRING_MONTHS = 12;

export async function createTransaction(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');
  const userId = session.user.id;

  const description = String(formData.get('description') ?? '').trim();
  const amount = Number(formData.get('amount'));
  const type = String(formData.get('type')) as 'income' | 'expense';
  const dateStr = String(formData.get('date') ?? '');
  const categoryId = formData.get('categoryId') ? Number(formData.get('categoryId')) : null;
  const accountId = formData.get('accountId') ? Number(formData.get('accountId')) : null;

  const isRecurring = formData.get('isRecurring') === 'on';
  const recurringMonths = Math.min(
    Math.max(Number(formData.get('recurringMonths') ?? DEFAULT_RECURRING_MONTHS), 1),
    60,
  );

  const date = new Date(dateStr);
  if (!description || isNaN(amount) || isNaN(date.getTime())) {
    throw new Error('Dados inválidos');
  }

  const householdId = await getPrimaryHouseholdId(userId);
  const isoDate = date.toISOString().split('T')[0];

  // 1) Insere a linha-semente
  const [seed] = await db
    .insert(transactions)
    .values({
      userId,
      householdId,
      description,
      amount: amount.toFixed(2),
      type,
      date: isoDate,
      categoryId,
      accountId,
      paid: true,
      source: 'manual',
      isRecurring,            // true só na semente
      recurringParentId: null,
    })
    .returning();

  // 2) Se recorrente, replica para os próximos N meses
  if (isRecurring && seed) {
    const children = Array.from({ length: recurringMonths }, (_, i) => {
      const d = new Date(date);
      d.setMonth(d.getMonth() + i + 1);
      return {
        userId,
        householdId,
        description,
        amount: amount.toFixed(2),
        type,
        date: d.toISOString().split('T')[0],
        categoryId,
        accountId,
        paid: true,
        source: 'recurring',
        isRecurring: false,
        recurringParentId: seed.id,
      };
    });

    if (children.length > 0) {
      await db.insert(transactions).values(children);
    }
  }

  revalidatePath('/admin/carteira');
}

export async function createInstallmentPurchase(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const creditCardId = Number(formData.get("creditCardId"))
  const description = String(formData.get("description"))
  const totalAmount = Number(formData.get("totalAmount"))
  const installmentsCount = Number(formData.get("installments"))
  const firstDueDate = formData.get("firstDueDate") as string
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null

  if (!/^\d{4}-\d{2}-\d{2}$/.test(firstDueDate)) {
    throw new Error("Data inválida")
  }

  if (!creditCardId || !description || isNaN(totalAmount) || !installmentsCount) {
    throw new Error("Dados inválidos")
  }

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(transactions.userId, userId),
    householdIds.length > 0 ? inArray(transactions.householdId, householdIds) : undefined
  )

  const [purchase] = await db.insert(purchases).values({
    userId,
    creditCardId,
    description,
    totalAmount: totalAmount.toFixed(2),
    installments: installmentsCount,
    firstDueDate,
    categoryId,
  }).returning()

  const installmentAmount = totalAmount / installmentsCount
  const installmentsData = []

  for (let i = 0; i < installmentsCount; i++) {
    const dueDate = new Date(firstDueDate)
    dueDate.setMonth(dueDate.getMonth() + i)

    installmentsData.push({
      purchaseId: purchase.id,
      number: i + 1,
      amount: installmentAmount.toFixed(2),
      dueDate: dueDate.toISOString().split("T")[0],
    })
  }

  await db.insert(installments).values(installmentsData)

  revalidatePath("/admin/carteira")
}

export async function updateTransaction(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');

  const id = Number(formData.get('id'));
  if (!id) throw new Error('ID inválido');

  const patch: Record<string, unknown> = {};
  const description = formData.get('description');
  const amount = formData.get('amount');
  const date = formData.get('date');
  const paid = formData.get('paid');

  if (description !== null) patch.description = String(description).trim();
  if (amount !== null) patch.amount = Number(amount).toFixed(2);
  if (date !== null) patch.date = String(date);
  if (paid !== null) patch.paid = paid === 'on';

  await db
    .update(transactions)
    .set(patch)
    .where(and(eq(transactions.id, id), eq(transactions.userId, session.user.id)));

  revalidatePath('/admin/carteira');
}

export async function deleteTransaction(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(transactions.userId, userId),
    householdIds.length > 0 ? inArray(transactions.householdId, householdIds) : undefined
  )

  await db.delete(transactions)
    .where(and(eq(transactions.id, id), canAccess))

  revalidatePath("/admin/carteira")
}

export async function toggleInstallmentPaid(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const installmentId = Number(formData.get("id"))
  const paid = formData.get("paid") === "true"

  if (!installmentId) throw new Error("ID inválido")

  // Verificar se a parcela pertence a uma compra do usuário
  const [purchase] = await db
    .select({ userId: purchases.userId })
    .from(purchases)
    .innerJoin(installments, eq(installments.purchaseId, purchases.id))
    .where(and(eq(installments.id, installmentId), eq(purchases.userId, userId)))
    .limit(1)

  if (!purchase) throw new Error("Parcela não encontrada")

  await db
    .update(installments)
    .set({ paid, paidAt: paid ? new Date() : null })
    .where(eq(installments.id, installmentId))

  revalidatePath("/admin/cartoes/[id]", "page")
}

export async function markInvoiceAsPaid(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const cardId = Number(formData.get("cardId"))
  const month = String(formData.get("month") || "")
  if (!cardId || !month) throw new Error("Dados inválidos")

  const [year, monthNum] = month.split("-").map(Number)
  const primeiroDia = new Date(year, monthNum - 1, 1)
  const ultimoDia = new Date(year, monthNum, 0)

  // Buscar todas as parcelas do cartão no mês
  const compras = await db.query.purchases.findMany({
    where: and(
      eq(purchases.creditCardId, cardId),
      eq(purchases.userId, userId)
    ),
    with: { installments: true },
  })

  const parcelasDoMes = compras.flatMap((compra) =>
    compra.installments.filter((parcela) => {
      const dueDate = new Date(parcela.dueDate + "T00:00:00")
      return dueDate >= primeiroDia && dueDate <= ultimoDia
    })
  )

  if (parcelasDoMes.length === 0) return

  const ids = parcelasDoMes.map(p => p.id)
  await db.update(installments)
    .set({ paid: true, paidAt: new Date() })
    .where(inArray(installments.id, ids))

  revalidatePath("/admin/cartoes/[id]", "page")
}

export async function markTransactionAsPaid(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  if (!id) throw new Error("ID inválido")

  // Verifica se a transação pertence ao usuário ou household
  const householdIds = await getUserHouseholdIds(userId)
  const canAccess = or(
    eq(transactions.userId, userId),
    householdIds.length > 0 ? inArray(transactions.householdId, householdIds) : undefined
  )

  await db.update(transactions)
    .set({ paid: true })
    .where(and(eq(transactions.id, id), canAccess))

  revalidatePath("/admin/carteira")
}

export async function deleteRecurringSeries(seedId: number) {
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');

  // onDelete: cascade já cuida dos filhos quando deletamos a semente,
  // mas o filtro de userId evita deletar séries de outros usuários.
  await db
    .delete(transactions)
    .where(
      and(
        eq(transactions.userId, session.user.id),
        or(eq(transactions.id, seedId), eq(transactions.recurringParentId, seedId)),
      ),
    );

  revalidatePath('/admin/carteira');
}