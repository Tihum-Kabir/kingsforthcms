import type { GlobalConfig } from 'payload'

export const AboutContent: GlobalConfig = {
  slug: 'about-content',
  admin: {
    group: 'SETTINGS',
  },
  access: {
    read: () => true,
    update: ({ req }) => {
      if (!req.user) return false
      return ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user.role)
    },
  },
  fields: [
    {
      name: 'mission',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Our Mission' },
        { name: 'content', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'vision',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Our Vision' },
        { name: 'content', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'story',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Our Story' },
        { name: 'content', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'icon', type: 'text' },
      ],
    },
  ],
}
