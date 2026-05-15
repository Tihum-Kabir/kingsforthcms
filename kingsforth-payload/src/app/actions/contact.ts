'use server';

import { getPayload } from 'payload';
import configPromise from '@payload-config';

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function sendContactEmail(prevState: any, formData: FormData) {
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

        // Also send notification email via Resend
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
                },
                body: JSON.stringify({
                    from: 'Kingsforth Contact <onboarding@resend.dev>',
                    to: 'admin@kingsforth.net',
                    subject: `New Contact Form Submission from ${name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2>New Contact Form Submission</h2>
                            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                            <p><strong>Company:</strong> ${escapeHtml(company || 'N/A')}</p>
                            <p><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
                            <p><strong>Message:</strong></p>
                            <p style="background: #f3f4f6; padding: 16px; border-radius: 8px;">${escapeHtml(message)}</p>
                        </div>
                    `
                })
            });
        } catch (emailErr) {
            console.error('Failed to send contact notification email:', emailErr);
        }

        console.log(`\n📬 NEW CONTACT FORM SUBMISSION from ${name} (${email})\n`);

        return { success: true, message: 'Thank you! Your message has been sent successfully. We will get back to you shortly.' };
    } catch (err: any) {
        console.error('Contact form error:', err);
        return { success: false, message: 'Failed to send message. Please try again.' };
    }
}
