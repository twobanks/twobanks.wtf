"use server"

import { auth } from "@/auth";
import { db } from "@/database";
import { posts } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Não autorizado")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const published = formData.get("published") === "on"

  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const slug = `${baseSlug}-${Date.now()}`
  await db.insert(posts).values({
    title,
    content,
    excerpt,
    slug,
    published,
    authorId: session.user.id,
  })

  revalidatePath("/blog")
  revalidatePath("/admin/blog") 
  redirect("/admin/blog")
}

export async function deletePost(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autorizado")

  const id = formData.get("id") as string
  await db.delete(posts).where(eq(posts.id, id))

  revalidatePath("/blog")
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