import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { CoreCapabilitiesClient } from './CoreCapabilitiesClient';

const gradientMap: Record<string, string> = {
    forensic: 'from-blue-600 to-cyan-500',
    surveillance: 'from-violet-600 to-purple-500',
    automation: 'from-indigo-600 to-violet-500',
    ai: 'from-fuchsia-600 to-pink-500',
    iot: 'from-rose-600 to-pink-500',
    consulting: 'from-orange-500 to-amber-500',
};

export async function CoreCapabilities({ settings }: { settings?: any }) {
    let capabilities: any[] = [];
    try {
        const payload = await getPayload({ config: configPromise });
        const { docs: services } = await payload.find({
            collection: 'services',
            limit: 6,
            sort: 'orderIndex',
            depth: 1,
        });
        capabilities = (services ?? []).map(service => ({
            iconName: service.icon || 'Database',
            title: service.title,
            description: service.subtitle || '',
            href: `/services/${service.slug}`,
            gradient: gradientMap[service.category || 'surveillance'] || 'from-blue-600 to-cyan-500',
            mediaUrl: typeof service.heroImage === 'object' ? service.heroImage?.url : undefined,
        }));
    } catch {}

    return <CoreCapabilitiesClient capabilities={capabilities} settings={settings} />;
}
