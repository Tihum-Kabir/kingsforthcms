import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Collections
import { Users } from './collections/Users'
import { Companies } from './collections/Companies'
import { Services } from './collections/Services'
import { Solutions } from './collections/Solutions'
import { Subscriptions } from './collections/Subscriptions'
import { Invoices } from './collections/Invoices'
import { SupportTickets } from './collections/SupportTickets'
import { Resources } from './collections/Resources'
import { ProductFeatures } from './collections/ProductFeatures'
import { FAQs } from './collections/FAQs'
import { TeamMembers } from './collections/TeamMembers'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { EmailCampaigns } from './collections/EmailCampaigns'
import { PartnerLogos } from './collections/PartnerLogos'
import { KnowledgeBase } from './collections/KnowledgeBase'
import { Analytics } from './collections/Analytics'
import { AuditLogs } from './collections/AuditLogs'
import { Pages } from './collections/Pages'
import { HowItWorksSteps } from './collections/HowItWorksSteps'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { AboutContent } from './globals/AboutContent'
import { PricingConfig } from './globals/PricingConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Kingsforth Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterNavLinks: [
        '@/components/admin/BackToWebsite#BackToWebsite'
      ]
    }
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Auto-push schema changes in dev — avoids interactive migration prompts
    push: process.env.NODE_ENV !== 'production',
  }),

  secret: process.env.PAYLOAD_SECRET ?? (() => { throw new Error('PAYLOAD_SECRET env var is required') })(),

  cors: process.env.NEXT_PUBLIC_APP_URL && process.env.NODE_ENV === 'production'
    ? [process.env.NEXT_PUBLIC_APP_URL]
    : ['http://localhost:3000', 'http://localhost:8005'],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  collections: [
    // Core
    Users,
    Companies,
    Media,

    // CMS
    Services,
    Solutions,
    Resources,
    ProductFeatures,
    FAQs,
    TeamMembers,
    Pages,
    PartnerLogos,
    KnowledgeBase,
    HowItWorksSteps,

    // Business
    Subscriptions,
    Invoices,
    Leads,
    Analytics,

    // Support
    SupportTickets,

    // Marketing
    EmailCampaigns,

    // System
    AuditLogs,
  ],

  globals: [
    SiteSettings,
    AboutContent,
    PricingConfig,
  ],
})
