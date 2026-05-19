import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://kingsforth.net'

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
  { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs: services } = await payload.find({ collection: 'services', limit: 100 })
    const { docs: solutions } = await payload.find({ collection: 'solutions', limit: 100 })

    const serviceUrls = services.map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const solutionUrls = solutions.map((s) => ({
      url: `${BASE_URL}/solutions/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticRoutes, ...serviceUrls, ...solutionUrls]
  } catch {
    return staticRoutes
  }
}
