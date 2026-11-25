"use server"

import { requireUser } from "@/lib/authz"
import { auth } from "@/auth"
import { db } from "@/db"
import { books } from "@/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getBooks() {
  const session = await requireUser()

  try {
    const data = await db.select().from(books)
      .where(eq(books.userId, session.id))
      .orderBy(desc(books.createdAt))
    return data
  } catch (error) {
    return []
  }
}

export async function saveBook(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const status = formData.get("status") as string

  if (id) {
    // Editar
    await db.update(books)
      .set({ title, author, status })
      .where(and(eq(books.id, id), eq(books.userId, session.user.id)))
  } else {
    // Criar
    await db.insert(books).values({
      title,
      author,
      status,
      userId: session.user.id,
    })
  }

  revalidatePath("/admin/livros")
}

export async function deleteBook(id: string) {
  const session = await auth()
  if (!session?.user?.id) return

  await db.delete(books)
    .where(and(eq(books.id, id), eq(books.userId, session.user.id)))

  revalidatePath("/admin/livros")
}

export async function updateBook(formData: FormData) {
  const session = await requireUser()

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const status = formData.get("status") as string

  const result = await db.update(books)
    .set({ 
      title, 
      author, 
      status,
      updatedAt: new Date(), 
    })
    .where(and(eq(books.id, id), eq(books.userId, session.id)))

  if ((result.rowCount ?? 0) === 0) {
    throw new Error("Livro não encontrado ou sem permissão para editar")
  }

  revalidatePath("/livros")
  redirect("/livros")
}