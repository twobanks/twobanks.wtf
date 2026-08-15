import { auth } from "@/auth";
import { deslogar } from "@/lib/actions";

export default async function UserCard() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const initial = session.user.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          {initial}
        </div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-zinc-100">
            {session.user.name || "Atleta"}
          </h3>
          <p className="truncate text-sm text-gray-500 dark:text-zinc-400">
            {session.user.email}
          </p>
          <span className="mt-1 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/20 w-fit">
            {session.user.role || "Atleta"}
          </span>
        </div>
        {session && (
          <form action={deslogar}>
            <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
              Sair da conta
            </button>
          </form>
        )}
      </div>
    </div>
  );
}