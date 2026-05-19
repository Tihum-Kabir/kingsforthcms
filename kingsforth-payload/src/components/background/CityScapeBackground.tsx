'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface CityScapeBackgroundProps {
    dayImageUrl?: string | null;
    nightImageUrl?: string | null;
}

export function CityScapeBackground({ dayImageUrl, nightImageUrl }: CityScapeBackgroundProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isNight = !mounted || resolvedTheme === 'dark';

    return (
        <div className="fixed inset-0 z-[-50] overflow-hidden pointer-events-none bg-black">
            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 z-50 pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                    mixBlendMode: 'overlay',
                }}
            />
            {/* Scanline overlay */}
            <div
                className="absolute inset-0 z-50 pointer-events-none opacity-[0.08]"
                style={{
                    backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.25) 50%)',
                    backgroundSize: '100% 4px',
                }}
            />

            {/* Night — visible by default (dark is default theme), eager + high priority */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={nightImageUrl || '/images/hero/hero-night-cinematic.png'}
                alt=""
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ opacity: isNight ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
            />

            {/* Day — hidden initially, lazy-load until user switches to light mode */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={dayImageUrl || '/images/hero/hero-day-cinematic.png'}
                alt=""
                fetchPriority="low"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ opacity: isNight ? 0 : 1, transition: 'opacity 1s ease-in-out' }}
            />

            {/* CSS animated ambient glow orbs — zero JS cost */}
            <div className="glow-orb glow-orb-1" />
            <div className="glow-orb glow-orb-2" />
            <div className="glow-orb glow-orb-3" />
            <div className="glow-orb glow-orb-4" />


            {/* Night-mode top vignette — darkens misty clouds so nav/logo text is legible */}
            <div className="absolute inset-x-0 top-0 h-[38%] hidden dark:block bg-linear-to-b from-[#010609]/80 via-[#010609]/20 to-transparent pointer-events-none" />
        </div>
    );
}
