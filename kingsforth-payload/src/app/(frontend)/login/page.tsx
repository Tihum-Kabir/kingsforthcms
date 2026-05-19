import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
    let siteSettings: any = null;
    try {
        const payload = await getPayload({ config: configPromise });
        siteSettings = await payload.findGlobal({ slug: 'site-settings' });
    } catch {}

    const branding = {
        logoUrl: typeof siteSettings?.siteLogo === 'object' ? siteSettings?.siteLogo?.url : siteSettings?.siteLogo,
        siteName: siteSettings?.siteName
    };

    return <LoginForm branding={branding} />;
}
