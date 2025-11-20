"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { MagneticButton } from "@/components/magnetic-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    specialty: "",
    subspecialty: "",
    target_audience: "",
    audience_age: "",
    target_location: "",
    brand_colors: "",
    tone: "",
    other_info: "",
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, specialty, subspecialty, target_audience, audience_age, target_location, brand_colors, tone, other_info",
        )
        .eq("id", user.id)
        .single()

      if (data) {
        setFormData({
          specialty: data.specialty || "",
          subspecialty: data.subspecialty || "",
          target_audience: data.target_audience || "",
          audience_age: data.audience_age || "",
          target_location: data.target_location || "",
          brand_colors: data.brand_colors || "",
          tone: data.tone || "",
          other_info: data.other_info || "",
        })
      }
      setIsLoading(false)
    }

    loadProfile()
  }, [router, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from("profiles")
      .update({
        specialty: formData.specialty,
        subspecialty: formData.subspecialty,
        target_audience: formData.target_audience,
        audience_age: formData.audience_age,
        target_location: formData.target_location,
        brand_colors: formData.brand_colors,
        tone: formData.tone,
        other_info: formData.other_info,
      })
      .eq("id", user.id)

    setIsSaving(false)

    if (error) {
      toast.error("Failed to update profile")
    } else {
      toast.success("Profile updated successfully")
      router.refresh()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-foreground/20" />
      </div>
    )
  }

  return (
    <div className="relative z-10 flex-1 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-sans text-3xl md:text-4xl font-light tracking-tight text-foreground mb-2">
            Profile Customization
          </h1>
          <p className="text-foreground/60 text-lg">
            Customize your practice details to generate more personalized content.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-foreground/5 backdrop-blur-xl p-8 rounded-3xl border border-foreground/10"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="specialty">Primary Specialty</Label>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                placeholder="e.g. Dermatology"
                className="bg-foreground/5 border-foreground/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subspecialty">Subspecialty (Optional)</Label>
              <Input
                id="subspecialty"
                name="subspecialty"
                value={formData.subspecialty}
                onChange={handleChange}
                placeholder="e.g. Pediatric Dermatology"
                className="bg-foreground/5 border-foreground/10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="target_audience">Target Audience</Label>
              <Input
                id="target_audience"
                name="target_audience"
                value={formData.target_audience}
                onChange={handleChange}
                placeholder="e.g. Young adults with acne"
                className="bg-foreground/5 border-foreground/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience_age">Audience Age Range</Label>
              <Input
                id="audience_age"
                name="audience_age"
                value={formData.audience_age}
                onChange={handleChange}
                placeholder="e.g. 18-35"
                className="bg-foreground/5 border-foreground/10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="target_location">Target Location</Label>
              <Input
                id="target_location"
                name="target_location"
                value={formData.target_location}
                onChange={handleChange}
                placeholder="e.g. São Paulo, SP"
                className="bg-foreground/5 border-foreground/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Communication Tone</Label>
              <Input
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                placeholder="e.g. Professional but friendly"
                className="bg-foreground/5 border-foreground/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand_colors">Brand Colors</Label>
            <Input
              id="brand_colors"
              name="brand_colors"
              value={formData.brand_colors}
              onChange={handleChange}
              placeholder="e.g. Blue and White, or Hex codes"
              className="bg-foreground/5 border-foreground/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="other_info">Other Relevant Information</Label>
            <Textarea
              id="other_info"
              name="other_info"
              value={formData.other_info}
              onChange={handleChange}
              placeholder="Any other details you want the AI to consider..."
              className="bg-foreground/5 border-foreground/10 min-h-[100px]"
            />
          </div>

          <div className="flex justify-end pt-4">
            <MagneticButton type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Profile
                </>
              )}
            </MagneticButton>
          </div>
        </form>
      </div>
    </div>
  )
}
