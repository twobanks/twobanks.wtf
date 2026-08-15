import { deleteBook } from "@/actions/books"
import { DeleteButton } from "@/components/DeleteButton"
import { db } from "@/db"
import { books } from "@/db/schema"
import { desc } from "drizzle-orm"
import Link from "next/link"

export default async function DashboardLivrosPage() {
  const myBooks = await db.select().from(books).orderBy(desc(books.createdAt))

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Gerenciar Livros
        </h1>
        <Link 
          href="/admin/livros/novo"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          + Novo Livro
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          <thead className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Título do Livro</th>
              <th className="px-6 py-4">Autor</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {myBooks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 italic">
                  Nenhum livro encontrado.
                </td>
              </tr>
            ) : (
              myBooks.map((book) => (
                <tr key={book.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {book.title}
                  </td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                      {book.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link 
                      href={`/admin/livros/${book.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      Editar
                    </Link>
                    <form action={deleteBook} className="inline-block">
                      <input type="hidden" name="id" value={book.id} />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}