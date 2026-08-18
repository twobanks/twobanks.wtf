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
import { useRouter } from "next/navigation"

export function SettingsMenu() {
  const router = useRouter()
  const { openDrawer } = useDrawer()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-800 transition-colors">
        <Settings className="h-5 w-5" />
        <span className="sr-only">Configurações</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => router.push("/admin/carteira")}>
          Transações
        </DropdownMenuItem>

        <DropdownMenuSeparator />

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
            Nova Despesa
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Cartão de Crédito</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openDrawer("purchase")}>
            Adicionar Compra
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/admin/cartoes")}>
            Visualizar cartões
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDrawer("creditCard")}>
            Adicionar cartão
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/admin/faturas")}>
            Acessar faturas
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Categorias</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push("/admin/categorias")}>
            Visualizar categorias
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDrawer("category")}>
            Adicionar categorias
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
          Dashboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}