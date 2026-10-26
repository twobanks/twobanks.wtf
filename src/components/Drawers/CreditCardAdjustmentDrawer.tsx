"use client"

import { createCreditCardAdjustment } from "@/actions/wallet"
import { DrawerAlert, DrawerShell, drawerFieldClass, drawerSelectContentClass, drawerSelectItemClass, drawerSelectTriggerClass } from "@/components/Drawers/drawer-shell"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useState } from "react"

export function CreditCardAdjustmentDrawer({ creditCardId }: { creditCardId: number }) {
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState<DrawerAlert>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.append("creditCardId", String(creditCardId))
    try {
      await createCreditCardAdjustment(formData)
      setAlert({ type: "success", message: "Ajuste lançado com sucesso!" })
      setOpen(false)
    } catch (error) {
      setAlert({ type: "error", message: "Erro ao lançar ajuste." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DrawerShell
      open={open}
      onClose={() => setOpen(false)}
      title="Lançar Ajuste na Fatura"
      description="Registre estornos, cashbacks ou taxas avulsas."
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Salvar Ajuste"
      alert={alert}
      onAlertClose={() => setAlert(null)}
      trigger={
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Lançar Estorno/Taxa
        </button>
      }
    >
      <div className="md:col-span-2">
        <Select name="type" defaultValue="refund">
          <SelectTrigger className={drawerSelectTriggerClass}>
            <SelectValue placeholder="Tipo de Ajuste" />
          </SelectTrigger>
          <SelectContent className={drawerSelectContentClass}>
            <SelectItem value="refund" className={drawerSelectItemClass}>Estorno de Compra (Crédito)</SelectItem>
            <SelectItem value="cashback" className={drawerSelectItemClass}>Cashback (Crédito)</SelectItem>
            <SelectItem value="fee" className={drawerSelectItemClass}>Taxa / Anuidade (Débito)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input name="description" placeholder="Descrição (Ex: Estorno Uber)" required className={`md:col-span-2 ${drawerFieldClass}`} />
      <Input name="amount" type="number" step="0.01" placeholder="Valor (R$)" required className={drawerFieldClass} />
      <Input name="date" type="date" required className={drawerFieldClass} />
    </DrawerShell>
  )
}