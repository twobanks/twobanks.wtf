// ==========================================
// Arquivo: src/components/Forms/BookForm.tsx
// ==========================================
"use client"

import { drawerFieldClass } from "@/components/Drawers/drawer-shell"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface BookFormProps {
  initialData?: {
    id?: string
    title?: string
    author?: string
    status?: string
  }
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export function BookForm({ initialData, action, submitLabel }: BookFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    if (initialData?.id) {
      formData.append("id", String(initialData.id))
    }
    try {
      await action(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-card border rounded-xl p-6 shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium">Título do Livro</label>
        <Input
          name="title"
          defaultValue={initialData?.title ?? ""}
          placeholder="Ex: O Senhor dos Anéis"
          required
          className={drawerFieldClass}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Autor</label>
        <Input
          name="author"
          defaultValue={initialData?.author ?? ""}
          placeholder="Ex: J.R.R. Tolkien"
          required
          className={drawerFieldClass}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status da Leitura</label>
        <Select name="status" defaultValue={initialData?.status ?? "planning"}>
          <SelectTrigger className={drawerFieldClass}>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planning">Planejado</SelectItem>
            <SelectItem value="reading">Lendo</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  )
}