// src/components/Navbar.tsx
"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

import { LogoTwoBanks } from "./twobanks";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-background border-b border-zinc-200 dark:border-zinc-800" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto flex justify-between h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-2 font-extrabold text-xl tracking-tight transition-all"
        >
          <div className="relative flex items-center justify-center shrink-0">
            <LogoTwoBanks 
              variant="flat" 
              extrusionColor="#0369a1" 
              fillColor="#5bb4d8"
              className="w-24 h-auto text-foreground" 
            />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            title="Fazer Login"
            className="flex items-center justify-center p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Lock size={20} />
            <span className="sr-only">Fazer login</span>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}