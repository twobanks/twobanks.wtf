// app/actions/shopping.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/database";
import { ShoppingItem, shoppingItems, ShoppingList, shoppingLists } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const listTypeValues = ["supermercado", "varejao", "acougue"] as const;
export type ListType = (typeof listTypeValues)[number];

const listSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100),
  type: z.enum(listTypeValues),
});

const itemSchema = z.object({
  name: z.string().min(1, "Nome do item é obrigatório").max(100),
  quantity: z.coerce.number().int().positive().default(1),
  unit: z.string().max(20).optional(),
});

async function getUserIdOrThrow() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Não autorizado");
  return userId;
}

// Criar lista
export async function createList(formData: FormData) {
  const userId = await getUserIdOrThrow();
  const parsed = listSchema.parse({
    name: formData.get("name"),
    type: formData.get("type"),
  });

  await db.insert(shoppingLists).values({
    name: parsed.name,
    type: parsed.type,
    userId,
  });

  revalidatePath("/listas");
}

// Atualizar lista
export async function updateList(listId: ShoppingList["id"], formData: FormData) {
  const userId = await getUserIdOrThrow();
  const parsed = listSchema.parse({
    name: formData.get("name"),
    type: formData.get("type"),
  });

  const result = await db
    .update(shoppingLists)
    .set({ name: parsed.name, type: parsed.type, updatedAt: new Date() })
    .where(and(eq(shoppingLists.id, listId), eq(shoppingLists.userId, userId)))
    .returning({ id: shoppingLists.id });

  if (result.length === 0) throw new Error("Lista não encontrada");
  revalidatePath("/listas");
}

// Excluir lista
export async function deleteList(listId: ShoppingList["id"]) {
  const userId = await getUserIdOrThrow();
  await db
    .delete(shoppingLists)
    .where(and(eq(shoppingLists.id, listId), eq(shoppingLists.userId, userId)));
  revalidatePath("/listas");
}

// Adicionar item a uma lista
export async function addItem(listId: ShoppingList["id"], formData: FormData) {
  const userId = await getUserIdOrThrow();

  // Verifica se a lista pertence ao usuário
  const list = await db
    .select()
    .from(shoppingLists)
    .where(and(eq(shoppingLists.id, listId), eq(shoppingLists.userId, userId)));

  if (list.length === 0) throw new Error("Lista não encontrada");

  const parsed = itemSchema.parse({
    name: formData.get("name"),
    quantity: formData.get("quantity") || 1,
    unit: formData.get("unit") || undefined,
  });

  await db.insert(shoppingItems).values({
    listId,
    name: parsed.name,
    quantity: parsed.quantity,
    unit: parsed.unit,
  });

  revalidatePath("/listas");
}

// Marcar/desmarcar item como comprado
export async function toggleItem(itemId: ShoppingItem["id"]) {
  const userId = await getUserIdOrThrow();

  const item = await db
    .select()
    .from(shoppingItems)
    .innerJoin(shoppingLists, eq(shoppingItems.listId, shoppingLists.id))
    .where(and(eq(shoppingItems.id, itemId), eq(shoppingLists.userId, userId)))
    .limit(1);

  if (item.length === 0) throw new Error("Item não encontrado");

  const current = item[0].shopping_items;
  await db
    .update(shoppingItems)
    .set({ checked: !current.checked })
    .where(eq(shoppingItems.id, itemId));

  revalidatePath("/listas");
}

// Excluir item
export async function deleteItem(itemId: ShoppingItem["id"]) {
  const userId = await getUserIdOrThrow();

  const item = await db
    .select({ id: shoppingItems.id })
    .from(shoppingItems)
    .innerJoin(shoppingLists, eq(shoppingItems.listId, shoppingLists.id))
    .where(and(eq(shoppingItems.id, itemId), eq(shoppingLists.userId, userId)))
    .limit(1);

  if (item.length === 0) throw new Error("Item não encontrado");

  await db.delete(shoppingItems).where(eq(shoppingItems.id, itemId));
  revalidatePath("/listas");
}