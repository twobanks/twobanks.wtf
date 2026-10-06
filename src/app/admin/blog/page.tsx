// ==========================================
// Arquivo: src/app/admin/blog/page.tsx
// ==========================================
import { auth } from "@/auth"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { BlogClient } from "./BlogClient"

export const metadata: Metadata = {
  title: "Blog",
}

export default async function AdminBlogPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/")
  }

  const userId = session.user.id

  const userPosts = await db.query.posts.findMany({
    where: eq(posts.authorId, userId),
    orderBy: (p, { desc }) => [desc(p.createdAt)],
  })

  return <BlogClient initialPosts={userPosts} />
}