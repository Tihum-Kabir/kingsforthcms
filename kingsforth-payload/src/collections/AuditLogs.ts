import type { CollectionConfig } from 'payload'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    defaultColumns: ['action', 'entityType', 'user', 'createdAt'],
    group: 'SYSTEM',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'action',
      type: 'text',
      required: true,
    },
    {
      name: 'entityType',
      type: 'text',
      required: true,
    },
    {
      name: 'entityId',
      type: 'text',
    },
    {
      name: 'changes',
      type: 'json',
    },
  ],
  access: {
    read: ({ req }) => req.user?.role === 'SUPER_ADMIN',
    create: ({ req }) => !!req.user, // System can create logs
    update: () => false, // Logs are immutable
    delete: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
}
