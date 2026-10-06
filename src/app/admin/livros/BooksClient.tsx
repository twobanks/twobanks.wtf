// ==========================================
// Arquivo: src/app/admin/livros/BooksClient.tsx
// ==========================================
"use client"

import { deleteBook } from "@/actions/books"
import { BookDrawer } from "@/components/Drawers/BookDrawer"
import { TableActions } from "@/components/Tables/table-actions"
import { BookOpen, Plus } from "lucide-react"
import { useState } from "react"

interface BooksClientProps {
  initialBooks: any[]
}

export function BooksClient({ initialBooks }: BooksClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any | null>(null)

  const handleOpenCreate = () => {
    setSelectedBook(null)
    setIsOpen(true)
  }

  const handleOpenEdit = (book: any) => {
    setSelectedBook(book)
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este livro?")) {
      await deleteBook(id)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Livros</h1>
          <p className="text-sm text-muted-foreground">Acompanhe suas leituras e catálogo literário.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Novo Livro
        </button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6">
          {!initialBooks || initialBooks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-2">
              <BookOpen className="h-8 w-8 opacity-40" />
              <p>Nenhum livro cadastrado.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {initialBooks.map((book) => (
                <div key={book.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author} • <span className="capitalize">{book.status}</span></p>
                    </div>
                  </div>
                  <TableActions
                    id={book.id}
                    isPaid={true}
                    onEdit={() => handleOpenEdit(book)}
                    onDelete={() => handleDelete(book.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BookDrawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        book={selectedBook}
      />
    </div>
  )
}