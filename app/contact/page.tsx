import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { ShaderBackground } from "@/components/shader-background"
import { MagneticButton } from "@/components/magnetic-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <CustomCursor />
      <GrainOverlay />
      <ShaderBackground />

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-foreground/60 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight mb-4">Get in Touch</h1>
              <p className="text-lg text-foreground/60">
                Have questions about DocSocial? We're here to help you grow your medical practice online.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-foreground/5 border border-foreground/10">
                  <Mail className="w-6 h-6 text-foreground/80" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <p className="text-foreground/60">support@docsocial.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-foreground/5 border border-foreground/10">
                  <Phone className="w-6 h-6 text-foreground/80" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Phone</h3>
                  <p className="text-foreground/60">+55 (11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-foreground/5 border border-foreground/10">
                  <MapPin className="w-6 h-6 text-foreground/80" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Office</h3>
                  <p className="text-foreground/60">
                    Av. Paulista, 1000
                    <br />
                    São Paulo, SP - Brazil
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent rounded-3xl -z-10" />
            <form className="p-8 rounded-3xl border border-foreground/10 bg-background/30 backdrop-blur-md space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Dr. John Doe"
                  className="bg-background/50 border-foreground/10 focus:border-foreground/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@clinic.com"
                  className="bg-background/50 border-foreground/10 focus:border-foreground/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  rows={4}
                  className="flex w-full rounded-md border border-foreground/10 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="How can we help you?"
                />
              </div>

              <MagneticButton className="w-full" size="lg" variant="secondary">
                Send Message
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
