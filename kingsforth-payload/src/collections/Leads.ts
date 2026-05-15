import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'company', 'status', 'createdAt'],
    group: 'CRM',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'Where the lead came from (e.g., "contact-form", "demo-request")' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'NEW',
      options: [
        { label: 'New', value: 'NEW' },
        { label: 'Contacted', value: 'CONTACTED' },
        { label: 'Qualified', value: 'QUALIFIED' },
        { label: 'Converted', value: 'CONVERTED' },
        { label: 'Lost', value: 'LOST' },
      ],
    },
  ],
  access: {
    // Anyone can submit a lead (public form)
    create: () => true,
    // Only super admins can view/manage leads
    read: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
