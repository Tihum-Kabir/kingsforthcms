import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Kingsforth Privacy Policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-display mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: May 2026</p>
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you contact us, request a demo, or subscribe to our services. This may include your name, email address, company name, and job title.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, respond to your inquiries, and send you technical notices and support messages.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as described in this policy.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">4. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="/contact" className="text-primary underline">our contact page</a>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
