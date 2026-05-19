import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { NextRequest, NextResponse } from 'next/server';
import { isRateLimited } from '@/lib/rateLimiter';

export async function GET(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(`make-admin:${ip}`, 3, 60_000)) {
        return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }

    // Gate behind SETUP_SECRET env var — must match ?secret= query param
    const secret = req.nextUrl.searchParams.get('secret');
    const setupSecret = process.env.SETUP_SECRET;

    if (!setupSecret || secret !== setupSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const payload = await getPayload({ config: configPromise });
        const email = process.env.ADMIN_EMAIL ?? 'fktihum03@gmail.com';
        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            return NextResponse.json({ error: 'ADMIN_PASSWORD env var not set' }, { status: 500 });
        }

        const { docs } = await payload.find({
            collection: 'users',
            where: { email: { equals: email } }
        });

        if (docs.length > 0) {
            await payload.update({
                collection: 'users',
                id: docs[0].id,
                data: { password, role: 'SUPER_ADMIN' }
            });
            return NextResponse.json({ success: true, message: 'Updated existing user to SUPER_ADMIN', email });
        } else {
            await payload.create({
                collection: 'users',
                data: { name: 'Admin', email, password, role: 'SUPER_ADMIN' }
            });
            return NextResponse.json({ success: true, message: 'Created new SUPER_ADMIN user', email });
        }
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
