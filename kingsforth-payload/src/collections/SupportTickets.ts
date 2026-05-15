import type { CollectionConfig } from 'payload'

export const SupportTickets: CollectionConfig = {
  slug: 'support-tickets',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'status', 'createdAt'],
    group: 'CRM',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
    },
    {
      name: 'submittedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'OPEN',
      options: [
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Resolved', value: 'RESOLVED' },
      ],
    },
    // Ticket messages merged as array (replaces ticket_messages table)
    {
      name: 'messages',
      type: 'array',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
        },
        {
          name: 'sentAt',
          type: 'date',
          admin: { readOnly: true },
        },
      ],
    },
  ],
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (['SUPER_ADMIN', 'STAFF'].includes(req.user.role)) return true
      return { company: { equals: req.user.company } }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => {
      if (!req.user) return false
      return ['SUPER_ADMIN', 'STAFF'].includes(req.user.role)
    },
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
