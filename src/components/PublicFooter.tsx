"use client";

import {
  Activity,
  Camera,
  Compass,
  LogIn,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PUBLIC_NAV_ITEMS = [
  { href: "/sobre", label: "Sobre", icon: User },
  { href: "/atividades", label: "Atividades", icon: Activity },
  { href: "/viagens", label: "Viagens", icon: Compass },
  { href: "/fotos", label: "Fotos", icon: Camera },
];

interface PublicFooterProps {
  isLoggedIn?: boolean;
}

export function PublicFooter({ isLoggedIn = false }: PublicFooterProps) {
  const pathname = usePathname();

  const authItem = isLoggedIn
    ? { href: "/admin/carteira", label: "Carteira", icon: Wallet }
    : { href: "/login", label: "Login", icon: LogIn };

  const navItems = [...PUBLIC_NAV_ITEMS, authItem];

  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 h-16 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <nav
        aria-label="Navegação principal"
        className="max-w-5xl mx-auto h-full px-2 flex items-center justify-center gap-0.5 sm:gap-4"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              aria-label={item.label}
              className={`group relative flex flex-row gap-2 items-center justify-center px-1.5 sm:px-2.5 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <Icon
                className="size-4 sm:size-[18px]"
                strokeWidth={isActive ? 2.25 : 1.75}
              />
              <span className="text-[14px] font-medium leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}