'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/marketing/Navigation';
import { Footer } from '@/components/marketing/Footer';
import { CustomScrollBar } from '@/components/ui/ScrollBar';

// Decorative canvas effects — lazy-loaded after main content paints.
// Separate JS chunks: neither blocks initial render nor LCP.
const RainEffect = dynamic(
    () => import('@/components/background/RainEffect').then(m => ({ default: m.RainEffect })),
    { ssr: false }
);
const CursorTrail = dynamic(
    () => import('@/components/ui/CursorTrail').then(m => ({ default: m.CursorTrail })),
    { ssr: false }
);

interface SiteWrapperProps {
    children: React.ReactNode;
    user: any;
    services: any[];
    solutions?: any[];
    resources?: any[];
    logoUrl?: string | null;
    siteName?: string | null;
    socialLinks?: any;
    contactInfo?: any;
    llmLinks?: any[];
    llmSectionHeading?: string;
}

export function SiteWrapper({ children, user: serverUser, services, solutions = [], resources = [], logoUrl, siteName, socialLinks, contactInfo, llmLinks = [], llmSectionHeading }: SiteWrapperProps) {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(serverUser ?? null);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(r => r.json())
            .then(u => { if (u) setUser(u); })
            .catch(() => {});
    }, []);

    // valid routes for marketing layout
    const isAppPanel = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard');
    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');

    const showLayout = !isAppPanel && !isAuthPage;

    // Determine if Super Admin for Footer
    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    return (
        <>
            <CustomScrollBar />
            <RainEffect />
            <CursorTrail />
            {showLayout && <Navigation user={user} services={services} solutions={solutions} resources={resources} logoUrl={logoUrl} siteName={siteName} llmLinks={llmLinks} llmSectionHeading={llmSectionHeading} />}
            {children}
            {showLayout && <Footer showAdminPortal={isSuperAdmin} logoUrl={logoUrl} siteName={siteName} socialLinks={socialLinks} contactInfo={contactInfo} />}
        </>
    );
}
