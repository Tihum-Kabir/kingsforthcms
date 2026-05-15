import type { CollectionConfig } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished'],
    group: 'WEBSITE',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
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
      name: 'category',
      type: 'select',
      defaultValue: 'Use Case',
      options: [
        { label: 'By Industry', value: 'Industry' },
        { label: 'By Use Case', value: 'Use Case' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'heroImage',
      type: 'text',
      admin: { description: 'Hero image URL or upload path' },
    },
    {
      name: 'heroVideoUrl',
      type: 'text',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'iconName', type: 'text', admin: { description: 'Lucide icon name' } },
      ],
    },
    {
      name: 'contentBlocks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea' },
        { name: 'image', type: 'text', admin: { description: 'Image URL' } },
        {
          name: 'align',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
        {
          name: 'listItems',
          type: 'array',
          fields: [
            { name: 'item', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'SUPER_ADMIN') return true
      return { isPublished: { equals: true } }
    },
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
