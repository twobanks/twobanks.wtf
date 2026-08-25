"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { OtherExpensesTableProps } from "@/utils/types"
import { BanknoteArrowDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { ExpenseDrawer } from "../Drawers/ExpenseDrawer"
import { TableActions } from "./table-actions"

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function OtherExpensesTable({ 
  expenses,
  categories,
  accounts 
}: OtherExpensesTableProps) {
  const router = useRouter()
  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BanknoteArrowDown />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Despesas
          </h1>
        </div>
        <ExpenseDrawer
          categories={categories}
          accounts={accounts}
          onSuccess={() => router.refresh()}
        />
      </div>

      <div className="overflow-hidden rounded-lg border mt-6">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Nenhuma despesa encontrada.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    {expense.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(expense.amount))}
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
                    <TableActions id={expense.id} isPaid={expense.paid} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}