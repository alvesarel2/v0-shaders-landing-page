"use server"

import { createClient } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export async function loginAsDemo() {
  const supabase = await createClient()

  // Check if we're already logged in
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session) {
    redirect("/dashboard")
  }

  const email = "demo@docsocial.com"
  const password = "demo-password-123"

  // Try to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    // If sign in fails, try to create the user (using admin client to skip email verification)
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const adminSupabase = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      )

      // Check if user exists first to avoid error
      const { data: users } = await adminSupabase.auth.admin.listUsers()
      const existingUser = users.users.find((u) => u.email === email)

      if (!existingUser) {
        const { error: createError } = await adminSupabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            first_name: "Demo",
            last_name: "Doctor",
          },
        })

        if (createError) {
          console.error("Failed to create demo user:", createError)
          throw new Error("Failed to create demo user")
        }
      }

      // Try signing in again
      const { error: retryError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (retryError) {
        console.error("Failed to sign in as demo user after creation:", retryError)
        throw new Error("Failed to sign in as demo user")
      }
    } else {
      console.error("Missing SUPABASE_SERVICE_ROLE_KEY")
      throw new Error("Configuration error: Missing service role key")
    }
  }

  redirect("/dashboard")
}
