"use client"

import { createAccount, updateAccount } from "@/actions/accounts"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FloatingAlert } from "@/components/ui/floating-alert"
import { useState } from "react"

// Interface atualizada para aceitar null em initialBalance
interface FinancialAccount {
  id: number
  name: string
  type: "checking" | "savings" | "cash" | "investment" | "other"
  initialBalance: string | null
}

interface AccountDrawerProps {
  account?: FinancialAccount
  onSuccess?: () => void
}

export function AccountDrawer({ account, onSuccess }: AccountDrawerProps) {
  const [open, setOpen] = useState(false)
  const [floatingAlert, setFloatingAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (account) {
        formData.append("id", String(account.id))
        await updateAccount(formData)
      } else {
        await createAccount(formData)
      }
      setOpen(false)
      setFloatingAlert({
        type: "success",
        message: account ? "Conta atualizada!" : "Conta criada!",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Erro ao salvar conta:", error)
      setFloatingAlert({
        type: "error",
        message: "Não foi possível salvar a conta.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors">
          {account ? "Editar" : "+ Nova Conta"}
        </DrawerTrigger>
        <DrawerContent className="bg-gray-900 border-t border-gray-800 rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              {account ? "Editar Conta" : "Nova Conta"}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              {account ? "Atualize os dados da conta" : "Informe os dados da conta"}
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              name="name"
              placeholder="Nome da conta"
              defaultValue={account?.name}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="type"
              defaultValue={account?.type}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="checking">Conta Corrente</option>
              <option value="savings">Poupança</option>
              <option value="cash">Dinheiro</option>
              <option value="investment">Investimento</option>
              <option value="other">Outro</option>
            </select>
            <input
              name="initialBalance"
              type="number"
              step="0.01"
              placeholder="Saldo inicial"
              defaultValue={account?.initialBalance ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium p-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </form>
        </DrawerContent>
      </Drawer>

      {floatingAlert && (
        <FloatingAlert
          type={floatingAlert.type}
          message={floatingAlert.message}
          onClose={() => setFloatingAlert(null)}
        />
      )}
    </>
  )
}