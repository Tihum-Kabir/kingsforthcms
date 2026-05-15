import type { CollectionConfig } from 'payload'

export const ProductFeatures: CollectionConfig = {
  slug: 'product-features',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'displayOrder', 'isActive'],
    group: 'SETTINGS',
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
      required: true,
    },
    {
      name: 'mediaUrl',
      type: 'text',
      admin: { description: 'Image or video URL' },
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'featuresList',
      type: 'array',
      fields: [
        { name: 'feature', type: 'text', required: true },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
  access: {
    read: () => true, // Public
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
