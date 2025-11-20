import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { ShaderBackground } from "@/components/shader-background"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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

        <h1 className="font-sans text-4xl md:text-5xl font-light tracking-tight mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-8 text-foreground/80">
          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">1. Introduction</h2>
            <p>
              Welcome to DocSocial. We respect your privacy and are committed to protecting your personal data. This
              privacy policy will inform you as to how we look after your personal data when you visit our website and
              tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">2. Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped
              together follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Identity Data includes first name, last name, username or similar identifier.</li>
              <li>Contact Data includes email address and telephone number.</li>
              <li>
                Technical Data includes internet protocol (IP) address, your login data, browser type and version.
              </li>
              <li>Usage Data includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal
              data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>
                Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                fundamental rights do not override those interests.
              </li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your
              personal data to those employees, agents, contractors and other third parties who have a business need to
              know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium mb-4 text-foreground">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us via our
              Contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
