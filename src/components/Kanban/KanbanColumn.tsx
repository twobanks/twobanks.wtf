"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"
import { KanbanTaskDrawer } from "../Drawers/KanbanTaskDrawer"
import { KanbanTaskType } from "./KanbanBoard"
import { KanbanCard } from "./KanbanCard"

interface KanbanColumnProps {
  id: string
  title: string
  tasks: KanbanTaskType[]
  users: any[]
}

export function KanbanColumn({ id, title, tasks, users }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "Column", status: id },
  })

  // Estilização dinâmica caso um card esteja pairando sobre a coluna
  const columnBg = isOver ? "bg-zinc-900/60" : "bg-zinc-900/30"
  const borderStyle = isOver ? "border-brand-blue/50" : "border-zinc-800/80"

  return (
    <div
      className={`flex flex-col flex-shrink-0 w-80 h-full max-h-full rounded-2xl border ${borderStyle} ${columnBg} transition-colors duration-200 overflow-hidden shadow-sm`}
    >
      {/* Header da Coluna */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/60 bg-zinc-950/20">
        <h3 className="font-semibold text-sm text-zinc-200 tracking-wide uppercase">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <KanbanTaskDrawer
            defaultStatus={id} // Já abre o form com o status dessa coluna selecionado
            users={users}
            trigger={
              <button 
                title="Adicionar tarefa nesta coluna"
                className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <Plus size={14} />
              </button>
            }
          />
          <span className="flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-zinc-800 text-xs font-medium text-zinc-400">
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
          <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-zinc-800/50 rounded-xl">
            <span className="text-xs text-zinc-600 font-medium">Solte aqui</span>
          </div>
        )}
      </div>
    </div>
  )
}