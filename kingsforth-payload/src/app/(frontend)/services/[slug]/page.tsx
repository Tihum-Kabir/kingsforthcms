import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation';
import { DetailPageLayout, getEmbedUrl } from '@/components/marketing/DetailPageLayout';
import { ServicePricingSection } from './ServicePricingClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const payload = await getPayload({ config: configPromise });
        const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 });
        const s = docs[0];
        if (!s) return { title: 'Service Not Found' };
        return {
            title: (s as any).metaTitle || `${s.title} | Kingsforth Services`,
            description: (s as any).metaDescription || (s as any).subtitle || '',
        };
    } catch { return { title: 'Services | Kingsforth' }; }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let service: any;
    try {
        const payload = await getPayload({ config: configPromise });
        const { docs } = await payload.find({
            collection: 'services',
            where: { slug: { equals: slug }, isPublished: { equals: true } },
            limit: 1, depth: 2,
        });
        service = docs[0];
    } catch { notFound(); }
    if (!service) notFound();

    const heroImageUrl = service.heroImage && typeof service.heroImage === 'object'
        ? service.heroImage.url ?? null : null;

    const pricingSection = service.plans?.length > 0
        ? <ServicePricingSection plans={service.plans} serviceTitle={service.title} />
        : null;

    return (
        <DetailPageLayout
            backHref="/services"
            backLabel="All Services"
            accentColor="blue"
            badge={service.category || 'Service Module'}
            title={service.title}
            subtitle={service.subtitle}
            heroImageUrl={heroImageUrl}
            heroImageAlt={service.title}
            embedUrl={getEmbedUrl(service.heroVideoUrl)}
            embedLabel={`${service.title} — Platform Overview`}
            description={service.description}
            features={service.features}
            extraSections={pricingSection}
        />
    );
}
