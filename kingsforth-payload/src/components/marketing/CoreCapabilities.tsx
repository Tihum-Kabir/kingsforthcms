import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';
import { CoreCapabilitiesClient } from './CoreCapabilitiesClient';

const gradientMap: Record<string, string> = {
    forensic: 'from-blue-600 to-cyan-500',
    surveillance: 'from-violet-600 to-purple-500',
    automation: 'from-indigo-600 to-violet-500',
    ai: 'from-fuchsia-600 to-pink-500',
    iot: 'from-rose-600 to-pink-500',
    consulting: 'from-orange-500 to-amber-500',
    indigo: 'from-indigo-600 to-violet-500',
    cyan: 'from-blue-600 to-cyan-500',
    violet: 'from-violet-600 to-purple-500',
    emerald: 'from-emerald-600 to-teal-500',
    amber: 'from-orange-500 to-amber-500',
    rose: 'from-rose-600 to-pink-500',
};

const getCapabilities = unstable_cache(
    async () => {
        try {
            const payload = await getPayload({ config: configPromise });
            const { docs: services } = await payload.find({
                collection: 'services',
                limit: 6,
                depth: 1,
            });
            return (services ?? []).map((service: any) => ({
                iconName: service.icon || 'Database',
                title: service.title,
                description: service.subtitle || '',
                href: `/services/${service.slug}`,
                gradient: gradientMap[service.colorTheme || service.category || 'surveillance'] || 'from-blue-600 to-cyan-500',
                mediaUrl: typeof service.heroImage === 'object' ? service.heroImage?.url : undefined,
            }));
        } catch {
            return [];
        }
    },
    ['core-capabilities'],
    { revalidate: 60 }
);

export async function CoreCapabilities({ settings }: { settings?: any }) {
    const capabilities = await getCapabilities();
    return <CoreCapabilitiesClient capabilities={capabilities} settings={settings} />;
}
