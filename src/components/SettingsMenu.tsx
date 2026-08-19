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
import { useDrawer } from "@/contexts/DrawerContext"
import { Settings } from "lucide-react"


export function SettingsMenu() {
  const { openDrawer } = useDrawer()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-800 transition-colors">
        <Settings className="h-5 w-5" />
        <span className="sr-only">Configurações</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Movimentações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openDrawer("income")}>
            Adicionar Receita
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDrawer("expense")}>
            Adicionar Despesa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDrawer("purchase")}>
            Adicionar Compra
          </DropdownMenuItem>
        </DropdownMenuGroup>

          <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Despesas</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openDrawer("recurring")}>
            Adicionar Despesa
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Cartão de Crédito</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openDrawer("creditCard")}>
            Adicionar cartão
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Categorias</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openDrawer("category")}>
            Adicionar categoria
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}