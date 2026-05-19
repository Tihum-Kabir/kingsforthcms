import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

/** Convert plain text (from PDF) into a Lexical document */
function textToLexical(raw: string): object {
  const paragraphs = raw
    .split(/\n{2,}|\r\n\r\n/)
    .map((p) => p.replace(/[\r\n]+/g, ' ').trim())
    .filter((p) => p.length > 3)
    .slice(0, 300) // cap at 300 paragraphs for performance

  return {
    root: {
      children: paragraphs.map((text) => ({
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

const extractPdfHook: CollectionAfterChangeHook = async ({ doc, req, previousDoc, operation }) => {
  // Guard: skip if triggered by our own update (prevents infinite recursion)
  if ((req.context as any)?.skipPdfExtraction) return doc

  // Only run when a PDF file is attached
  if (!doc.pdfFile) return doc

  const prevPdfId = typeof previousDoc?.pdfFile === 'object' ? previousDoc?.pdfFile?.id : previousDoc?.pdfFile
  const currPdfId = typeof doc.pdfFile === 'object' ? (doc.pdfFile as any).id : doc.pdfFile

  // Skip if PDF hasn't changed (and it's not a new doc)
  if (operation !== 'create' && prevPdfId === currPdfId) return doc

  // Skip if content is already populated
  const hasContent = (doc.content as any)?.root?.children?.some(
    (c: any) => c.children?.some((n: any) => (n.text ?? '').trim().length > 0),
  )
  if (hasContent) return doc

  try {
    const payload = req.payload
    const mediaId = currPdfId
    if (!mediaId) return doc

    const mediaDoc = await payload.findByID({ collection: 'media', id: mediaId, overrideAccess: true })
    if (!mediaDoc?.filename) return doc

    // Resolve file path — try both common Payload upload locations
    const fs = await import('fs')
    const path = await import('path')
    const candidates = [
      path.join(process.cwd(), 'media', String(mediaDoc.filename)),
      path.join(process.cwd(), '..', 'media', String(mediaDoc.filename)),
    ]

    let fileBuffer: Buffer | null = null
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        fileBuffer = fs.readFileSync(p)
        break
      }
    }

    if (!fileBuffer) {
      console.warn('[Kingsforth] PDF extract: file not found for', mediaDoc.filename, '– tried:', candidates)
      return doc
    }

    const pdfParseModule = await import('pdf-parse');
    const pdfParse: (buf: Buffer) => Promise<{ text: string; numpages: number }> =
      (pdfParseModule as any).default ?? (pdfParseModule as any);
    const pdfData = await pdfParse(fileBuffer);

    if (!pdfData.text?.trim()) return doc

    const lexicalContent = textToLexical(pdfData.text)

    await payload.update({
      collection: 'resources',
      id: doc.id,
      data: { content: lexicalContent } as any,
      overrideAccess: true,
      context: { skipPdfExtraction: true },
    })

    console.log(`[Kingsforth] PDF extracted: "${doc.title}" → ${(lexicalContent as any).root.children.length} paragraphs`)
  } catch (err) {
    console.error('[Kingsforth] PDF extraction error:', err)
  }

  return doc
}

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featuredInNav', 'isPublished', 'publishedAt'],
    group: 'CONTENT',
    description: 'Upload documents, PDFs, videos, and stories. PDFs are automatically scanned and their text extracted into the content field.',
  },
  hooks: {
    afterChange: [extractPdfHook],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-friendly identifier. Auto-fill from title if left blank.' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Blog', value: 'Blog' },
        { label: 'Documentation', value: 'Documentation' },
        { label: 'Case Study', value: 'Case Study' },
        { label: 'White Paper', value: 'White Paper' },
        { label: 'Library', value: 'Library' },
        { label: 'Customer Story', value: 'Customer Story' },
        { label: 'Partner', value: 'Partner' },
        { label: 'Grant', value: 'Grant' },
        { label: 'AI Agent', value: 'AI Agent' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'Short summary shown on cards and meta descriptions.' },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      admin: { description: 'Full article content. Auto-populated when a PDF is uploaded.' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Hero image shown at the top of the resource page and on cards.' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'YouTube or Vimeo URL — embedded inline on the detail page (e.g. https://www.youtube.com/watch?v=xxx).',
      },
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a PDF — text is automatically extracted into the content field. A download button appears on the page.',
      },
    },
    {
      name: 'docxFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a Word/DOCX document — a download button appears on the detail page.',
      },
    },
    {
      name: 'externalLink',
      type: 'text',
      admin: { description: 'Optional external URL — opens in new tab instead of the detail page.' },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'section',
      type: 'relationship',
      relationTo: 'resource-sections',
      admin: {
        description: 'Which section this resource belongs to on the Resources page. Leave blank to show in "All Resources".',
      },
    },
    {
      name: 'featuredInNav',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this resource in the Resources navigation dropdown menu.',
        position: 'sidebar',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
  access: {
    read: ({ req }) => {
      if (req.user && ['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(req.user.role)) return true
      return { isPublished: { equals: true } }
    },
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
