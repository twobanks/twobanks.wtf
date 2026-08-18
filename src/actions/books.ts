"use server"

import { auth } from "@/auth"
import { db } from "@/database"
import { books } from "@/database/schema"
import { desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getBooks() {
  try {
    const data = await db.select().from(books).orderBy(desc(books.createdAt))
    return data
  } catch (error) {
    console.error("Erro ao buscar livros:", error)
    return []
  }
}

export async function createBook(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Não autorizado")
  }

const title = formData.get("title") as string
  const author = formData.get("author") as string
  const status = formData.get("status") as string
  const ratingStr = formData.get("rating") as string
  const rating = ratingStr ? parseInt(ratingStr, 10) : null
  await db.insert(books).values({
    title,
    author,
    status,
    rating,
    userId: session.user.id,
  })
  revalidatePath("/livros")
  redirect("/livros")
}

export async function deleteBook(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Não autorizado")
  }

  const id = formData.get("id") as string

  await db.delete(books).where(eq(books.id, id))

  revalidatePath("/livros")
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