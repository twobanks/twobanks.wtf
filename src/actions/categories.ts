"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { categories } from "@/db/schema"
import { getPrimaryHouseholdId, getUserHouseholdIds } from "@/lib/household"
import { ROUTES } from "@/lib/routes"
import { and, eq, inArray, or } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createCategory(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) throw new Error("Não autorizado")
    const userId = session.user.id

    const name = String(formData.get("name"))
    const type = String(formData.get("type")) as "income" | "expense"

    if (!name || !type) throw new Error("Dados inválidos")

    const householdId = await getPrimaryHouseholdId(userId)

    await db.insert(categories).values({
      userId,
      householdId,
      name,
      type,
    })

    revalidatePath(ROUTES.ADMIN.CARTEIRA_CATEGORIAS)
    revalidatePath(ROUTES.ADMIN.CARTEIRA)
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    if (error instanceof Error && (error.message === "Não autorizado" || error.message === "Dados inválidos")) {
      throw error;
    }
    throw new Error("Não foi possível criar a categoria.");
  }
}

export async function updateCategory(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) throw new Error("Não autorizado")
    const userId = session.user.id

    const id = Number(formData.get("id"))
    const name = String(formData.get("name"))
    const type = String(formData.get("type")) as "income" | "expense"

    if (!id || !name || !type) throw new Error("Dados inválidos")

    const householdIds = await getUserHouseholdIds(userId)
    const canAccess = or(
      eq(categories.userId, userId),
      householdIds.length > 0 ? inArray(categories.householdId, householdIds) : undefined
    )

    await db.update(categories)
      .set({ name, type })
      .where(and(eq(categories.id, id), canAccess))

    revalidatePath(ROUTES.ADMIN.CARTEIRA_CATEGORIAS)
    revalidatePath(ROUTES.ADMIN.CARTEIRA)
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    if (error instanceof Error && (error.message === "Não autorizado" || error.message === "Dados inválidos")) {
      throw error;
    }
    throw new Error("Não foi possível atualizar a categoria.");
  }
}

export async function deleteCategory(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) throw new Error("Não autorizado")
    const userId = session.user.id

    const id = Number(formData.get("id"))
    if (!id) throw new Error("ID inválido")

    const householdIds = await getUserHouseholdIds(userId)
    const canAccess = or(
      eq(categories.userId, userId),
      householdIds.length > 0 ? inArray(categories.householdId, householdIds) : undefined
    )

    await db.delete(categories)
      .where(and(eq(categories.id, id), canAccess))

    revalidatePath(ROUTES.ADMIN.CARTEIRA_CATEGORIAS)
    revalidatePath(ROUTES.ADMIN.CARTEIRA)
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    if (error instanceof Error && (error.message === "Não autorizado" || error.message === "ID inválido")) {
      throw error;
    }
    throw new Error("Não foi possível excluir a categoria.");
  }
}