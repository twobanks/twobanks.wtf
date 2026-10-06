// ==========================================
// Arquivo: src/components/AppSidebar.tsx
// ==========================================

"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useDrawer } from "@/contexts/DrawerContext"
import {
  BookOpen,
  CreditCard,
  FileText,
  FolderPlus,
  Landmark,
  MinusCircle, // 1. IMPORTAR O ÍCONE DE SAÍDA/DESPESA
  PlusCircle,
  Repeat,
  ShoppingBasket,
  TrendingUp,
  Wallet
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import logoImage from "@/../public/twobanks.webp"

const financeiroItems = [
  { title: "Carteira", href: "/admin/carteira", icon: Wallet },
  { title: "Cartões", href: "/admin/carteira/cartoes", icon: CreditCard },
  { title: "Faturas", href: "/admin/carteira/faturas", icon: FileText },
  { title: "Contas", href: "/admin/carteira/contas", icon: Landmark },
  { title: "Investimentos", href: "/admin/carteira/investimentos", icon: TrendingUp },
  { title: "Lista de Compras", href: "/admin/carteira/listas", icon: ShoppingBasket },
]

const contentItems = [
  { title: "Blog", href: "/admin/blog", icon: FileText },
  { title: "Livros", href: "/admin/livros", icon: BookOpen },
]

interface AppSidebarProps {
  variant?: "sidebar" | "floating" | "inset"
}

export function AppSidebar({ variant = "sidebar" }: AppSidebarProps) {
  const pathname = usePathname()
  const { openDrawer } = useDrawer()

  return (
    <Sidebar collapsible="icon" variant={variant}>
      <SidebarHeader className="py-4">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-2 font-extrabold text-xl tracking-tight transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <div className="relative flex items-center justify-center shrink-0 w-10 h-10">
            <Image
              src={logoImage}
              alt="TwoBanks Logo"
              width={40}
              height={40}
              priority
              className="object-contain w-full h-full"
            />
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden text-2xl tracking-normal">
            BANKS<span className="text-[#FC4C02]">.</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator className="bg-border" />

      <SidebarContent>
        {/* Seção de Navegação Principal (Financeiro) */}
        <SidebarGroup>
          <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeiroItems.map((item, index) => (
                <SidebarMenuItem key={`${item.href}-${index}`}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2 bg-border" />

        {/* Seção de Conteúdo (Blog e Livros) */}
        <SidebarGroup>
          <SidebarGroupLabel>Conteúdo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item, index) => (
                <SidebarMenuItem key={`${item.href}-${index}`}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2 bg-border" />

        {/* Seção de Ações Rápidas */}
        <SidebarGroup>
          <SidebarGroupLabel>Ações Rápidas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("income")}>
                  <PlusCircle className="h-4 w-4" />
                  <span>Nova Receita</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("expense")}>
                  {/* Ícone atualizado para MinusCircle indicando saída/gasto */}
                  <MinusCircle className="h-4 w-4" />
                  <span>Nova Despesa</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("purchase")}>
                  <CreditCard className="h-4 w-4" />
                  <span>Nova Compra Cartão</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("recurring")}>
                  <Repeat className="h-4 w-4" />
                  <span>Despesa Recorrente</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("creditCard")}>
                  <CreditCard className="h-4 w-4" />
                  <span>Adicionar Cartão</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("category")}>
                  <FolderPlus className="h-4 w-4" />
                  <span>Adicionar Categoria</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}