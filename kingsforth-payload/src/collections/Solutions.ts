import type { CollectionConfig } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished'],
    group: 'CONTENT',
    description: 'Manage all content for solution pages — text, stats, feature sections, FAQs, and media.',
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
        description: 'URL slug (e.g., "education"). Must be URL-safe, lowercase, hyphenated.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name shown on cards and the detail page hero.',
      },
    },

    // ─── Category & Visibility ────────────────────────────────────
    {
      name: 'category',
      type: 'select',
      defaultValue: 'industry',
      options: [
        { label: 'By Industry', value: 'industry' },
        { label: 'By Use Case', value: 'use-case' },
      ],
    },
    {
      name: 'isPublished',
      label: 'Visible on Website',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck to hide this solution without deleting it.',
        position: 'sidebar',
      },
    },

    // ─── Hero Copy ────────────────────────────────────────────────
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Short headline shown on cards and the detail page hero (e.g., "Protect Students with Real-Time AI").',
      },
    },
    {
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
      admin: {
        description: 'Brief summary shown on the solutions list page card (2-3 sentences).',
      },
    },
    {
      name: 'longDescription',
      label: 'Long Description',
      type: 'richText',
      admin: {
        description: 'Full description shown in the "Overview" section of the detail page.',
      },
    },

    // ─── Key Benefits (grid cards) ────────────────────────────────
    {
      name: 'keyBenefits',
      label: 'Key Benefits',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Benefit cards shown in the "Key Capabilities" grid (3 recommended).',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'description',
          type: 'textarea',
          admin: { description: 'One or two sentences explaining this benefit.' },
        },
      ],
    },

    // ─── Stats ───────────────────────────────────────────────────
    {
      name: 'stats',
      label: 'Stats',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Key metrics shown in the stats grid (4 recommended). Example: value "73%", label "Faster Response".',
      },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'The bold number/text (e.g., "73%" or "< 2s").' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'The description below the value (e.g., "Faster Emergency Response").' } },
      ],
    },

    // ─── Feature Sections ─────────────────────────────────────────
    {
      name: 'featureSections',
      label: 'Feature Sections',
      type: 'array',
      admin: {
        description: 'Alternating two-column sections: title + description on one side, bullet points on the other.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'description',
          type: 'textarea',
          admin: { description: 'Introductory paragraph for this feature section.' },
        },
        {
          name: 'points',
          label: 'Bullet Points',
          type: 'array',
          admin: { description: 'Checkmark bullet points listing specific capabilities.' },
          fields: [
            { name: 'point', type: 'text', required: true },
          ],
        },
      ],
    },

    // ─── FAQs ────────────────────────────────────────────────────
    {
      name: 'faqs',
      label: 'FAQs',
      type: 'array',
      admin: {
        description: 'Accordion FAQ section at the bottom of the detail page.',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },

    // ─── Media ────────────────────────────────────────────────────
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Banner image displayed at the top of the solution detail page. Recommended: 1920×1080px.',
      },
    },
    {
      name: 'galleryImages',
      label: 'Gallery Images',
      type: 'array',
      admin: { description: 'Additional images for the solution gallery.' },
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
  ],
  access: {
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    read: () => true,
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
