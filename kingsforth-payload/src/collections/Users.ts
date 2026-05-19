import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,     // lock account after 5 failed attempts
    lockTime: 15 * 60_000,   // locked for 15 minutes
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'company'],
    group: 'SYSTEM',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'STAFF',
      options: [
        { label: 'Super Admin', value: 'SUPER_ADMIN' },
        { label: 'Company Admin', value: 'COMPANY_ADMIN' },
        { label: 'Staff', value: 'STAFF' },
      ],
      access: {
        // Only admins can change roles
        update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
      },
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      admin: {
        description: 'The company this user belongs to',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'resetCode',
      type: 'text',
      admin: {
        hidden: true, // Only for internal API usage
      },
    },
    {
      name: 'resetCodeExpiration',
      type: 'date',
      admin: {
        hidden: true, // Only for internal API usage
      },
    },
  ],
  access: {
    // Only SUPER_ADMIN can login to the native Admin Dashboard via /admin
    admin: ({ req }) => {
      return req.user?.role === 'SUPER_ADMIN'
    },
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'SUPER_ADMIN') return true
      return { id: { equals: req.user.id } }
    },
    // Admins can create users
    // Allow public registration (unauthorized users can create their own account)
    create: () => true,
    // Users can update themselves, admins can update anyone
    update: ({ req }) => {
      if (!req.user) return false
      if (['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user.role)) return true
      return { id: { equals: req.user.id } }
    },
    // Only super admins can delete
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
