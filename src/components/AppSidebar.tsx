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
  SidebarSeparator
} from "@/components/ui/sidebar"
import { useDrawer } from "@/contexts/DrawerContext"
import {
  BookOpen,
  CreditCard,
  FileText,
  FolderPlus,
  KanbanSquare,
  Landmark,
  MinusCircle,
  PlusCircle,
  Repeat,
  ShoppingBasket,
  TrendingUp,
  Wallet
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoTwoBanks } from "./twobanks"

const financeiroItems = [
  { title: "Carteira", href: "/admin/carteira", icon: Wallet },
  { title: "Cartões", href: "/admin/carteira/cartoes", icon: CreditCard },
  { title: "Faturas", href: "/admin/carteira/faturas", icon: FileText },
  { title: "Contas", href: "/admin/carteira/contas", icon: Landmark },
  { title: "Investimentos", href: "/admin/carteira/investimentos", icon: TrendingUp },
  { title: "Lista de Compras", href: "/admin/carteira/listas", icon: ShoppingBasket },
  { title: "Tarefas", href: "/admin/tarefas", icon: KanbanSquare },
]

const contentItems = [
  { title: "Blog", href: "/admin/blog", icon: FileText },
  { title: "Livros", href: "/admin/livros", icon: BookOpen },
]

const styleSidebar = {
  actions: 'transition-all duration-200 text-zinc-400 hover:bg-brand-pink/15 hover:text-brand-pink',
  links: {
    container: 'transition-all duration-200 relative overflow-hidden ',
    default: 'text-zinc-400 hover:bg-brand-blue/10 hover:text-brand-blue',
    hover: 'bg-brand-blue/15 text-brand-blue hover:bg-brand-blue/20 hover:text-brand-blue font-semibold'
  } 
}

interface AppSidebarProps {
  variant?: "sidebar" | "floating" | "inset"
}

export function AppSidebar({ variant = "sidebar" }: AppSidebarProps) {
  const pathname = usePathname()
  const { openDrawer } = useDrawer()

  return (
    <Sidebar collapsible="icon" variant={variant}>
      <SidebarHeader className="py-4">
        <Link href="/" className="flex items-center px-4 w-full transition-all">
          <div className="relative flex items-center justify-center shrink-0 w-40 group-data-[collapsible=icon]:w-10 transition-all duration-300">
            <LogoTwoBanks className="w-full h-auto text-sky-400" />
          </div>
        </Link>
      </SidebarHeader>
      <SidebarSeparator className="bg-border" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeiroItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={`${item.href}-${index}`}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className={`${styleSidebar.links.container} ${ isActive ? styleSidebar.links.hover : styleSidebar.links.default }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-1/2 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-blue" />
                      )}
                      <item.icon className="h-4 w-4 transition-colors" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="my-2 bg-border" />
        <SidebarGroup>
          <SidebarGroupLabel>Conteúdo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={`${item.href}-${index}`}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className={`${styleSidebar.links.container} ${ isActive ? styleSidebar.links.hover : styleSidebar.links.default }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-1/2 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-blue" />
                      )}
                      <item.icon className="h-4 w-4 transition-colors" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="my-2 bg-border" />
        <SidebarGroup>
          <SidebarGroupLabel>Ações Rápidas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("income")} className={styleSidebar.actions}>
                  <PlusCircle className="h-4 w-4" />
                  <span>Nova Receita</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("expense")} className={styleSidebar.actions}>
                  <MinusCircle className="h-4 w-4" />
                  <span>Nova Despesa</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("purchase")} className={styleSidebar.actions}>
                  <CreditCard className="h-4 w-4" />
                  <span>Nova Compra Cartão</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("recurring")} className={styleSidebar.actions}>
                  <Repeat className="h-4 w-4" />
                  <span>Despesa Recorrente</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("creditCard")} className={styleSidebar.actions}>
                  <CreditCard className="h-4 w-4" />
                  <span>Adicionar Cartão</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => openDrawer("category")} className={styleSidebar.actions}>
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