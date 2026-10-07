"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Calendar, GripVertical } from "lucide-react"
import { KanbanTaskDrawer } from "../Drawers/KanbanTaskDrawer"
import { KanbanTaskType } from "./KanbanBoard"

interface KanbanCardProps {
  task: KanbanTaskType
  isOverlay?: boolean
  users: { id: string; name: string | null }[]
}

export function KanbanCard({ task, isOverlay = false, users }: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-rose-500/10 text-rose-400 border-rose-500/20"
      case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      default: return "bg-zinc-800/50 text-zinc-400 border-zinc-700"
    }
  }

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "high": return "Alta"
      case "medium": return "Média"
      default: return "Baixa"
    }
  }

  const creator = users.find((u) => u.id === task.createdById)
  const assignee = users.find((u) => u.id === task.assignedToId)

  // Função simples para pegar as iniciais do nome (ex: Thiago Soares = TS)
  const getInitials = (name?: string | null) => {
    if (!name) return "U"
    return name.substring(0, 2).toUpperCase()
  }

  if (isDragging && !isOverlay) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-28 w-full bg-zinc-800/30 border-2 border-dashed border-brand-blue/40 rounded-xl opacity-50"
      />
    )
  }

  return (
    <KanbanTaskDrawer
      task={task}
      users={users}
      trigger={
        <div
          ref={setNodeRef}
          style={style}
          className={`group relative w-full flex flex-col gap-3 p-4 bg-zinc-900 border ${
            isOverlay ? "border-brand-blue shadow-2xl rotate-2 scale-105" : "border-zinc-800/80 shadow-sm"
          } rounded-xl hover:border-zinc-700 transition-colors cursor-default text-left`}
        >
          {/* Alça de Arraste Invisível (Aparece no Hover) */}
          <div 
            {...attributes} 
            {...listeners}
            onClick={(e) => e.stopPropagation()} // Evita abrir o drawer ao iniciar o drag
            className="absolute top-2 right-2 p-1.5 text-zinc-600 opacity-0 group-hover:opacity-100 hover:text-zinc-300 hover:bg-zinc-800 rounded-md cursor-grab active:cursor-grabbing transition-all"
          >
            <GripVertical size={16} />
          </div>
          {/* Cabeçalho do Card (Badges) */}
          <div className="flex items-center gap-2 pr-6">
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${getUrgencyStyles(task.urgency)}`}>
              {getUrgencyLabel(task.urgency)}
            </span>
          </div>

          {/* Corpo (Título) */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-100 leading-tight">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-xs text-zinc-500 mt-1.5 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>

          {/* Rodapé (Datas, Avatares, Indicadores) */}
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-zinc-800/50">
            <div className="flex items-center gap-3 text-zinc-500 text-xs">
              {task.dueDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>{new Date(task.dueDate).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' })}</span>
                </div>
              )}
            </div>

            {/* Referência Visual: Quem Criou e Quem é Responsável */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-zinc-600 font-medium leading-none uppercase tracking-wider">Criado por</span>
                <span className="text-[10px] text-zinc-400 font-medium">{creator?.name?.split(" ")[0] || "Sistema"}</span>
              </div>
              
              {assignee && (
                <>
                  <div className="h-4 w-px bg-zinc-800" /> {/* Divisor */}
                  <div 
                    title={`Responsável: ${assignee.name}`} 
                    className="h-6 w-6 rounded-full border border-zinc-700 bg-brand-blue/20 flex items-center justify-center text-[10px] font-bold text-brand-blue"
                  >
                    {getInitials(assignee.name)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      }
    />
  )
}