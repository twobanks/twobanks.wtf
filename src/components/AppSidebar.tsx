"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { deslogar } from "@/lib/actions"
import {
  CreditCard,
  FileText,
  Landmark,
  LayoutDashboard,
  LogOut,
  ShoppingBasket,
  TrendingUp,
  Wallet
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const financeiroItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Carteira", href: "/admin/carteira", icon: Wallet },
  { title: "Cartões", href: "/admin/cartoes", icon: CreditCard },
  { title: "Faturas", href: "/admin/faturas", icon: FileText },
  { title: "Contas", href: "/admin/contas", icon: Landmark },
  { title: "Investimentos", href: "/admin/investimentos", icon: TrendingUp },
  { title: "Lista de Compras", href: "/admin/lista", icon: ShoppingBasket  },
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

      <SidebarFooter>
        <form action={deslogar}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-sidebar-accent hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}