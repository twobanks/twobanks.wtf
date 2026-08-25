"use client"

import { createTransaction } from "@/actions/wallet"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { FloatingAlert } from "@/components/ui/floating-alert"
import { useDrawer } from "@/contexts/DrawerContext"
import { IncomeDrawerProps } from "@/utils/types"
import { useState } from "react"

export function IncomeDrawer({ onSuccess }: IncomeDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer()
  const [floatingAlert, setFloatingAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const open = activeDrawer === "income"

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      formData.append("type", "income")
      await createTransaction(formData)
      closeDrawer()
      setFloatingAlert({
        type: "success",
        message: "Receita criada!",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Erro ao salvar receita:", error)
      setFloatingAlert({
        type: "error",
        message: "Não foi possível salvar a receita.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openDrawer("income")}
        className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
      >
        + Adicionar Receita
      </button>

      <Drawer open={open} onOpenChange={(isOpen) => { if (!isOpen) closeDrawer() }} swipeDirection="right">
        <DrawerContent className="bg-gray-900 border-t border-gray-800 rounded-t-2xl p-4 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              Nova Receita
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              Registre uma entrada de dinheiro
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="description"
              placeholder="Descrição (ex: Salário)"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Valor"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              name="date"
              type="date"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
            >
              {isSubmitting ? "Salvando..." : "Nova Receita"}
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