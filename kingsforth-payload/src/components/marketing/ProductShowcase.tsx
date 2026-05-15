import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ProductShowcaseClient } from './ProductShowcaseClient';

export async function ProductShowcase({ settings }: { settings?: any }) {
    let mappedFeatures: any[] = [];
    try {
        const payload = await getPayload({ config: configPromise });
        const { docs: features } = await payload.find({ collection: 'product-features', limit: 20, sort: 'order' });
        mappedFeatures = (features ?? []).map(f => ({
            ...f,
            features_list: (f as any).featuresList || [],
            image_position: (f as any).imagePosition || 'left',
        }));
    } catch {}

    return <ProductShowcaseClient features={mappedFeatures as any} settings={settings} />;
}
