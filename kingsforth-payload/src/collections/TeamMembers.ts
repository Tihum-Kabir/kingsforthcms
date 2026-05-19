import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'sortOrder'],
    group: 'CONTENT',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: { description: 'Job title/role (e.g., "Co-Founder & CEO")' },
    },
    {
      name: 'motto',
      type: 'text',
      admin: { description: 'Short personal motto shown as a chat-style quote under their name (e.g., "Security is not a product, it\'s a process.")' },
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinkedin',
      type: 'text',
    },
    {
      name: 'socialTwitter',
      type: 'text',
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
