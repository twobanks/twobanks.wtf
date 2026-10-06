"use server"

import { auth } from "@/auth";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function savePost(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "true"

  if (id) {
    // Editar
    await db.update(posts)
      .set({ title, slug, excerpt, content, published, updatedAt: new Date() })
      .where(and(eq(posts.id, id), eq(posts.authorId, session.user.id)))
  } else {
    // Criar
    await db.insert(posts).values({
      title,
      slug,
      excerpt,
      content,
      published,
      authorId: session.user.id,
    })
  }

  revalidatePath("/admin/blog")
}

export async function deletePost(id: string) {
  const session = await auth()
  if (!session?.user?.id) return

  await db.delete(posts)
    .where(and(eq(posts.id, id), eq(posts.authorId, session.user.id)))

  revalidatePath("/admin/blog")
}

export async function updatePost(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autorizado")

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const published = formData.get("published") === "on" 

  await db.update(posts)
    .set({
      title,
      content,
      excerpt,
      published,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  redirect("/admin/blog")
}