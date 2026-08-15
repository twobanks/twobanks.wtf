import { createBook } from "@/actions/books"

export default function NovoLivroPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Adicionar Novo Livro
      </h1>
      
      <form action={createBook} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Título</label>
            <input 
              type="text" 
              name="title" 
              required
              className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
              placeholder="Ex: O Senhor dos Anéis"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Autor</label>
            <input 
              type="text" 
              name="author" 
              required
              className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
              placeholder="Ex: J.R.R. Tolkien"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Status</label>
            <select 
              name="status" 
              className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
            >
              <option value="quero ler">Quero Ler</option>
              <option value="lendo">Lendo</option>
              <option value="lido">Lido</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nota (1 a 5)</label>
            <input 
              type="number" 
              name="rating" 
              min="1" 
              max="5"
              className="w-full p-3 border rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
              placeholder="Ex: 5"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Salvar Livro
        </button>
      </form>
    </div>
  )
}