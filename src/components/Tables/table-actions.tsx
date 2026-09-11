// src/components/Tables/table-actions.tsx
'use client';

import { deleteTransaction, markTransactionAsPaid } from '@/actions/wallet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface TableActionsProps {
  id: number;
  isPaid: boolean;
  /** Se true, o registro faz parte de uma série recorrente */
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
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreHorizontalIcon />
            <span className="sr-only">Abrir menu</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
        {!isPaid && (
          <DropdownMenuItem onClick={handlePay}>Pagar</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}