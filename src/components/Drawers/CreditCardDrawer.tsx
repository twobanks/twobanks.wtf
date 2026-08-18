"use client"

import { createCreditCard, updateCreditCard } from "@/actions/creditCards"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { FloatingAlert } from "@/components/ui/floating-alert"
import { useDrawer } from "@/contexts/DrawerContext"
import type { CreditCard } from "@/utils/types"
import { useState } from "react"

interface CreditCardDrawerProps {
  creditCard?: CreditCard
  onSuccess?: () => void
}

export function CreditCardDrawer({ creditCard, onSuccess }: CreditCardDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer()
  const [floatingAlert, setFloatingAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const open = activeDrawer === "creditCard"

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (creditCard) {
        formData.append("id", String(creditCard.id))
        await updateCreditCard(formData)
      } else {
        await createCreditCard(formData)
      }
      closeDrawer()
      setFloatingAlert({
        type: "success",
        message: creditCard ? "Cartão atualizado!" : "Cartão criado!",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Erro ao salvar cartão:", error)
      setFloatingAlert({
        type: "error",
        message: "Não foi possível salvar o cartão.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openDrawer("creditCard")}
        className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
      >
        {creditCard ? "Editar" : "+ Adicionar Cartão"}
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
              {creditCard ? "Editar Cartão" : "Novo Cartão"}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              Informe os dados do cartão
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Nome do cartão (ex: Nubank)"
              defaultValue={creditCard?.name}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="brand"
              placeholder="Bandeira (ex: Visa, Master)"
              defaultValue={creditCard?.brand ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="creditLimit"
              type="number"
              step="0.01"
              placeholder="Limite"
              defaultValue={creditCard?.creditLimit ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="dueDay"
              type="number"
              min="1"
              max="31"
              placeholder="Dia de vencimento"
              defaultValue={creditCard?.dueDay ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="closingDay"
              type="number"
              min="1"
              max="31"
              placeholder="Dia de fechamento"
              defaultValue={creditCard?.closingDay ?? ""}
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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