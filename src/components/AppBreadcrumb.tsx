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
  "/admin/cartoes": "Cartões",
  "/admin/categorias": "Categorias",
  "/admin/contas": "Contas",
  "/admin/recorrentes": "Recorrentes",
  "/admin/investimentos": "Investimentos",
  "/admin/dashboard": "Dashboard",
  "/admin/faturas": "Faturas",
  // ... adicione conforme necessário
}

export function AppBreadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  let accumulatedPath = ""
  const items = pathSegments.map((segment, index) => {
    accumulatedPath += `/${segment}`
    const isLast = index === pathSegments.length - 1
    const label = routeLabels[accumulatedPath] || segment // fallback: capitaliza?
    return {
      href: accumulatedPath,
      label,
      isLast,
    }
  })

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