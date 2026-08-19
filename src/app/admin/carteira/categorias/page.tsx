import { deleteCategory } from "@/actions/categories"
import { auth } from "@/auth"
import { CategoryDrawer } from "@/components/Drawers/CategoryDrawer"
import { db } from "@/db"
import { categories } from "@/db/schema"
import { getUserHouseholdIds } from "@/lib/household"
import { eq, inArray, or } from "drizzle-orm"
import { redirect } from "next/navigation"

export default async function CategoriasPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const householdIds = await getUserHouseholdIds(userId)

  const where = householdIds.length > 0
    ? or(eq(categories.userId, userId), inArray(categories.householdId, householdIds))
    : eq(categories.userId, userId)

  const categorias = await db.query.categories.findMany({
    where,
    orderBy: (c, { asc }) => [asc(c.name)],
  })

  return (
    <main className="min-h-screen bg-black text-gray-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <CategoryDrawer />
        </div>

        <div className="grid gap-3">
          {categorias.length === 0 && (
            <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
          )}
          {categorias.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{cat.name}</p>
                <span className="text-sm text-gray-400">{cat.type}</span>
              </div>
              <div className="flex gap-2">
                <CategoryDrawer category={cat} />
                <form action={deleteCategory}>
                  <input type="hidden" name="id" value={cat.id} />
                  <button className="text-red-400 hover:text-red-300 px-2 py-1">Excluir</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}