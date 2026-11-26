// src/services/creditCardService.ts
import { db } from "@/db";
import { creditCards, installments, purchases } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export async function createCreditCard(userId: string, data: {
  name: string;
  brand: string;
  creditLimit: number;
  dueDay: number;
  closingDay: number;
  lastFourDigits: string | null;
}) {
  const { name, brand, creditLimit, dueDay, closingDay, lastFourDigits } = data;

  await db.insert(creditCards).values({
    userId,
    name,
    brand: brand || null,
    lastFourDigits: lastFourDigits || null,
    creditLimit: creditLimit > 0 ? creditLimit.toFixed(2) : null,
    dueDay: dueDay > 0 ? dueDay : null,
    closingDay: closingDay > 0 ? closingDay : null,
  });
}

export async function updateCreditCard(userId: string, data: {
  id: number;
  name: string;
  brand: string;
  creditLimit: number;
  dueDay: number;
  closingDay: number;
}) {
  const { id, name, brand, creditLimit, dueDay, closingDay } = data;

  if (!id || !name) throw new Error("Dados inválidos");

  await db
    .update(creditCards)
    .set({
      name,
      brand: brand || null,
      creditLimit: creditLimit > 0 ? creditLimit.toFixed(2) : null,
      dueDay: dueDay > 0 ? dueDay : null,
      closingDay: closingDay > 0 ? closingDay : null,
    })
    .where(and(eq(creditCards.id, id), eq(creditCards.userId, userId)));
}

export async function deleteCreditCard(userId: string, data: {
  id: number;
}) {
  const { id } = data;

  if (!id) throw new Error("ID inválido");

  const [card] = await db
    .select()
    .from(creditCards)
    .where(and(eq(creditCards.id, id), eq(creditCards.userId, userId)))
    .limit(1);

  if (!card) throw new Error("Cartão não encontrado ou sem permissão");

  const cardPurchases = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(eq(purchases.creditCardId, id));

  const purchaseIds = cardPurchases.map((p) => p.id);

  if (purchaseIds.length > 0) {
    await db.delete(installments).where(inArray(installments.purchaseId, purchaseIds));
    await db.delete(purchases).where(eq(purchases.creditCardId, id));
  }

  await db
    .delete(creditCards)
    .where(and(eq(creditCards.id, id), eq(creditCards.userId, userId)));
}