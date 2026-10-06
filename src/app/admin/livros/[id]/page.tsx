// ==========================================
// Arquivo: src/app/admin/livros/[id]/page.tsx
// ==========================================
import { auth } from "@/auth"
import { BookForm } from "@/components/Forms/BookForm"
import { db } from "@/db"
import { books } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { Metadata } from "next"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const session = await auth();
  if (!session?.user?.id) return { title: "Editar Livro" };

  const resolvedParams = await params;
  const book = await db.query.books.findFirst({
    where: and(eq(books.id, resolvedParams.id), eq(books.userId, session.user.id)),
  });

  return {
    title: book ? `Editar: ${book.title}` : "Livro não encontrado",
  };
}

async function updateBookAction(formData: FormData) {
  "use server"
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const status = formData.get("status") as string

  await db.update(books)
    .set({ title, author, status })
    .where(and(eq(books.id, id), eq(books.userId, session.user.id)))

  revalidatePath("/admin/livros")
  redirect("/admin/livros")
}

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const bookId = params.id;
  if (!bookId) notFound()

  const book = await db.query.books.findFirst({
    where: and(eq(books.id, bookId), eq(books.userId, session.user.id)),
  })

  if (!book) notFound()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Editar Livro</h1>
      <BookForm initialData={book} action={updateBookAction} submitLabel="Salvar Alterações" />
    </div>
  )
}