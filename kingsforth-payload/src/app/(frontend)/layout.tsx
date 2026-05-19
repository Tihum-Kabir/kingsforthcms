import type { Metadata } from 'next'
import { Syne, Onest, JetBrains_Mono } from 'next/font/google'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { unstable_cache } from 'next/cache'

import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { SmartBackground } from '@/components/background/SmartBackground'
import { SiteWrapper } from '@/components/layout/SiteWrapper'
import './globals.css'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'optional' })
const onest = Onest({ subsets: ['latin'], variable: '--font-onest', display: 'optional' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'optional' })

// force-dynamic keeps auth() reading fresh cookies; nav data is cached separately
export const dynamic = 'force-dynamic'

const getLayoutData = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config: configPromise })
      const [servicesResult, solutionsResult, resourcesResult] = await Promise.all([
        payload.find({ collection: 'services', limit: 10, sort: 'title' }).catch(() => ({ docs: [] as any[] })),
        payload.find({ collection: 'solutions', limit: 10 }).catch(() => ({ docs: [] as any[] })),
        payload.find({ collection: 'resources', where: { featuredInNav: { equals: true }, isPublished: { equals: true } }, limit: 6 }).catch(() => ({ docs: [] as any[] })),
      ])
      return {
        services: servicesResult.docs,
        solutions: solutionsResult.docs,
        resources: resourcesResult.docs,
      }
    } catch {
      return { services: [] as any[], solutions: [] as any[], resources: [] as any[] }
    }
  },
  ['layout-nav-data'],
  { revalidate: 60 }
)

// Cache site settings — depth:1 resolves upload fields (logo, hero images) to URLs.
// 30s TTL: fast updates after admin save without hitting DB every request.
const getSiteSettings = unstable_cache(
  async (): Promise<any> => {
    try {
      const payload = await getPayload({ config: configPromise })
      return await payload.findGlobal({ slug: 'site-settings', depth: 1 })
    } catch {
      return null
    }
  },
  ['site-settings'],
  { revalidate: 120 }
)

export const metadata: Metadata = {
  metadataBase: new URL('https://kingsforth.net'),
  title: {
    default: 'Kingsforth | Elite AI Surveillance & Intelligent Security Operations',
    template: '%s | Kingsforth Enterprise Security',
  },
  description: 'We are Kingsforth. We forge the future of autonomous enterprise security. Industry-leading AI Ops, AI Surveillance, intelligent CC Camera systems, threat detection, and unparalleled client service. Transform your security operations with our cognitive intelligence platform.',
  keywords: [
    'Kingsforth', 'we are Kingsforth', 'we forge', 'AI Ops', 'AI Surveillance', 
    'CC Camera', 'client service', 'security cameras', 'enterprise security', 
    'intelligent surveillance', 'threat detection', 'autonomous security', 
    'CCTV AI', 'smart camera systems', 'corporate security', 'facility monitoring',
    'real-time threat analysis', 'security operations center', 'SOC automation',
    'video analytics', 'facial recognition security', 'perimeter defense',
    'IoT orchestration', 'automated incident response', 'cognitive surveillance',
    'predictive policing', 'access control integration', 'military grade security',
    'commercial security systems', 'business surveillance solutions',
    'footfall count', 'automated attendance', 'incident tracking', 'theft prevention',
    'security SaaS', 'tech solutions', 'factory surveillance', 'office security',
    'Gulshan security', 'Dhaka AI surveillance', 'AI security Bangladesh', 'AI'
  ],
  icons: {
    icon: '/images/logos/kingsforth-icon.svg?v=3',
    shortcut: '/images/logos/kingsforth-icon.svg?v=3',
    apple: '/images/logos/kingsforth-icon.svg?v=3',
  },
  authors: [{ name: 'Kingsforth Team' }],
  creator: 'Kingsforth',
  publisher: 'Kingsforth Intelligence Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Kingsforth | Elite AI Surveillance & Intelligent Security Operations',
    description: 'We are Kingsforth. We forge the future of autonomous enterprise security. Industry-leading AI Ops, AI Surveillance, and intelligent CC Camera systems.',
    url: 'https://kingsforth.net',
    siteName: 'Kingsforth',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kingsforth Enterprise Intelligence Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kingsforth | Elite AI Surveillance',
    description: 'We are Kingsforth. We forge the future of autonomous enterprise security. Discover our AI Ops and surveillance platforms.',
    creator: '@kingsforth',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

async function getAuthUser(_headers: Headers): Promise<any> {
  try {
    // Fast path: read cookie before initialising Payload — avoids cold-start DB
    // call for every unauthenticated visitor (the vast majority of traffic)
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value
    if (!token) return null

    // Decode JWT locally — no DB round-trip needed
    const parts = token.split('.')
    if (parts.length < 2) return null
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
    const now = Math.floor(Date.now() / 1000)
    if (!decoded.id || decoded.collection !== 'users' || (decoded.exp && decoded.exp <= now)) return null

    // Token valid — one DB call to hydrate role + profile
    const payload = await getPayload({ config: configPromise })
    return await payload.findByID({ collection: 'users', id: decoded.id }).catch(() => null)
  } catch {
    return null
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headers = await getHeaders()

  const [{ services, solutions, resources }, user, siteSettings] = await Promise.all([
    getLayoutData(),
    getAuthUser(headers),
    getSiteSettings(),
  ])

  const llmLinks = (siteSettings?.llmLinks ?? []).filter((l: any) => l.enabled !== false);
  const llmSectionHeading = siteSettings?.llmSectionHeading ?? '';

  const contactInfo = siteSettings?.contactInfo || null

  // Preload the hero background image in <head> so the browser fetches it
  // immediately on HTML parse — before JS executes or React renders. This is
  // the single biggest LCP improvement for the landing page.
  const heroNightUrl = siteSettings?.heroImageNight?.url ?? '/images/hero/hero-night-desktop-16-9.jpg'
  const heroDayUrl   = siteSettings?.heroImageDay?.url   ?? '/images/hero/hero-day-desktop-16-9.jpg'

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preload" as="image" href={heroNightUrl} fetchPriority="high" />
        <link rel="preload" as="image" href={heroDayUrl}   fetchPriority="low" />
      </head>
      <body suppressHydrationWarning className={`${syne.variable} ${onest.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground bg-background transition-colors duration-1000`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <SmartBackground 
            dayImageUrl={siteSettings?.heroImageDay?.url ?? null}
            nightImageUrl={siteSettings?.heroImageNight?.url ?? null}
          />
          <SiteWrapper 
            user={user} 
            services={services} 
            solutions={solutions} 
            resources={resources}
            logoUrl={siteSettings?.siteLogo?.url ?? null}
            siteName={siteSettings?.siteName ?? null}
            socialLinks={siteSettings?.socialLinks}
            contactInfo={contactInfo}
            llmLinks={llmLinks}
            llmSectionHeading={llmSectionHeading}
          >
            {children}
          </SiteWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
