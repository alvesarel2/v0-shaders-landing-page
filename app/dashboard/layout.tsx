import type React from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { ShaderBackground } from "@/components/shader-background"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, History, Settings, LogOut } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex">
      <CustomCursor />
      <GrainOverlay />
      <ShaderBackground />

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-foreground/10 bg-background/30 backdrop-blur-xl z-20">
        <div className="p-6">
          <Link href="/" className="font-sans text-xl font-bold tracking-tighter text-foreground">
            DocSocial
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Generator
          </Link>
          <Link
            href="/dashboard/history"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
          >
            <History className="w-4 h-4" />
            History
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-foreground/10">
          {/* Wrapped user card in Link to /dashboard/profile */}
          <Link href="/dashboard/profile" className="block group">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group-hover:bg-foreground/5">
              <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
                <span className="font-mono text-xs font-bold">{user.user_metadata.first_name?.[0] || "D"}</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate group-hover:text-foreground transition-colors">
                  {user.user_metadata.first_name || "Doctor"}
                </p>
                <p className="text-xs text-foreground/40 truncate group-hover:text-foreground/60 transition-colors">
                  Edit Profile
                </p>
              </div>
            </div>
          </Link>
          <form action="/auth/signout" method="post">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors mt-2">
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-foreground/5 backdrop-blur-sm z-20">
          <Link href="/" className="font-sans text-xl font-bold tracking-tighter text-foreground">
            DocSocial
          </Link>
          <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center">
            <span className="font-mono text-xs">DR</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative z-10">{children}</main>
      </div>
    </div>
  )
}
