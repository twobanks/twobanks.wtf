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
import type { Category, FinancialAccount, RecurringExpense } from "@/utils/types"
import { useState } from "react"

interface RecurringExpenseDrawerProps {
  recurringExpense?: RecurringExpense
  categories?: Category[]
  accounts?: FinancialAccount[]
  onSuccess?: () => void
}

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

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
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
      console.error("Erro ao salvar despesa recorrente:", error)
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
        className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
      >
        {recurringExpense ? "Editar" : "+ Nova Despesa"}
      </button>

      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) closeDrawer()
        }}
      >
        <DrawerContent className="bg-gray-900 border-t border-gray-800 rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              {recurringExpense ? "Editar Despesa Recorrente" : "Nova Despesa Recorrente"}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              Informe os dados da despesa fixa
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Nome (ex: Aluguel)"
              defaultValue={recurringExpense?.name}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Valor"
              defaultValue={recurringExpense?.amount}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="dueDay"
              type="number"
              min="1"
              max="31"
              placeholder="Dia do vencimento"
              defaultValue={recurringExpense?.dueDay}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="categoryId"
              defaultValue={recurringExpense?.categoryId ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sem categoria</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              name="accountId"
              defaultValue={recurringExpense?.accountId ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sem conta</option>
              {accounts?.map((acc) => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>
            <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                name="active"
                defaultChecked={recurringExpense?.active ?? true}
                className="rounded border-gray-700 bg-gray-800"
              />
              Ativa
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 bg-blue-600 hover:bg-blue-500 text-white font-medium p-3 rounded-lg transition-colors disabled:opacity-50"
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