"use server";

import { auth } from "@/auth";
import { syncStravaBatch } from "@/lib/strava";
import { revalidatePath } from "next/cache";

export async function syncStravaAction(fullSync = false) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { ok: false, message: "Não autorizado." };
    }

    const result = await syncStravaBatch({
      fullSync,
      userId: session.user.id,
    });

    revalidatePath("/atividades");
    revalidatePath("/treinos");
    revalidatePath("/viagens");

    const message =
      result.totalActivities === 0
        ? "Base já está atualizada."
        : `${result.totalActivities} atividade(s) sincronizada(s) com sucesso.`;

    return {
      ok: true,
      message,
      syncedCount: result.totalActivities,
    };
  } catch (_error) {
    return {
      ok: false,
      message:
        _error instanceof Error
          ? _error.message
          : "Erro ao sincronizar com o Strava.",
    };
  }
}