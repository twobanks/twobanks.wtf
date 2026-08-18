import { db } from "@/database"
import { books } from "@/database/schema"
import { desc } from "drizzle-orm"

export default async function LivrosIndexPage() {
  const myBooks = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))

  return (
    <main className="min-h-screen w-full max-w-6xl bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto p-4 mx-auto space-y-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Minha Estante
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Livros que estou lendo, já li ou quero ler em breve.
          </p>
        </header>
        
        {myBooks.length === 0 ? (
          <p className="text-center text-zinc-500 italic">Nenhum livro catalogado ainda.</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {myBooks.map((book) => (
              <div 
                key={book.id} 
                className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100">
                      {book.title}
                    </h3>
                    
                    {book.rating && (
                      <div className="flex items-center text-sm tracking-widest mt-0.5">
                        <span className="text-amber-500">
                          {'★'.repeat(book.rating)}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">
                          {'★'.repeat(5 - book.rating)}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                    {book.author}
                  </p>
                </div>
                <div className="shrink-0 ml-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs tracking-wider uppercase font-bold px-3 py-1.5 rounded-full">
                  {book.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}