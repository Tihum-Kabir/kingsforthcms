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
        monthlyPrice: 29900,
        isCustomPrice: false,
        annualDiscount: 20,
        isPopular: false,
        badge: '',
        ctaLabel: 'Select Plan',
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
        monthlyPrice: 79900,
        isCustomPrice: false,
        annualDiscount: 20,
        isPopular: true,
        badge: 'Most Popular',
        ctaLabel: 'Select Plan',
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
    { serviceSlug: 'big-data-forensic',     serviceTitle: 'Big Data Forensic',     monthlyAddOnPrice: 14900, annualAddOnPrice: 11920, description: 'Natural language search across all footage' },
    { serviceSlug: 'cognitive-surveillance', serviceTitle: 'Cognitive Surveillance', monthlyAddOnPrice: 12900, annualAddOnPrice: 10320, description: 'Real-time AI threat detection' },
    { serviceSlug: 'autonomous-field-ops',   serviceTitle: 'Autonomous Field Ops',  monthlyAddOnPrice: 24900, annualAddOnPrice: 19920, description: 'Drone dispatch & automated lockdowns' },
    { serviceSlug: 'ai-agentic-saas',        serviceTitle: 'AI Agentic SaaS',       monthlyAddOnPrice: 17900, annualAddOnPrice: 14320, description: 'Self-evolving workflow automation agents' },
    { serviceSlug: 'iot-orchestration',      serviceTitle: 'IoT Orchestration',     monthlyAddOnPrice: 9900,  annualAddOnPrice: 7920,  description: 'Unified sensor & hardware management' },
    { serviceSlug: 'go-to-market-expert',    serviceTitle: 'Go-to-Market Expert',   monthlyAddOnPrice: 19900, annualAddOnPrice: 15920, description: 'Strategic launch & growth consulting' },
];

export default async function PricingPage() {
    let pricingConfig: any = null;
    try {
        const payload = await getPayload({ config: configPromise });
        try {
            pricingConfig = await payload.findGlobal({ slug: 'pricing-config' });
        } catch {}
    } catch {}

    const tiers      = pricingConfig?.tiers?.length          ? pricingConfig.tiers          : FALLBACK_TIERS;
    const addOns     = pricingConfig?.serviceAddOns?.length  ? pricingConfig.serviceAddOns  : FALLBACK_ADDONS;
    const headline   = pricingConfig?.headline    || 'Simple, Transparent Pricing';
    const subheadline = pricingConfig?.subheadline || 'Start with a base platform tier, then add the AI modules your operation needs.';
    const billingNote = pricingConfig?.billingNote || 'Prices shown in BDT and exclude applicable taxes. All plans include a 14-day free trial. Cancel anytime.';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative z-10 pt-28 pb-24">
            {/* Header */}
            <section className="max-w-3xl mx-auto px-6 text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6">
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-slate-600 dark:text-gray-400">Pricing</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                    {headline}
                </h1>
                <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    {subheadline}
                </p>
            </section>

            <PricingClient tiers={tiers} addOns={addOns} billingNote={billingNote} />

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-6 mt-20">
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/3 p-10 text-center">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Need a custom solution?</h2>
                    <p className="text-slate-600 dark:text-gray-400 text-base mb-6 max-w-xl mx-auto">
                        Government, multi-site, and air-gapped deployments require tailored scoping. Talk to our architects.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center h-11 px-8 bg-white text-black font-semibold rounded-lg text-sm hover:bg-gray-100 transition-opacity"
                    >
                        Contact Sales
                    </Link>
                </div>
            </section>
        </div>
    );
}
