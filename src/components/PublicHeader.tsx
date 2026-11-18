"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoTwoBanks } from "./twobanks";

export function PublicHeader() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-30 bg-transparent backdrop-blur-md">
      <div className="max-w-5xl mx-auto h-full px-4 flex items-center justify-center">
        <Link
          href="/"
          className="hover:opacity-85 transition-opacity flex items-center justify-center"
          aria-label="Voltar para a página inicial"
        >
          <LogoTwoBanks className="w-42 h-auto" />
        </Link>
      </div>
    </header>
  );
}