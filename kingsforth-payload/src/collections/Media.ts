import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    staticDir: '../media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'filename', 'mimeType', 'deleteAction', 'updatedAt'],
    group: 'SETTINGS',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: { description: 'Alt text for accessibility and SEO. Auto-filled from filename if left blank.' },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        { name: 'tag', type: 'text' },
      ],
    },
    {
      name: 'deleteAction',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/components/admin/DeleteMediaButton.client#DeleteMediaButton',
        },
      },
    },
  ],
  access: {
    read: () => true, // Public read for all media
    create: ({ req }) => {
      if (!req.user) return false
      return ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user.role)
    },
    update: ({ req }) => {
      if (!req.user) return false
      return ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user.role)
    },
    delete: ({ req }) => {
      if (!req.user) return false
      return ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user.role)
    },
  },
}
