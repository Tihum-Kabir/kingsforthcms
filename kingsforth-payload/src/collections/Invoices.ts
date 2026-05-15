import type { CollectionConfig } from 'payload'

export const Invoices: CollectionConfig = {
  slug: 'invoices',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['subscription', 'amount', 'status', 'issuedAt'],
    group: 'CRM',
  },
  fields: [
    {
      name: 'subscription',
      type: 'relationship',
      relationTo: 'subscriptions',
      required: true,
    },
    {
      name: 'billingPeriodStart',
      type: 'date',
      required: true,
    },
    {
      name: 'billingPeriodEnd',
      type: 'date',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'vat',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'USD',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'DRAFT',
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Sent', value: 'SENT' },
        { label: 'Paid', value: 'PAID' },
        { label: 'Overdue', value: 'OVERDUE' },
      ],
    },
    {
      name: 'pdfUrl',
      type: 'text',
    },
    {
      name: 'issuedAt',
      type: 'date',
    },
    {
      name: 'paidAt',
      type: 'date',
    },
    {
      name: 'stripeInvoiceId',
      type: 'text',
    },
    // Invoice items merged as an array (replaces invoice_items table)
    {
      name: 'items',
      type: 'array',
      admin: { description: 'Line items for this invoice' },
      fields: [
        { name: 'description', type: 'text', required: true },
        { name: 'quantity', type: 'number', required: true, defaultValue: 1 },
        { name: 'unitPrice', type: 'number', required: true },
        { name: 'total', type: 'number', required: true },
      ],
    },
  ],
  access: {
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'SUPER_ADMIN') return true
      // Company users can read their invoices (simplified — full query would join through subscription)
      return false
    },
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
