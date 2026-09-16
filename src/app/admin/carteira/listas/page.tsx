import { auth } from "@/auth";
import { CreateListForm } from "@/components/CreateList";
import { ListCard } from "@/components/ListCard";
import { db } from "@/db";
import type { ShoppingListWithItems } from "@/db/schema";
import { shoppingItems, shoppingLists } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

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
        <div className="p-8 text-center border border-dashed border-zinc-800 rounded-xl">
          <p className="text-zinc-500">Nenhuma lista criada ainda.</p>
        </div>
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