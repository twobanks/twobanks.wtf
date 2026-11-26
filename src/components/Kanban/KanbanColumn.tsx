"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"
import { KanbanTaskDrawer } from "../Drawers/KanbanTaskDrawer"
import {
  createKanbanTask,
  updateKanbanTask,
  deleteKanbanTask,
  cloneKanbanTask,
} from "@/actions/kanban";
import { KanbanTaskType } from "./KanbanBoard"
import { KanbanCard } from "./KanbanCard"

interface KanbanColumnProps {
  id: string
  title: string
  tasks: KanbanTaskType[]
  users: { id: string; name: string | null }[]
}

export function KanbanColumn({ id, title, tasks, users }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "Column", status: id },
  })

  // Estilização dinâmica caso um card esteja pairando sobre a coluna
  const columnBg = isOver ? "bg-surface-1" : "bg-surface-1"
  const borderStyle = isOver ? "border-brand-blue/50" : "border-border"

  return (
    <div
      className={`flex flex-col flex-shrink-0 w-80 h-full max-h-full rounded-2xl border ${borderStyle} ${columnBg} transition-colors duration-200 overflow-hidden shadow-sm`}
    >
      {/* Header da Coluna */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/20">
        <h3 className="font-semibold text-sm text-foreground tracking-wide uppercase">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <KanbanTaskDrawer
            defaultStatus={id} // Já abre o form com o status dessa coluna selecionado
            users={users}
            createKanbanTask={createKanbanTask}
            updateKanbanTask={updateKanbanTask}
            deleteKanbanTask={deleteKanbanTask}
            cloneKanbanTask={cloneKanbanTask}
            trigger={
              <button 
                title="Adicionar tarefa nesta coluna"
                className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-surface-2 text-subtle-foreground hover:text-muted-foreground transition-colors"
              >
                <Plus size={14} />
              </button>
            }
          />
          <span className="flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-surface-2 text-xs font-medium text-subtle-foreground">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Área Soltável de Cards */}
      <div 
        ref={setNodeRef} 
        className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} users={users} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-border rounded-xl">
            <span className="text-xs text-subtle-foreground font-medium">Solte aqui</span>
          </div>
        )}
      </div>
    </div>
  )
}