"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MagneticButton } from "@/components/magnetic-button"
import { Check } from "lucide-react"

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    "Unlimited AI content generation",
    "Specialty-specific topics",
    "Image generation included",
    "Hashtag optimization",
    "Content calendar planning",
    "Priority support",
  ]

  return (
    <section id="pricing" ref={ref} className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-6 mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-4xl font-light tracking-tight text-foreground sm:text-5xl mb-6"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-foreground/60 max-w-2xl mx-auto"
          >
            Everything you need to grow your medical practice on social media.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="relative rounded-3xl border border-foreground/10 bg-foreground/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden group hover:border-foreground/20 transition-colors duration-500">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-colors duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-sans text-2xl font-medium text-foreground">Pro Plan</h3>
                  <p className="text-sm text-foreground/60 mt-1">For growing practices</p>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    <span className="text-sm text-foreground/60 mr-1">R$</span>
                    <span className="text-4xl font-bold text-foreground">97</span>
                  </div>
                  <span className="text-sm text-foreground/60">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Centered the button and changed variant to secondary for glassy effect */}
              <div className="flex justify-center">
                <MagneticButton className="w-auto px-12" size="lg" variant="secondary" href="/signup">
                  Get Started Now
                </MagneticButton>
              </div>

              <p className="text-xs text-center text-foreground/40 mt-4">14-day free trial. Cancel anytime.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
