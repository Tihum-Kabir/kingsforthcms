import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const payload = await getPayload({ config: configPromise });
        const email = 'fktihum03@gmail.com';
        const password = 'kingsforthAdmin123!';

        const { docs } = await payload.find({
            collection: 'users',
            where: { email: { equals: email } }
        });

        if (docs.length > 0) {
            await payload.update({
                collection: 'users',
                id: docs[0].id,
                data: {
                    password,
                    role: 'SUPER_ADMIN'
                }
            });
            return NextResponse.json({ success: true, message: 'Updated existing user to SUPER_ADMIN', email, password });
        } else {
            await payload.create({
                collection: 'users',
                data: {
                    name: 'Admin FK',
                    email,
                    password,
                    role: 'SUPER_ADMIN'
                }
            });
            return NextResponse.json({ success: true, message: 'Created new SUPER_ADMIN user', email, password });
        }
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
