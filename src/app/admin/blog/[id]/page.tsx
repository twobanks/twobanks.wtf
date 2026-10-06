// ==========================================
// Arquivo: src/app/admin/blog/[id]/page.tsx
// ==========================================
import { auth } from "@/auth"
import { PostForm } from "@/components/Forms/PostForm"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { Metadata } from "next"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const session = await auth();
  if (!session?.user?.id) return { title: "Editar Post" };

  const resolvedParams = await params;
  const post = await db.query.posts.findFirst({
    where: and(eq(posts.id, resolvedParams.id), eq(posts.authorId, session.user.id)),
  });

  return {
    title: post ? `Editar Artigo: ${post.title}` : "Post não encontrado",
  };
}

async function updatePostAction(formData: FormData) {
  "use server"
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "true"

  await db.update(posts)
    .set({ title, slug, excerpt, content, published, updatedAt: new Date() })
    .where(and(eq(posts.id, id), eq(posts.authorId, session.user.id)))

  revalidatePath("/admin/blog")
  redirect("/admin/blog")
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const resolvedParams = await params
  const postId = resolvedParams.id
  if (!postId) notFound()

  const post = await db.query.posts.findFirst({
    where: and(eq(posts.id, postId), eq(posts.authorId, session.user.id)),
  })

  if (!post) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Editar Post</h1>
      <PostForm initialData={post} action={updatePostAction} submitLabel="Salvar Alterações" />
    </div>
  )
}