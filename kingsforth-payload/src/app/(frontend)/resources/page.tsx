import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ResourcesClient } from './ResourcesClient';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Resources | Kingsforth',
    description: 'Guides, case studies, data sheets, and AI tools for Kingsforth, KingsEye, and KingsAI security platforms.',
};

export default async function ResourcesPage() {
    let resources: any[] = [];
    let siteSettings: any = null;

    try {
        const payload = await getPayload({ config: configPromise });
        const [resourcesResult, settingsResult] = await Promise.all([
            payload.find({
                collection: 'resources',
                where: { isPublished: { equals: true } },
                limit: 200,
                depth: 2,
                sort: '-publishedAt',
            }).catch(() => ({ docs: [] as any[] })),
            payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null),
        ]);
        resources = resourcesResult.docs;
        siteSettings = settingsResult;
    } catch {}

    const llmLinks = (siteSettings?.llmLinks ?? []).filter((l: any) => l.enabled !== false);
    const llmSectionHeading = siteSettings?.llmSectionHeading ?? '';
    const heroHeading = siteSettings?.resourcesPageHero?.heading ?? '';
    const heroSubheading = siteSettings?.resourcesPageHero?.subheading ?? '';

    return (
        <ResourcesClient
            resources={resources}
            llmLinks={llmLinks}
            llmSectionHeading={llmSectionHeading}
            heroHeading={heroHeading}
            heroSubheading={heroSubheading}
        />
    );
}
