'use server';

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { headers } from 'next/headers';
import { isRateLimited, getRateLimitKey } from '@/lib/rateLimiter';
import { sendEmail, contactNotificationEmail } from '@/lib/email';

export async function sendContactEmail(prevState: any, formData: FormData) {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(getRateLimitKey('contact', ip), 5, 60_000)) {
        return { success: false, message: 'Too many requests. Please wait a minute before trying again.' };
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, message: 'Please fill in all required fields.' };
    }

    try {
        // Store as a Lead in the database
        const payload = await getPayload({ config: configPromise });
        await payload.create({
            collection: 'leads',
            data: {
                name,
                email,
                company: company || undefined,
                phone: phone || undefined,
                message,
                source: 'contact_form',
            } as any,
        });

        // Notify admin of new contact submission
        const adminEmail = process.env.ADMIN_EMAIL || process.env.RESEND_FROM_EMAIL;
        console.log(`\n📬 NEW CONTACT SUBMISSION: ${name} (${email})\n`);
        if (adminEmail) {
            await sendEmail({
                to: adminEmail,
                subject: `New Contact Enquiry from ${name}`,
                html: contactNotificationEmail(name, email, company, phone, message),
                replyTo: email,
            });
        }

        return { success: true, message: 'Thank you! Your message has been sent successfully. We will get back to you shortly.' };
    } catch (err: any) {
        console.error('Contact form error:', err);
        return { success: false, message: 'Failed to send message. Please try again.' };
    }
}
