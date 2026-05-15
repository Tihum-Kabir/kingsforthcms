import type { CollectionConfig } from 'payload'

export const Analytics: CollectionConfig = {
  slug: 'analytics',
  admin: {
    defaultColumns: ['company', 'date', 'pageViews', 'uniqueVisitors'],
    group: 'SYSTEM',
  },
  fields: [
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'pageViews',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'uniqueVisitors',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'serviceUsage',
      type: 'json',
    },
  ],
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'SUPER_ADMIN') return true
      return { company: { equals: req.user.company } }
    },
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
