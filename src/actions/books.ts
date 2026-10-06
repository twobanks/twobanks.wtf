"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { books } from "@/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getBooks() {
  try {
    const data = await db.select().from(books).orderBy(desc(books.createdAt))
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
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Não autorizado")
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const status = formData.get("status") as string

  await db.update(books)
    .set({ 
      title, 
      author, 
      status,
      updatedAt: new Date(), 
    })
    .where(eq(books.id, id))

  revalidatePath("/livros")
  redirect("/livros")
}