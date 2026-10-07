import { auth } from "@/auth"
import { KanbanBoard } from "@/components/Kanban/KanbanBoard"
import { db } from "@/db"
import { redirect } from "next/navigation"

export const metadata = { title: "Tarefas" }

export default async function KanbanPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  // Busca inicial das tarefas no banco
  const [tasks, appUsers] = await Promise.all([
    db.query.kanbanTasks.findMany({
      orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
    }),
    db.query.users.findMany({ limit: 2 }),
  ])

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Board Operacional</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie tarefas, prioridades e acompanhe o fluxo de trabalho.
        </p>
      </div>

      {/* Renderiza o Client Component */}
      <KanbanBoard initialTasks={tasks} users={appUsers} />
    </div>
  )
}