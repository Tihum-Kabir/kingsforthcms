'use server';

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { cookies, headers } from 'next/headers';
import { isRateLimited } from '@/lib/rateLimiter';

async function getIP(): Promise<string> {
    const h = await headers();
    return (
        h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        h.get('x-real-ip') ||
        'unknown'
    );
}

function sanitize(value: string): string {
    return value.trim().slice(0, 512);
}

export async function loginAction(email: string, password: string) {
    const ip = await getIP();
    if (isRateLimited(`login:${ip}`, 10, 60_000)) {
        return { error: 'Too many login attempts. Please wait a minute and try again.' };
    }

    const sanitizedEmail = sanitize(email);
    const payload = await getPayload({ config: configPromise });

    try {
        const result = await payload.login({
            collection: 'users',
            data: { email: sanitizedEmail, password },
        });

        if (!result.token) {
            return { error: 'Invalid credentials. Please try again.' };
        }

        // Set the cookie server-side so Next.js SSR can read it immediately
        const cookieStore = await cookies();
        cookieStore.set('payload-token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return { success: true, user: { name: result.user?.name, email: result.user?.email, role: (result.user as any)?.role } };
    } catch (err: any) {
        return { error: err.message || 'Login failed' };
    }
}

export async function signupAction(name: string, email: string, password: string, phone?: string, address?: string, company?: number) {
    const ip = await getIP();
    if (isRateLimited(`signup:${ip}`, 5, 300_000)) {
        return { error: 'Too many signup attempts. Please wait before trying again.' };
    }

    const sanitizedEmail = sanitize(email);
    const sanitizedName = sanitize(name);
    const payload = await getPayload({ config: configPromise });

    try {
        await payload.create({
            collection: 'users',
            data: { name: sanitizedName, email: sanitizedEmail, password, role: 'STAFF', phone, address, company },
        });

        // Send Welcome/Confirmation Email via Resend
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
                },
                body: JSON.stringify({
                    from: 'Kingsforth Security <onboarding@resend.dev>',
                    to: sanitizedEmail,
                    subject: 'Welcome to Kingsforth Security',
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                            <h2>Welcome to Kingsforth, ${sanitizedName}!</h2>
                            <p>Thank you for signing up. Your account has been successfully created.</p>
                            <p style="color: #666; font-size: 14px; margin-top: 20px;">Access your central dashboard at any time to monitor your security operations.</p>
                        </div>
                    `
                })
            });
        } catch (emailErr) {
            console.error('Failed to send Resend welcome email:', emailErr);
        }

        return await loginAction(sanitizedEmail, password);
    } catch (err: any) {
        const msg = err.message || 'Failed to create account';
        if (msg.includes('duplicate') || msg.includes('unique')) {
            return { error: 'An account with this email already exists.' };
        }
        return { error: msg };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('payload-token');
    return { success: true };
}

export async function sendVerificationCode(email: string) {
    const ip = await getIP();
    if (isRateLimited(`reset:${ip}`, 5, 60_000)) {
        return { error: 'Too many requests. Please wait a minute and try again.' };
    }

    const sanitizedEmail = sanitize(email);
    const payload = await getPayload({ config: configPromise });
    try {
        const { docs } = await payload.find({
            collection: 'users',
            where: { email: { equals: sanitizedEmail } },
        });

        if (docs.length === 0) {
            return { success: true };
        }

        const user = docs[0];

        // Generate 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        // Set expiration 15 mins from now
        const expiration = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                resetCode: code,
                resetCodeExpiration: expiration
            }
        });

        // Send via Resend (production) or log to console (dev / no API key)
        const resendKey = process.env.RESEND_API_KEY;
        const hasRealKey = resendKey && !resendKey.startsWith('your_') && resendKey !== 're_...';

        if (hasRealKey) {
            try {
                await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
                    body: JSON.stringify({
                        from: 'Kingsforth Security <onboarding@resend.dev>',
                        to: sanitizedEmail,
                        subject: 'Your Password Reset Code',
                        html: `<div style="font-family:Arial,sans-serif;padding:20px;text-align:center"><h2>Password Reset</h2><p>Your 6-digit code:</p><div style="font-size:32px;font-weight:bold;letter-spacing:5px;padding:20px;background:#f3f4f6;display:inline-block;border-radius:8px">${code}</div><p style="color:#666;font-size:12px;margin-top:20px">Expires in 15 minutes.</p></div>`,
                    }),
                });
            } catch (emailErr) {
                console.error('[email] Resend failed:', emailErr);
            }
        } else {
            // Dev fallback — print code to server terminal
            console.log('\n╔══════════════════════════════════════╗');
            console.log('║  PASSWORD RESET CODE (dev mode)      ║');
            console.log(`║  Email : ${sanitizedEmail.padEnd(28)}║`);
            console.log(`║  Code  : ${code.padEnd(28)}║`);
            console.log('╚══════════════════════════════════════╝\n');
        }

        return { success: true };
    } catch (err: any) {
        return { error: 'Failed to process request.' };
    }
}

export async function resetPasswordWithCode(email: string, code: string, newPassword: string) {
    const payload = await getPayload({ config: configPromise });
    try {
        const { docs } = await payload.find({
            collection: 'users',
            where: { email: { equals: email } },
        });

        if (docs.length === 0) return { error: 'Invalid operation.' };

        const user = docs[0];

        if (!user.resetCode || !user.resetCodeExpiration) {
            return { error: 'No reset request found.' };
        }

        if (user.resetCode !== code) {
            return { error: 'Invalid verification code.' };
        }

        const now = new Date();
        const expirationDate = new Date(String(user.resetCodeExpiration));
        
        if (now > expirationDate) {
            return { error: 'Verification code has expired. Please request a new one.' };
        }

        // Apply new password and clear codes
        await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                password: newPassword,
                resetCode: null,
                resetCodeExpiration: null
            }
        });

        return { success: true };
    } catch (err: any) {
        return { error: 'Failed to reset password.' };
    }
}

export async function updateUserProfile(id: number | string, data: { name?: string, phone?: string, address?: string, company?: number }) {
    const payload = await getPayload({ config: configPromise });
    try {
        await payload.update({
            collection: 'users',
            id: id,
            data
        });
        return { success: true };
    } catch (err: any) {
        return { error: 'Failed to update profile.' };
    }
}
