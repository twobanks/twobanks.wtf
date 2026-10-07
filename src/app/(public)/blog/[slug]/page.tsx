// src/app/(public)/blog/[slug]/page.tsx
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { ArrowLeft } from "lucide-react"; // Importe o ícone
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug))

  if (!post || !post.published) notFound()

  return (
    <main className="min-h-screen w-full max-w-6xl bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <article className="mx-auto p-4 mx-auto space-y-8">
        
        {/* NOVO: Navegação de Retorno */}
        <nav className="pt-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar para o Blog
          </Link>
        </nav>

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-zinc-500">
            Publicado em {post.createdAt.toLocaleDateString('pt-BR')}
          </p>
        </header>
        <div className="prose prose-lg prose-zinc dark:prose-invert mx-auto">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  )
}