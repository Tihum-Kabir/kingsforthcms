import type { CollectionConfig } from 'payload'

export const EmailCampaigns: CollectionConfig = {
  slug: 'email-campaigns',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'status', 'sentTo', 'createdAt'],
    group: 'SYSTEM',
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'recipientFilter',
      type: 'json',
      admin: { description: 'Filter criteria for recipients (e.g., {"role": "COMPANY_ADMIN"})' },
    },
    {
      name: 'sentTo',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true, description: 'Count of emails sent' },
    },
    {
      name: 'opened',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'clicked',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'scheduledAt',
      type: 'date',
    },
    {
      name: 'sentAt',
      type: 'date',
      admin: { readOnly: true },
    },
    // Recipients tracking
    {
      name: 'recipients',
      type: 'array',
      admin: { readOnly: true, description: 'Individual recipient tracking' },
      fields: [
        { name: 'user', type: 'relationship', relationTo: 'users' },
        { name: 'sentAt', type: 'date' },
        { name: 'openedAt', type: 'date' },
        { name: 'clickedAt', type: 'date' },
        { name: 'bounced', type: 'checkbox', defaultValue: false },
        { name: 'errorMessage', type: 'text' },
      ],
    },
  ],
  access: {
    read: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
