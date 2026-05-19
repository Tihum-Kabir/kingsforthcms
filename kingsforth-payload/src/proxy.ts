import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter (resets on cold start — sufficient for single-server Docker)
const hits = new Map<string, { count: number; reset: number }>()

function rateLimit(ip: string, maxReqs: number, windowMs: number): boolean {
    const now = Date.now()
    const entry = hits.get(ip)

    if (!entry || now > entry.reset) {
        hits.set(ip, { count: 1, reset: now + windowMs })
        return true
    }

    entry.count++
    if (entry.count > maxReqs) return false
    return true
}

// Routes and their limits [maxRequests, windowMs]
const RATE_LIMITS: Record<string, [number, number]> = {
    '/api/users/login':  [10,  60_000],  // 10 login attempts / min
    '/api/users/logout': [20,  60_000],
    '/api/contact':      [5,   60_000],  // 5 contact form submits / min
    '/api/leads':        [5,   60_000],
    '/api/':             [120, 60_000],  // general API: 120 req/min
}

// Paths commonly probed by bots/scanners
const BLOCKED_PATHS = [
    '/wp-admin', '/wp-login.php', '/xmlrpc.php',
    '/.env', '/.git', '/.svn', '/.htaccess', '/.htpasswd',
    '/config.php', '/wp-config.php', '/phpmyadmin',
    '/admin.php', '/shell.php', '/cmd.php', '/eval.php',
    '/vendor/phpunit', '/telescope', '/horizon',
]

// User-agent substrings that indicate scanners/exploit tools
const BLOCKED_UA_PATTERNS = [
    'sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab',
    'python-requests/2.1', 'go-http-client/1.1',
    'libwww-perl',
]

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const ua = request.headers.get('user-agent')?.toLowerCase() ?? ''
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
              ?? request.headers.get('x-real-ip')
              ?? 'unknown'

    // Block known exploit/scanner paths
    if (BLOCKED_PATHS.some((p) => pathname.startsWith(p))) {
        return new NextResponse(null, { status: 404 })
    }

    // Block scanner user-agents
    if (BLOCKED_UA_PATTERNS.some((p) => ua.includes(p))) {
        return new NextResponse(null, { status: 403 })
    }

    // Apply route-specific rate limits
    const rule = Object.entries(RATE_LIMITS).find(([path]) => pathname.startsWith(path))
    if (rule) {
        const [, [maxReqs, windowMs]] = rule
        const allowed = rateLimit(`${ip}:${rule[0]}`, maxReqs, windowMs)
        if (!allowed) {
            return new NextResponse(
                JSON.stringify({ error: 'Too many requests. Please slow down.' }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '60',
                        'X-RateLimit-Limit': String(maxReqs),
                    },
                }
            )
        }
    }

    const response = NextResponse.next()
    response.headers.delete('X-Powered-By')
    response.headers.delete('Server')
    return response
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
