"use server"

import { z } from "zod";
import { requireUser } from "@/lib/authz";
import {
  createCreditCard as createCreditCardSvc,
  updateCreditCard as updateCreditCardSvc,
  deleteCreditCard as deleteCreditCardSvc,
} from "@/services/creditCardService";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/lib/routes";

const creditCardSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  brand: z.string().default(""),
  creditLimit: z.coerce.number().nonnegative().default(0),
  dueDay: z.coerce.number().nonnegative().default(0),
  closingDay: z.coerce.number().nonnegative().default(0),
  lastFourDigits: z.string().optional().nullable(),
});

const updateCreditCardSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().min(1, "Nome é obrigatório"),
  brand: z.string().default(""),
  creditLimit: z.coerce.number().nonnegative().default(0),
  dueDay: z.coerce.number().nonnegative().default(0),
  closingDay: z.coerce.number().nonnegative().default(0),
});

const deleteCreditCardSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function createCreditCard(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = creditCardSchema.parse({
      name: formData.get("name"),
      brand: formData.get("brand") || "",
      creditLimit: formData.get("creditLimit") || 0,
      dueDay: formData.get("dueDay") || 0,
      closingDay: formData.get("closingDay") || 0,
      lastFourDigits: formData.get("lastFourDigits") || null,
    });

    await createCreditCardSvc(user.id, {
      name: parsed.name,
      brand: parsed.brand,
      creditLimit: parsed.creditLimit,
      dueDay: parsed.dueDay,
      closingDay: parsed.closingDay,
      lastFourDigits: parsed.lastFourDigits ?? null,
    });

    revalidatePath(ROUTES.ADMIN.CARTEIRA_CARTOES);
    revalidatePath(ROUTES.ADMIN.CARTEIRA);

    return { success: true, data: null };
  } catch (error) {
    console.error("Erro ao criar cartão de crédito:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    return { success: false, error: "Não foi possível criar o cartão de crédito." };
  }
}

export async function updateCreditCard(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = updateCreditCardSchema.parse({
      id: formData.get("id"),
      name: formData.get("name"),
      brand: formData.get("brand") || "",
      creditLimit: formData.get("creditLimit") || 0,
      dueDay: formData.get("dueDay") || 0,
      closingDay: formData.get("closingDay") || 0,
    });

    await updateCreditCardSvc(user.id, {
      id: parsed.id,
      name: parsed.name,
      brand: parsed.brand,
      creditLimit: parsed.creditLimit,
      dueDay: parsed.dueDay,
      closingDay: parsed.closingDay,
    });

    revalidatePath(ROUTES.ADMIN.CARTEIRA_CARTOES);
    revalidatePath(ROUTES.ADMIN.CARTEIRA);

    return { success: true, data: null };
  } catch (error) {
    console.error("Erro ao atualizar cartão de crédito:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    return { success: false, error: "Não foi possível atualizar o cartão de crédito." };
  }
}

export async function deleteCreditCard(formData: FormData) {
  try {
    const user = await requireUser();

    const parsed = deleteCreditCardSchema.parse({
      id: formData.get("id"),
    });

    await deleteCreditCardSvc(user.id, {
      id: parsed.id,
    });

    revalidatePath(ROUTES.ADMIN.CARTEIRA_CARTOES);
    revalidatePath(ROUTES.ADMIN.CARTEIRA);
    revalidatePath(ROUTES.ADMIN.CARTEIRA_FATURAS);

    return;
  } catch (error) {
    console.error("Erro ao excluir cartão de crédito:", error);
    throw new Error("Não foi possível excluir o cartão de crédito.");
  }
}