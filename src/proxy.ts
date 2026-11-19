import { auth } from "@/auth";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/atividades",
  "/treinos",
  "/viagens",
  "/blog",
  "/livros",
  "/sobre",
];

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith("/api/webhooks")) {
    return;
  }
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isPublicPage = PUBLIC_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isPublicAssetOrApi =
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/otp") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/gpx/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/") ||
    /\.(svg|png|jpg|jpeg|webp|gif|ico|gpx|css|js)$/i.test(pathname);

  if (!isLoggedIn && !isPublicPage && !isPublicAssetOrApi) {
    return Response.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && pathname === "/login") {
    return Response.redirect(new URL("/admin", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!api/auth|api/webhooks|_next/static|_next/image|favicon.ico).*)",
  ],
};