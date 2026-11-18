import { auth } from "@/auth";
import { PublicShell } from "@/components/PublicShell";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = Boolean(session?.user);

  return <PublicShell isLoggedIn={isLoggedIn}>{children}</PublicShell>;
}