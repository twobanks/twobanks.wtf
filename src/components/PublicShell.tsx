"use client";

import { PublicFooter } from "@/components/PublicFooter";
import { PublicHeader } from "@/components/PublicHeader";
import { usePathname } from "next/navigation";

interface PublicShellProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export function PublicShell({ children, isLoggedIn = false }: PublicShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <div className={`flex-1 pb-20 ${isHome ? "" : "pt-30"}`}>{children}</div>
      <PublicFooter isLoggedIn={isLoggedIn} />
    </div>
  );
}