/**
 * Shared Resend email sender.
 *
 * SETUP REQUIRED for emails to reach any inbox:
 *  1. Go to resend.com → Domains → Add Domain → add kingsforth.net
 *  2. Add the DNS records shown (TXT + MX) in your DNS provider
 *  3. Click Verify — takes <5 minutes
 *  4. Set RESEND_FROM_EMAIL=noreply@kingsforth.net in .env
 *
 * Until then: only delivers to the Resend account owner's email.
 */

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions): Promise<{ ok: boolean; error?: string }> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 're_...' || apiKey.startsWith('your_')) {
        console.warn('[email] RESEND_API_KEY not configured — skipping send');
        return { ok: false, error: 'Email not configured' };
    }

    const from = process.env.RESEND_FROM_EMAIL
        ? `Kingsforth <${process.env.RESEND_FROM_EMAIL}>`
        : 'Kingsforth <onboarding@resend.dev>';

    const body: Record<string, any> = { from, to, subject, html };
    if (replyTo) body.reply_to = replyTo;

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            const msg = (err as any).message ?? res.statusText;
            console.error(`[email] Resend ${res.status}: ${msg}`);
            if (res.status === 403) {
                console.error(
                    '[email] FIX: verify kingsforth.net on resend.com/domains, ' +
                    'then set RESEND_FROM_EMAIL=noreply@kingsforth.net in .env'
                );
            }
            return { ok: false, error: msg };
        }

        return { ok: true };
    } catch (err: any) {
        console.error('[email] Network error:', err?.message ?? err);
        return { ok: false, error: 'Network error' };
    }
}

function esc(s: string) {
    return s
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ── Branded email templates ── */

export function resetCodeEmail(name: string, code: string) {
    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d1425;border:1px solid #1e3a5f;border-radius:16px;overflow:hidden;max-width:560px">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0ea5e9,#7c3aed);padding:32px 40px;text-align:center">
          <p style="margin:0;font-size:22px;font-weight:800;color:#fff;letter-spacing:0.05em">KINGSFORTH</p>
          <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:0.15em;text-transform:uppercase">Security Operations</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px">
          <p style="margin:0 0 8px;font-size:14px;color:#94a3b8">Hello ${esc(name)},</p>
          <h2 style="margin:0 0 24px;font-size:22px;color:#f1f5f9;font-weight:700">Password Reset Request</h2>
          <p style="margin:0 0 28px;font-size:14px;color:#94a3b8;line-height:1.6">Use the verification code below to reset your password. It expires in <strong style="color:#e2e8f0">15 minutes</strong>.</p>

          <!-- Code box -->
          <div style="text-align:center;margin:0 0 32px">
            <div style="display:inline-block;background:#111827;border:2px solid #0ea5e9;border-radius:12px;padding:20px 40px">
              <p style="margin:0 0 4px;font-size:11px;color:#64748b;letter-spacing:0.15em;text-transform:uppercase">Verification Code</p>
              <p style="margin:0;font-size:40px;font-weight:800;color:#0ea5e9;letter-spacing:12px;font-family:monospace">${code}</p>
            </div>
          </div>

          <p style="margin:0;font-size:12px;color:#475569;line-height:1.6">If you did not request this, ignore this email. Your password will remain unchanged.</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px;border-top:1px solid #1e3a5f;text-align:center">
          <p style="margin:0;font-size:11px;color:#334155">© ${new Date().getFullYear()} Kingsforth Technologies · Gulshan 1, Dhaka</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function welcomeEmail(name: string) {
    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d1425;border:1px solid #1e3a5f;border-radius:16px;overflow:hidden;max-width:560px">
        <tr><td style="background:linear-gradient(135deg,#0ea5e9,#7c3aed);padding:32px 40px;text-align:center">
          <p style="margin:0;font-size:22px;font-weight:800;color:#fff;letter-spacing:0.05em">KINGSFORTH</p>
        </td></tr>
        <tr><td style="padding:40px">
          <h2 style="margin:0 0 16px;font-size:22px;color:#f1f5f9">Welcome, ${esc(name)}!</h2>
          <p style="margin:0 0 20px;font-size:14px;color:#94a3b8;line-height:1.6">Your Kingsforth account is active. You now have access to your security operations dashboard.</p>
          <p style="margin:0;font-size:12px;color:#475569">The Kingsforth Team</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function contactNotificationEmail(
    name: string, email: string, company: string, phone: string, message: string
) {
    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;max-width:560px">
        <tr><td style="background:#0ea5e9;padding:24px 32px">
          <p style="margin:0;font-size:18px;font-weight:700;color:#fff">📬 New Contact Enquiry</p>
        </td></tr>
        <tr><td style="padding:32px">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[['Name', name], ['Email', email], ['Company', company || '—'], ['Phone', phone || '—']].map(([k, v]) => `
            <tr>
              <td style="padding:8px 0;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;width:90px">${k}</td>
              <td style="padding:8px 0;font-size:14px;color:#1e293b">${esc(String(v))}</td>
            </tr>`).join('')}
            <tr><td colspan="2" style="padding-top:16px;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Message</td></tr>
            <tr><td colspan="2" style="padding:12px;background:#f1f5f9;border-radius:8px;font-size:14px;color:#334155;line-height:1.6">${esc(message)}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
