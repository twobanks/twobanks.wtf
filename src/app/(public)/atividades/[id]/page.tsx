import { redirect } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Atividade ${id}`,
    description: "Ver detalhes da atividade no Strava",
  }
}

export default async function AtividadeRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`https://www.strava.com/activities/${id}`);
}