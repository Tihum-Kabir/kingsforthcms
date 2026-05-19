import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Kingsforth Terms of Service — the rules and guidelines for using our platform.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-display mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: May 2026</p>
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using Kingsforth services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">2. Use of Services</h2>
            <p>You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates applicable local, national, or international law or regulation.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">3. Intellectual Property</h2>
            <p>The Kingsforth platform and its original content, features, and functionality are owned by Kingsforth and are protected by international copyright, trademark, and other intellectual property laws.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">4. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Kingsforth shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">5. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of significant changes. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">6. Contact Us</h2>
            <p>For questions about these Terms, please contact us at <a href="/contact" className="text-primary underline">our contact page</a>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
