import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished', 'orderIndex'],
    group: 'WEBSITE',
    description: 'All Kingsforth service offerings. Each service has its own detail page, features, and pricing plans.',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "cognitive-surveillance")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Feature highlights for this service',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Upload icon image (SVG/PNG/WebP, 64×64px recommended)' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'plans',
      type: 'array',
      admin: {
        description: 'Pricing tiers (e.g. Plus, Pro, Enterprise). Each tier has monthly, 6-month, and yearly prices.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: { description: 'Plan Name (e.g. Plus, Pro, Enterprise)' }
        },
        {
          name: 'monthlyPrice',
          type: 'number',
          required: true,
          admin: { description: 'Monthly price in USD' }
        },
        {
          name: 'semiAnnualPrice',
          type: 'number',
          admin: { description: '6-month price in USD (total for 6 months)' }
        },
        {
          name: 'annualPrice',
          type: 'number',
          admin: { description: 'Annual price in USD (total for 12 months)' }
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Highlight this as the recommended plan' }
        },
        {
          name: 'badge',
          type: 'text',
          admin: { description: 'Optional badge text (e.g. "Most Popular", "Best Value")' }
        },
        {
          name: 'planFeatures',
          type: 'array',
          fields: [
            { name: 'feature', type: 'text', required: true },
            { name: 'included', type: 'checkbox', defaultValue: true, admin: { description: 'Is this feature included in this plan?' } }
          ]
        }
      ]
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroVideoUrl',
      type: 'text',
      admin: { description: 'Optional hero video URL' },
    },
    {
      name: 'galleryImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Upload service icon (SVG/PNG/WebP, 64×64px recommended)' },
    },
    {
      name: 'colorTheme',
      type: 'select',
      admin: {
        description: 'Pick a color theme for the service card on the frontend.',
      },
      options: [
        { label: 'Cyan / Blue', value: 'cyan' },
        { label: 'Purple / Violet', value: 'violet' },
        { label: 'Emerald / Green', value: 'emerald' },
        { label: 'Amber / Orange', value: 'amber' },
        { label: 'Rose / Pink', value: 'rose' },
        { label: 'Indigo', value: 'indigo' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'other',
      options: [
        { label: 'Surveillance', value: 'surveillance' },
        { label: 'Forensic', value: 'forensic' },
        { label: 'Automation', value: 'automation' },
        { label: 'IoT', value: 'iot' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'orderIndex',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Display order (lower = first)' },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
    // SEO
    {
      name: 'metaTitle',
      type: 'text',
      admin: { description: 'SEO title tag' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: { description: 'SEO meta description' },
    },
  ],
  access: {
    // Published services are public, all services visible to super admin
    read: ({ req }) => {
      if (req.user?.role === 'SUPER_ADMIN') return true
      return { isPublished: { equals: true } }
    },
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
