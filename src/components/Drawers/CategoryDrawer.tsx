// ==========================================
// Arquivo: src/components/Drawers/CategoryDrawer.tsx
// ==========================================

"use client"

import { createCategory, updateCategory } from "@/actions/categories"
import { DrawerAlert, DrawerShell, drawerFieldClass, drawerSelectContentClass, drawerSelectItemClass, drawerSelectTriggerClass } from "@/components/Drawers/drawer-shell"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDrawer } from "@/contexts/DrawerContext"; // 1. IMPORTAR O CONTEXTO
import { CategoryDrawerProps } from "@/utils/types"
import { useState } from "react"

export function CategoryDrawer({ category, onSuccess }: CategoryDrawerProps) {
  const { activeDrawer, closeDrawer } = useDrawer()
  const [alert, setAlert] = useState<DrawerAlert>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Se passou uma categoria por prop (edição na tabela), ele abre. 
  // Senão, abre se o activeDrawer global for "category".
  const isOpen = Boolean(category) || activeDrawer === "category"

  const handleClose = () => {
    closeDrawer()
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (category) {
        formData.append("id", String(category.id))
        await updateCategory(formData)
      } else {
        await createCategory(formData)
      }
      handleClose()
      setAlert({
        type: "success",
        message: category ? "Categoria atualizada!" : "Categoria criada!",
      })
      onSuccess?.()
    } catch (error) {
      setAlert({
        type: "error",
        message: "Não foi possível salvar a categoria.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DrawerShell
      open={isOpen}
      onClose={handleClose}
      title={category ? "Editar Categoria" : "Nova Categoria"}
      description={category ? "Atualize os dados da categoria" : "Informe os dados da categoria"}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Salvar"
      alert={alert}
      onAlertClose={() => setAlert(null)}
      // Removido o 'trigger' fixo para evitar que um botão indesejado apareça no host global
    >
      <Input
        name="name"
        placeholder="Nome da categoria"
        defaultValue={category?.name}
        required
        autoFocus
        className={`md:col-span-2 ${drawerFieldClass}`}
      />
      <div className="md:col-span-2">
        <Select name="type" defaultValue={category?.type ?? "expense"} required>
          <SelectTrigger className={drawerSelectTriggerClass}>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent className={drawerSelectContentClass}>
            <SelectItem value="expense" className={drawerSelectItemClass}>Despesa</SelectItem>
            <SelectItem value="income" className={drawerSelectItemClass}>Receita</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </DrawerShell>
  )
}