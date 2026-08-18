"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { categories } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createCategory(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const name = String(formData.get("name"))
  const type = String(formData.get("type")) as "income" | "expense"

  if (!name || !type) throw new Error("Dados inválidos")

  await db.insert(categories).values({
    userId,
    name,
    type,
  })

  revalidatePath("/admin/categorias")
  revalidatePath("/admin/carteira") // para atualizar selects
}

export async function updateCategory(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const userId = session.user.id

  const id = Number(formData.get("id"))
  const name = String(formData.get("name"))
  const type = String(formData.get("type")) as "income" | "expense"

  if (!id || !name || !type) throw new Error("Dados inválidos")

  await db.update(categories)
    .set({ name, type })
    .where(eq(categories.id, id))

  revalidatePath("/admin/categorias")
  revalidatePath("/admin/carteira")
}

export async function deleteCategory(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")
  const id = Number(formData.get("id"))

  if (!id) throw new Error("ID inválido")

  await db.delete(categories).where(eq(categories.id, id))

  revalidatePath("/admin/categorias")
  revalidatePath("/admin/carteira")
}