'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/marketing/Navigation';
import { Footer } from '@/components/marketing/Footer';
import { CustomScrollBar } from '@/components/ui/ScrollBar';
import { RainEffect } from '@/components/background/RainEffect';
import { CursorTrail } from '@/components/ui/CursorTrail';

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

export function SiteWrapper({ children, user, services, solutions = [], resources = [], logoUrl, siteName, socialLinks, contactInfo, llmLinks = [], llmSectionHeading }: SiteWrapperProps) {
    const pathname = usePathname();

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
