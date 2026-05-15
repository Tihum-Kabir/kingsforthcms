import type { CollectionConfig } from 'payload'

export const KnowledgeBase: CollectionConfig = {
  slug: 'knowledge-base',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'published', 'updatedAt'],
    group: 'RESOURCES',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'SUPER_ADMIN') return true
      return { published: { equals: true } }
    },
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
