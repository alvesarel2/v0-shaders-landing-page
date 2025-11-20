import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { ShaderBackground } from "@/components/shader-background"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <CustomCursor />
      <GrainOverlay />
      <ShaderBackground />

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-24 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-foreground/60 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing or using DocSocial, you agree to be bound by these Terms of Service and all applicable laws
              and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing
              this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on
              DocSocial's website for personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
              </li>
              <li>attempt to decompile or reverse engineer any software contained on DocSocial's website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">3. Disclaimer</h2>
            <p>
              The materials on DocSocial's website are provided on an 'as is' basis. DocSocial makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">4. Limitations</h2>
            <p>
              In no event shall DocSocial or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on DocSocial's website, even if DocSocial or a DocSocial authorized representative
              has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Brazil and you
              irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
