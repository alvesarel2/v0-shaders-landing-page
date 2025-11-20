"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MagneticButton } from "@/components/magnetic-button"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"

export function CtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[600px] bg-gradient-to-b from-foreground/5 to-transparent opacity-50 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <h2 className="font-sans text-4xl md:text-5xl font-light tracking-tight text-foreground">
                Ready to grow your practice?
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                Join thousands of Brazilian doctors using AI to create professional social media content in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-background/50 border-foreground/10 text-foreground placeholder:text-foreground/40"
                />
                <MagneticButton className="w-full sm:w-auto h-12 px-8" href="/signup">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </MagneticButton>
              </div>

              <p className="text-xs text-foreground/40 pt-4">No credit card required. 14-day free trial.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
