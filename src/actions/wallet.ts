"use server"

import { z } from "zod";
import { requireUser } from "@/lib/authz";
import {
  createTransaction as createTransactionSvc,
  createInstallmentPurchase as createInstallmentPurchaseSvc,
  updateTransaction as updateTransactionSvc,
  deleteTransaction as deleteTransactionSvc,
  toggleInstallmentPaid as toggleInstallmentPaidSvc,
  markInvoiceAsPaid as markInvoiceAsPaidSvc,
  markTransactionAsPaid as markTransactionAsPaidSvc,
  deleteRecurringSeries as deleteRecurringSeriesSvc,
  updateWalletExpense as updateWalletExpenseSvc,
  createTransfer as createTransferSvc,
  deletePurchase as deletePurchaseSvc,
  createCreditCardAdjustment as createCreditCardAdjustmentSvc,
  rescueCreditBalance as rescueCreditBalanceSvc,
} from "@/services/walletService";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/lib/routes";

const transactionSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  type: z.enum(["income", "expense"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)"),
  categoryId: z.coerce.number().int().positive().optional().nullable(),
  accountId: z.coerce.number().int().positive().optional().nullable(),
  isRecurring: z.boolean().default(false),
  recurringMonths: z.coerce.number().int().min(1).max(60).default(12),
});

export async function createTransaction(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = transactionSchema.parse({
      description: formData.get("description"),
      amount: formData.get("amount"),
      type: formData.get("type"),
      date: formData.get("date"),
      categoryId: formData.get("categoryId"),
      accountId: formData.get("accountId"),
      isRecurring: formData.get("isRecurring") === "on",
      recurringMonths: formData.get("recurringMonths"),
    });

    const raw = Number(formData.get("recurringMonths") ?? 12);
    const totalMonths = Math.min(Math.max(raw, 1), 60);

    await createTransactionSvc(user.id, {
      description: parsed.description,
      amount: parsed.amount,
      type: parsed.type,
      date: parsed.date,
      categoryId: parsed.categoryId ?? null,
      accountId: parsed.accountId ?? null,
      isRecurring: parsed.isRecurring,
      totalMonths,
    });

    revalidatePath("/admin/carteira");
    revalidatePath("/admin");

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao criar transação:", _error);
    if (_error instanceof Error && _error.message === "Não autorizado") {
      throw _error;
    }
    return { success: false, error: "Não foi possível criar a transação." };
  }
}

const installmentPurchaseSchema = z.object({
  creditCardId: z.coerce.number().int().positive(),
  description: z.string().min(1, "Descrição é obrigatória"),
  totalAmount: z.coerce.number().positive("Valor total deve ser positivo"),
  installments: z.coerce.number().int().min(1, "Número de parcelas deve ser pelo menos 1"),
  firstDueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)"),
  categoryId: z.coerce.number().int().positive().optional().nullable(),
  purchaseDate: z.string().optional().nullable(),
});

export async function createInstallmentPurchase(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = installmentPurchaseSchema.parse({
      creditCardId: formData.get("creditCardId"),
      description: formData.get("description"),
      totalAmount: formData.get("totalAmount"),
      installments: formData.get("installments"),
      firstDueDate: formData.get("firstDueDate"),
      categoryId: formData.get("categoryId"),
      purchaseDate: formData.get("purchaseDate") || undefined,
    });

    await createInstallmentPurchaseSvc(user.id, {
      creditCardId: parsed.creditCardId,
      description: parsed.description,
      totalAmount: parsed.totalAmount,
      installmentsCount: parsed.installments,
      firstDueDate: parsed.firstDueDate,
      categoryId: parsed.categoryId ?? null,
      purchaseDate: parsed.purchaseDate ?? undefined,
    });

    revalidatePath("/admin/carteira");

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao criar compra parcelada:", _error);
    if (_error instanceof Error && _error.message === "Não autorizado") {
      throw _error;
    }
    return {
      success: false,
      error: "Não foi possível criar a compra parcelada.",
    };
  }
}

const updateTransactionSchema = z.object({
  id: z.coerce.number().int().positive(),
  description: z.string().optional(),
  amount: z.coerce.number().positive().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)").optional(),
  paid: z.boolean().optional(),
});

export async function updateTransaction(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = updateTransactionSchema.parse({
      id: formData.get("id"),
      description: formData.get("description") || undefined,
      amount: formData.get("amount") || undefined,
      date: formData.get("date") || undefined,
      paid: formData.get("paid") === "on" ? true : formData.get("paid") === "off" ? false : undefined,
    });

    await updateTransactionSvc(user.id, {
      id: parsed.id,
      description: parsed.description,
      amount: parsed.amount,
      date: parsed.date,
      paid: parsed.paid,
    });

    revalidatePath("/admin/carteira");

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao atualizar transação:", _error);
    if (_error instanceof Error && _error.message === "Não autorizado") {
      throw _error;
    }
    return { success: false, error: "Não foi possível atualizar a transação." };
  }
}

const deleteTransactionSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function deleteTransaction(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = deleteTransactionSchema.parse({
      id: formData.get("id"),
    });

    await deleteTransactionSvc(user.id, {
      id: parsed.id,
    });

    revalidatePath(ROUTES.ADMIN.CARTEIRA);
    revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao excluir transação:", _error);
    if (_error instanceof Error && _error.message === "Não autorizado") {
      throw _error;
    }
    return { success: false, error: "Não foi possível excluir a transação." };
  }
}

const toggleInstallmentPaidSchema = z.object({
  id: z.coerce.number().int().positive(),
  paid: z.boolean(),
});

export async function toggleInstallmentPaid(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = toggleInstallmentPaidSchema.parse({
      id: formData.get("id"),
      paid: formData.get("paid") === "true",
    });

    await toggleInstallmentPaidSvc(user.id, {
      installmentId: parsed.id,
      paid: parsed.paid,
    });

    revalidatePath("/admin/carteira/cartoes/[id]", "page");

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao alternar parcela paga:", _error);
    return { success: false, error: "Não foi possível alternar a parcela." };
  }
}

const markInvoiceAsPaidSchema = z.object({
  cardId: z.coerce.number().int().positive(),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Mês inválido (YYYY-MM)"),
  accountId: z.coerce.number().int().positive().optional().nullable(),
});

export async function markInvoiceAsPaid(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = markInvoiceAsPaidSchema.parse({
      cardId: formData.get("cardId"),
      month: formData.get("month"),
      accountId: formData.get("accountId") || undefined,
    });

    await markInvoiceAsPaidSvc(user.id, {
      cardId: parsed.cardId,
      month: parsed.month,
      accountId: parsed.accountId ?? null,
    });

    revalidatePath("/admin/carteira");
    revalidatePath("/admin/carteira/cartoes/[id]", "page");
    revalidatePath("/admin/carteira/faturas");
    revalidatePath("/admin");

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao marcar fatura como paga:", _error);
    return { success: false, error: "Não foi possível marcar a fatura como paga." };
  }
}

const markTransactionAsPaidSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function markTransactionAsPaid(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = markTransactionAsPaidSchema.parse({
      id: formData.get("id"),
    });

    await markTransactionAsPaidSvc(user.id, {
      id: parsed.id,
    });

    revalidatePath("/admin/carteira");

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao marcar transação como paga:", _error);
    return { success: false, error: "Não foi possível marcar a transação como paga." };
  }
}

export async function deleteRecurringSeries(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = z.object({
      seedId: z.coerce.number().int().positive(),
    }).parse({
      seedId: formData.get("seedId"),
    });

    await deleteRecurringSeriesSvc(user.id, parsed.seedId);

    revalidatePath("/admin/carteira");

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao excluir série recorrente:", _error);
    if (_error instanceof Error && _error.message === "Não autorizado") {
      throw _error;
    }
    return { success: false, error: "Não foi possível excluir a série recorrente." };
  }
}

const walletExpenseSchema = z.object({
  id: z.coerce.number().int().positive(),
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)"),
  categoryId: z.coerce.number().int().positive().optional().nullable(),
  accountId: z.coerce.number().int().positive().optional().nullable(),
  paid: z.boolean(),
});

export async function updateExpense(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = walletExpenseSchema.parse({
      id: formData.get("id"),
      description: formData.get("description"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      categoryId: formData.get("categoryId"),
      accountId: formData.get("accountId"),
      paid: formData.get("paid") === "on",
    });

    await updateWalletExpenseSvc(user.id, {
      id: parsed.id,
      description: parsed.description,
      amount: parsed.amount,
      date: parsed.date,
      categoryId: parsed.categoryId ?? null,
      accountId: parsed.accountId ?? null,
      paid: parsed.paid,
    });

    revalidatePath(ROUTES.ADMIN.CARTEIRA);
    revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao atualizar despesa da carteira:", _error);
    if (_error instanceof Error && _error.message === "Não autorizado") {
      throw _error;
    }
    return { success: false, error: "Não foi possível atualizar a despesa." };
  }
}

const transferSchema = z.object({
  sourceAccountId: z.coerce.number().int().positive(),
  destinationAccountId: z.coerce.number().int().positive(),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)"),
  description: z.string().min(1, "Descrição é obrigatória").default("Transferência entre contas"),
});

export async function createTransfer(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = transferSchema.parse({
      sourceAccountId: formData.get("sourceAccountId"),
      destinationAccountId: formData.get("destinationAccountId"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      description: formData.get("description") ?? "Transferência entre contas",
    });

    await createTransferSvc(user.id, {
      sourceAccountId: parsed.sourceAccountId,
      destinationAccountId: parsed.destinationAccountId,
      amount: parsed.amount,
      date: parsed.date,
      description: parsed.description,
    });

    revalidatePath("/admin/carteira");
    revalidatePath("/admin");

    return { success: true, data: null };
  } catch (_error) {
    console.error("Erro ao criar transferência:", _error);
    if (_error instanceof Error && _error.message === "Não autorizado") {
      throw _error;
    }
    return { success: false, error: "Não foi possível criar a transferência." };
  }
}

const deletePurchaseSchema = z.object({
  purchaseId: z.coerce.number().int().positive(),
});

export async function deletePurchase(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = deletePurchaseSchema.parse({
      purchaseId: formData.get("purchaseId"),
    });

    await deletePurchaseSvc(user.id, {
      purchaseId: parsed.purchaseId,
    });

    revalidatePath("/admin/carteira");
    revalidatePath("/admin/carteira/cartoes");
    revalidatePath("/admin/carteira/cartoes/[id]", "page");

    return;
  } catch (_error) {
    console.error("Erro ao excluir compra:", _error);
    throw new Error("Não foi possível excluir a compra.");
  }
}

const creditCardAdjustmentSchema = z.object({
  creditCardId: z.coerce.number().int().positive(),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)"),
  description: z.string().min(1, "Descrição é obrigatória"),
  type: z.string().min(1, "Tipo é obrigatório"),
  purchaseId: z.coerce.number().int().positive().optional().nullable(),
});

export async function createCreditCardAdjustment(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = creditCardAdjustmentSchema.parse({
      creditCardId: formData.get("creditCardId"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      description: formData.get("description"),
      type: formData.get("type"),
      purchaseId: formData.get("purchaseId") || undefined,
    });

    await createCreditCardAdjustmentSvc(user.id, {
      creditCardId: parsed.creditCardId,
      amount: parsed.amount,
      date: parsed.date,
      description: parsed.description,
      type: parsed.type,
      purchaseId: parsed.purchaseId ?? null,
    });

    revalidatePath("/admin/carteira");
    revalidatePath("/admin/carteira/cartoes");
    revalidatePath("/admin/carteira/cartoes/[id]", "page");
    revalidatePath("/admin/carteira/faturas");

    return;
  } catch (_error) {
    console.error("Erro ao criar ajuste de cartão:", _error);
    throw new Error("Não foi possível criar o ajuste de cartão.");
  }
}

const rescueCreditBalanceSchema = z.object({
  creditCardId: z.coerce.number().int().positive(),
  accountId: z.coerce.number().int().positive(),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Mês inválido (YYYY-MM)"),
  description: z.string().min(1, "Descrição é obrigatória"),
});

export async function rescueCreditBalance(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = rescueCreditBalanceSchema.parse({
      creditCardId: formData.get("creditCardId"),
      accountId: formData.get("accountId"),
      amount: formData.get("amount"),
      month: formData.get("month"),
      description: formData.get("description") || "Resgate de Crédito de Fatura",
    });

    await rescueCreditBalanceSvc(user.id, {
      creditCardId: parsed.creditCardId,
      accountId: parsed.accountId,
      amount: parsed.amount,
      month: parsed.month,
      description: parsed.description,
    });

    revalidatePath("/admin/carteira");
    revalidatePath("/admin/carteira/cartoes");
    revalidatePath("/admin/carteira/cartoes/[id]", "page");
    revalidatePath("/admin/carteira/faturas");

    return;
  } catch (_error) {
    console.error("Erro ao resgatar saldo de crédito:", _error);
    throw new Error("Não foi possível resgatar o saldo de crédito.");
  }
}
