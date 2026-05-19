import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';
import { ProductShowcaseClient } from './ProductShowcaseClient';

const getProductFeatures = unstable_cache(
    async () => {
        try {
            const payload = await getPayload({ config: configPromise });
            const { docs } = await payload.find({
                collection: 'product-features',
                limit: 20,
                sort: 'displayOrder',
                where: { isActive: { equals: true } },
            });
            return (docs ?? []).map(f => ({
                ...f,
                media_url: (f as any).mediaUrl || undefined,
                media_type: (f as any).mediaType || 'image',
                media_fit: (f as any).mediaFit || 'cover',
                features_list: (f as any).featuresList || [],
                image_position: (f as any).imagePosition || 'left',
            }));
        } catch {
            return [];
        }
    },
    ['product-features'],
    { revalidate: 60 }
);

export async function ProductShowcase({ settings }: { settings?: any }) {
    const mappedFeatures = await getProductFeatures();
    return <ProductShowcaseClient features={mappedFeatures as any} settings={settings} />;
}
