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
    <div className="w-full flex flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BanknoteArrowDown className="text-primary" />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-foreground">
            Despesas
          </h1>
        </div>

        <button
          type="button"
          onClick={handleNew}
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium px-3.5 py-2 rounded-lg transition-colors border border-zinc-700/50 shadow-sm"
        >
          +
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs mt-6">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Descrição</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Valor</TableHead>
              <TableHead className="text-center text-muted-foreground font-semibold">Tipo</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow className="hover:bg-transparent border-0">
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Nenhuma despesa encontrada.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => {
                const isRecurring =
                  Boolean(expense.isRecurring) ||
                  Boolean(expense.recurringParentId);

                return (
                  <TableRow key={expense.id} className="border-border hover:bg-muted/40 transition-colors">
                    <TableCell className="font-medium text-foreground">
                      {expense.description}
                    </TableCell>
                    <TableCell className="text-right text-foreground font-medium">
                      {formatCurrency(expense.amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      {isRecurring ? (
                        <Badge variant="outline" className="gap-1 border-brand-pink/30 bg-brand-pink/10 text-brand-pink">
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
                          className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                        >
                          Pago
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10"
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