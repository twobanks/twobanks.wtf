"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { creditCards, financialAccounts, installments, purchases, transactions } from "@/db/schema"
import { getPrimaryHouseholdId, getUserHouseholdIds } from "@/lib/household"
import { and, eq, gte, inArray, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const DEFAULT_RECURRING_MONTHS = 12;

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
  const totalMonths = Math.min(
    Math.max(Number(formData.get('recurringMonths') ?? DEFAULT_RECURRING_MONTHS), 1),
    60,
  );

  if (!description || isNaN(amount) || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error('Dados inválidos');
  }

  const householdId = await getPrimaryHouseholdId(userId);

  // 1) Insere a transação Semente (Mês 1)
  const [seed] = await db
    .insert(transactions)
    .values({
      userId,
      householdId,
      description,
      amount: amount.toFixed(2),
      type,
      date: dateStr,
      categoryId,
      accountId,
      paid: true,
      source: 'manual',
      isRecurring,
      recurringParentId: null,
    })
    .returning();

  // 2) Se for recorrente, gera as filhas para os (totalMonths - 1) meses seguintes
  if (isRecurring && seed && totalMonths > 1) {
    const children = Array.from({ length: totalMonths - 1 }, (_, i) => {
      const nextDateStr = addMonthsToDateString(dateStr, i + 1);
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
  revalidatePath('/admin');
}

// File: src/actions/wallet.ts
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

  // Grava a compra original
  const [purchase] = await db.insert(purchases).values({
    userId,
    creditCardId,
    description,
    totalAmount: totalAmount.toFixed(2),
    installments: installmentsCount,
    firstDueDate,
    categoryId,
  }).returning()

  const installmentsData = []
  
  // MELHORIA: Cálculo com Precisão Monetária (Centavos)
  // Evita o erro de R$ 100 / 3 virar R$ 33.33333... e perder 1 centavo no final
  const totalCents = Math.round(totalAmount * 100)
  const baseInstallmentCents = Math.floor(totalCents / installmentsCount)
  const remainderCents = totalCents % installmentsCount

  const [startYear, startMonth, startDay] = firstDueDate.split("-").map(Number);

  for (let i = 0; i < installmentsCount; i++) {
    const targetMonthRaw = startMonth + i;
    const targetYear = startYear + Math.floor((targetMonthRaw - 1) / 12);
    const normalizedMonth = ((targetMonthRaw - 1) % 12) + 1;

    const lastDayOfTargetMonth = new Date(Date.UTC(targetYear, normalizedMonth, 0)).getUTCDate();
    const finalDay = Math.min(startDay, lastDayOfTargetMonth);

    const monthFormatted = String(normalizedMonth).padStart(2, "0");
    const dayFormatted = String(finalDay).padStart(2, "0");
    const dueDateStr = `${targetYear}-${monthFormatted}-${dayFormatted}`;

    // Distribui o resto dos centavos nas primeiras parcelas
    const currentInstallmentCents = baseInstallmentCents + (i < remainderCents ? 1 : 0);
    const installmentAmountStr = (currentInstallmentCents / 100).toFixed(2);

    installmentsData.push({
      purchaseId: purchase.id,
      number: i + 1,
      amount: installmentAmountStr,
      dueDate: dueDateStr,
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
  const session = await auth();
  if (!session?.user) throw new Error('Não autorizado');
  const userId = session.user.id;

  const id = Number(formData.get('id'));
  if (!id) throw new Error('ID inválido');

  // 1) Descobre se a linha faz parte de uma série
  const [tx] = await db
    .select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!tx) throw new Error('Transação não encontrada');

  const seedId = tx.isRecurring ? tx.id : tx.recurringParentId;

  if (seedId) {
    // 2) Série: apaga do mês clicado em diante
    //    - Se clicou na semente (date mais antiga), apaga tudo
    //    - Se clicou numa cópia, preserva os meses anteriores
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
    // Avulsa: apaga só ela
    await db
      .delete(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }

  revalidatePath('/admin/carteira');
  revalidatePath('/admin/recorrentes');
}

export async function toggleInstallmentPaid(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const installmentId = Number(formData.get("id"))
  const paid = formData.get("paid") === "true"

  if (!installmentId) throw new Error("ID inválido")

  const householdIds = await getUserHouseholdIds(userId)
  const primaryHouseholdId = householdIds.length > 0 ? householdIds[0] : null

  // Busca dados completos para criar o espelho bancário
  const [purchase] = await db
    .select({
      userId: purchases.userId,
      description: purchases.description,
      cardName: creditCards.name
    })
    .from(purchases)
    .innerJoin(installments, eq(installments.purchaseId, purchases.id))
    .innerJoin(creditCards, eq(purchases.creditCardId, creditCards.id))
    .where(and(eq(installments.id, installmentId), eq(purchases.userId, userId)))
    .limit(1)

  if (!purchase) throw new Error("Parcela não encontrada")

  const [parcela] = await db.select().from(installments).where(eq(installments.id, installmentId)).limit(1)
  
  // Assinatura única para garantir a idempotência e permitir encontrar o registro ao desmarcar
  const txDescription = `Pagamento Avulso - ${purchase.description} (${purchase.cardName} - Px ${parcela.number})`

  // MELHORIA: Transação Atômica e Sincronização de Caixa
  await db.transaction(async (tx) => {
    // 1. Atualiza o status da parcela
    await tx.update(installments)
      .set({ paid, paidAt: paid ? new Date() : null })
      .where(eq(installments.id, installmentId))

    if (paid) {
      // 2. Verifica Idempotência: Se já existe, não duplica a saída
      const [existing] = await tx.select().from(transactions).where(
        and(eq(transactions.userId, userId), eq(transactions.description, txDescription))
      ).limit(1)

      if (!existing) {
        await tx.insert(transactions).values({
          userId,
          householdId: primaryHouseholdId,
          description: txDescription,
          amount: Number(parcela.amount).toFixed(2),
          type: 'expense',
          date: new Date().toISOString().split("T")[0],
          paid: true,
          source: 'manual',
        })
      }
    } else {
      // 3. Reversão: Se desmarcou como paga, estorna do fluxo de caixa removendo a transação
      await tx.delete(transactions).where(
        and(eq(transactions.userId, userId), eq(transactions.description, txDescription))
      )
    }
  })

  revalidatePath("/admin/carteira/cartoes/[id]", "page")
}

export async function markInvoiceAsPaid(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const cardId = Number(formData.get("cardId"))
  const month = String(formData.get("month") || "")
  const accountId = formData.get("accountId") ? Number(formData.get("accountId")) : null

  if (!cardId || !month) throw new Error("Dados inválidos")

  const householdIds = await getUserHouseholdIds(userId)
  const primaryHouseholdId = householdIds.length > 0 ? householdIds[0] : null

  const [year, monthNum] = month.split("-").map(Number)
  const primeiroDia = new Date(year, monthNum - 1, 1)
  const ultimoDia = new Date(year, monthNum, 0)

  const [card] = await db.select().from(creditCards).where(
    and(eq(creditCards.id, cardId), eq(creditCards.userId, userId))
  ).limit(1)
  
  if (!card) throw new Error("Cartão não encontrado")
  const cardName = card.name
  const invoiceDescription = `Pagamento Fatura - ${cardName} (${month})`

  const compras = await db.query.purchases.findMany({
    where: and(eq(purchases.creditCardId, cardId), eq(purchases.userId, userId)),
    with: { installments: true },
  })

  const parcelasDoMes = compras.flatMap((compra) =>
    compra.installments.filter((parcela) => {
      const dueDate = new Date(parcela.dueDate + "T00:00:00")
      return dueDate >= primeiroDia && dueDate <= ultimoDia && !parcela.paid
    })
  )

  if (parcelasDoMes.length === 0) return

  const totalCents = parcelasDoMes.reduce((sum, p) => sum + Math.round(Number(p.amount) * 100), 0)
  const totalAmountStr = (totalCents / 100).toFixed(2)

  const ids = parcelasDoMes.map(p => p.id)
  const hojeIso = new Date().toISOString().split("T")[0]

  await db.transaction(async (tx) => {
    // BLOQUEIO DE CONCORRÊNCIA: Se uma conta foi informada, travamos a linha dela para leitura/escrita concorrente
    if (accountId) {
      const [account] = await tx
        .select()
        .from(financialAccounts)
        .where(eq(financialAccounts.id, accountId))
        .for("update") // Garante exclusividade de acesso ao saldo nesta fração de segundo
        .limit(1)

      if (!account) throw new Error("Conta bancária de pagamento não encontrada")
      
      // Validação Opcional de Saldo (Descomente abaixo caso queira bloquear saldo negativo)
      /*
      const currentBalance = Number(account.initialBalance) + ... (calcular transações da conta)
      if (currentBalance < (totalCents / 100)) {
        throw new Error("Saldo bancário insuficiente para quitar esta fatura.")
      }
      */
    }

    // Verifica Idempotência
    const [existingTx] = await tx.select().from(transactions).where(
      and(
        eq(transactions.userId, userId),
        eq(transactions.description, invoiceDescription),
        eq(transactions.date, hojeIso),
        eq(transactions.amount, totalAmountStr)
      )
    ).limit(1)

    await tx.update(installments)
      .set({ paid: true, paidAt: new Date() })
      .where(inArray(installments.id, ids))

    if (!existingTx) {
      await tx.insert(transactions).values({
        userId,
        householdId: primaryHouseholdId,
        description: invoiceDescription,
        amount: totalAmountStr,
        type: 'expense',
        date: hojeIso,
        paid: true,
        source: 'manual',
        accountId: accountId,
      })
    }
  })

  revalidatePath("/admin/carteira")
  revalidatePath("/admin/carteira/cartoes/[id]", "page")
  revalidatePath("/admin/carteira/faturas")
  revalidatePath("/admin")
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

  // 1) Descobre se é série
  const [tx] = await db
    .select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!tx) throw new Error('Transação não encontrada');

  const seedId = tx.isRecurring ? tx.id : tx.recurringParentId;

  // Campos que sempre mudam
  const patch = {
    description,
    amount: amount.toFixed(2),
    categoryId,
    accountId,
    paid,
  };

  if (seedId) {
    // 2) Série: atualiza do mês clicado em diante.
    //    NÃO mexe na `date` — os meses ficam fixos para não bagunçar a série.
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
    // 3) Avulsa: atualiza tudo, inclusive a data
    await db
      .update(transactions)
      .set({ ...patch, date: date.toISOString().split('T')[0] })
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
  }

  revalidatePath('/admin/carteira');
  revalidatePath('/admin/recorrentes');
}

export async function createTransfer(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const sourceAccountId = Number(formData.get("sourceAccountId"))
  const destinationAccountId = Number(formData.get("destinationAccountId"))
  const amount = Number(formData.get("amount"))
  const dateStr = String(formData.get("date") ?? "")
  const description = String(formData.get("description") ?? "Transferência entre contas").trim()

  if (!sourceAccountId || !destinationAccountId || sourceAccountId === destinationAccountId) {
    throw new Error("Contas de origem e destino inválidas ou iguais")
  }

  if (isNaN(amount) || amount <= 0) throw new Error("Valor inválido")

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) throw new Error("Data inválida")

  const householdIds = await getUserHouseholdIds(userId)

  const getAccountValidationCondition = (accountId: number) => {
    return and(
      eq(financialAccounts.id, accountId),
      householdIds.length > 0
        ? or(eq(financialAccounts.userId, userId), inArray(financialAccounts.householdId, householdIds))
        : eq(financialAccounts.userId, userId)
    )
  }

  const [sourceAccount] = await db
    .select()
    .from(financialAccounts)
    .where(getAccountValidationCondition(sourceAccountId))
    .limit(1)

  if (!sourceAccount) throw new Error("Conta de origem não encontrada ou sem acesso")

  const [destinationAccount] = await db
    .select()
    .from(financialAccounts)
    .where(getAccountValidationCondition(destinationAccountId))
    .limit(1)

  if (!destinationAccount) throw new Error("Conta de destino não encontrada ou sem acesso")

  const primaryHouseholdId = householdIds.length > 0 ? householdIds[0] : null
  const isoDate = date.toISOString().split("T")[0]

  // Bloco de transação atômica
  await db.transaction(async (tx) => {
    await tx.insert(transactions).values([
      {
        userId,
        householdId: sourceAccount.householdId || primaryHouseholdId,
        description: `${description} (Saída para ${destinationAccount.name})`,
        amount: amount.toFixed(2),
        type: 'transfer',
        date: isoDate,
        accountId: sourceAccountId,
        paid: true,
        source: 'manual',
      },
      {
        userId,
        householdId: destinationAccount.householdId || primaryHouseholdId,
        description: `${description} (Entrada de ${sourceAccount.name})`,
        amount: amount.toFixed(2),
        type: 'transfer',
        date: isoDate,
        accountId: destinationAccountId,
        paid: true,
        source: 'manual',
      },
    ])
  })

  revalidatePath("/admin/carteira")
  revalidatePath("/admin")
}

export async function deletePurchase(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const purchaseId = Number(formData.get("purchaseId"))
  if (!purchaseId) throw new Error("ID da compra inválido")

  // Garante que a compra pertence ao usuário autenticado
  const [purchase] = await db
    .select()
    .from(purchases)
    .where(and(eq(purchases.id, purchaseId), eq(purchases.userId, userId)))
    .limit(1)

  if (!purchase) throw new Error("Compra não encontrada ou sem permissão")

  // Execução sequencial compatível com o driver HTTP do Neon
  await db.delete(installments).where(eq(installments.purchaseId, purchaseId))
  await db.delete(purchases).where(eq(purchases.id, purchaseId))

  revalidatePath("/admin/carteira")
  revalidatePath("/admin/carteira/cartoes")
  revalidatePath("/admin/carteira/cartoes/[id]", "page")
}