"use server"

import { z } from "zod";
import { requireUser } from "@/lib/authz";
import {
  createRecurringExpense as createRecurringExpenseSvc,
  updateRecurringExpense as updateRecurringExpenseSvc,
  deleteRecurringExpense as deleteRecurringExpenseSvc,
  generateMonthlyRecurring as generateMonthlyRecurringSvc,
} from "@/services/recurringExpenseService";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/lib/routes";

const recurringExpenseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  dueDay: z.coerce.number().int().min(1).max(31, "Dia de vencimento inválido"),
  categoryId: z.coerce.number().int().positive().optional().nullable(),
  accountId: z.coerce.number().int().positive().optional().nullable(),
  active: z.boolean().default(true),
  startMonth: z.string().regex(/^\d{4}-\d{2}$/, "Mês de início inválido (YYYY-MM)"),
});

const updateRecurringExpenseSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().min(1, "Nome é obrigatório"),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  dueDay: z.coerce.number().int().min(1).max(31, "Dia de vencimento inválido"),
  categoryId: z.coerce.number().int().positive().optional().nullable(),
  accountId: z.coerce.number().int().positive().optional().nullable(),
  active: z.boolean(),
});

const deleteRecurringExpenseSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const generateMonthlyRecurringSchema = z.object({
  year: z.coerce.number().int().min(2000).max(2100),
  month: z.coerce.number().int().min(1).max(12),
});

export async function createRecurringExpense(formData: FormData) {
  const user = await requireUser();

  const parsed = recurringExpenseSchema.parse({
    name: formData.get("name"),
    amount: formData.get("amount"),
    dueDay: formData.get("dueDay"),
    categoryId: formData.get("categoryId"),
    accountId: formData.get("accountId"),
    active: formData.get("active") === "on" || formData.get("active") === "true",
    startMonth: formData.get("startMonth"),
  });

  await createRecurringExpenseSvc(user.id, {
    name: parsed.name,
    amount: parsed.amount,
    dueDay: parsed.dueDay,
    categoryId: parsed.categoryId ?? null,
    accountId: parsed.accountId ?? null,
    active: parsed.active,
    startMonth: parsed.startMonth,
  });

  revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);
  revalidatePath(ROUTES.ADMIN.CARTEIRA);

  return { success: true, data: null };
}

export async function updateRecurringExpense(formData: FormData) {
  const user = await requireUser();

  const parsed = updateRecurringExpenseSchema.parse({
    id: formData.get("id"),
    name: formData.get("name"),
    amount: formData.get("amount"),
    dueDay: formData.get("dueDay"),
    categoryId: formData.get("categoryId"),
    accountId: formData.get("accountId"),
    active: formData.get("active") === "on" || formData.get("active") === "true",
  });

  await updateRecurringExpenseSvc(user.id, {
    id: parsed.id,
    name: parsed.name,
    amount: parsed.amount,
    dueDay: parsed.dueDay,
    categoryId: parsed.categoryId ?? null,
    accountId: parsed.accountId ?? null,
    active: parsed.active,
  });

  revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);
  revalidatePath(ROUTES.ADMIN.CARTEIRA);

  return;
}

export async function deleteRecurringExpense(formData: FormData) {
  const user = await requireUser();

  const parsed = deleteRecurringExpenseSchema.parse({
    id: formData.get("id"),
  });

  await deleteRecurringExpenseSvc(user.id, {
    id: parsed.id,
  });

  revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);
  revalidatePath(ROUTES.ADMIN.CARTEIRA);

  return;
}

export async function generateMonthlyRecurring(formData: FormData) {
  const user = await requireUser();

  const parsed = generateMonthlyRecurringSchema.parse({
    year: formData.get("year"),
    month: formData.get("month"),
  });

  await generateMonthlyRecurringSvc(user.id, {
    year: parsed.year,
    month: parsed.month,
  });

  revalidatePath(ROUTES.ADMIN.CARTEIRA_RECORRENTES);
  revalidatePath(ROUTES.ADMIN.CARTEIRA);

  return;
}