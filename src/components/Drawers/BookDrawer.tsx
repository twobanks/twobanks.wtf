// ==========================================
// Arquivo: src/components/Drawers/BookDrawer.tsx
// ==========================================
"use client"

import { saveBook } from "@/actions/books"
import { DrawerAlert, DrawerShell, drawerFieldClass } from "@/components/Drawers/drawer-shell"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface BookDrawerProps {
  open: boolean
  onClose: () => void
  book?: { id: string; title: string; author: string; status: string } | null
  onSuccess?: () => void
}

export function BookDrawer({ open, onClose, book, onSuccess }: BookDrawerProps) {
  const [alert, setAlert] = useState<DrawerAlert>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (book?.id) {
        formData.append("id", book.id)
      }
      await saveBook(formData)
      setAlert({ type: "success", message: book ? "Livro atualizado com sucesso!" : "Livro cadastrado com sucesso!" })
      onSuccess?.()
      onClose()
    } catch (error) {
      setAlert({ type: "error", message: "Erro ao salvar o livro." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DrawerShell
      open={open}
      onClose={onClose}
      title={book ? "Editar Livro" : "Novo Livro"}
      description="Preencha os dados da obra literária"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Salvar"
      alert={alert}
      onAlertClose={() => setAlert(null)}
    >
      <Input
        name="title"
        placeholder="Título do Livro"
        defaultValue={book?.title ?? ""}
        required
        autoFocus
        className={`md:col-span-2 ${drawerFieldClass}`}
      />
      <Input
        name="author"
        placeholder="Autor"
        defaultValue={book?.author ?? ""}
        required
        className={`md:col-span-2 ${drawerFieldClass}`}
      />
      <div className="md:col-span-2">
        <Select name="status" defaultValue={book?.status ?? "planning"}>
          <SelectTrigger className={`!h-[52px] ${drawerFieldClass}`}>
            <SelectValue placeholder="Status da Leitura" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planning">Planejado</SelectItem>
            <SelectItem value="reading">Lendo</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </DrawerShell>
  )
}