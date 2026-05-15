/**
 * Seed LLM links into SiteSettings via Payload local API
 * Run: npx tsx scripts/seedLLMLinksPayload.ts
 */
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

const DEFAULT_LLM_LINKS = [
  {
    name: 'ChatGPT',
    description: 'Start a conversation about Kingsforth with ChatGPT.',
    url: 'https://chatgpt.com/?q=Tell+me+about+Kingsforth+AI+security+platform',
    iconColor: '#10a37f',
    iconLetter: 'G',
    enabled: true,
  },
  {
    name: 'Claude',
    description: 'Start a conversation about Kingsforth with Claude.',
    url: 'https://claude.ai/new?q=What+is+Kingsforth+AI+security+platform',
    iconColor: '#d97706',
    iconLetter: 'C',
    enabled: true,
  },
  {
    name: 'Gemini',
    description: 'Start a conversation about Kingsforth with Gemini.',
    url: 'https://gemini.google.com/app?q=Kingsforth+AI+surveillance+platform',
    iconColor: '#4285f4',
    iconLetter: 'G',
    enabled: true,
  },
]

async function seed() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Get current settings
    let current: any
    try {
      current = await payload.findGlobal({ slug: 'site-settings' })
    } catch {
      current = {}
    }

    // Only seed if no llmLinks yet
    if (current?.llmLinks && current.llmLinks.length > 0) {
      console.log('✅ LLM links already exist, skipping seed.')
      console.log('Existing:', current.llmLinks.map((l: any) => l.name).join(', '))
      process.exit(0)
    }

    console.log('Seeding LLM links...')
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        llmSectionHeading: 'Start a conversation to research Kingsforth on LLMs:',
        llmLinks: DEFAULT_LLM_LINKS,
      } as any,
    })

    console.log('✅ LLM links seeded successfully!')
    console.log('Links:', DEFAULT_LLM_LINKS.map(l => l.name).join(', '))
    process.exit(0)
  } catch (err: any) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
