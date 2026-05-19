import type { CollectionConfig } from 'payload'

export const ResourceSections: CollectionConfig = {
  slug: 'resource-sections',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'orderIndex', 'isPublished'],
    group: 'CONTENT',
    description: 'Named groups for organizing documents and files on the Resources page. Create sections like "Our Journey", "White Papers", or "Blog".',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-friendly identifier (e.g. "our-journey"). Fill from title.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional short description shown below the section title on the Resources page.' },
    },
    {
      name: 'orderIndex',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first. Sections are sorted by this field.' },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user?.role ?? ''),
    update: ({ req }) => ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user?.role ?? ''),
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
