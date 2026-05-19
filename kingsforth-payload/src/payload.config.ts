import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

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
import { Analytics } from './collections/Analytics'
import { AuditLogs } from './collections/AuditLogs'
import { HowItWorksSteps } from './collections/HowItWorksSteps'
import { ResourceSections } from './collections/ResourceSections'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { AboutContent } from './globals/AboutContent'
import { PricingConfig } from './globals/PricingConfig'

// Auto-seed
import { autoSeedAll } from './seed/auto-seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,

  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
  ],

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Kingsforth Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      providers: [
        '@/components/admin/AdminTheme#AdminTheme'
      ],
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
    push: process.env.NODE_ENV !== 'production',
  }),

  secret: process.env.PAYLOAD_SECRET ?? (() => { throw new Error('PAYLOAD_SECRET env var is required') })(),

  cors: process.env.NEXT_PUBLIC_APP_URL && process.env.NODE_ENV === 'production'
    ? [process.env.NEXT_PUBLIC_APP_URL]
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8005'],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  collections: [
    // CONTENT — public-facing website content
    Services,
    Solutions,
    Resources,
    ResourceSections,
    FAQs,
    TeamMembers,
    PartnerLogos,

    // SETTINGS — page configuration
    ProductFeatures,
    HowItWorksSteps,

    // MEDIA
    Media,

    // CRM
    Companies,
    Subscriptions,
    Invoices,
    Leads,
    SupportTickets,

    // SYSTEM
    Users,
    Analytics,
    EmailCampaigns,
    AuditLogs,
  ],

  globals: [
    SiteSettings,
    AboutContent,
    PricingConfig,
  ],

  onInit: async (payload) => {
    await autoSeedAll(payload);
  },
})
