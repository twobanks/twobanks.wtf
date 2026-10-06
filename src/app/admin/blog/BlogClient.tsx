// ==========================================
// Arquivo: src/app/admin/blog/BlogClient.tsx
// ==========================================
"use client"

import { deletePost } from "@/actions/blog"
import { PostDrawer } from "@/components/Drawers/PostDrawer"
import { TableActions } from "@/components/Tables/table-actions"
import { FileText, Plus } from "lucide-react"
import { useState } from "react"

interface BlogClientProps {
  initialPosts: any[]
}

export function BlogClient({ initialPosts }: BlogClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any | null>(null)

  const handleOpenCreate = () => {
    setSelectedPost(null)
    setIsOpen(true)
  }

  const handleOpenEdit = (post: any) => {
    setSelectedPost(post)
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza de que deseja excluir este post?")) {
      await deletePost(id)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento do Blog</h1>
          <p className="text-sm text-muted-foreground">Crie e gerencie suas postagens e artigos publicados.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Novo Post
        </button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6">
          {!initialPosts || initialPosts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-2">
              <FileText className="h-8 w-8 opacity-40" />
              <p>Nenhum post encontrado.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {initialPosts.map((post) => (
                <div key={post.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm">{post.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {post.excerpt || post.content || "Sem descrição prévia..."} •{" "}
                        <span className={`font-medium ${post.published ? "text-emerald-500" : "text-amber-500"}`}>
                          {post.published ? "Publicado" : "Rascunho"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <TableActions
                    id={post.id}
                    isPaid={true}
                    onEdit={() => handleOpenEdit(post)}
                    onDelete={() => handleDelete(post.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PostDrawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        post={selectedPost}
      />
    </div>
  )
}