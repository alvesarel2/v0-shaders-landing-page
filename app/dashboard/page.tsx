"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MagneticButton } from "@/components/magnetic-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles, ArrowRight, Copy, RefreshCw, ChevronLeft, Save, FileText, ImageIcon } from "lucide-react"
import { generateTopics, generatePost, savePost } from "./actions"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const [step, setStep] = useState<"specialty" | "topics" | "result">("specialty")
  const [specialty, setSpecialty] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [topics, setTopics] = useState<string[]>([])
  const [selectedTopic, setSelectedTopic] = useState("")
  const [generationMode, setGenerationMode] = useState<"text" | "full">("full")
  const [generatedContent, setGeneratedContent] = useState<{
    caption: string
    hashtags: string[]
    imageDescription?: string
  } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select(
            "id, specialty, subspecialty, target_audience, audience_age, target_location, brand_colors, tone, other_info",
          )
          .eq("id", user.id)
          .single()
        if (data) {
          setProfile(data)
          if (data.specialty) {
            setSpecialty(data.specialty)
          }
        }
      }
    }
    loadProfile()
  }, [])

  useEffect(() => {
    if (profile?.specialty && step === "specialty" && !topics.length && !isLoading) {
      handleGenerateTopics(profile.specialty)
    }
  }, [profile])

  const handleGenerateTopics = async (overrideSpecialty?: string) => {
    const spec = overrideSpecialty || specialty
    if (!spec) return
    setIsLoading(true)
    const result = await generateTopics(spec, profile)
    setIsLoading(false)

    if (result.success && result.topics) {
      setTopics(result.topics)
      setStep("topics")
    } else {
      toast.error("Failed to generate topics. Please try again.")
    }
  }

  const handleGeneratePost = async (topic: string) => {
    setSelectedTopic(topic)
    setIsLoading(true)
    const result = await generatePost(specialty, topic, generationMode, profile)
    setIsLoading(false)

    if (result.success && result.post) {
      setGeneratedContent(result.post)
      setStep("result")
    } else {
      toast.error("Failed to generate post. Please try again.")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const handleSavePost = async () => {
    if (!generatedContent || !selectedTopic || !specialty) return

    setIsSaving(true)
    const result = await savePost({
      specialty,
      topic: selectedTopic,
      caption: generatedContent.caption,
      hashtags: generatedContent.hashtags,
      imageDescription: generatedContent.imageDescription,
    })
    setIsSaving(false)

    if (result.success) {
      toast.success("Post saved to history!")
    } else {
      toast.error("Failed to save post")
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col">
      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === "specialty" && (
              <motion.div
                key="specialty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl"
              >
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
                    <Sparkles className="w-6 h-6 text-foreground" />
                  </div>
                  <h1 className="font-sans text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
                    What is your specialty?
                  </h1>
                  <p className="text-foreground/60 text-lg">
                    We'll analyze trends in Brazil to find the best content for you.
                  </p>
                </div>

                <div className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="text-foreground/80">
                      Medical Specialty
                    </Label>
                    <Input
                      id="specialty"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="e.g. Dermatologia, Cardiologia, Pediatria..."
                      className="bg-foreground/5 border-foreground/10 text-foreground placeholder:text-foreground/40 focus-visible:ring-foreground/20 h-12 text-lg"
                      onKeyDown={(e) => e.key === "Enter" && handleGenerateTopics()}
                    />
                  </div>

                  <MagneticButton
                    className="w-full justify-center h-12 text-lg"
                    onClick={handleGenerateTopics}
                    disabled={!specialty || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Trends...
                      </>
                    ) : (
                      <>
                        Find Topics <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {step === "topics" && (
              <motion.div
                key="topics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-xl p-8 shadow-2xl w-full"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setStep("specialty")}
                      className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <h2 className="font-sans text-2xl font-light text-foreground">Select a Topic</h2>
                  </div>

                  <div className="flex bg-foreground/5 p-1 rounded-lg border border-foreground/10">
                    <button
                      onClick={() => setGenerationMode("text")}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all",
                        generationMode === "text"
                          ? "bg-foreground/10 text-foreground shadow-sm"
                          : "text-foreground/60 hover:text-foreground/80",
                      )}
                    >
                      <FileText className="w-4 h-4" />
                      Text Only
                    </button>
                    <button
                      onClick={() => setGenerationMode("full")}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all",
                        generationMode === "full"
                          ? "bg-foreground/10 text-foreground shadow-sm"
                          : "text-foreground/60 hover:text-foreground/80",
                      )}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Full Post
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {topics.map((topic, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleGeneratePost(topic)}
                      disabled={isLoading}
                      className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 text-left transition-all hover:bg-foreground/10 hover:border-foreground/20"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-foreground">{topic}</span>
                        {isLoading && selectedTopic === topic ? (
                          <Loader2 className="h-5 w-5 animate-spin text-foreground/60" />
                        ) : (
                          <ArrowRight className="h-5 w-5 text-foreground/40 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "result" && generatedContent && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl w-full max-w-4xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setStep("topics")}
                    className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Topics
                  </button>
                  <div className="flex gap-2">
                    {/* Added Save button */}
                    <MagneticButton size="sm" variant="outline" onClick={handleSavePost} disabled={isSaving}>
                      <Save className={`mr-2 h-4 w-4 ${isSaving ? "animate-pulse" : ""}`} />
                      {isSaving ? "Saving..." : "Save Post"}
                    </MagneticButton>
                    <MagneticButton
                      size="sm"
                      variant="outline"
                      onClick={() => handleGeneratePost(selectedTopic)}
                      disabled={isLoading}
                    >
                      <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                      Regenerate
                    </MagneticButton>
                    <MagneticButton size="sm" onClick={() => setStep("specialty")}>
                      New Post
                    </MagneticButton>
                  </div>
                </div>

                <div className={cn("grid gap-8", generatedContent.imageDescription ? "md:grid-cols-2" : "grid-cols-1")}>
                  {generatedContent.imageDescription && (
                    <div className="space-y-4">
                      <div className="aspect-square rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 border border-foreground/10 flex items-center justify-center p-8 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-noise opacity-20" />
                        <div className="relative z-10">
                          <p className="text-foreground/40 text-sm uppercase tracking-widest mb-2">Image Concept</p>
                          <p className="text-foreground/80 font-medium">{generatedContent.imageDescription}</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <p className="text-xs text-foreground/40 text-center max-w-xs">
                          * This is a description for an AI image generator. In the full version, this would generate a
                          real image.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-foreground/60 uppercase tracking-wider text-xs">Caption</Label>
                        <button
                          onClick={() => copyToClipboard(generatedContent.caption)}
                          className="text-foreground/40 hover:text-foreground transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="rounded-xl bg-foreground/5 border border-foreground/10 p-4 min-h-[200px] whitespace-pre-wrap text-foreground/90 text-sm leading-relaxed">
                        {generatedContent.caption}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-foreground/60 uppercase tracking-wider text-xs">Hashtags</Label>
                        <button
                          onClick={() => copyToClipboard(generatedContent.hashtags.join(" "))}
                          className="text-foreground/40 hover:text-foreground transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="rounded-xl bg-foreground/5 border border-foreground/10 p-4 text-blue-400 text-sm font-medium">
                        {generatedContent.hashtags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)).join(" ")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
