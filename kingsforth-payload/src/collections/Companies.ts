import type { CollectionConfig } from 'payload'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'industry', 'status', 'email'],
    group: 'CRM',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'industry',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Deleted', value: 'deleted' },
      ],
    },
  ],
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'SUPER_ADMIN') return true
      return { id: { equals: req.user.company } }
    },
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'SUPER_ADMIN') return true
      return { id: { equals: req.user.company } }
    },
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
