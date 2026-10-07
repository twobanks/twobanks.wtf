// src/proxy.ts
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Permitir acesso público estrito à raiz (/) e à tela de login (/login)
  const isPublicRoute =
    pathname === "/" ||
    pathname === "/login" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/otp") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/icons/");

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && pathname === "/login") {
    return Response.redirect(new URL("/admin", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};