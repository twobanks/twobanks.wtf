// ==========================================
// Arquivo: src/app/admin/layout.tsx (Atualizado)
// ==========================================

import { auth } from "@/auth"
import { AppSidebar } from "@/components/AppSidebar"
import { GlobalDrawersHost } from "@/components/Drawers/GlobalDrawersHost"
import { SiteHeader } from "@/components/SiteHeader"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DrawerProvider } from "@/contexts/DrawerContext"
import { VisibilityProvider } from "@/contexts/VisibilityContext"
import { db } from "@/db"
import { categories, financialAccounts } from "@/db/schema"
import { getUserHouseholdIds } from "@/lib/household"
import { eq, inArray, or } from "drizzle-orm"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/")
  }

  const userId = session.user.id
  const householdIds = await getUserHouseholdIds(userId)

  const accessCondition = (table: any) => {
    const conditions = [eq(table.userId, userId)];
    if (householdIds.length > 0) {
      conditions.push(inArray(table.householdId, householdIds));
    }
    return conditions.length > 1 ? or(...conditions) : conditions[0];
  };

  // Buscar categorias, contas e TODOS os usuários direto da tabela
  const [userCategories, userAccounts, allAppUsers] = await Promise.all([
    db.query.categories.findMany({
      where: accessCondition(categories),
    }),
    db.query.financialAccounts.findMany({
      where: accessCondition(financialAccounts),
    }),
    db.query.users.findMany({
      limit: 2
    }),
  ])

  // Identifica o usuário logado e o outro usuário na tabela
  const dbCurrentUser = allAppUsers.find((u) => u.id === userId)
  const dbOtherUser = allAppUsers.find((u) => u.id !== userId)

  // Intervalo de 2 minutos para considerar online
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000)

  const currentUserInfo = dbCurrentUser ? {
    id: dbCurrentUser.id,
    name: dbCurrentUser.name ?? null,
    email: dbCurrentUser.email ?? null,
    image: dbCurrentUser.image ?? null,
    isOnline: true,
  } : {
    id: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    image: session.user.image ?? null,
    isOnline: true,
  }

  const otherUserInfo = dbOtherUser ? {
    id: dbOtherUser.id,
    name: dbOtherUser.name ?? null,
    email: dbOtherUser.email ?? null,
    image: dbOtherUser.image ?? null,
    isOnline: dbOtherUser.lastSeen ? new Date(dbOtherUser.lastSeen) > twoMinutesAgo : false,
  } : null

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <VisibilityProvider>
        <DrawerProvider>
          <AppSidebar 
            variant="inset" 
            currentUser={currentUserInfo} 
            otherUser={otherUserInfo} 
          />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
          <GlobalDrawersHost categories={userCategories} accounts={userAccounts} />
        </DrawerProvider>
      </VisibilityProvider>
    </SidebarProvider>
  )
}