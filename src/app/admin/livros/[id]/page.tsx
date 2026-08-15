import { updateBook } from "@/actions/books"
import { db } from "@/db"
import { books } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

export default async function EditarLivroPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const [book] = await db.select().from(books).where(eq(books.id, id))

  if (!book) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
        Editar Livro
      </h1>
      
      <form action={updateBook} className="space-y-6">
        <input type="hidden" name="id" value={book.id} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Título</label>
            <input 
              type="text" 
              name="title" 
              required
              defaultValue={book.title} 
              className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Autor</label>
            <input 
              type="text" 
              name="author" 
              required
              defaultValue={book.author}
              className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Status</label>
          <select 
            name="status" 
            defaultValue={book.status}
            className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
          >
            <option value="quero ler">Quero Ler</option>
            <option value="lendo">Lendo</option>
            <option value="lido">Lido</option>
          </select>
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}