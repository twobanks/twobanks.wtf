import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/atividades",
  "/treinos",
  "/viagens",
  "/fotos",
  "/sobre",
];

const PUBLIC_API_PREFIXES = [
  "/api/auth",
  "/api/otp",
  "/api/webhooks",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/webhooks")) {
    return NextResponse.next();
  }

  const isAuthenticated = !!req.auth?.user?.id;
  const isApiRoute = pathname.startsWith("/api");
  const isPublicApi = PUBLIC_API_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isApiRoute && !isPublicApi && !isAuthenticated) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const isPublicPage = PUBLIC_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isPublicAssetOrApi =
    isPublicApi ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/gpx/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/") ||
    /\.(svg|png|jpg|jpeg|webp|gif|ico|gpx|css|js)$/i.test(pathname);

  if (!isAuthenticated && !isPublicPage && !isPublicAssetOrApi) {
    return Response.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated && pathname === "/login") {
    return Response.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|api/webhooks|_next/static|_next/image|favicon.ico).*)",
  ],
};
