import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'published'],
    group: 'RESOURCES',
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
    },
    {
      name: 'metaDescription',
      type: 'textarea',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    // Section blocks (replaces section_blocks table)
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'blockType',
          type: 'text',
          required: true,
          admin: { description: 'Component type to render' },
        },
        {
          name: 'props',
          type: 'json',
          admin: { description: 'Props to pass to the component' },
        },
        {
          name: 'patternPreset',
          type: 'text',
        },
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
