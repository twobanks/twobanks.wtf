import { updatePost } from "@/actions/blog"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

export default async function EditarPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const [post] = await db.select().from(posts).where(eq(posts.id, id))

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
        Editar Post
      </h1>
      
      <form action={updatePost} className="space-y-6">
        <input type="hidden" name="id" value={post.id} />

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Título</label>
          <input 
            type="text" 
            name="title" 
            required
            defaultValue={post.title}
            className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Resumo (Excerpt)</label>
          <input 
            type="text" 
            name="excerpt" 
            defaultValue={post.excerpt || ""}
            className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Conteúdo (Suporta Markdown)</label>
          <textarea 
            name="content" 
            required
            rows={15}
            defaultValue={post.content}
            className="w-full p-3 border rounded-md font-mono text-sm dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            name="published" 
            id="published" 
            defaultChecked={post.published} 
            className="w-5 h-5" 
          />
          <label htmlFor="published" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Post publicado (desmarque para reverter a rascunho)
          </label>
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