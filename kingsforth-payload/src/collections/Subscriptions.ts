import type { CollectionConfig } from 'payload'

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['company', 'service', 'status', 'startDate'],
    group: 'CRM',
  },
  fields: [
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'TRIAL',
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Cancelled', value: 'CANCELLED' },
        { label: 'Trial', value: 'TRIAL' },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'nextBillingDate',
      type: 'date',
    },
    {
      name: 'usersAllowed',
      type: 'number',
      defaultValue: 5,
    },
    {
      name: 'customPrice',
      type: 'number',
      admin: { description: 'Custom price override (decimal)' },
    },
    {
      name: 'stripeSubscriptionId',
      type: 'text',
      admin: { description: 'Stripe subscription ID' },
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
