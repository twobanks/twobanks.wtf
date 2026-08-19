"use client"

import { deleteTransaction } from "@/actions/wallet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import type { Transaction } from "@/utils/types"
import { BanknoteArrowDown, MoreHorizontalIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-")
  return `${day}/${month}/${year}`
}

interface OtherExpensesTableProps {
  expenses: Transaction[]
}

export function OtherExpensesTable({ expenses }: OtherExpensesTableProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const filteredExpenses = expenses.filter((expense) => {
    if (activeTab === "all") return true
    if (activeTab === "paid") return expense.paid
    if (activeTab === "pending") return !expense.paid
    return true
  })

  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      const formData = new FormData()
      formData.set("id", String(id))
      await deleteTransaction(formData)
      router.refresh()
    }
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <BanknoteArrowDown  />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Despesas
          </h1>
        </div>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="paid">Pagas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={activeTab}>
        <div className="overflow-hidden rounded-lg border">
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
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhuma despesa encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((expense) => (
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
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/admin/carteira/${expense.id}/editar`
                              )
                            }
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(expense.id)}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  )
}