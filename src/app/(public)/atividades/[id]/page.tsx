import { redirect } from "next/navigation";

export default async function AtividadeRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`https://www.strava.com/activities/${id}`);
}