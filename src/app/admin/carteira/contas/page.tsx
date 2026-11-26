import { deleteAccount } from "@/actions/accounts"
import { auth } from "@/auth"
import { AccountDrawer } from "@/components/Drawers/AccountDrawer"
import { db } from "@/db"
import { financialAccounts } from "@/db/schema"
import { getUserHouseholdIds } from "@/lib/household"
import { eq, inArray, or } from "drizzle-orm"
import { Landmark } from "lucide-react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { EmptyState } from "@/components/patterns"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contas",
}

export default async function ContasPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const householdIds = await getUserHouseholdIds(userId)

  const where = householdIds.length > 0
    ? or(eq(financialAccounts.userId, userId), inArray(financialAccounts.householdId, householdIds))
    : eq(financialAccounts.userId, userId)

  const contas = await db.query.financialAccounts.findMany({
    where,
    orderBy: (a, { asc }) => [asc(a.name)],
  })

  return (
    <main className="min-h-screen bg-black text-foreground p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <AccountDrawer />
        </div>

        <div className="grid gap-3">
          {contas.length === 0 ? (
            <EmptyState
              icon={Landmark}
              title="Nenhuma conta cadastrada."
              description="Adicione sua primeira conta bancária para começar."
              action={
                <Button>Adicionar Conta</Button>
              }
              className="mt-6"
            />
          ) : (
            contas.map((acc) => (
              <div
                key={acc.id}
                className="bg-surface-1 p-4 rounded-xl border border-border flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{acc.name}</p>
                  <span className="text-sm text-subtle-foreground">{acc.type}</span>
                  <span className="text-sm text-subtle-foreground ml-2">Saldo: R$ {acc.initialBalance}</span>
                </div>
                <div className="flex gap-2">
                  <AccountDrawer account={acc} />
                  <form action={deleteAccount}>
                    <input type="hidden" name="id" value={acc.id} />
                    <button className="text-red-400 hover:text-red-300 px-2 py-1">Excluir</button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}