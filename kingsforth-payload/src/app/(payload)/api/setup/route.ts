import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { isRateLimited } from '@/lib/rateLimiter'

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(`setup:${ip}`, 5, 60_000)) {
        return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
    }

    const payload = await getPayload({ config })

    // Guard: refuse if any user already exists
    const { totalDocs } = await payload.find({ collection: 'users', limit: 1 })
    if (totalDocs > 0) {
        return NextResponse.json(
            { error: 'Setup already complete. Use /admin to manage users.' },
            { status: 403 }
        )
    }

    let body: { name?: string; email?: string; password?: string }
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { name, email, password } = body
    if (!name || !email || !password) {
        return NextResponse.json({ error: 'name, email and password are required' }, { status: 400 })
    }

    try {
        const user = await payload.create({
            collection: 'users',
            data: { name, email, password, role: 'SUPER_ADMIN' },
            overrideAccess: true,
        })
        return NextResponse.json({ success: true, userId: user.id, role: 'SUPER_ADMIN' })
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Failed to create user' }, { status: 500 })
    }
}
