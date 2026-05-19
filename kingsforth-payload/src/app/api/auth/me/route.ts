import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('payload-token')?.value;
        if (!token) return NextResponse.json(null);

        const parts = token.split('.');
        if (parts.length < 2) return NextResponse.json(null);
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
        const now = Math.floor(Date.now() / 1000);
        if (!decoded.id || decoded.collection !== 'users' || (decoded.exp && decoded.exp <= now)) {
            return NextResponse.json(null);
        }

        const payload = await getPayload({ config: configPromise });
        const user = await payload.findByID({ collection: 'users', id: decoded.id }).catch(() => null);
        return NextResponse.json(user);
    } catch {
        return NextResponse.json(null);
    }
}
