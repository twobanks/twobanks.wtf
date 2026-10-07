"use client"

import { updateKanbanTaskStatus } from "@/actions/kanban"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { startTransition, useId, useOptimistic, useState } from "react"
import { KanbanCard } from "./KanbanCard"
import { KanbanColumn } from "./KanbanColumn"

export type KanbanTaskType = {
  id: string
  title: string
  description?: string | null
  status: "to_do" | "in_progress" | "pending" | "canceled" | "done"
  urgency: "low" | "medium" | "high"
  dueDate?: string | null
  assignedToId?: string | null
  createdById: string
}

const COLUMNS = [
  { id: "to_do", title: "A Fazer" },
  { id: "in_progress", title: "Resolvendo" },
  { id: "pending", title: "Pendente" },
  { id: "canceled", title: "Cancelado" },
  { id: "done", title: "Resolvido" },
] as const

interface KanbanBoardProps {
  initialTasks: KanbanTaskType[]
  users: any[] // Adicionado
}

export function KanbanBoard({ initialTasks, users }: KanbanBoardProps) {
  const dndId = useId()
  // Estado otimista: UI atualiza antes da resposta do servidor
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    initialTasks,
    (state, { taskId, newStatus }: { taskId: string; newStatus: KanbanTaskType["status"] }) => {
      return state.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    }
  )

  const [activeTask, setActiveTask] = useState<KanbanTaskType | null>(null)

  // O PointerSensor com constraint evita que um clique simples seja interpretado como drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = optimisticTasks.find((t) => t.id === active.id)
    if (task) setActiveTask(task)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event
    
    if (!over) return

    const taskId = active.id as string
    
    // Identifica se o alvo (over) é uma coluna ou outro card
    const overId = String(over.id)
    const overTask = optimisticTasks.find((t) => t.id === overId)
    const newStatus = (overTask ? overTask.status : overId) as KanbanTaskType["status"]

    const currentTask = optimisticTasks.find((t) => t.id === taskId)

    if (currentTask && currentTask.status !== newStatus) {
      // 1. Atualização em 60fps na tela do usuário
      startTransition(() => {
        addOptimisticTask({ taskId, newStatus })
      })
      // 2. Commit atômico no banco em background
      await updateKanbanTaskStatus(taskId, newStatus)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      id={dndId}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-[calc(100vh-180px)] w-full gap-5 overflow-x-auto overflow-y-hidden pb-4 items-start">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={optimisticTasks.filter((t) => t.status === col.id)}
            users={users}
          />
        ))}
      </div>

      {/* DragOverlay cria um "fantasma" do card enquanto ele é arrastado */}
      <DragOverlay dropAnimation={null}>
        {activeTask ? <KanbanCard task={activeTask} isOverlay users={users} /> : null}
      </DragOverlay>
    </DndContext>
  )
}