import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { ShaderBackground } from "@/components/shader-background"
import { MagneticButton } from "@/components/magnetic-button"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { WorkSection } from "@/components/sections/work-section"
import { CtaSection } from "@/components/sections/cta-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { ArrowRight, Menu, Play } from "lucide-react"
import Link from "next/link"
import { loginAsDemo } from "./auth/actions"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />
      <ShaderBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="font-sans text-xl font-bold tracking-tighter text-foreground mix-blend-difference">
          DocSocial
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#process"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors scroll-smooth"
          >
            Process
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors scroll-smooth"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors scroll-smooth"
          >
            About
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors scroll-smooth"
          >
            Pricing
          </Link>
          <form action={loginAsDemo}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors border border-green-500/30 bg-green-500/10 px-3 py-1.5 rounded-full"
            >
              <Play className="w-3 h-3 fill-current" />
              Demo Mode
            </button>
          </form>
          <MagneticButton
            size="sm"
            variant="ghost"
            className="border-foreground/20 hover:bg-foreground/10"
            href="/login"
          >
            Log In
          </MagneticButton>
          <MagneticButton size="sm" variant="secondary" href="/signup">
            Sign Up
          </MagneticButton>
        </div>
        <button className="md:hidden text-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Now available for all specialties
          </div>
          <h1 className="font-sans text-5xl font-light tracking-tight text-foreground sm:text-7xl md:text-8xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Social Media <br />
            <span className="font-serif italic opacity-80">for Doctors</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground/60 sm:text-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            AI-powered content generation tailored for Brazilian medical professionals. Grow your practice with engaging
            Instagram posts in seconds.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <MagneticButton size="lg" variant="secondary" className="min-w-[200px]" href="/signup">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" className="min-w-[200px]" href="#process">
              How it Works
            </MagneticButton>
          </div>
        </div>
      </section>

      <WorkSection />
      <ServicesSection />
      <AboutSection />
      <PricingSection />
      <CtaSection />

      {/* Footer */}
      <footer className="relative z-10 border-t border-foreground/10 bg-background/50 py-12 backdrop-blur-sm">
        <div className="container px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-foreground/40">© 2025 DocSocial. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-foreground/40 hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-foreground/40 hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-foreground/40 hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
