import { withPayload } from '@payloadcms/next/withPayload'

const isDev = process.env.NODE_ENV !== 'production'

// Security headers applied to every route
const securityHeaders = [
  // Prevent clickjacking — SAMEORIGIN allows our own pages to frame each other
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Block MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Only send origin on cross-origin requests
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features we don't need
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  // Force HTTPS in production
  ...(isDev ? [] : [
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  ]),
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js needs unsafe-eval in dev; strip in prod
      isDev ? "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://app.posthog.com"
             : "script-src 'self' 'unsafe-inline' https://js.stripe.com https://app.posthog.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "connect-src 'self' https://api.stripe.com https://app.posthog.com wss:",
      // Allow YouTube, Vimeo, and Stripe iframes
      "frame-src https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://youtube.com https://player.vimeo.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      // Security headers on every page
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Static asset cache headers — production only (dev mode ignores these anyway,
      // but Next.js 16 warns if they're present even unused)
      ...(!isDev ? [
        {
          source: '/_next/static/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
        {
          source: '/images/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
        },
        {
          source: '/bg/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
        },
      ] : []),
    ]
  },
}

export default withPayload(nextConfig)
