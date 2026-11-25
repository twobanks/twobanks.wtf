import { db } from "@/db";
import { auth } from "@/auth";
import { users } from "@/db/schema";
import { asc, eq, and, type SQL } from "drizzle-orm";
import { type AnyPgColumn } from "drizzle-orm/pg-core";

/**
 * Role com privilégios de administrador.
 * Pode ser ajustada conforme a convenção de roles do projeto.
 */
export const ADMIN_ROLE = "Admin";

/**
 * Retorna o utilizador da sessão atual ou lança um erro se não estiver autenticado.
 * Centraliza a verificação de sessão já feita de forma dispersa nas actions.
 */
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }
  return session.user;
}

/**
 * Constrói a condição de escopo (WHERE) do Drizzle para que um utilizador
 * veja apenas os seus próprios recursos. Administradores veem tudo.
 *
 * @param userId   ID do utilizador da sessão
 * @param role     role do utilizador da sessão
 * @param ownerColumn coluna do proprietário na tabela (ex: posts.authorId)
 */
export function getAccessCondition(
  userId: string,
  role: string | null | undefined,
  ownerColumn: AnyPgColumn<{}>
): SQL<unknown> | undefined {
  if (role === ADMIN_ROLE) {
    return undefined; // admin não tem restrição de escopo
  }
  return eq(ownerColumn, userId);
}

/**
 * Verifica se o recurso pertence ao utilizador da sessão.
 * Lança erro se não for o proprietário e não for administrador.
 * Útil em ações que não podem ser resolvidas apenas com um WHERE no UPDATE/DELETE.
 */
export async function assertOwnership({
  resourceOwnerId,
  sessionUser,
}: {
  resourceOwnerId: string | null | undefined;
  sessionUser: { id: string; role?: string | null };
}) {
  if (sessionUser.role === ADMIN_ROLE) return;
  if (!resourceOwnerId || resourceOwnerId !== sessionUser.id) {
    throw new Error("Não autorizado");
  }
}

/**
 * Retorna o ID do utilizador proprietário do site, usado para escopo de dados
 * em páginas públicas (sem sessão).
 *
 * Estratégia de resolução:
 * 1. Primeiro tenta um utilizador com role "Admin".
 * 2. Fallback para o primeiro utilizador cadastrado (por id).
 * 3. Lança erro apenas se a tabela de utilizadores estiver completamente vazia.
 */
export async function getPublicOwnerId(): Promise<string> {
  const [admin] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, ADMIN_ROLE))
    .limit(1);
  if (admin) {
    return admin.id;
  }

  const [firstUser] = await db
    .select({ id: users.id })
    .from(users)
    .orderBy(asc(users.id))
    .limit(1);
  if (!firstUser) {
    throw new Error("Nenhum utilizador cadastrado no site");
  }
  return firstUser.id;
}
