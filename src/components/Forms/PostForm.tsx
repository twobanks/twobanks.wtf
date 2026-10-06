// ==========================================
// Arquivo: src/components/Forms/PostForm.tsx
// ==========================================
"use client"

import { drawerFieldClass } from "@/components/Drawers/drawer-shell"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface PostFormProps {
  initialData?: {
    id?: string // Ajustado de number para string
    title?: string
    slug?: string
    excerpt?: string | null
    content?: string
    published?: boolean
  }
  action: (formData: FormData) => Promise<void>
  submitLabel: string
}

export function PostForm({ initialData, action, submitLabel }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    if (initialData?.id) {
      formData.append("id", initialData.id)
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
        <label className="text-sm font-medium">Título do Post</label>
        <Input
          name="title"
          defaultValue={initialData?.title ?? ""}
          placeholder="Título do artigo"
          required
          className={drawerFieldClass}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Slug (URL amigável)</label>
        <Input
          name="slug"
          defaultValue={initialData?.slug ?? ""}
          placeholder="ex-titulo-do-artigo"
          required
          className={drawerFieldClass}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Resumo / Excert</label>
        <textarea
          name="excerpt"
          defaultValue={initialData?.excerpt ?? ""}
          placeholder="Breve resumo do post..."
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Conteúdo</label>
        <textarea
          name="content"
          defaultValue={initialData?.content ?? ""}
          placeholder="Escreva o conteúdo do post..."
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[160px]"
          required
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={initialData?.published ?? false}
          className="rounded border-gray-700 bg-gray-800 h-4 w-4"
        />
        <label className="text-sm font-medium">Publicar imediatamente</label>
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