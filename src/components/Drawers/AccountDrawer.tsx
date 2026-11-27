"use client"

import { createAccount, updateAccount } from "@/actions/accounts"
import { AccountDrawerProps } from "@/utils/types"
import { DrawerShell } from "./drawer-shell"
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
        message: (account ? "Conta atualizada!" : "Conta criada!"),
      })
      onSuccess?.()
    } catch (_error) {
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
      <DrawerShell
        open={open}
        onClose={() => setOpen(false)}
        title={account ? "Editar Conta" : "Nova Conta"}
        description={
          account ? "Atualize os dados da conta" : "Informe os dados da conta"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Salvar"
        submitLabelLoading="Salvando..."
        alert={floatingAlert}
        onAlertClose={() => setFloatingAlert(null)}
      >
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
      </DrawerShell>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 text-foreground px-4 py-2 rounded-lg transition-colors"
      >
        {account ? "Editar" : "+ Nova Conta"}
      </button>
    </>
  )
}
