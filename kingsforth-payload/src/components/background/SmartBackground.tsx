'use client';

import { usePathname } from 'next/navigation';
import { CityScapeBackground } from './CityScapeBackground';
import { InnerPageBackground } from './InnerPageBackground';

interface SmartBackgroundProps {
    dayImageUrl?: string | null;
    nightImageUrl?: string | null;
}

export function SmartBackground({ dayImageUrl, nightImageUrl }: SmartBackgroundProps) {
    const pathname = usePathname();
    const isLandingPage = pathname === '/';

    if (isLandingPage) {
        return (
            <CityScapeBackground
                dayImageUrl={dayImageUrl}
                nightImageUrl={nightImageUrl}
            />
        );
    }

    return <InnerPageBackground />;
}
