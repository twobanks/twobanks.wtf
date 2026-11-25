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
import { AccountDrawerProps } from "@/utils/types"
import { useState } from "react"

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
        <DrawerTrigger className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 text-foreground px-4 py-2 rounded-lg transition-colors">
          {account ? "Editar" : "+ Nova Conta"}
        </DrawerTrigger>
        <DrawerContent className="bg-background border-t border-border rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-foreground">
              {account ? "Editar Conta" : "Nova Conta"}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-subtle-foreground mb-4">
              {account ? "Atualize os dados da conta" : "Informe os dados da conta"}
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              name="name"
              placeholder="Nome da conta"
              defaultValue={account?.name}
              required
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <select
              name="type"
              defaultValue={account?.type}
              required
              className="bg-surface-2 border border-border p-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
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
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:brightness-110 text-primary-foreground font-medium p-3 rounded-lg transition-all disabled:opacity-50"
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