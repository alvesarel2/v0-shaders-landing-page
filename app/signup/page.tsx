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

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) throw error

      // For demo purposes, we might want to redirect to dashboard if email confirmation is disabled
      // But typically we show a "Check your email" message
      // Checking if session exists immediately (if email confirmation is off)
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        router.push("/dashboard")
      } else {
        // Show success message or redirect to a verification pending page
        alert("Please check your email to confirm your account.")
      }
    } catch (err: any) {
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
            <h1 className="font-sans text-3xl font-light tracking-tight text-foreground mb-2">Create account</h1>
            <p className="text-foreground/60 text-sm">Join us to experience fluid motion design</p>
          </div>

          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground/80">
                  First name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/40 focus-visible:ring-foreground/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground/80">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/40 focus-visible:ring-foreground/20"
                />
              </div>
            </div>

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
              <Label htmlFor="password" className="text-foreground/80">
                Password
              </Label>
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
                {loading ? "Creating Account..." : "Create Account"}
              </MagneticButton>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-foreground/60">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground font-medium hover:underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
