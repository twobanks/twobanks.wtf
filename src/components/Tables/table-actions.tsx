"use client";

import { deleteTransaction, markTransactionAsPaid } from '@/actions/wallet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckCircle2, MoreHorizontalIcon, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface TableActionsProps {
  id: number;
  isPaid: boolean;
  isRecurring?: boolean;
  onEdit?: () => void;
  onDelete?: (id: number) => void | Promise<void>;
}

export function TableActions({
  id,
  isPaid,
  isRecurring,
  onEdit,
  onDelete,
}: TableActionsProps) {
  const router = useRouter();

  async function handlePay() {
    const formData = new FormData();
    formData.set('id', String(id));
    await markTransactionAsPaid(formData);
    router.refresh();
  }

  async function handleDelete() {
    const message = isRecurring
      ? 'Esta despesa faz parte de uma série recorrente.\n\nAo excluir, todos os meses a partir deste serão removidos. Meses anteriores ficam como histórico.\n\nContinuar?'
      : 'Tem certeza que deseja excluir este registro?';

    if (!confirm(message)) return;

    if (onDelete) {
      await onDelete(id);
    } else {
      const formData = new FormData();
      formData.set('id', String(id));
      await deleteTransaction(formData);
    }
    router.refresh();
  }

  return (
    <DropdownMenu>
      {/* Utilizando o padrão 'render' nativo do Base UI */}
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground transition-colors rounded-lg"
          />
        }
      >
        <MoreHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">Abrir menu</span>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-36 bg-popover border-border text-popover-foreground shadow-xl rounded-xl p-1.5">
        <DropdownMenuItem 
          onClick={() => { if (onEdit) setTimeout(() => onEdit(), 0); }}
          className="flex items-center gap-2 text-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <Pencil className="h-4 w-4" /> Editar
        </DropdownMenuItem>

        {!isPaid && (
          <DropdownMenuItem 
            onClick={handlePay}
            className="flex items-center gap-2 text-foreground focus:bg-accent focus:text-emerald-600 dark:focus:text-emerald-400 cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" /> Pagar
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator className="bg-border my-1" />
        
        <DropdownMenuItem 
          onClick={handleDelete}
          className="flex items-center gap-2 text-rose-600 dark:text-rose-400 focus:bg-rose-500/10 focus:text-rose-500 cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <Trash2 className="h-4 w-4" /> Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}