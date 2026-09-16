// src/components/Drawers/CreditCardDrawer.tsx
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
import type { CreditCardDrawerProps } from "@/utils/types"
import { useEffect, useState } from "react"

export function CreditCardDrawer({ creditCard, onSuccess }: CreditCardDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [alert, setAlert] = useState<DrawerAlert>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setAlert(null)
    }
  }, [isOpen])

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (creditCard) {
        formData.append("id", String(creditCard.id))
        await updateCreditCard(formData)
      } else {
        await createCreditCard(formData)
      }
      
      setIsOpen(false)
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

  return (
    <DrawerShell
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title={creditCard ? "Editar Cartão" : "Novo Cartão"}
      description="Informe os dados principais do cartão"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Salvar Cartão"
      alert={alert}
      onAlertClose={() => setAlert(null)}
      trigger={
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors text-sm"
        >
          {creditCard ? "Editar" : "+ Adicionar Cartão"}
        </button>
      }
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