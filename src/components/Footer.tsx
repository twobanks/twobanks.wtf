// src/components/BottomNav.tsx
"use client";

import { LayoutDashboard, Lock } from "lucide-react";
import Link from "next/link";

const styleFooter = {
  links: 'flex items-center justify-center rounded-xl p-2 text-[#B8DE53] transition-colors hover:bg-zinc-800 hover:text-zinc-100',
  container: 'flex h-16 w-full items-center justify-end px-6 gap-6 bg-[#053f1a]'
}

export default function Footer({ logged }: { logged: boolean }) {
  return (
    <footer className="sticky bottom-0 z-50 w-full bg-transparent" suppressHydrationWarning>
      <div className={styleFooter.container}>
        {!logged && (
          <Link href="/login" title="Fazer Login" className={styleFooter.links}>
            <Lock size={20} />
            <span className="sr-only">Fazer login</span>
          </Link>
        )}
        <Link href="/admin/carteira" title="Carteira" className={styleFooter.links}>
          <LayoutDashboard size={20} />
          <span className="sr-only">Carteira</span>
        </Link>
      </div>
    </footer>
  );
}