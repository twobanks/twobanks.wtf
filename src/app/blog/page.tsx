import { db } from "@/db"
import { posts } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import Link from "next/link"

export default async function BlogIndexPage() {
  const publishedPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
  return (
    <main className="min-h-screen w-full max-w-6xl bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto p-4 mx-auto space-y-12">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Nosso Blog
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Acompanhe nossos treinos, histórias e evolução.
          </p>
        </header>
        
        <div className="space-y-10">
          {publishedPosts.length === 0 ? (
            <p className="text-zinc-500 italic">Nenhum post publicado ainda. Comece a escrever!</p>
          ) : (
            publishedPosts.map((post) => (
              <article key={post.id} className="border-b border-zinc-200 dark:border-zinc-800 pb-10 last:border-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="text-sm text-zinc-500 font-medium">
                    {post.createdAt.toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}