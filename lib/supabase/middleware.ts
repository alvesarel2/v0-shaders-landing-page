import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("[v0] Middleware - Path:", request.nextUrl.pathname)
  console.log("[v0] Middleware - Session exists:", !!session)
  console.log("[v0] Middleware - User:", session?.user?.email)

  // Protected routes pattern
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard")
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup")
  const isAuthCallback = request.nextUrl.pathname.startsWith("/auth/callback")

  if (!session && isProtectedRoute) {
    console.log("[v0] Middleware - No session, redirecting to /login")
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  if (session && isAuthRoute && !isAuthCallback) {
    console.log("[v0] Middleware - Session exists, redirecting to /dashboard")
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
