import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const basicRichTextEditor = lexicalEditor()

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'SETTINGS',
    description: 'Central control panel for all site-wide settings, branding, hero images, and social links.',
    hideAPIURL: true,
  },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'SUPER_ADMIN',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & Identity',
          description: 'Site name, logo, and tagline configuration.',
          fields: [
            {
              name: 'siteLogo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload the main website logo (SVG or transparent PNG, recommended 200×60px).',
              },
            },
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'Kingsforth',
              admin: { description: 'Displayed in the browser tab and footer.' },
            },
            {
              name: 'siteTagline',
              type: 'text',
              defaultValue: 'Enterprise Intelligence Systems',
              admin: { description: 'Shown below the logo in the footer.' },
            },
          ],
        },
        {
          label: 'Homepage Hero',
          description: 'Configure the main hero section on the landing page. Images should be 2560×1440px for best results.',
          fields: [
            {
              name: 'heroImageDay',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: '🌤️ DAY MODE hero background image. Upload a wide landscape image (recommended: 2560×1440px minimum). The image will scale responsively — it will NOT crop or break on any screen size.',
              },
            },
            {
              name: 'heroImageNight',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: '🌙 NIGHT MODE hero background image. Upload a wide landscape image (recommended: 2560×1440px minimum). Same dimensions as the day image for seamless theme switching.',
              },
            },
            {
              name: 'heroHeadline',
              type: 'text',
              defaultValue: 'Engineering the Invisible',
              admin: { description: 'Main headline text displayed over the hero image.' },
            },
            {
              name: 'heroHighlightText',
              type: 'text',
              defaultValue: 'the Invisible',
              admin: { description: 'The portion of the headline that gets the gradient color effect.' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heroSubtitle',
                  type: 'richText',
                  editor: basicRichTextEditor,
                  admin: { description: 'Subtitle paragraph shown below the headline.', width: '80%' },
                },
                {
                  name: 'heroSubtitleSize',
                  type: 'number',
                  defaultValue: 19,
                  admin: { description: 'Font Size (px)', width: '20%', step: 1 }
                }
              ]
            },
            {
              name: 'heroCTAText',
              type: 'text',
              defaultValue: 'Get Started',
              admin: { description: 'Text for the primary call-to-action button.' },
            },
            {
              name: 'heroCTALink',
              type: 'text',
              defaultValue: '/contact',
              admin: { description: 'URL the primary CTA button links to.' },
            },
            {
              name: 'heroSecondaryCTAText',
              type: 'text',
              defaultValue: 'Watch Videos',
              admin: { description: 'Text for the secondary button (YouTube link).' },
            },
            {
              name: 'heroSecondaryCTALink',
              type: 'text',
              defaultValue: 'https://youtube.com',
              admin: { description: 'URL for the secondary button (e.g., YouTube link).' },
            },
          ],
        },
        {
          label: 'Page Hero Images',
          description: 'Upload hero images for each inner page. All images scale responsively — upload 2560×1440px for best quality.',
          fields: [
            {
              name: 'pageHeroes',
              type: 'array',
              admin: {
                description: 'Add hero images for each page (services, solutions, pricing, etc.). Each page can have separate day and night images.',
              },
              fields: [
                {
                  name: 'pageSlug',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Services', value: 'services' },
                    { label: 'Solutions', value: 'solutions' },
                    { label: 'Pricing', value: 'pricing' },
                    { label: 'About', value: 'about' },
                    { label: 'Contact', value: 'contact' },
                    { label: 'Resources', value: 'resources' },
                  ],
                  admin: { description: 'Which page this hero image is for.' },
                },
                {
                  name: 'dayImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: '🌤️ Day mode hero image for this page (2560×1440px recommended).' },
                },
                {
                  name: 'nightImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: '🌙 Night mode hero image for this page (2560×1440px recommended).' },
                },
                {
                  name: 'headline',
                  type: 'text',
                  admin: { description: 'Page-specific headline. Leave blank to use the page default.' },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  admin: { description: 'Page-specific subtitle text.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Social Links',
          description: 'Links to social media profiles shown in the footer and elsewhere.',
          fields: [
            {
              name: 'socialLinks',
              type: 'group',
              fields: [
                { name: 'facebook', type: 'text', admin: { placeholder: 'https://facebook.com/kingsforth' } },
                { name: 'instagram', type: 'text', admin: { placeholder: 'https://instagram.com/kingsforth' } },
                { name: 'twitter', type: 'text', admin: { placeholder: 'https://x.com/kingsforth' } },
                { name: 'linkedin', type: 'text', admin: { placeholder: 'https://linkedin.com/company/kingsforth' } },
                { name: 'youtube', type: 'text', admin: { placeholder: 'https://youtube.com/@kingsforth' } },
              ],
            },
          ],
        },
        {
          label: 'Footer & Contact',
          description: 'Configure the footer content including contact details and Google Maps location.',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              fields: [
                { name: 'email', type: 'email', admin: { placeholder: 'contact@kingsforth.com', description: 'The public contact email address.' } },
                { name: 'phone', type: 'text', admin: { placeholder: '+880 1833-183436', description: 'Primary contact phone number.' } },
                { name: 'phone2', type: 'text', admin: { placeholder: '+880 1711-033237', description: 'Secondary contact phone number (optional).' } },
                { name: 'address', type: 'textarea', admin: { placeholder: '123 Kingsforth Ave, City, Country', description: 'Physical office address.' } },
                { name: 'map_embed', type: 'textarea', admin: { description: 'Google Maps iframe embed code or src URL. This will render the interactive grayscale map in the footer.' } },
              ],
            },
          ],
        },
        {
          label: 'Homepage Content',
          description: 'Fully configure all text, media, and features for the homepage sections.',
          fields: [
            {
              type: 'group',
              name: 'partnerLogosSection',
              label: 'Trusted Partners Section',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                { name: 'headline', type: 'text', defaultValue: 'Trusted By Industry Pioneers', admin: { description: 'Text shown above the scrolling logos.' } },
              ]
            },
            {
              type: 'group',
              name: 'whyKingsforthSection',
              label: 'Why Kingsforth (Paradigm Shift)',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Why Kingsforth' },
                {
                  type: 'row',
                  fields: [
                    { name: 'subtitle', type: 'richText', editor: basicRichTextEditor, admin: { width: '80%' } },
                    { name: 'subtitleSize', type: 'number', defaultValue: 18, admin: { description: 'Size (px)', width: '20%', step: 1 } }
                  ]
                }
              ]
            },
            {
              type: 'group',
              name: 'productShowcaseSection',
              label: 'Product Showcase (Kingseye)',
              fields: [
                { name: 'badge', type: 'text', defaultValue: 'POWERED BY KINGSEYE' },
                { name: 'title', type: 'text', defaultValue: 'KINGSEYE' },
                { name: 'subtitle', type: 'text', defaultValue: 'Autonomous Intelligence Core, Not Just Another Dashboard' },
                {
                  type: 'row',
                  fields: [
                    { name: 'description', type: 'richText', editor: basicRichTextEditor, admin: { width: '80%' } },
                    { name: 'descriptionSize', type: 'number', defaultValue: 16, admin: { description: 'Size (px)', width: '20%', step: 1 } }
                  ]
                },
                { name: 'showcaseMedia', type: 'upload', relationTo: 'media', admin: { description: 'Upload a 16:9 image or short looping video of the dashboard.' } }
              ]
            },
            {
              type: 'group',
              name: 'statsSection',
              label: 'Key Metrcis & Stats',
              fields: [
                {
                  name: 'stats',
                  type: 'array',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 1M+' } },
                    { name: 'label', type: 'text', required: true, admin: { description: 'e.g. Incidents Prevented' } },
                    { name: 'iconName', type: 'text', admin: { description: 'Lucide React icon name (e.g. Activity, Shield, Users)' } }
                  ]
                }
              ]
            },
            {
              type: 'group',
              name: 'howItWorksSection',
              label: 'How It Works',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'How It Works' },
                {
                  type: 'row',
                  fields: [
                    { name: 'subtitle', type: 'richText', editor: basicRichTextEditor, admin: { width: '80%' } },
                    { name: 'subtitleSize', type: 'number', defaultValue: 18, admin: { description: 'Size (px)', width: '20%', step: 1 } }
                  ]
                },
                {
                  name: 'steps',
                  type: 'array',
                  admin: { description: 'The timeline steps displaying down the page.' },
                  fields: [
                    { name: 'stepNumber', type: 'text', required: true, admin: { description: 'e.g. "01", "02"' } },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea' },
                    { name: 'iconName', type: 'text', admin: { description: 'Lucide icon name (e.g. "AlertCircle", "Zap")' } },
                    { name: 'colorTheme', type: 'text', admin: { description: 'Tailwind gradient (e.g. "from-cyan-500 to-blue-500")' } },
                    { name: 'media', type: 'upload', relationTo: 'media', admin: { description: 'Upload the image/gif/video to show beside this step.' } },
                    {
                      name: 'mediaType',
                      type: 'select',
                      defaultValue: 'image',
                      options: [{ label: 'Image', value: 'image' }, { label: 'Video', value: 'video' }]
                    },
                    {
                      name: 'mediaFit',
                      type: 'select',
                      defaultValue: 'cover',
                      options: [{ label: 'Cover', value: 'cover' }, { label: 'Contain', value: 'contain' }]
                    }
                  ]
                }
              ]
            },
            {
              type: 'group',
              name: 'coreCapabilitiesSection',
              label: 'Core Capabilities',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Core Capabilities' },
                {
                  type: 'row',
                  fields: [
                    { name: 'subtitle', type: 'richText', editor: basicRichTextEditor, admin: { width: '80%' } },
                    { name: 'subtitleSize', type: 'number', defaultValue: 18, admin: { description: 'Size (px)', width: '20%', step: 1 } }
                  ]
                }
              ]
            },
            {
              type: 'group',
              name: 'finalCtaSection',
              label: 'Final CTA (Bottom of page)',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Ready to Secure Your Future?' },
                {
                  type: 'row',
                  fields: [
                    { name: 'subtitle', type: 'richText', editor: basicRichTextEditor, admin: { width: '80%' } },
                    { name: 'subtitleSize', type: 'number', defaultValue: 18, admin: { description: 'Size (px)', width: '20%', step: 1 } }
                  ]
                },
                { name: 'primaryButtonText', type: 'text', defaultValue: 'Get a Demo' },
                { name: 'primaryButtonLink', type: 'text', defaultValue: '/contact' },
                { name: 'secondaryButtonText', type: 'text', defaultValue: 'View Pricing' },
                { name: 'secondaryButtonLink', type: 'text', defaultValue: '/pricing' },
              ]
            }
          ]
        },
        {
          label: 'Resources Page',
          description: 'Configure the /resources page — LLM links section and heading.',
          fields: [
            {
              name: 'resourcesPageHero',
              type: 'group',
              label: 'Hero Section',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Explore Our Resource Library',
                  admin: { description: 'Main heading on the Resources page.' },
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  defaultValue: 'Access guides, data sheets, white papers, and videos. Stay informed with in-depth resources designed to keep you ahead.',
                  admin: { description: 'Subheading paragraph shown below the main heading.' },
                },
              ],
            },
            {
              name: 'llmSectionHeading',
              type: 'text',
              defaultValue: 'Start a conversation to research Kingsforth on LLMs:',
              admin: {
                description: 'Heading shown above the LLM platform links on the Resources page.',
              },
            },
            {
              name: 'llmLinks',
              type: 'array',
              label: 'LLM Platform Links',
              admin: {
                description: 'Add AI platforms (ChatGPT, Claude, Gemini, etc.) for visitors to start a conversation about Kingsforth. Each link opens in a new tab.',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: { description: 'Display name, e.g. ChatGPT, Claude, Gemini' },
                },
                {
                  name: 'description',
                  type: 'text',
                  admin: { description: 'Short description shown under the name, e.g. "Start a conversation about Kingsforth with ChatGPT."' },
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  admin: { description: 'Full URL including pre-filled query, e.g. https://chatgpt.com/?q=Tell+me+about+Kingsforth+AI' },
                },
                {
                  name: 'iconColor',
                  type: 'text',
                  defaultValue: '#6b7280',
                  admin: { description: 'Hex color for the icon circle background/accent, e.g. #10a37f for ChatGPT green.' },
                },
                {
                  name: 'iconLetter',
                  type: 'text',
                  admin: { description: 'Single letter/emoji to show inside the icon circle, e.g. G for ChatGPT, C for Claude.' },
                },
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { description: 'Uncheck to hide this link from the public Resources page.' },
                },
              ],
            },
          ],
        },
        {
          label: 'System',
          description: 'Email configuration and advanced settings.',
          fields: [
            {
              name: 'emailFromName',
              type: 'text',
              defaultValue: 'Kingsforth Team',
              admin: { description: 'Default sender name for system emails.' },
            },
            {
              name: 'emailFromAddress',
              type: 'email',
              defaultValue: 'noreply@kingsforth.net',
              admin: { description: 'Default sender email address.' },
            },
            {
              name: 'teamSectionHeading',
              type: 'text',
              defaultValue: 'Meet The Operators',
            },
            {
              name: 'aboutSectionHeading',
              type: 'text',
              defaultValue: 'Our Mission',
            },
          ]
        }
      ]
    }
  ],
}
