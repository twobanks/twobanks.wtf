'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDrawer } from '@/contexts/DrawerContext';
import { useVisibility } from '@/contexts/VisibilityContext';
import { UnifiedExpense } from '@/utils/types';
import { BanknoteArrowDown, Repeat } from 'lucide-react';
import { TableActions } from './table-actions';

export function ExpensesTable({ expenses }: { expenses: UnifiedExpense[] }) {
  const { visible } = useVisibility();
  const { openDrawer, setEditingExpense } = useDrawer();

  const handleEdit = (expense: UnifiedExpense) => {
    setEditingExpense(expense);
    openDrawer('expense');
  };

  const handleNew = () => {
    setEditingExpense(null);
    openDrawer('expense');
  };

  const formatCurrency = (value: number): string => {
    if (!visible) return 'R$ ••••••';
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BanknoteArrowDown />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Despesas
          </h1>
        </div>

        <button
          type="button"
          onClick={handleNew}
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
        >
          +
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border mt-6">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhuma despesa encontrada.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => {
                const isRecurring =
                  Boolean(expense.isRecurring) ||
                  Boolean(expense.recurringParentId);

                return (
                  <TableRow key={expense.id} className="hover:bg-transparent">
                    <TableCell className="font-medium">
                      {expense.description}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(expense.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      {isRecurring ? (
                        <Badge variant="secondary" className="gap-1">
                          <Repeat className="h-3 w-3" />
                          Recorrente
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {expense.paid ? (
                        <Badge
                          variant="outline"
                          className="text-green-500 border-green-500/50"
                        >
                          Pago
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-yellow-500 border-yellow-500/50"
                        >
                          Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex items-center justify-end">
                      <TableActions
                        id={expense.id}
                        isPaid={expense.paid}
                        isRecurring={isRecurring}
                        onEdit={() => handleEdit(expense)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}