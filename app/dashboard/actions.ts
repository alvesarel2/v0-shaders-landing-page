"use server"

import { generateObject } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyBUM9N0O-zsphCTNSXx8P6S2wJ7yrcLgbA",
})

export async function generateTopics(specialty: string, profileContext?: any) {
  try {
    const contextPrompt = profileContext
      ? `
      Consider the following profile details:
      - Subspecialty: ${profileContext.subspecialty || "N/A"}
      - Target Audience: ${profileContext.target_audience || "General public"}
      - Audience Age: ${profileContext.audience_age || "All ages"}
      - Location: ${profileContext.target_location || "Brazil"}
      - Tone: ${profileContext.tone || "Professional"}
      - Other Info: ${profileContext.other_info || "N/A"}
      `
      : ""

    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: z.object({
        topics: z.array(z.string()).describe("A list of 5 relevant social media topics for the doctor's specialty"),
      }),
      prompt: `You are a social media expert for doctors in Brazil. 
      Generate 5 engaging and educational Instagram post topics for a doctor with the specialty: "${specialty}".
      ${contextPrompt}
      The topics should be relevant to Brazilian patients and current health trends.
      Return only the topics in Portuguese.`,
    })

    return { success: true, topics: object.topics }
  } catch (error) {
    console.error("Error generating topics:", error)
    return { success: false, error: "Failed to generate topics" }
  }
}

export async function generatePost(
  specialty: string,
  topic: string,
  mode: "text" | "full" = "full",
  profileContext?: any,
) {
  try {
    const contextPrompt = profileContext
      ? `
      Consider the following profile details:
      - Subspecialty: ${profileContext.subspecialty || "N/A"}
      - Target Audience: ${profileContext.target_audience || "General public"}
      - Audience Age: ${profileContext.audience_age || "All ages"}
      - Location: ${profileContext.target_location || "Brazil"}
      - Tone: ${profileContext.tone || "Professional"}
      - Brand Colors: ${profileContext.brand_colors || "N/A"}
      - Other Info: ${profileContext.other_info || "N/A"}
      `
      : ""

    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: z.object({
        caption: z.string().describe("The Instagram caption in Portuguese"),
        hashtags: z.array(z.string()).describe("A list of 10-15 relevant hashtags"),
        imageDescription: z.string().optional().describe("A detailed description for an AI image generator"),
      }),
      prompt: `You are a social media expert for doctors in Brazil.
      Create a complete Instagram post for a "${specialty}" about the topic: "${topic}".
      ${contextPrompt}
      
      1. Write an engaging, educational, and professional caption in Portuguese. Use emojis where appropriate. Match the requested tone.
      2. Generate 10-15 relevant hashtags (mix of broad and niche).
      ${
        mode === "full"
          ? "3. Describe an image that would go well with this post. The image should be professional, clean, and suitable for a medical context. If brand colors are provided, incorporate them into the image description."
          : "3. Do not generate an image description."
      }
      `,
    })

    return { success: true, post: object }
  } catch (error) {
    console.error("Error generating post:", error)
    return { success: false, error: "Failed to generate post" }
  }
}

export async function savePost(post: {
  specialty: string
  topic: string
  caption: string
  hashtags: string[]
  imageDescription?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const { error } = await supabase.from("posts").insert({
      user_id: user.id,
      specialty: post.specialty,
      topic: post.topic,
      caption: post.caption,
      hashtags: post.hashtags,
      image_description: post.imageDescription || null,
    })

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error saving post:", error)
    return { success: false, error: "Failed to save post" }
  }
}
