import { auth } from "@/auth";
import { CreateListForm } from "@/components/CreateList";
import { ListCard } from "@/components/ListCard";
import { db } from "@/db";
import type { ShoppingListWithItems } from "@/db/schema";
import { shoppingItems, shoppingLists } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ShoppingBasket } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { EmptyState } from "@/components/patterns";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Listas de Compras",
}


export default async function ListasPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const lists = await db
    .select()
    .from(shoppingLists)
    .where(eq(shoppingLists.userId, session.user.id))
    .orderBy(shoppingLists.createdAt);

  const listsWithItems: ShoppingListWithItems[] = await Promise.all(
    lists.map(async (list) => ({
      ...list,
      items: await db
        .select()
        .from(shoppingItems)
        .where(eq(shoppingItems.listId, list.id))
        .orderBy(shoppingItems.createdAt),
    }))
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {/* O formulário/botão de criar lista renderiza aqui */}
        <CreateListForm />
      </div>

      {listsWithItems.length === 0 ? (
        <EmptyState
          icon={ShoppingBasket}
          title="Nenhuma lista criada ainda."
          description="Crie sua primeira lista de compras para começar."
          action={
            <Button>Criar Lista</Button>
          }
          className="mt-6"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listsWithItems.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      )}
    </div>
  );
}