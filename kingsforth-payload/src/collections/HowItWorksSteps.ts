import type { CollectionConfig } from 'payload'

export const HowItWorksSteps: CollectionConfig = {
  slug: 'how-it-works-steps',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['stepNumber', 'title', 'sortOrder'],
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
    },
    {
      name: 'stepNumber',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "01", "02"' },
    },
    {
      name: 'iconName',
      type: 'text',
      admin: { description: 'Lucide icon name (e.g., "AlertCircle", "Zap")' },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
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
      name: 'mediaFit',
      type: 'select',
      defaultValue: 'cover',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
        { label: 'Fill', value: 'fill' },
      ],
    },
    {
      name: 'colorTheme',
      type: 'text',
      admin: { description: 'Tailwind gradient classes (e.g., "from-red-500 to-orange-500")' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
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
