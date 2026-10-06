// ==========================================
// Arquivo: src/components/AppSidebar.tsx
// ==========================================

"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter, // 1. IMPORTAR O FOOTER DO SIDEBAR
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
  MinusCircle,
  PlusCircle,
  Repeat,
  ShoppingBasket,
  TrendingUp,
  Wallet
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

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

interface UserStatusInfo {
  id: string
  name: string | null
  email: string | null
  image?: string | null
  isOnline: boolean
}

interface AppSidebarProps {
  variant?: "sidebar" | "floating" | "inset"
  currentUser?: UserStatusInfo
  otherUser?: UserStatusInfo | null
}

export function AppSidebar({ variant = "sidebar", currentUser, otherUser }: AppSidebarProps) {
  const pathname = usePathname()
  const { openDrawer } = useDrawer()

  // 2. DISPARAR PING QUANDO MUDAR DE ROTA OU A CADA 30 SEGUNDOS
  useEffect(() => {
    const sendPing = async () => {
      try {
        await fetch("/api/presence", { method: "POST" })
      } catch (e) {
        // Ignora falhas de rede em segundo plano
      }
    }

    sendPing() // Ping inicial ao carregar/mudar rota

    const interval = setInterval(sendPing, 30000) // Heartbeat a cada 30s
    return () => clearInterval(interval)
  }, [pathname])

  return (
    <Sidebar collapsible="icon" variant={variant}>
      <SidebarHeader className="py-4">
        <Link
          href="/"
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
        {/* Seção Financeiro */}
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

        {/* Seção Conteúdo */}
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

        {/* Seção Ações Rápidas */}
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

      {/* 3. RODAPÉ DO SIDEBAR: CORRIGIDO PARA O MODO ABERTO E RECOLHIDO */}
      <SidebarFooter className="p-3 border-t border-border bg-sidebar-accent/25">
        <div className="flex flex-col gap-2.5 w-full items-stretch group-data-[collapsible=icon]:items-center">
          
          {/* Status do Outro Usuário */}
          {otherUser && (
            <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-sidebar-accent/50 border border-border/40 text-xs w-full group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-0">
              <div className="flex items-center gap-2.5 overflow-hidden group-data-[collapsible=icon]:justify-center w-full">
                <div className={`relative shrink-0 h-7 w-7 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 rounded-full overflow-hidden border transition-all ${otherUser.isOnline ? "border-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" : "border-zinc-600 grayscale opacity-70"}`}>
                  {otherUser.image ? (
                    <Image src={otherUser.image} alt={otherUser.name || "Outro usuário"} width={32} height={32} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-zinc-800 text-zinc-300 font-bold text-[10px]">
                      {otherUser.name?.[0]?.toUpperCase() || "O"}
                    </div>
                  )}
                </div>
                <span className="text-muted-foreground font-medium truncate group-data-[collapsible=icon]:hidden">
                  {otherUser.name || "Outro usuário"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 group-data-[collapsible=icon]:hidden" title={otherUser.isOnline ? "Online" : "Offline"}>
                <span className={`h-2 w-2 rounded-full ${otherUser.isOnline ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)] animate-pulse" : "bg-zinc-500"}`} />
                <span className="text-[10px] tracking-wider uppercase font-semibold text-muted-foreground">
                  {otherUser.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          )}

          {/* Dados do Usuário Logado Atualmente */}
          {currentUser && (
            <div className="flex items-center gap-3 px-1 py-1 overflow-hidden w-full group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <div className="relative shrink-0 h-9 w-9 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 rounded-full overflow-hidden border-2 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                {currentUser.image ? (
                  <Image src={currentUser.image} alt={currentUser.name || "User"} width={36} height={36} className="object-cover w-full h-full" />
                ) : (
                  <span>{currentUser.name?.[0]?.toUpperCase() || "U"}</span>
                )}
              </div>
              <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold text-foreground truncate">{currentUser.name || "Usuário"}</span>
                <span className="text-xs text-muted-foreground truncate">{currentUser.email}</span>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}