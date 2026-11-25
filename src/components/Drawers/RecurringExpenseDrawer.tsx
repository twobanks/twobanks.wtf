"use client"

import { createRecurringExpense, updateRecurringExpense } from "@/actions/recurringExpenses"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { FloatingAlert } from "@/components/ui/floating-alert"
import { useDrawer } from "@/contexts/DrawerContext"
import type { RecurringExpenseDrawerProps } from "@/utils/types"
import { useState } from "react"

export function RecurringExpenseDrawer({
  categories,
  accounts,
  recurringExpense,
  onSuccess,
}: RecurringExpenseDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer()
  const [floatingAlert, setFloatingAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const open = activeDrawer === "recurring"

  const defaultStartMonth = (() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  })()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      // Garantir que o campo startMonth esteja presente (se não, usar padrão)
      if (!formData.get("startMonth")) {
        formData.set("startMonth", defaultStartMonth)
      }

      if (recurringExpense) {
        formData.append("id", String(recurringExpense.id))
        await updateRecurringExpense(formData)
      } else {
        await createRecurringExpense(formData)
      }
      closeDrawer()
      setFloatingAlert({
        type: "success",
        message: recurringExpense ? "Despesa atualizada!" : "Despesa criada!",
      })
      onSuccess?.()
    } catch (error) {
      setFloatingAlert({
        type: "error",
        message: "Não foi possível salvar a despesa.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openDrawer("recurring")}
        className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 text-foreground px-4 py-2 rounded-lg transition-colors"
      >
        {recurringExpense ? "Editar" : "+ Nova Despesa"}
      </button>

      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) closeDrawer()
        }}
      >
        <DrawerContent className="bg-background border-t border-border rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-foreground">
              {recurringExpense ? "Editar Despesa Recorrente" : "Nova Despesa Recorrente"}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-subtle-foreground mb-4">
              Informe os dados da despesa fixa
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Nome (ex: Aluguel)"
              defaultValue={recurringExpense?.name}
              required
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Valor"
              defaultValue={recurringExpense?.amount}
              required
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <input
              name="dueDay"
              type="number"
              min="1"
              max="31"
              placeholder="Dia do vencimento"
              defaultValue={recurringExpense?.dueDay}
              required
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />

            {!recurringExpense && (
              <input
                name="startMonth"
                type="month"
                defaultValue={defaultStartMonth}
                required
                className="..."
              />
            )}

            <select
              name="categoryId"
              defaultValue={recurringExpense?.categoryId ?? ""}
              className="bg-surface-2 border border-border p-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            >
              <option value="">Sem categoria</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              name="accountId"
              defaultValue={recurringExpense?.accountId ?? ""}
              className="bg-surface-2 border border-border p-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            >
              <option value="">Sem conta</option>
              {accounts?.map((acc) => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>

            {/* Checkbox corrigido: valor explícito "true" */}
            <input 
              type="hidden" 
              name="active" 
              value="false" 
            />
            <label className="md:col-span-2 flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                name="active"
                value="true"
                defaultChecked={recurringExpense?.active ?? true}
                className="rounded border-border bg-surface-2"
              />
              Ativa
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 bg-primary hover:brightness-110 text-primary-foreground font-medium p-3 rounded-lg transition-all disabled:opacity-50"
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