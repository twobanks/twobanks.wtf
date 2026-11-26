"use server"

import { auth } from "@/auth";
import { requireUser } from "@/lib/authz";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function savePost(formData: FormData) {
  try {
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
  } catch (error) {
    console.error("Erro ao salvar post:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    throw new Error("Não foi possível salvar o post.");
  }
}

export async function deletePost(id: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) return

    await db.delete(posts)
      .where(and(eq(posts.id, id), eq(posts.authorId, session.user.id)))

    revalidatePath("/admin/blog")
  } catch (error) {
    console.error("Erro ao excluir post:", error);
    if (error instanceof Error && error.message === "Não autorizado") {
      throw error;
    }
    throw new Error("Não foi possível excluir o post.");
  }
}

export async function updatePost(formData: FormData) {
  try {
    const session = await requireUser()

    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const excerpt = formData.get("excerpt") as string
    const published = formData.get("published") === "on" 

    const result = await db.update(posts)
      .set({
        title,
        content,
        excerpt,
        published,
        updatedAt: new Date(),
      })
      .where(and(eq(posts.id, id), eq(posts.authorId, session.id)))

    if ((result.rowCount ?? 0) === 0) {
      throw new Error("Post não encontrado ou sem permissão para editar")
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    redirect("/admin/blog")
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    if (error instanceof Error && error.message === "Post não encontrado ou sem permissão para editar") {
      throw error;
    }
    throw new Error("Não foi possível atualizar o post.");
  }
}