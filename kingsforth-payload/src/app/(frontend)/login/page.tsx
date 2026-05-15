import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
    const payload = await getPayload({ config: configPromise });
    
    let siteSettings: any = null;
    try {
        siteSettings = await payload.findGlobal({ slug: 'site-settings' });
    } catch (err) {
        console.warn("Failed to fetch site settings for login branding:", err);
    }

    const branding = {
        logoUrl: typeof siteSettings?.siteLogo === 'object' ? siteSettings?.siteLogo?.url : siteSettings?.siteLogo,
        siteName: siteSettings?.siteName
    };

    return <LoginForm branding={branding} />;
}
