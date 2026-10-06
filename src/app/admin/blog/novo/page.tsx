// ==========================================
// Arquivo: src/app/admin/blog/novo/page.tsx
// ==========================================
import { auth } from "@/auth"
import { PostForm } from "@/components/Forms/PostForm"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function createPostAction(formData: FormData) {
  "use server"
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "true"

  await db.insert(posts).values({
    title,
    slug,
    excerpt,
    content,
    published,
    authorId: session.user.id,
  })

  revalidatePath("/admin/blog")
  redirect("/admin/blog")
}

export default async function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Criar Novo Post</h1>
      <PostForm action={createPostAction} submitLabel="Publicar Post" />
    </div>
  )
}