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
  SidebarMenuItem
} from "@/components/ui/sidebar"
import {
  CreditCard,
  FileText,
  Landmark,
  ShoppingBasket,
  TrendingUp,
  Wallet
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const financeiroItems = [
  { title: "Carteira", href: "/admin/carteira", icon: Wallet },
  { title: "Cartões", href: "/admin/carteira/cartoes", icon: CreditCard },
  { title: "Faturas", href: "/admin/carteira/faturas", icon: FileText },
  { title: "Contas", href: "/admin/carteira/contas", icon: Landmark },
  { title: "Investimentos", href: "/admin/carteira/investimentos", icon: TrendingUp },
  { title: "Lista de Compras", href: "/admin/carteira/listas", icon: ShoppingBasket  },
]

interface AppSidebarProps {
  variant?: "sidebar" | "floating" | "inset"
}

export function AppSidebar({ variant = "sidebar" }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" variant={variant}>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl tracking-tight"
        >
          twobanks<span className="text-[#FC4C02]">.</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
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
      </SidebarContent>
    </Sidebar>
  )
}