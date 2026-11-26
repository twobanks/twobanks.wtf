'use client';

import { DrawerAlert, DrawerShell } from '@/components/Drawers/drawer-shell';
import { KanbanTaskForm } from '@/components/Drawers/KanbanTaskForm';
import { KanbanTaskType } from '@/components/Kanban/KanbanBoard';
import { Copy, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface KanbanTaskDrawerProps {
  task?: KanbanTaskType;
  defaultStatus?: string;
  trigger: React.ReactNode;
  users: { id: string; name: string | null }[];
  createKanbanTask: (formData: FormData) => Promise<void>;
  updateKanbanTask: (formData: FormData) => Promise<void>;
  deleteKanbanTask: (taskId: string) => Promise<void>;
  cloneKanbanTask: (taskId: string) => Promise<void>;
}

export function KanbanTaskDrawer({
  task,
  defaultStatus = 'to_do',
  trigger,
  users,
  createKanbanTask,
  updateKanbanTask,
  deleteKanbanTask,
  cloneKanbanTask,
}: KanbanTaskDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState<DrawerAlert>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (formData.get('assignedToId') === 'none') {
        formData.delete('assignedToId');
      }

      if (task) {
        formData.append('id', task.id);
        await updateKanbanTask(formData);
      } else {
        if (!formData.get('status')) formData.append('status', defaultStatus);
        await createKanbanTask(formData);
      }
      setAlert({ type: 'success', message: task ? 'Tarefa atualizada!' : 'Tarefa criada!' });
      setIsOpen(false);
    } catch (error) {
      setAlert({ type: 'error', message: 'Não foi possível salvar a tarefa.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!task || !confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    setIsSubmitting(true);
    try {
      await deleteKanbanTask(task.id);
      setIsOpen(false);
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao excluir a tarefa.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClone = async () => {
    if (!task) return;
    setIsSubmitting(true);
    try {
      await cloneKanbanTask(task.id);
      setAlert({ type: 'success', message: 'Tarefa clonada com sucesso!' });
      setIsOpen(false);
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao clonar a tarefa.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DrawerShell
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title={task ? 'Editar Tarefa' : 'Nova Tarefa'}
      description="Preencha os detalhes do card"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel={task ? 'Salvar Alterações' : 'Criar Tarefa'}
      alert={alert}
      onAlertClose={() => setAlert(null)}
      trigger={
        <div onClick={() => setIsOpen(true)} className="cursor-pointer flex w-full">
          {trigger}
        </div>
      }
      footerExtra={
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
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg border border-border bg-surface-2 text-muted-foreground hover:bg-surface-3 text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Copy size={16} /> Clonar
            </button>
          </div>
        ) : null
      }
    >
      <KanbanTaskForm
        task={task}
        defaultStatus={defaultStatus}
        users={users}
        isSubmitting={isSubmitting}
      />
    </DrawerShell>
  );
}
