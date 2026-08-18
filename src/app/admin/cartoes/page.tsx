import { deleteCreditCard } from "@/actions/creditCards"
import { auth } from "@/auth"
import { CreditCardDrawer } from "@/components/Drawers/CreditCardDrawer"
import { db } from "@/db"
import { creditCards } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function CartoesPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")
  const userId = session.user.id

  const cartoes = await db.query.creditCards.findMany({
    where: eq(creditCards.userId, userId),
    orderBy: (c, { asc }) => [asc(c.name)],
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cartões de Crédito</h1>
        <CreditCardDrawer />
      </div>

      <div className="grid gap-4">
        {cartoes.length === 0 && (
          <p className="text-gray-500">Nenhum cartão cadastrado.</p>
        )}
        {cartoes.map((cartao) => (
          <div
            key={cartao.id}
            className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="flex-1">
              <p className="font-medium">{cartao.name}</p>
              {cartao.brand && <span className="text-sm text-gray-400">{cartao.brand}</span>}
              <div className="text-xs text-gray-500 mt-1">
                {cartao.dueDay && <span>Venc: dia {cartao.dueDay}</span>}
                {cartao.closingDay && <span> · Fechamento: dia {cartao.closingDay}</span>}
                {cartao.creditLimit && <span> · Limite: R$ {cartao.creditLimit}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/cartoes/${cartao.id}`}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded-lg"
              >
                Ver fatura
              </Link>
              <CreditCardDrawer creditCard={cartao} />
              <form action={deleteCreditCard}>
                <input type="hidden" name="id" value={cartao.id} />
                <button className="text-red-400 hover:text-red-300 px-2 py-1">Excluir</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}