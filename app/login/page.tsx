"use client"

import type React from "react"

import Link from "next/link"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { ShaderBackground } from "@/components/shader-background"
import { MagneticButton } from "@/components/magnetic-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Login - Attempting sign in for:", email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.log("[v0] Login - Error:", error.message)
        throw error
      }

      console.log("[v0] Login - Success! Session:", !!data.session)
      console.log("[v0] Login - User:", data.user?.email)

      if (data.session) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        window.location.href = "/dashboard" // Use full page navigation instead of router.push
      } else {
        throw new Error("Failed to establish session")
      }
    } catch (err: any) {
      console.log("[v0] Login - Catch error:", err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center">
      <CustomCursor />
      <GrainOverlay />
      <ShaderBackground />

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-sm">Back to Home</span>
        </Link>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="font-sans text-3xl font-light tracking-tight text-foreground mb-2">Welcome back</h1>
            <p className="text-foreground/60 text-sm">Enter your credentials to access your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/80">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/40 focus-visible:ring-foreground/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground/80">
                  Password
                </Label>
                <Link href="#" className="text-xs text-foreground/60 hover:text-foreground transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/40 focus-visible:ring-foreground/20"
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <div className="pt-2">
              <MagneticButton className="w-full justify-center" size="lg" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </MagneticButton>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link href="/signup" className="text-foreground font-medium hover:underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
