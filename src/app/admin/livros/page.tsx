// ==========================================
// Arquivo: src/app/admin/livros/page.tsx
// ==========================================
import { auth } from "@/auth"
import { db } from "@/db"
import { books } from "@/db/schema"
import { getUserHouseholdIds } from "@/lib/household"
import { eq, or } from "drizzle-orm"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { BooksClient } from "./BooksClient"

export const metadata: Metadata = {
  title: "Livros",
}

export default async function AdminLivrosPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/")
  }

  const userId = session.user.id
  const householdIds = await getUserHouseholdIds(userId)

  const accessCondition = (tableColumn: any) => {
    const conditions = [eq(tableColumn, userId)]
    return conditions.length > 1 ? or(...conditions) : conditions[0]
  }

  const userBooks = await db.query.books.findMany({
    where: accessCondition(books.userId),
    orderBy: (b, { desc }) => [desc(b.createdAt)],
  })

  return <BooksClient initialBooks={userBooks} />
}