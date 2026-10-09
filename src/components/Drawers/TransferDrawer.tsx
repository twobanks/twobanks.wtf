// File: src/components/Drawers/TransferDrawer.tsx
"use client"

import { createTransfer } from "@/actions/wallet"
import { Button } from "@/components/ui/button"
import { FloatingAlert } from "@/components/ui/floating-alert"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowLeftRight } from "lucide-react"
import { useState } from "react"

interface Account {
  id: number
  name: string
}

export function TransferDrawer({ accounts, triggerLabel = "Transferir" }: { accounts: Account[]; triggerLabel?: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      await createTransfer(formData)
      setOpen(false)
      setAlert({ type: "success", message: "Transferência realizada com sucesso!" })
    } catch (error: any) {
      setAlert({
        type: "error",
        message: error?.message || "Erro ao realizar transferência. Verifique os dados.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-8 px-3 cursor-pointer">
          <ArrowLeftRight size={16} />
          {triggerLabel}
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Nova Transferência</SheetTitle>
            <SheetDescription>
              Mova saldos entre contas sem alterar o balanço de despesas/receitas do período.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="sourceAccountId" className="text-sm font-medium">Conta de Origem</label>
              <select
                id="sourceAccountId"
                name="sourceAccountId"
                required
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground"
              >
                <option value="" disabled className="text-muted-foreground">Selecione a conta de origem</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="destinationAccountId" className="text-sm font-medium">Conta de Destino</label>
              <select
                id="destinationAccountId"
                name="destinationAccountId"
                required
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground"
              >
                <option value="" disabled className="text-muted-foreground">Selecione a conta de destino</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">Valor (R$)</label>
              <Input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Data</label>
              <Input id="date" name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Input id="description" name="description" placeholder="Ex: Reserva financeira" defaultValue="Transferência entre contas" />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "A processar..." : "Confirmar Transferência"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      {alert && (
        <FloatingAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}
    </>
  )
}