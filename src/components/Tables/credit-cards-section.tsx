"use client"

import { deleteCreditCard } from "@/actions/creditCards"
import { PurchaseDrawer } from "@/components/Drawers/PurchaseDrawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import type { Category, CreditCard } from "@/utils/types"
import { CreditCardIcon, MoreHorizontalIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CreditCardBrand } from "../CreditCardBrand"

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

interface Parcela {
  id: number
  purchaseDescription: string
  number: number
  totalInstallments: number
  amount: string
  paid: boolean
  dueDate: string
}

interface CartaoFatura {
  cartao: CreditCard
  parcelas: Parcela[]
  total: number
  pago: number
}

interface CreditCardsSectionProps {
  cartoesComFatura: CartaoFatura[]
  categorias: Category[]
  cartoes: CreditCard[]
  createInstallmentPurchaseAction: (
    formData: FormData
  ) => Promise<void>
  faturaAno: number
  faturaMesNum: number
}

export function CreditCardsSection({
  cartoesComFatura,
  categorias,
  cartoes,
  createInstallmentPurchaseAction,
  faturaAno,
  faturaMesNum,
}: CreditCardsSectionProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const filteredCards = cartoesComFatura.filter(({ total, pago }) => {
    const status = getStatus(total, pago)
    if (activeTab === "all") return true
    return status === activeTab
  })

  function getStatus(total: number, pago: number) {
    if (total === 0) return "sem-gastos"
    if (pago >= total) return "fechada"
    return "aberta"
  }

  async function handleDeleteCard(id: number) {
    if (confirm("Tem certeza que deseja excluir este cartão?")) {
      const formData = new FormData()
      formData.set("id", String(id))
      await deleteCreditCard(formData)
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
          <CreditCardIcon />
          <h1 className="text-xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Cartões de Crédito
          </h1>
        </div>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="aberta">Abertas</TabsTrigger>
          <TabsTrigger value="fechada">Fechadas</TabsTrigger>
          <TabsTrigger value="sem-gastos">Sem gastos</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={activeTab}>
        {cartoesComFatura.length === 0 ? (
          <p className="text-muted-foreground">Nenhum cartão cadastrado.</p>
        ) : filteredCards.length === 0 ? (
          <p className="text-muted-foreground">Nenhum cartão nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredCards.map(({ cartao, parcelas, total, pago }) => {
              let vencimento = null
              if (cartao.dueDay) {
                const dataVenc = new Date(
                  faturaAno,
                  faturaMesNum - 1,
                  cartao.dueDay
                )
                if (dataVenc.getMonth() !== faturaMesNum - 1) {
                  dataVenc.setDate(0)
                  dataVenc.setMonth(faturaMesNum - 1)
                  dataVenc.setDate(
                    new Date(faturaAno, faturaMesNum, 0).getDate()
                  )
                }
                vencimento = dataVenc.toLocaleDateString("pt-BR")
              }

              const statusFatura =
                total === 0 ? "Sem gastos" : pago >= total ? "Fechada" : "Aberta"

              return (
                <Card key={cartao.id}>
                  <CardHeader>
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="flex items-start gap-2">
                        <div className="flex gap-2 align-center">
                          {cartao.brand && (
                            <CreditCardBrand brand={cartao.brand} showName={false} />
                          )}
                          <CardTitle>
                            {cartao.name}
                          </CardTitle>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex flex-col gap-1 text-right">
                          <p className="text-sm text-muted-foreground">
                            <span className="text-foreground font-medium">
                              {formatCurrency(total)}
                            </span>
                          </p>
                          <span
                            className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                              statusFatura === "Fechada"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                : statusFatura === "Aberta"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {statusFatura}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {parcelas.length === 0 ? (
                      <p className="text-muted-foreground">
                        Nenhuma parcela neste mês.
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Parcelas</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {parcelas.map((parcela) => (
                            <TableRow key={parcela.id}>
                              <TableCell className="font-medium">
                                {parcela.purchaseDescription}
                              </TableCell>
                              <TableCell>
                                {parcela.number} de {parcela.totalInstallments}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(Number(parcela.amount))}
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
                                      onClick={() => router.push(`/admin/compras/${parcela.id}/editar`)}
                                    >
                                      Editar parcela
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      variant="destructive"
                                      onClick={() => null}
                                    >
                                      Excluir parcela
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                    {statusFatura === "Aberta" && (
                      <div className="flex justify-end mt-4">
                        <PurchaseDrawer
                          categories={categorias}
                          creditCards={cartoes}
                          createInstallmentPurchaseAction={
                            createInstallmentPurchaseAction
                          }
                          initialCreditCardId={cartao.id}
                          triggerLabel="Adicionar despesas"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}