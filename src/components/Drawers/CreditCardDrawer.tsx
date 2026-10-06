// ==========================================
// Arquivo: src/components/Drawers/CreditCardDrawer.tsx (Corrigido)
// ==========================================

"use client"

import { createCreditCard, updateCreditCard } from "@/actions/creditCards"
import {
  DrawerAlert,
  drawerFieldClass,
  DrawerShell,
} from "@/components/Drawers/drawer-shell"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDrawer } from "@/contexts/DrawerContext"
import type { CreditCardDrawerProps } from "@/utils/types"
import { Pencil, Plus } from "lucide-react"
import { useState } from "react"

export function CreditCardDrawer({ creditCard, onSuccess }: CreditCardDrawerProps) {
  const { activeDrawer, closeDrawer } = useDrawer()
  const [isOpenLocal, setIsOpenLocal] = useState(false)
  const [alert, setAlert] = useState<DrawerAlert>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Se for o drawer global de "Adicionar Novo Cartão" ou o estado local de edição
  const isGlobalOpen = !creditCard && activeDrawer === "creditCard"
  const isOpen = isOpenLocal || isGlobalOpen

  const handleClose = () => {
    setIsOpenLocal(false)
    closeDrawer()
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (creditCard) {
        formData.append("id", String(creditCard.id))
        await updateCreditCard(formData)
      } else {
        await createCreditCard(formData)
      }
      
      handleClose()
      setAlert({
        type: "success",
        message: creditCard ? "Cartão atualizado!" : "Cartão criado!",
      })
      onSuccess?.()
    } catch (error) {
      setAlert({
        type: "error",
        message: "Não foi possível salvar o cartão.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Renderiza um botão de gatilho dependendo se é Edição ou Criação
  const triggerButton = creditCard ? (
    <button
      onClick={() => setIsOpenLocal(true)}
      title="Editar cartão"
      className="inline-flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 p-2 rounded-lg transition-colors"
    >
      <Pencil size={18} />
      <span className="sr-only">Editar</span>
    </button>
  ) : (
    <button
      onClick={() => setIsOpenLocal(true)}
      className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
    >
      <Plus size={16} />
      Novo Cartão
    </button>
  )

  return (
    <DrawerShell
      open={isOpen}
      onClose={handleClose}
      title={creditCard ? "Editar Cartão" : "Novo Cartão"}
      description="Informe os dados principais do cartão"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Salvar Cartão"
      alert={alert}
      onAlertClose={() => setAlert(null)}
      trigger={triggerButton}
    >
      <Input
        name="name"
        placeholder="Nome do cartão (ex: Nubank, XP)"
        defaultValue={creditCard?.name}
        required
        className={`md:col-span-2 ${drawerFieldClass}`} 
      />
      
      <div className="md:col-span-2">
        <Select name="brand" defaultValue={creditCard?.brand ?? ""}>
          <SelectTrigger className={`!h-[52px] ${drawerFieldClass}`}>
            <SelectValue placeholder="Selecione a bandeira" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mastercard">Mastercard</SelectItem>
            <SelectItem value="Visa">Visa</SelectItem>
            <SelectItem value="Alelo">Alelo</SelectItem>
            <SelectItem value="Caju">Caju</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        name="lastFourDigits"
        placeholder="4 últimos números (ex: 1234)"
        maxLength={4}
        pattern="\d{4}"
        title="Apenas os 4 últimos dígitos numéricos"
        defaultValue={creditCard?.lastFourDigits ?? ""} 
        className={`md:col-span-2 ${drawerFieldClass}`}
      />
    </DrawerShell>
  )
}