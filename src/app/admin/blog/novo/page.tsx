import { createPost } from "@/actions/blog"

export default function NovoPostPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Escrever novo post</h1>
      
      <form action={createPost} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <input 
            type="text" 
            name="title" 
            required
            className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800"
            placeholder="Ex: Treino longo na serra"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Resumo (Excerpt)</label>
          <input 
            type="text" 
            name="excerpt" 
            className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800"
            placeholder="Um breve texto para aparecer na lista de posts..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Conteúdo (Suporta Markdown)</label>
          <textarea 
            name="content" 
            required
            rows={15}
            className="w-full p-3 border rounded-md font-mono text-sm dark:bg-zinc-900 dark:border-zinc-800"
            placeholder="## Introdução&#10;Hoje o treino foi intenso..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="published" id="published" className="w-5 h-5" />
          <label htmlFor="published" className="text-sm font-medium">
            Publicar imediatamente (se desmarcado, salva como rascunho)
          </label>
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
        >
          Salvar Post
        </button>
      </form>
    </div>
  )
}