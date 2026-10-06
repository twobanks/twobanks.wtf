// ==========================================
// Arquivo: src/components/SettingsMenu.tsx
// ==========================================

"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DrawerKeyProps, useDrawer } from "@/contexts/DrawerContext"
import { Settings } from "lucide-react"

export function SettingsMenu() {
  const { openDrawer } = useDrawer()

  const handleOpenDrawer = (drawerKey: DrawerKeyProps) => {
    setTimeout(() => {
      openDrawer(drawerKey)
    }, 0)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-800 transition-colors">
        <Settings className="h-5 w-5" />
        <span className="sr-only">Configurações</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Movimentações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleOpenDrawer("income")}>
            Adicionar Receita
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenDrawer("expense")}>
            Adicionar Despesa
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Cartão de Crédito</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleOpenDrawer("purchase")}>
            Adicionar Compra
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenDrawer("creditCard")}>
            Adicionar Cartão
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Categorias</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleOpenDrawer("category")}>
            Adicionar Categoria
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}