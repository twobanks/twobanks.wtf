'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  drawerFieldClass,
  drawerSelectContentClass,
  drawerSelectItemClass,
  drawerSelectTriggerClass,
} from '@/components/Drawers/drawer-shell';
import { KanbanTaskType } from '@/components/Kanban/KanbanBoard';

interface KanbanTaskFormProps {
  task?: KanbanTaskType;
  defaultStatus?: string;
  users: { id: string; name: string | null }[];
  isSubmitting?: boolean;
}

export function KanbanTaskForm({
  task,
  defaultStatus = 'to_do',
  users,
  isSubmitting = false,
}: KanbanTaskFormProps) {
  return (
    <>
      <Input
        name="title"
        placeholder="Título da tarefa"
        defaultValue={task?.title ?? ''}
        required
        autoFocus
        className={`md:col-span-2 ${drawerFieldClass}`}
        disabled={isSubmitting}
      />

      <div className="md:col-span-2 space-y-1">
        <label className="text-xs font-medium text-subtle-foreground uppercase tracking-wider pl-1">
          Descrição
        </label>
        <textarea
          name="description"
          defaultValue={task?.description ?? ''}
          placeholder="Detalhes adicionais (opcional)..."
          className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm text-foreground placeholder:text-subtle-foreground focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all min-h-[100px]"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-subtle-foreground uppercase tracking-wider pl-1">
          Urgência
        </label>
        <Select name="urgency" defaultValue={task?.urgency ?? 'medium'} disabled={isSubmitting}>
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
        <label className="text-xs font-medium text-subtle-foreground uppercase tracking-wider pl-1">
          Status
        </label>
        <Select name="status" defaultValue={task?.status ?? defaultStatus} disabled={isSubmitting}>
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
        <label className="text-xs font-medium text-subtle-foreground uppercase tracking-wider pl-1">
          Responsável
        </label>
        <Select name="assignedToId" defaultValue={task?.assignedToId ?? 'none'} disabled={isSubmitting}>
          <SelectTrigger className={drawerSelectTriggerClass}>
            <SelectValue placeholder="Quem vai fazer?" />
          </SelectTrigger>
          <SelectContent className={drawerSelectContentClass}>
            <SelectItem value="none" className={drawerSelectItemClass}>
              Nenhum
            </SelectItem>
            {users.map((u) => (
              <SelectItem key={u.id} value={u.id} className={drawerSelectItemClass}>
                {u.name?.split(' ')[0] || 'Usuário'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
