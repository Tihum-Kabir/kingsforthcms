import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished'],
    group: 'CONTENT',
    description: 'Manage all content for service pages — text, features, media, and pricing.',
    listSearchableFields: ['title'],
  },
  fields: [
    // ─── Identity ─────────────────────────────────────────────────
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug (e.g., "cognitive-surveillance"). Must be URL-safe, lowercase, hyphenated.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    // ─── Category & Visibility ────────────────────────────────────
    {
      name: 'category',
      type: 'select',
      defaultValue: 'automation',
      options: [
        { label: 'Forensic', value: 'forensic' },
        { label: 'Surveillance', value: 'surveillance' },
        { label: 'Automation', value: 'automation' },
        { label: 'IoT', value: 'iot' },
        { label: 'Consulting', value: 'consulting' },
      ],
    },
    {
      name: 'isPublished',
      label: 'Visible on Website',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck to hide this service without deleting it.',
        position: 'sidebar',
      },
    },
    {
      name: 'orderIndex',
      label: 'Display Order',
      type: 'number',
      defaultValue: 99,
      admin: {
        description: 'Lower numbers appear first on the services list page.',
        position: 'sidebar',
      },
    },
    {
      name: 'colorTheme',
      label: 'Card Color Theme',
      type: 'select',
      defaultValue: 'cyan',
      options: [
        { label: 'Cyan', value: 'cyan' },
        { label: 'Violet', value: 'violet' },
        { label: 'Emerald', value: 'emerald' },
        { label: 'Amber', value: 'amber' },
        { label: 'Rose', value: 'rose' },
        { label: 'Indigo', value: 'indigo' },
      ],
      admin: {
        description: 'Accent color for the service card and icon on the list page.',
        position: 'sidebar',
      },
    },

    // ─── Hero Copy ────────────────────────────────────────────────
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Short tagline shown on the service card and detail page hero.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Full description shown in the "Overview" section of the service detail page.',
      },
    },

    // ─── Stats ────────────────────────────────────────────────────
    {
      name: 'stats',
      label: 'Key Stats',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Hero stats strip (4 recommended). Example: value "< 3s", label "Search 1TB Footage".',
      },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'Bold metric (e.g., "< 3s" or "99.2%").' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'Descriptor below the value.' } },
      ],
    },

    // ─── How It Works ─────────────────────────────────────────────
    {
      name: 'howItWorks',
      label: 'How It Works (3 Steps)',
      type: 'array',
      maxRows: 3,
      admin: {
        description: 'Three-step process shown below the hero. Recommended: exactly 3 steps.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'iconName',
          type: 'select',
          options: [
            { label: 'Search', value: 'search' },
            { label: 'Database', value: 'database' },
            { label: 'Eye / Surveillance', value: 'eye' },
            { label: 'Camera', value: 'camera' },
            { label: 'CPU / Processor', value: 'cpu' },
            { label: 'Brain / AI', value: 'brain' },
            { label: 'Bot / Agent', value: 'bot' },
            { label: 'Network', value: 'network' },
            { label: 'Zap / Automation', value: 'zap' },
            { label: 'Shield Alert', value: 'shield-alert' },
            { label: 'Bell / Alert', value: 'bell' },
            { label: 'File Check', value: 'file-check' },
            { label: 'Clipboard List', value: 'clipboard-list' },
            { label: 'Settings / Gear', value: 'settings' },
            { label: 'Plug / Connect', value: 'plug' },
            { label: 'Trending Up', value: 'trending-up' },
            { label: 'Book Open', value: 'book-open' },
          ],
          admin: { description: 'Icon displayed on this step.' },
        },
      ],
    },

    // ─── Features ─────────────────────────────────────────────────
    {
      name: 'features',
      label: 'Key Features',
      type: 'array',
      admin: {
        description: 'Feature cards shown in the "Key Capabilities" grid on the detail page (3 recommended).',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'description',
          type: 'textarea',
          admin: { description: 'One or two sentences explaining this feature.' },
        },
      ],
    },

    // ─── Media ────────────────────────────────────────────────────
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Banner image displayed at the top of the service detail page. Recommended: 1920×1080px.',
      },
    },
    {
      name: 'galleryImages',
      label: 'Gallery Images',
      type: 'array',
      admin: { description: 'Additional images for the service gallery.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', admin: { description: 'Optional caption.' } },
      ],
    },
    {
      name: 'heroVideoUrl',
      label: 'YouTube / Vimeo Video URL',
      type: 'text',
      admin: {
        description: 'Optional video URL. Leave empty to hide the video player.',
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
    },

    // ─── Pricing Plans ───────────────────────────────────────────
    {
      name: 'plans',
      label: 'Subscription Tiers',
      type: 'array',
      admin: {
        description: 'Define Plus, Pro, and Enterprise pricing for this service.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'name',
          type: 'select',
          required: true,
          options: [
            { label: 'Plus', value: 'Plus' },
            { label: 'Pro', value: 'Pro' },
            { label: 'Enterprise', value: 'Enterprise' },
          ],
        },
        {
          name: 'monthlyPrice',
          label: 'Monthly Price (USD)',
          type: 'number',
          admin: { description: 'Base monthly price. Set to 0 for Enterprise to show "Custom" pricing.' },
        },
        {
          name: 'annualPrice',
          label: 'Annual Price (USD)',
          type: 'number',
          admin: { description: 'Total price for a 12-month subscription. Savings vs monthly are auto-calculated and shown.' },
        },
        {
          name: 'description',
          type: 'text',
          admin: { description: 'Short descriptor under the plan name (e.g., "Essential capabilities for smaller operations").' },
        },
        {
          name: 'badge',
          type: 'text',
          admin: { description: 'Optional badge text shown on card (e.g., "Most Popular", "Best Value"). Only one plan should have a badge.' },
        },
        {
          name: 'isPopular',
          label: 'Mark as Featured / Recommended',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Highlights this plan card with accent border and elevated style. Only set for ONE plan per service.' },
        },
        {
          name: 'discountNote',
          label: 'Discount Note',
          type: 'text',
          admin: { description: 'Optional custom discount label shown on this plan (e.g., "30% off this month"). Shows on top of auto-calculated savings.' },
        },
        {
          name: 'planFeatures',
          label: 'Feature List',
          type: 'array',
          fields: [
            { name: 'feature', type: 'text', required: true },
            {
              name: 'included',
              label: 'Included in this plan',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Uncheck to show this feature as crossed-out (not included).' },
            },
          ],
        },
        {
          name: 'ctaLabel',
          label: 'CTA Button Label',
          type: 'text',
          admin: { description: 'Button text. Default: "Get Started" for paid plans, "Contact Sales" for Enterprise.' },
        },
      ],
    },
  ],
  access: {
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    read: () => true,
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
