import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"; // ajuste para sua tabela de usuários
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Atualiza o timestamp do usuário logado para o horário atual
  await db.update(users)
    .set({ lastSeen: new Date() })
    .where(eq(users.id, session.user.id))

  return NextResponse.json({ success: true })
}