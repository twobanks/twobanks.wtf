// ==========================================
// Arquivo: src/app/admin/livros/novo/page.tsx
// ==========================================
import { auth } from "@/auth"
import { BookForm } from "@/components/Forms/BookForm"
import { db } from "@/db"
import { books } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function createBookAction(formData: FormData) {
  "use server"
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const status = formData.get("status") as string

  await db.insert(books).values({
    title,
    author,
    status,
    userId: session.user.id,
  })

  revalidatePath("/admin/livros")
  redirect("/admin/livros")
}

export default async function NewBookPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Adicionar Novo Livro</h1>
      <BookForm action={createBookAction} submitLabel="Cadastrar Livro" />
    </div>
  )
}