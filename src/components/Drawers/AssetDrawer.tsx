"use client"

import { createAsset, updateAsset } from "@/actions/investments"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FloatingAlert } from "@/components/ui/floating-alert"
import type { AssetDrawerProps } from "@/utils/types"
import { useState } from "react"

export function AssetDrawer({ asset, onSuccess }: AssetDrawerProps) {
  const [open, setOpen] = useState(false)
  const [floatingAlert, setFloatingAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      if (asset) {
        formData.append("id", String(asset.id))
        await updateAsset(formData)
      } else {
        await createAsset(formData)
      }
      setOpen(false)
      setFloatingAlert({
        type: "success",
        message: asset ? "Ativo atualizado!" : "Ativo criado!",
      })
      onSuccess?.()
    } catch (_error) {
      setFloatingAlert({
        type: "error",
        message: "Não foi possível salvar o ativo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 text-foreground px-4 py-2 rounded-lg transition-colors">
          {asset ? "Editar" : "+ Ativo"}
        </DrawerTrigger>
        <DrawerContent className="bg-background border-t border-border rounded-t-2xl p-6 shadow-xl">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-foreground">
              {asset ? "Editar Ativo" : "Novo Ativo"}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-subtle-foreground mb-4">
              Informe os dados do ativo
            </DrawerDescription>
          </DrawerHeader>

          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Nome (ex: Ações XPTO)"
              defaultValue={asset?.name}
              required
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <input
              name="ticker"
              placeholder="Código (ex: XPTO3)"
              defaultValue={asset?.ticker ?? ""}
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <select
              name="type"
              defaultValue={asset?.type ?? "stock"}
              required
              className="bg-surface-2 border border-border p-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            >
              <option value="stock">Ação</option>
              <option value="fii">FII</option>
              <option value="crypto">Cripto</option>
              <option value="fixed_income">Renda Fixa</option>
              <option value="other">Outro</option>
            </select>
            <input
              name="currentPrice"
              type="number"
              step="0.01"
              placeholder="Preço atual"
              defaultValue={asset?.currentPrice ?? ""}
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <input
              name="quantity"
              type="number"
              step="0.01"
              placeholder="Quantidade"
              defaultValue={asset?.quantity ?? ""}
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <input
              name="averagePrice"
              type="number"
              step="0.01"
              placeholder="Preço médio"
              defaultValue={asset?.averagePrice ?? ""}
              className="bg-surface-2 border border-border p-3 rounded-lg placeholder:text-subtle-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 bg-primary hover:brightness-110 text-primary-foreground font-medium p-3 rounded-lg transition-all disabled:opacity-50"
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