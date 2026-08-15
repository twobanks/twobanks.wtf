import { auth } from "@/auth"
import Link from "next/link"

export default async function AdminMenuPage() {
  const session = await auth()
  return (
    <main className="w-full flex flex-col items-center dark:bg-black p-4 text-zinc-900 dark:text-zinc-100">
      <div className="w-full max-w-sm space-y-8 text-center">
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Administração
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Bem-vindo(a), {session?.user?.name || "twobanks"}
          </p>
        </header>
        <nav className="flex flex-col space-y-4">
          <Link 
            href="/admin/blog" 
            className="group relative flex items-center justify-between w-full p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-lg">📝 Gerenciar Blog</span>
            <span className="text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors">→</span>
          </Link>
          <Link 
            href="/admin/livros" 
            className="group relative flex items-center justify-between w-full p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-lg">📚 Gerenciar Livros</span>
            <span className="text-zinc-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors">→</span>
          </Link>
        </nav>
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <Link 
            href="/" 
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← Voltar para o site público
          </Link>
        </div>
      </div>
    </main>
  )
}