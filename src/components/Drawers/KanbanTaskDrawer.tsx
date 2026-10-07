"use client"

import {
  cloneKanbanTask,
  createKanbanTask,
  deleteKanbanTask,
  updateKanbanTask,
} from "@/actions/kanban"
import {
  DrawerAlert,
  DrawerShell,
  drawerFieldClass,
  drawerSelectContentClass,
  drawerSelectItemClass,
  drawerSelectTriggerClass,
} from "@/components/Drawers/drawer-shell"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Trash2 } from "lucide-react"
import { useState } from "react"
import { KanbanTaskType } from "../Kanban/KanbanBoard"

interface KanbanTaskDrawerProps {
  task?: KanbanTaskType
  defaultStatus?: string
  trigger: React.ReactNode
  users: { id: string; name: string | null }[]
}

export function KanbanTaskDrawer({ task, defaultStatus = "to_do", trigger, users }: KanbanTaskDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [alert, setAlert] = useState<DrawerAlert>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ==========================================
  // HANDLERS DE AÇÕES
  // ==========================================

const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      // TRATAMENTO: Remove assignedToId se for "none" para o banco aceitar como null/empty
      if (formData.get("assignedToId") === "none") {
        formData.delete("assignedToId")
      }

      if (task) {
        formData.append("id", task.id)
        await updateKanbanTask(formData)
      } else {
        if (!formData.get("status")) formData.append("status", defaultStatus)
        await createKanbanTask(formData)
      }
      setAlert({ type: "success", message: task ? "Tarefa atualizada!" : "Tarefa criada!" })
      setIsOpen(false)
    } catch (error) {
      setAlert({ type: "error", message: "Não foi possível salvar a tarefa." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!task || !confirm("Tem certeza que deseja excluir esta tarefa?")) return
    setIsSubmitting(true)
    try {
      await deleteKanbanTask(task.id)
      setIsOpen(false)
    } catch (error) {
      setAlert({ type: "error", message: "Erro ao excluir a tarefa." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClone = async () => {
    if (!task) return
    setIsSubmitting(true)
    try {
      await cloneKanbanTask(task.id)
      setAlert({ type: "success", message: "Tarefa clonada com sucesso!" })
      setIsOpen(false)
    } catch (error) {
      setAlert({ type: "error", message: "Erro ao clonar a tarefa." })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ==========================================
  // RENDERIZAÇÃO
  // ==========================================

  return (
    <DrawerShell
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title={task ? "Editar Tarefa" : "Nova Tarefa"}
      description="Preencha os detalhes do card"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel={task ? "Salvar Alterações" : "Criar Tarefa"}
      alert={alert}
      onAlertClose={() => setAlert(null)}
      trigger={
        // w-full adicionado aqui para garantir que o card estique na coluna
        <div onClick={() => setIsOpen(true)} className="cursor-pointer flex w-full">
          {trigger}
        </div>
      }
      footerExtra={
        // Só renderiza os botões de ação secundária se for uma edição (task existe)
        task ? (
          <div className="flex items-center gap-2 w-full mb-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} /> Excluir
            </button>
            <button
              type="button"
              onClick={handleClone}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Copy size={16} /> Clonar
            </button>
          </div>
        ) : null
      }
    >
      <Input
        name="title"
        placeholder="Título da tarefa"
        defaultValue={task?.title ?? ""}
        required
        autoFocus
        className={`md:col-span-2 ${drawerFieldClass}`}
      />

      <div className="md:col-span-2 space-y-1">
        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider pl-1">
          Descrição
        </label>
        <textarea
          name="description"
          defaultValue={task?.description ?? ""}
          placeholder="Detalhes adicionais (opcional)..."
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all min-h-[100px]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider pl-1">
          Urgência
        </label>
        <Select name="urgency" defaultValue={task?.urgency ?? "medium"}>
          <SelectTrigger className={drawerSelectTriggerClass}>
            <SelectValue placeholder="Nível de urgência" />
          </SelectTrigger>
          <SelectContent className={drawerSelectContentClass}>
            <SelectItem value="low" className={drawerSelectItemClass}>
              🟢 Baixa
            </SelectItem>
            <SelectItem value="medium" className={drawerSelectItemClass}>
              🟡 Média
            </SelectItem>
            <SelectItem value="high" className={drawerSelectItemClass}>
              🔴 Alta
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider pl-1">
          Status
        </label>
        <Select name="status" defaultValue={task?.status ?? defaultStatus}>
          <SelectTrigger className={drawerSelectTriggerClass}>
            <SelectValue placeholder="Status atual" />
          </SelectTrigger>
          <SelectContent className={drawerSelectContentClass}>
            <SelectItem value="to_do" className={drawerSelectItemClass}>
              A Fazer
            </SelectItem>
            <SelectItem value="in_progress" className={drawerSelectItemClass}>
              Resolvendo
            </SelectItem>
            <SelectItem value="pending" className={drawerSelectItemClass}>
              Pendente
            </SelectItem>
            <SelectItem value="canceled" className={drawerSelectItemClass}>
              Cancelado
            </SelectItem>
            <SelectItem value="done" className={drawerSelectItemClass}>
              Resolvido
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* NOVO CAMPO: Responsável pela tarefa */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider pl-1">
          Responsável
        </label>
        <Select name="assignedToId" defaultValue={task?.assignedToId ?? "none"}>
          <SelectTrigger className={drawerSelectTriggerClass}>
            <SelectValue placeholder="Quem vai fazer?" />
          </SelectTrigger>
          <SelectContent className={drawerSelectContentClass}>
            <SelectItem value="none" className={drawerSelectItemClass}>Nenhum</SelectItem>
            {users.map((u) => (
              <SelectItem key={u.id} value={u.id} className={drawerSelectItemClass}>
                {u.name?.split(" ")[0] || "Usuário"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </DrawerShell>
  )
}