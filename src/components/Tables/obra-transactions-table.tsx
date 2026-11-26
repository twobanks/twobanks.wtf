'use client';

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDrawer } from "@/contexts/DrawerContext";
import { useVisibility } from "@/contexts/VisibilityContext";
import type { ObraTransactionsTableProps } from "@/utils/types";
import { HardHat } from "lucide-react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/patterns";
import { createExpense, updateExpense } from "@/actions/expenses";
import { ExpenseDrawer } from "../Drawers/ExpenseDrawer";
import { TableActions } from "./table-actions";

export function ObraTransactionsTable({
  obraCategoryExists,
  transactions,
  categories,
  accounts,
}: ObraTransactionsTableProps) {
  const { visible } = useVisibility();
  const { openDrawer, setEditingExpense } = useDrawer();
  const router = useRouter();

  if (!obraCategoryExists) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold leading-10 tracking-tight text-foreground">
          Obra (Gastos Temporários)
        </h1>
        <p className="text-muted-foreground">
          Crie uma categoria chamada "Obra" para agrupar esses gastos.
        </p>
      </div>
    );
  }

  const formatCurrency = (value: number): string => {
    if (!visible) return "R$ ••••••";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const renderAmount = (amount: number) => {
    if (!visible) return <span className="text-foreground">-R$ ••••••</span>;
    return <span className="text-destructive font-medium">-{formatCurrency(amount)}</span>;
  };

  const handleEdit = (transaction: any) => {
    setEditingExpense(transaction);
    openDrawer('expense');
  };

  return (
    <div className="w-full flex flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
            <HardHat size={20} strokeWidth={2} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Construção
          </h1>
        </div>
        <ExpenseDrawer
          categories={categories}
          accounts={accounts}
          createExpense={createExpense}
          updateExpense={updateExpense}
          onSuccess={() => router.refresh()}
        />
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon={HardHat}
          title="Nenhum gasto de obra neste mês."
          description={'Crie uma categoria chamada "Obra" para agrupar esses gastos.'}
          className="mt-6"
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs mt-6">
          <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Descrição</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Valor</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? null : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-border hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium text-foreground">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {renderAmount(Number(transaction.amount))}
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.paid ? (
                      <Badge variant="success">
                        Pago
                      </Badge>
                    ) : (
                      <Badge variant="warning">
                        Pendente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <TableActions 
                      id={transaction.id} 
                      isPaid={transaction.paid} 
                      onEdit={() => handleEdit(transaction)} 
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      )}
    </div>
  );
}