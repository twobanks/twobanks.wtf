import { deleteCreditCard } from "@/actions/creditCards"
import { auth } from "@/auth"
import { CreditCardDrawer } from "@/components/Drawers/CreditCardDrawer"
import { db } from "@/db"
import { creditCards } from "@/db/schema"
import { eq } from "drizzle-orm"
import { ChevronRight, CreditCard, Trash2 } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Cartões de Crédito",
}

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
        {/* Esse botão "+ Adicionar Cartão" deve estar com bg-surface-2 no Drawer */}
        <CreditCardDrawer />
      </div>

      <div className="grid gap-3">
        {cartoes.length === 0 && (
          <div className="p-8 text-center border border-dashed border-border rounded-xl">
            <p className="text-subtle-foreground">Nenhum cartão cadastrado ainda.</p>
          </div>
        )}
        
        {cartoes.map((cartao) => (
          <div
            key={cartao.id}
            // Trocado de bg-surface-1 para bg-surface-1 para casar com o sidebar
            className="bg-surface-1 p-5 rounded-xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Ícone decorativo opcional para enriquecer a UI */}
              <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-subtle-foreground">
                <CreditCard size={20} strokeWidth={1.5} />
              </div>
              
              <div>
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  {cartao.name}
                  {/* Se você já tiver a coluna lastFourDigits, exibe ela sutilmente aqui */}
                  {cartao.lastFourDigits && (
                    <span className="text-xs font-normal text-subtle-foreground">
                      ••• {cartao.lastFourDigits}
                    </span>
                  )}
                </h3>
                {cartao.brand && (
                  <p className="text-sm text-subtle-foreground mt-0.5">{cartao.brand}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Botão Fatura Neutro e Elegante */}
              <Link
                href={`/admin/carteira/cartoes/${cartao.id}`}
                className="inline-flex items-center gap-1.5..."
              >
                Ver fatura
                <ChevronRight size={16} />
              </Link>
              
              {/* Botão Editar (vem do componente CreditCardDrawer) */}
              <CreditCardDrawer creditCard={cartao} />
              
              {/* Botão Excluir Ghost com Ícone */}
              <form action={deleteCreditCard}>
                <input type="hidden" name="id" value={cartao.id} />
                <button 
                  title="Excluir cartão"
                  className="inline-flex items-center justify-center text-subtle-foreground hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                  <span className="sr-only">Excluir</span>
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}