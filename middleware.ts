import { auth } from "@/auth"
import { NextResponse } from "next/server"

/**
 * Endpoints da API que devem permanecer públicos (sem sessão):
 * - /api/auth/* : handlers do NextAuth (signin/callback, etc.)
 * - /api/otp/send-email : disparo do código OTP no fluxo de login
 * - /api/webhooks/* : webhooks públicos (ex: Strava)
 */
const PUBLIC_API_PREFIXES = ["/api/auth", "/api/otp/send-email", "/api/webhooks"]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  const isAdminRoute = pathname.startsWith("/admin")
  const isApiRoute = pathname.startsWith("/api")
  const isPublicApi = PUBLIC_API_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )

  // Rotas /admin/* exigem sessão autenticada
  if (isAdminRoute && !session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Rotas /api/* exigem sessão autenticada, exceto endpoints públicos
  if (isApiRoute && !isPublicApi && !session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
}
