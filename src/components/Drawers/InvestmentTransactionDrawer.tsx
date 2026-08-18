"use client"

import { createInvestmentTransaction } from "@/actions/investments"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FloatingAlert } from "@/components/ui/floating-alert"
import type { Asset } from "@/utils/types"
import { useState } from "react"

interface InvestmentTransactionDrawerProps {
  assets: Asset[]
  selectedAssetId?: number
  onSuccess?: () => void
}

export function InvestmentTransactionDrawer({
  assets,
  selectedAssetId,
  onSuccess,
}: InvestmentTransactionDrawerProps) {
  const [open, setOpen] = useState(false)
  const [floatingAlert, setFloatingAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await createInvestmentTransaction(formData)
      setOpen(false)
      setFloatingAlert({
        type: "success",
        message: "Transação lançada com sucesso!",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Erro ao lançar transação:", error)
      setFloatingAlert({
        type: "error",
        message: "Não foi possível lançar a transação.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-black px-4 py-2 rounded-lg transition-colors">
          + Lançar Transação
        </DrawerTrigger>
        <DrawerContent className="bg-gray-900 border-t border-gray-800 rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-gray-100">
              Lançar Transação de Investimento
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400 mb-4">
              Informe os dados da transação
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="assetId"
              defaultValue={selectedAssetId || ""}
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o ativo</option>
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name} ({asset.ticker || asset.type})
                </option>
              ))}
            </select>
            <select
              name="type"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="buy">Compra</option>
              <option value="sell">Venda</option>
              <option value="contribution">Aporte</option>
              <option value="withdrawal">Retirada</option>
              <option value="dividend">Dividendo</option>
              <option value="jcp">JCP</option>
            </select>
            <input
              name="date"
              type="date"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="quantity"
              type="number"
              step="0.01"
              placeholder="Quantidade (se aplicável)"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Preço unitário (se aplicável)"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Valor total (R$)"
              required
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="fees"
              type="number"
              step="0.01"
              placeholder="Taxas (R$)"
              defaultValue="0"
              className="bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="notes"
              placeholder="Observações"
              rows={2}
              className="md:col-span-2 bg-gray-800 border border-gray-700 p-3 rounded-lg placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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