import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link';
import { PricingClient } from './PricingClient';

export const revalidate = 60;

export const metadata = {
    title: 'Pricing | Kingsforth',
    description: 'Transparent, scalable pricing for Kingsforth enterprise intelligence services.',
};

const FALLBACK_TIERS = [
    {
        name: 'Starter',
        tagline: 'Up to 5 cameras',
        description: 'For small sites and pilot deployments.',
        monthlyPrice: 299,
        isCustomPrice: false,
        semiAnnualDiscount: 10,
        annualDiscount: 20,
        isPopular: false,
        badge: '',
        ctaLabel: 'Get Started',
        ctaLink: '/contact',
        features: [
            { label: 'Up to 5 camera streams', included: true },
            { label: 'Real-time dashboard', included: true },
            { label: 'Email alerts', included: true },
            { label: '7-day footage retention', included: true },
            { label: 'API access', included: false },
            { label: 'Custom integrations', included: false },
            { label: 'Dedicated account manager', included: false },
        ],
    },
    {
        name: 'Professional',
        tagline: 'Up to 50 cameras',
        description: 'For growing operations that need full analytics.',
        monthlyPrice: 799,
        isCustomPrice: false,
        semiAnnualDiscount: 10,
        annualDiscount: 20,
        isPopular: true,
        badge: 'Most Popular',
        ctaLabel: 'Get Started',
        ctaLink: '/contact',
        features: [
            { label: 'Up to 50 camera streams', included: true },
            { label: 'Real-time dashboard', included: true },
            { label: 'Multi-channel alerts', included: true },
            { label: '30-day footage retention', included: true },
            { label: 'Full API access', included: true },
            { label: 'Standard integrations', included: true },
            { label: 'Dedicated account manager', included: false },
        ],
    },
    {
        name: 'Enterprise',
        tagline: 'Unlimited cameras',
        description: 'Custom deployment for large-scale infrastructure.',
        monthlyPrice: 0,
        isCustomPrice: true,
        semiAnnualDiscount: 10,
        annualDiscount: 20,
        isPopular: false,
        badge: '',
        ctaLabel: 'Contact Sales',
        ctaLink: '/contact',
        features: [
            { label: 'Unlimited camera streams', included: true },
            { label: 'Real-time + predictive dashboard', included: true },
            { label: 'Priority multi-channel alerts', included: true },
            { label: 'Unlimited footage retention', included: true },
            { label: 'Full API + webhook access', included: true },
            { label: 'Custom integrations', included: true },
            { label: 'Dedicated account manager', included: true },
        ],
    },
];

const FALLBACK_ADDONS = [
    { serviceSlug: 'big-data-forensic', serviceTitle: 'Big Data Forensic', monthlyAddOnPrice: 149, description: 'Natural language search across all footage' },
    { serviceSlug: 'cognitive-surveillance', serviceTitle: 'Cognitive Surveillance', monthlyAddOnPrice: 129, description: 'Real-time AI threat detection' },
    { serviceSlug: 'autonomous-field-ops', serviceTitle: 'Autonomous Field Ops', monthlyAddOnPrice: 249, description: 'Drone dispatch & automated lockdowns' },
    { serviceSlug: 'ai-agentic-saas', serviceTitle: 'AI Agentic SaaS', monthlyAddOnPrice: 179, description: 'Self-evolving workflow automation agents' },
    { serviceSlug: 'iot-orchestration', serviceTitle: 'IoT Orchestration', monthlyAddOnPrice: 99, description: 'Unified sensor & hardware management' },
    { serviceSlug: 'go-to-market-expert', serviceTitle: 'Go-to-Market Expert', monthlyAddOnPrice: 199, description: 'Strategic launch & growth consulting' },
];

export default async function PricingPage() {
    let pricingConfig: any = null;
    try {
        const payload = await getPayload({ config: configPromise });
        try {
            pricingConfig = await payload.findGlobal({ slug: 'pricing-config' });
        } catch {}
    } catch {}

    const tiers = pricingConfig?.tiers?.length ? pricingConfig.tiers : FALLBACK_TIERS;
    const addOns = pricingConfig?.serviceAddOns?.length ? pricingConfig.serviceAddOns : FALLBACK_ADDONS;
    const headline = pricingConfig?.headline || 'Simple, Transparent Pricing';
    const subheadline = pricingConfig?.subheadline || 'Start with a base platform tier, then add the AI modules your operation needs.';
    const billingNote = pricingConfig?.billingNote || 'Prices exclude applicable taxes. All plans include a 14-day free trial. Cancel anytime.';

    return (
        <div className="min-h-screen relative z-10 pt-28 pb-24">
            {/* Header */}
            <section className="max-w-3xl mx-auto px-6 text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f4f5] dark:bg-white/[0.06] border border-[#e4e4e7] dark:border-white/[0.08] mb-6">
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#71717a] dark:text-[#a1a1aa]">Pricing</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] text-[#09090b] dark:text-white mb-4">
                    {headline}
                </h1>
                <p className="text-lg text-[#71717a] dark:text-[#71717a] max-w-2xl mx-auto leading-relaxed">
                    {subheadline}
                </p>
            </section>

            <PricingClient tiers={tiers} addOns={addOns} billingNote={billingNote} />

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-6 mt-20">
                <div className="rounded-2xl border border-[#e4e4e7] dark:border-[#27272a] bg-[#fafafa] dark:bg-[#09090b] p-10 text-center">
                    <h2 className="text-2xl font-bold mb-2 text-[#09090b] dark:text-white">Need a custom solution?</h2>
                    <p className="text-[#71717a] text-base mb-6 max-w-xl mx-auto">
                        Government, multi-site, and air-gapped deployments require tailored scoping. Talk to our architects.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center h-11 px-8 bg-[#09090b] dark:bg-white text-white dark:text-[#09090b] font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
                    >
                        Contact Sales
                    </Link>
                </div>
            </section>
        </div>
    );
}
