// src/services/walletService.ts
import { db } from "@/db";
import {
  creditCardAdjustments,
  creditCards,
  financialAccounts,
  installments,
  purchases,
  transactions,
} from "@/db/schema";
import { and, eq, gte, inArray, or } from "drizzle-orm";

const _DEFAULT_RECURRING_MONTHS = 12;

function addMonthsToDateString(dateStr: string, monthsToAdd: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const targetDate = new Date(Date.UTC(y, m - 1 + monthsToAdd, 1));
  const targetYear = targetDate.getUTCFullYear();
  const targetMonth = targetDate.getUTCMonth();

  const lastDayOfTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  const finalDay = Math.min(d, lastDayOfTargetMonth);

  const finalMonthStr = String(targetMonth + 1).padStart(2, "0");
  const finalDayStr = String(finalDay).padStart(2, "0");

  return `${targetYear}-${finalMonthStr}-${finalDayStr}`;
}

export async function createTransaction(userId: string, data: {
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  categoryId: number | null;
  accountId: number | null;
  isRecurring: boolean;
  totalMonths: number;
}) {
  const { description, amount, type, date, categoryId, accountId, isRecurring, totalMonths } = data;

  const householdId = await getPrimaryHouseholdId(userId);

  const [seed] = await db
    .insert(transactions)
    .values({
      userId,
      householdId,
      description,
      amount: amount.toFixed(2),
      type,
      date,
      categoryId,
      accountId,
      paid: true,
      source: "manual",
      isRecurring,
      recurringParentId: null,
    })
    .returning();

  if (isRecurring && seed && totalMonths > 1) {
    const children = Array.from({ length: totalMonths - 1 }, (_, i) => {
      const nextDateStr = addMonthsToDateString(date, i + 1);
      return {
        userId,
        householdId,
        description,
        amount: amount.toFixed(2),
        type,
        date: nextDateStr,
        categoryId,
        accountId,
        paid: true,
        source: "recurring",
        isRecurring: false,
        recurringParentId: seed.id,
      };
    });

    if (children.length > 0) {
      await db.batch([db.insert(transactions).values(children)]);
    }
  }

  return seed;
}

export async function createInstallmentPurchase(userId: string, data: {
  creditCardId: number;
  description: string;
  totalAmount: number;
  installmentsCount: number;
  firstDueDate: string;
  categoryId: number | null;
  purchaseDate?: string;
}) {
  const { creditCardId, description, totalAmount, installmentsCount, firstDueDate, categoryId, purchaseDate } = data;

  const purchaseDateStr = purchaseDate || firstDueDate;

  const [purchase] = await db.insert(purchases).values({
    userId,
    creditCardId,
    description,
    totalAmount: totalAmount.toFixed(2),
    installments: installmentsCount,
    firstDueDate,
    categoryId,
    purchaseDate: purchaseDateStr,
    status: "active",
  }).returning();

  const totalCents = Math.round(totalAmount * 100);
  const baseInstallmentCents = Math.floor(totalCents / installmentsCount);
  const remainderCents = totalCents % installmentsCount;

  const [startYear, startMonth, startDay] = firstDueDate.split("-").map(Number);

  const installmentsData = [];

  for (let i = 0; i < installmentsCount; i++) {
    const targetMonthRaw = startMonth + i;
    const targetYear = startYear + Math.floor((targetMonthRaw - 1) / 12);
    const normalizedMonth = ((targetMonthRaw - 1) % 12) + 1;

    const lastDayOfTargetMonth = new Date(Date.UTC(targetYear, normalizedMonth, 0)).getUTCDate();
    const finalDay = Math.min(startDay, lastDayOfTargetMonth);

    const monthFormatted = String(normalizedMonth).padStart(2, "0");
    const dayFormatted = String(finalDay).padStart(2, "0");
    const dueDateStr = `${targetYear}-${monthFormatted}-${dayFormatted}`;

    const currentInstallmentCents = baseInstallmentCents + (i < remainderCents ? 1 : 0);
    const installmentAmountStr = (currentInstallmentCents / 100).toFixed(2);

    installmentsData.push({
      purchaseId: purchase.id,
      number: i + 1,
      amount: installmentAmountStr,
      dueDate: dueDateStr,
    });
  }

  await db.batch([db.insert(installments).values(installmentsData)]);

  return purchase;
}

export async function updateTransaction(userId: string, data: {
  id: number;
  description?: string;
  amount?: number;
  date?: string;
  paid?: boolean;
}) {
  const { id, description, amount, date, paid } = data;

  const patch: Record<string, unknown> = {};
  if (description !== undefined) patch.description = String(description).trim();
  if (amount !== undefined) patch.amount = Number(amount).toFixed(2);
  if (date !== undefined) patch.date = String(date);
  if (paid !== undefined) patch.paid = paid;

  await db
    .update(transactions)
    .set(patch)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
}

export async function deleteTransaction(userId: string, data: {
  id: number;
}) {
  const { id } = data;

  const [tx] = await db
    .select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!tx) throw new Error("Transação não encontrada");

  const seedId = tx.isRecurring ? tx.id : tx.recurringParentId;

  if (seedId) {
    await db.delete(transactions).where(
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
      .delete(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }
}

export async function toggleInstallmentPaid(userId: string, data: {
  installmentId: number;
  paid: boolean;
}) {
  const { installmentId, paid } = data;

  const householdIds = await getUserHouseholdIds(userId);
  const primaryHouseholdId = householdIds.length > 0 ? householdIds[0] : null;

  const [purchase] = await db
    .select({
      userId: purchases.userId,
      description: purchases.description,
      cardName: creditCards.name,
    })
    .from(purchases)
    .innerJoin(installments, eq(installments.purchaseId, purchases.id))
    .innerJoin(creditCards, eq(purchases.creditCardId, creditCards.id))
    .where(and(eq(installments.id, installmentId), eq(purchases.userId, userId)))
    .limit(1);

  if (!purchase) throw new Error("Parcela não encontrada");

  const [parcela] = await db.select().from(installments).where(eq(installments.id, installmentId)).limit(1);

  const txDescription = `Pagamento Avulso - ${purchase.description} (${purchase.cardName} - Px ${parcela.number})`;

  await db.transaction(async (tx) => {
    await tx.update(installments)
      .set({ paid, paidAt: paid ? new Date() : null })
      .where(eq(installments.id, installmentId));

    if (paid) {
      const [existing] = await tx.select().from(transactions).where(
        and(eq(transactions.userId, userId), eq(transactions.description, txDescription)),
      ).limit(1);

      if (!existing) {
        await tx.insert(transactions).values({
          userId,
          householdId: primaryHouseholdId,
          description: txDescription,
          amount: Number(parcela.amount).toFixed(2),
          type: "expense",
          date: new Date().toISOString().split("T")[0],
          paid: true,
          source: "manual",
        });
      }
    } else {
      await tx.delete(transactions).where(
        and(eq(transactions.userId, userId), eq(transactions.description, txDescription)),
      );
    }
  });
}

export async function markInvoiceAsPaid(userId: string, data: {
  cardId: number;
  month: string;
  accountId: number | null;
}) {
  const { cardId, month, accountId } = data;

  if (!cardId || !month) throw new Error("Dados inválidos");

  const householdIds = await getUserHouseholdIds(userId);
  const primaryHouseholdId = householdIds.length > 0 ? householdIds[0] : null;

  const [year, monthNum] = month.split("-").map(Number);
  const primeiroDia = new Date(year, monthNum - 1, 1);
  const ultimoDia = new Date(year, monthNum, 0);

  const [card] = await db.select().from(creditCards).where(
    and(eq(creditCards.id, cardId), eq(creditCards.userId, userId)),
  ).limit(1);

  if (!card) throw new Error("Cartão não encontrado");
  const cardName = card.name;
  const invoiceDescription = `Pagamento Fatura - ${cardName} (${month})`;

  const compras = await db.query.purchases.findMany({
    where: and(eq(purchases.creditCardId, cardId), eq(purchases.userId, userId)),
    with: { installments: true },
  });

  const parcelasDoMes = compras.flatMap((compra) =>
    compra.installments.filter((parcela) => {
      const dueDate = new Date(parcela.dueDate + "T00:00:00");
      return dueDate >= primeiroDia && dueDate <= ultimoDia && !parcela.paid;
    }),
  );

  if (parcelasDoMes.length === 0) return;

  const totalCents = parcelasDoMes.reduce((sum, p) => sum + Math.round(Number(p.amount) * 100), 0);
  const totalAmountStr = (totalCents / 100).toFixed(2);

  const ids = parcelasDoMes.map((p) => p.id);
  const hojeIso = new Date().toISOString().split("T")[0];

  await db.transaction(async (tx) => {
    if (accountId) {
      const [account] = await tx
        .select()
        .from(financialAccounts)
        .where(eq(financialAccounts.id, accountId))
        .for("update")
        .limit(1);

      if (!account) throw new Error("Conta bancária de pagamento não encontrada");
    }

    const [existingTx] = await tx.select().from(transactions).where(
      and(
        eq(transactions.userId, userId),
        eq(transactions.description, invoiceDescription),
        eq(transactions.date, hojeIso),
        eq(transactions.amount, totalAmountStr),
      ),
    ).limit(1);

    await tx.update(installments)
      .set({ paid: true, paidAt: new Date() })
      .where(inArray(installments.id, ids));

    if (!existingTx) {
      await tx.insert(transactions).values({
        userId,
        householdId: primaryHouseholdId,
        description: invoiceDescription,
        amount: totalAmountStr,
        type: "expense",
        date: hojeIso,
        paid: true,
        source: "manual",
        accountId: accountId,
        isInvoicePayment: true,
      });
    }
  });
}

export async function markTransactionAsPaid(userId: string, data: {
  id: number;
}) {
  const { id } = data;

  const householdIds = await getUserHouseholdIds(userId);
  const canAccess = or(
    eq(transactions.userId, userId),
    householdIds.length > 0 ? inArray(transactions.householdId, householdIds) : undefined,
  );

  await db.update(transactions)
    .set({ paid: true })
    .where(and(eq(transactions.id, id), canAccess));
}

export async function deleteRecurringSeries(userId: string, seedId: number) {
  await db
    .delete(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        or(eq(transactions.id, seedId), eq(transactions.recurringParentId, seedId)),
      ),
    );
}

export async function updateWalletExpense(userId: string, data: {
  id: number;
  description: string;
  amount: number;
  date: string;
  categoryId: number | null;
  accountId: number | null;
  paid: boolean;
}) {
  const { id, description, amount, date, categoryId, accountId, paid } = data;

  if (!id || !description || isNaN(amount)) throw new Error("Dados inválidos");

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) throw new Error("Dados inválidos");

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
    await db.batch([
      db
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
        ),
    ]);
  } else {
    await db.batch([
      db
        .update(transactions)
        .set({ ...patch, date: dateObj.toISOString().split("T")[0] })
        .where(and(eq(transactions.id, id), eq(transactions.userId, userId))),
    ]);
  }
}

export async function createTransfer(userId: string, data: {
  sourceAccountId: number;
  destinationAccountId: number;
  amount: number;
  date: string;
  description: string;
}) {
  const { sourceAccountId, destinationAccountId, amount, date, description } = data;

  if (!sourceAccountId || !destinationAccountId || sourceAccountId === destinationAccountId) {
    throw new Error("Contas de origem e destino inválidas ou iguais");
  }

  if (isNaN(amount) || amount <= 0) throw new Error("Valor inválido");

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) throw new Error("Data inválida");

  const householdIds = await getUserHouseholdIds(userId);

  const getAccountValidationCondition = (accountId: number) => {
    return and(
      eq(financialAccounts.id, accountId),
      householdIds.length > 0
        ? or(eq(financialAccounts.userId, userId), inArray(financialAccounts.householdId, householdIds))
        : eq(financialAccounts.userId, userId),
    );
  };

  const [sourceAccount] = await db
    .select()
    .from(financialAccounts)
    .where(getAccountValidationCondition(sourceAccountId))
    .limit(1);

  if (!sourceAccount) throw new Error("Conta de origem não encontrada ou sem acesso");

  const [destinationAccount] = await db
    .select()
    .from(financialAccounts)
    .where(getAccountValidationCondition(destinationAccountId))
    .limit(1);

  if (!destinationAccount) throw new Error("Conta de destino não encontrada ou sem acesso");

  const primaryHouseholdId = householdIds.length > 0 ? householdIds[0] : null;
  const isoDate = dateObj.toISOString().split("T")[0];

  await db.transaction(async (tx) => {
    await tx.insert(transactions).values([
      {
        userId,
        householdId: sourceAccount.householdId || primaryHouseholdId,
        description: `${description} (Saída para ${destinationAccount.name})`,
        amount: amount.toFixed(2),
        type: "transfer",
        date: isoDate,
        accountId: sourceAccountId,
        paid: true,
        source: "manual",
      },
      {
        userId,
        householdId: destinationAccount.householdId || primaryHouseholdId,
        description: `${description} (Entrada de ${sourceAccount.name})`,
        amount: amount.toFixed(2),
        type: "transfer",
        date: isoDate,
        accountId: destinationAccountId,
        paid: true,
        source: "manual",
      },
    ]);
  });
}

export async function deletePurchase(userId: string, data: {
  purchaseId: number;
}) {
  const { purchaseId } = data;

  if (!purchaseId) throw new Error("ID da compra inválido");

  const [purchase] = await db
    .select()
    .from(purchases)
    .where(and(eq(purchases.id, purchaseId), eq(purchases.userId, userId)))
    .limit(1);

  if (!purchase) throw new Error("Compra não encontrada ou sem permissão");

  await db.batch([
    db.delete(installments).where(eq(installments.purchaseId, purchaseId)),
    db.delete(purchases).where(eq(purchases.id, purchaseId)),
  ]);
}

export async function createCreditCardAdjustment(userId: string, data: {
  creditCardId: number;
  amount: number;
  date: string;
  description: string;
  type: string;
  purchaseId: number | null;
}) {
  const { creditCardId, amount, date, description, type, purchaseId } = data;

  if (!creditCardId || isNaN(amount) || !date || !description || !type) {
    throw new Error("Dados inválidos para o ajuste");
  }

  await db.insert(creditCardAdjustments).values({
    userId,
    creditCardId,
    purchaseId,
    type,
    amount: amount.toFixed(2),
    date,
    description,
  });
}

export async function rescueCreditBalance(userId: string, data: {
  creditCardId: number;
  accountId: number;
  amount: number;
  month: string;
  description: string;
}) {
  const { creditCardId, accountId, amount, month, description } = data;

  if (!creditCardId || !accountId || isNaN(amount) || !month) {
    throw new Error("Dados inválidos para resgate");
  }

  const [ano, mes] = month.split("-");
  const dataResgate = new Date(Number(ano), Number(mes), 0).toISOString().split("T")[0];

  const householdIds = await getUserHouseholdIds(userId);
  const primaryHouseholdId = householdIds.length > 0 ? householdIds[0] : null;

  await db.transaction(async (tx) => {
    await tx.insert(creditCardAdjustments).values({
      userId,
      creditCardId,
      type: "rescue",
      amount: amount.toFixed(2),
      date: dataResgate,
      description,
    });

    await tx.insert(transactions).values({
      userId,
      householdId: primaryHouseholdId,
      description,
      amount: amount.toFixed(2),
      type: "income",
      date: dataResgate,
      accountId,
      paid: true,
      source: "manual",
    });
  });
}

async function getPrimaryHouseholdId(userId: string): Promise<string | null> {
  const { getPrimaryHouseholdId } = await import("@/lib/household");
  return getPrimaryHouseholdId(userId);
}

async function getUserHouseholdIds(userId: string): Promise<string[]> {
  const { getUserHouseholdIds } = await import("@/lib/household");
  return getUserHouseholdIds(userId);
}