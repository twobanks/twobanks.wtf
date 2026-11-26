// src/actions/expenses.ts
"use server"

import { z } from "zod";
import { requireUser } from "@/lib/authz";
import { createExpense as createExpenseSvc, updateExpense as updateExpenseSvc, deleteExpense as deleteExpenseSvc, deleteExpenseSeries as deleteExpenseSeriesSvc } from "@/services/expenseService";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/lib/routes";

const expenseSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)"),
  categoryId: z.coerce.number().int().positive().optional().nullable(),
  accountId: z.coerce.number().int().positive().optional().nullable(),
  paid: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  recurringMonths: z.coerce.number().int().min(1).max(60).default(12),
});

const updateExpenseSchema = z.object({
  id: z.coerce.number().int().positive(),
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)"),
  categoryId: z.coerce.number().int().positive().optional().nullable(),
  accountId: z.coerce.number().int().positive().optional().nullable(),
  paid: z.boolean(),
});

const deleteExpenseSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function createExpense(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = expenseSchema.parse({
      description: formData.get("description"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      categoryId: formData.get("categoryId"),
      accountId: formData.get("accountId"),
      paid: formData.get("paid") === "on",
      isRecurring: formData.get("isRecurring") === "on",
      recurringMonths: formData.get("recurringMonths"),
    });

    const raw = Number(formData.get("recurringMonths") ?? 12);
    const recurringMonths = Math.min(Math.max(raw, 1), 60);

    const dateStr = parsed.date;
    const [year, month, day] = dateStr.split("-").map(Number);

    let dueDay = day;
    if (parsed.isRecurring) {
      const rawDueDay = Number(formData.get("dueDay"));
      if (rawDueDay >= 1 && rawDueDay <= 31) dueDay = rawDueDay;
    }

    await createExpenseSvc(user.id, {
      description: parsed.description,
      amount: parsed.amount,
      date: parsed.date,
      categoryId: parsed.categoryId ?? null,
      accountId: parsed.accountId ?? null,
      paid: parsed.paid,
      isRecurring: parsed.isRecurring,
      recurringMonths,
    });

    revalidatePath(ROUTES.ADMIN.CARTEIRA);
    revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);

    return { success: true, data: null };
  } catch (error) {
    console.error("Erro ao criar despesa:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    return { success: false, error: "Não foi possível criar a despesa." };
  }
}

export async function updateExpense(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = updateExpenseSchema.parse({
      id: formData.get("id"),
      description: formData.get("description"),
      amount: formData.get("amount"),
      date: formData.get("date"),
      categoryId: formData.get("categoryId"),
      accountId: formData.get("accountId"),
      paid: formData.get("paid") === "on",
    });

    await updateExpenseSvc(user.id, {
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
  } catch (error) {
    console.error("Erro ao atualizar despesa:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    return { success: false, error: "Não foi possível atualizar a despesa." };
  }
}

export async function deleteExpenseSeries(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = z.object({
      seedId: z.coerce.number().int().positive(),
    }).parse({
      seedId: formData.get("seedId"),
    });

    await deleteExpenseSeriesSvc(user.id, parsed.seedId);

    revalidatePath(ROUTES.ADMIN.CARTEIRA);
    revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);

    return { success: true, data: null };
  } catch (error) {
    console.error("Erro ao excluir série de despesas:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    return { success: false, error: "Não foi possível excluir a série de despesas." };
  }
}

export async function deleteExpense(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = deleteExpenseSchema.parse({
      id: formData.get("id"),
    });

    await deleteExpenseSvc(user.id, {
      id: parsed.id,
    });

    revalidatePath(ROUTES.ADMIN.CARTEIRA);
    revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);

    return { success: true, data: null };
  } catch (error) {
    console.error("Erro ao excluir despesa:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    return { success: false, error: "Não foi possível excluir a despesa." };
  }
}