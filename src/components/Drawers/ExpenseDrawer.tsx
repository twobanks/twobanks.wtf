"use client"

import { createExpense, updateExpense } from "@/actions/expenses"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { FloatingAlert } from "@/components/ui/floating-alert"
import { useDrawer } from "@/contexts/DrawerContext"
import type { Category, FinancialAccount, Transaction } from "@/utils/types"
import { useState } from "react"

interface ExpenseDrawerProps {
  categories: Category[]
  accounts: FinancialAccount[]
  expense?: Transaction
  onSuccess?: () => void
}

export function ExpenseDrawer({ categories, accounts, expense, onSuccess }: ExpenseDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer()
  const [isRecurring, setIsRecurring] = useState(false)
  const [floatingAlert, setFloatingAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const open = activeDrawer === "expense"

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (expense) {
        formData.append("id", String(expense.id))
        await updateExpense(formData)
      } else {
        formData.append("isRecurring", isRecurring ? "on" : "off")
        await createExpense(formData)
      }
      closeDrawer()
      setFloatingAlert({
        type: "success",
        message: expense ? "Despesa atualizada!" : "Despesa criada!",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Erro ao salvar despesa:", error)
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
        onClick={() => {
          setIsRecurring(false)
          openDrawer("expense")
        }}
        className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
      >
        {expense ? "Editar" : "+ Adicionar Despesa"}
      </button>

      <Drawer open={open} onOpenChange={(isOpen) => { if (!isOpen) closeDrawer() }} swipeDirection="right">
        <DrawerContent className="bg-gray-900 border-t border-gray-800 rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              {expense ? "Editar Despesa" : "Nova Despesa"}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              {expense ? "Atualize os dados da despesa" : "Preencha os dados da despesa"}
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="description"
              placeholder="Descrição"
              defaultValue={expense?.description}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Valor"
              defaultValue={expense?.amount}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="date"
              type="date"
              defaultValue={expense?.date ?? new Date().toISOString().split("T")[0]}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="categoryId"
              defaultValue={expense?.categoryId ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sem categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              name="accountId"
              defaultValue={expense?.accountId ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sem conta</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>

            {!expense && (
              <>
                <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                  Despesa recorrente
                </label>
                {isRecurring && (
                  <input
                    name="dueDay"
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Dia do vencimento"
                    required
                    className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </>
            )}

            <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                name="paid"
                defaultChecked={expense?.paid ?? true}
                className="rounded border-gray-700 bg-gray-800"
              />
              Pago
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