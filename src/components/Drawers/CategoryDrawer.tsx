"use client"

import { createCategory, updateCategory } from "@/actions/categories"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { FloatingAlert } from "@/components/ui/floating-alert"
import { useDrawer } from "@/contexts/DrawerContext"
import { useState } from "react"

interface Category {
  id: number
  name: string
  type: "expense" | "income" | "transfer"
}

interface CategoryDrawerProps {
  category?: Category
  onSuccess?: () => void
}

export function CategoryDrawer({ category, onSuccess }: CategoryDrawerProps) {
  const { activeDrawer, openDrawer, closeDrawer } = useDrawer()
  const [floatingAlert, setFloatingAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const open = activeDrawer === "category"

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (category) {
        formData.append("id", String(category.id))
        await updateCategory(formData)
      } else {
        await createCategory(formData)
      }
      closeDrawer()
      setFloatingAlert({
        type: "success",
        message: category ? "Categoria atualizada!" : "Categoria criada!",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Erro ao salvar categoria:", error)
      setFloatingAlert({
        type: "error",
        message: "Não foi possível salvar a categoria.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openDrawer("category")}
        className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors"
      >
        {category ? "Editar" : "+ Nova Categoria"}
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
              {category ? "Editar Categoria" : "Nova Categoria"}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              {category ? "Atualize os dados da categoria" : "Informe os dados da categoria"}
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              name="name"
              placeholder="Nome da categoria"
              defaultValue={category?.name}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="type"
              defaultValue={category?.type}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
              <option value="transfer">Transferência</option>
            </select>
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