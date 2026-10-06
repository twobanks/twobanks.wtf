// ==========================================
// Arquivo: src/components/Drawers/PostDrawer.tsx
// ==========================================
"use client"

import { savePost } from "@/actions/blog"
import { DrawerAlert, DrawerShell, drawerFieldClass } from "@/components/Drawers/drawer-shell"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface PostDrawerProps {
  open: boolean
  onClose: () => void
  post?: {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    published: boolean
  } | null
  onSuccess?: () => void
}

export function PostDrawer({ open, onClose, post, onSuccess }: PostDrawerProps) {
  const [alert, setAlert] = useState<DrawerAlert>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (post?.id) {
        formData.append("id", post.id)
      }
      await savePost(formData)
      setAlert({
        type: "success",
        message: post ? "Post atualizado com sucesso!" : "Post criado com sucesso!",
      })
      onSuccess?.()
      onClose()
    } catch (error) {
      setAlert({
        type: "error",
        message: "Não foi possível salvar o post.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DrawerShell
      open={open}
      onClose={onClose}
      title={post ? "Editar Post" : "Novo Post"}
      description="Preencha os campos abaixo para gerenciar o conteúdo do blog"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Salvar Post"
      alert={alert}
      onAlertClose={() => setAlert(null)}
    >
      <Input
        name="title"
        placeholder="Título do Artigo"
        defaultValue={post?.title ?? ""}
        required
        autoFocus
        className={`md:col-span-2 ${drawerFieldClass}`}
      />

      <Input
        name="slug"
        placeholder="Slug (url-amigavel)"
        defaultValue={post?.slug ?? ""}
        required
        className={`md:col-span-2 ${drawerFieldClass}`}
      />

      <div className="md:col-span-2 space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Resumo / Excerpt</label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          placeholder="Breve descrição do post..."
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[80px]"
        />
      </div>

      <div className="md:col-span-2 space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Conteúdo Completo</label>
        <textarea
          name="content"
          defaultValue={post?.content ?? ""}
          placeholder="Escreva o conteúdo do post..."
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[150px]"
          required
        />
      </div>

      <div className="md:col-span-2 flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={post?.published ?? false}
          className="rounded border-gray-700 bg-gray-800 h-4 w-4"
        />
        <label className="text-sm font-medium">Publicar imediatamente</label>
      </div>
    </DrawerShell>
  )
}