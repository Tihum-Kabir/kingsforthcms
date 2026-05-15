import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'sortOrder'],
    group: 'WEBSITE',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'General',
      admin: { description: 'e.g. General, Technical, Product, Billing' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional file attachment' },
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => {
      if (!req.user) return false
      return ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user.role)
    },
    update: ({ req }) => {
      if (!req.user) return false
      return ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user.role)
    },
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
