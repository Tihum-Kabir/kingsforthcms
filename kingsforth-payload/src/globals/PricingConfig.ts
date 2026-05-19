import type { GlobalConfig } from 'payload'

export const PricingConfig: GlobalConfig = {
    slug: 'pricing-config',
    admin: {
        group: 'SETTINGS',
        description: 'Platform pricing tiers, billing discounts, and service add-on prices for the Pricing page.',
    },
    access: {
        read: () => true,
        update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    },
    fields: [
        {
            name: 'headline',
            type: 'text',
            defaultValue: 'Simple, Transparent Pricing',
            admin: { description: 'Pricing page headline' },
        },
        {
            name: 'subheadline',
            type: 'textarea',
            defaultValue: 'Start with a base platform tier, then add the AI modules your operation needs. Scale up or down any time.',
            admin: { description: 'Pricing page subheadline' },
        },
        {
            name: 'tiers',
            type: 'array',
            label: 'Base Plans',
            admin: {
                description: 'Platform tiers (e.g. Starter — 5 cameras, Professional — 50 cameras, Enterprise)',
            },
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    admin: { description: 'Plan name, e.g. "Starter"' },
                },
                {
                    name: 'tagline',
                    type: 'text',
                    admin: { description: 'Short descriptor, e.g. "Up to 5 cameras"' },
                },
                {
                    name: 'description',
                    type: 'textarea',
                    admin: { description: 'One-line plan description' },
                },
                {
                    name: 'monthlyPrice',
                    type: 'number',
                    admin: { description: 'Base monthly price in BDT (৳). Set to 0 for custom/enterprise pricing.' },
                },
                {
                    name: 'isCustomPrice',
                    type: 'checkbox',
                    defaultValue: false,
                    admin: { description: 'If checked, shows "Contact Sales" instead of a price' },
                },
                {
                    name: 'annualDiscount',
                    type: 'number',
                    defaultValue: 20,
                    admin: { description: 'Percentage discount for annual billing (e.g. 20 = 20% off monthly price)' },
                },
                {
                    name: 'isPopular',
                    type: 'checkbox',
                    defaultValue: false,
                    admin: { description: 'Highlights this plan as recommended' },
                },
                {
                    name: 'badge',
                    type: 'text',
                    admin: { description: 'Badge label, e.g. "Most Popular"' },
                },
                {
                    name: 'ctaLabel',
                    type: 'text',
                    defaultValue: 'Select Plan',
                },
                {
                    name: 'ctaLink',
                    type: 'text',
                    defaultValue: '/contact',
                },
                {
                    name: 'features',
                    type: 'array',
                    label: 'Included Features',
                    admin: { description: 'Feature list shown on the plan card' },
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'included',
                            type: 'checkbox',
                            defaultValue: true,
                            admin: { description: 'Checked = included (green tick). Unchecked = not included (grey X).' },
                        },
                        {
                            name: 'note',
                            type: 'text',
                            admin: { description: 'Optional qualifier, e.g. "up to 5 simultaneous"' },
                        },
                    ],
                },
            ],
        },
        {
            name: 'serviceAddOns',
            type: 'array',
            label: 'Service Add-Ons',
            admin: {
                description: 'AI module add-ons available to bundle with any base plan.',
            },
            fields: [
                {
                    name: 'serviceSlug',
                    type: 'text',
                    required: true,
                    admin: { description: 'Exact slug from Services collection, e.g. "cognitive-surveillance"' },
                },
                {
                    name: 'serviceTitle',
                    type: 'text',
                    required: true,
                    admin: { description: 'Display name for the add-on card' },
                },
                {
                    name: 'monthlyAddOnPrice',
                    type: 'number',
                    required: true,
                    admin: { description: 'Monthly add-on price in BDT (৳)' },
                },
                {
                    name: 'annualAddOnPrice',
                    type: 'number',
                    admin: { description: 'Annual add-on price in BDT (৳) per month when billed annually. Leave blank to auto-apply 20% off monthly price.' },
                },
                {
                    name: 'description',
                    type: 'text',
                    admin: { description: 'One-line description shown on the add-on card' },
                },
            ],
        },
        {
            name: 'billingNote',
            type: 'textarea',
            admin: { description: 'Small print shown below pricing, e.g. VAT information or cancellation policy.' },
            defaultValue: 'Prices shown in BDT and exclude applicable taxes. All plans include a 14-day free trial. Cancel anytime.',
        },
    ],
}
