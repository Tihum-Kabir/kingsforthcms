import type { CollectionConfig } from 'payload'

export const PartnerLogos: CollectionConfig = {
  slug: 'partner-logos',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'displayOrder', 'isActive'],
    group: 'CONTENT',
    description: 'Manage partner and trusted-by logos shown in the homepage infinite scroll.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Company / partner name (used as alt text and title)' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Upload the partner logo image. IMPORTANT: Ensure the image has a TRANSPARENT background (PNG or SVG) so it sits cleanly inside the white box containers.' },
    },
    {
      name: 'logoUrl',
      type: 'text',
      admin: {
        description: 'Alternative: paste an external logo URL if you are not uploading a file',
      },
    },
    {
      name: 'websiteUrl',
      type: 'text',
      admin: { description: 'Optional: partner website URL (makes the logo clickable)' },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first in the scroll' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uncheck to hide this logo from the website without deleting it' },
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      admin: { description: 'Optional: link to a company record in the CMS' },
    },
  ],
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'SUPER_ADMIN') return true
      return { isActive: { equals: true } }
    },
    create: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
