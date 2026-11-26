"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

const routeLabels: Record<string, string> = {
  "/admin": "Admin",
  "/admin/carteira": "Carteira",
  "/admin/carteira/cartoes": "Cartões",
  "/admin/carteira/categorias": "Categorias",
  "/admin/carteira/contas": "Contas",
  "/admin/carteira/recorrentes": "Recorrentes",
  "/admin/carteira/investimentos": "Investimentos",
  "/admin/carteira/listas": "Listas de Compras",
  "/admin/carteira/faturas": "Faturas",
  "/admin/blog": "Blog",
  "/admin/livros": "Livros",
  "/admin/tarefas": "Tarefas",
  "/sobre": "Sobre",
  "/atividades": "Atividades",
  "/treinos": "Treinos",
  "/viagens": "Viagens",
  "/fotos": "Fotos",
}

export function AppBreadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  const items = pathSegments.reduce(
    (acc, segment, index) => {
      const accumulatedPath = `${acc.accumulatedPath}/${segment}`
      const isLast = index === pathSegments.length - 1
      const label = routeLabels[accumulatedPath] || segment
      return {
        ...acc,
        items: [
          ...acc.items,
          { href: accumulatedPath, label, isLast },
        ],
      }
    },
    { accumulatedPath: "", items: [] as { href: string; label: string; isLast: boolean }[] }
  ).items

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item) => (
          <div key={item.href} className="flex items-center gap-1">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
