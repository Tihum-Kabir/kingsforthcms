'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { TsParticleNetwork } from './TsParticleNetwork';

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

            {/* Day Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${dayImageUrl || '/images/hero/hero-day-cinematic.png'})`,
                    opacity: isNight ? 0 : 1,
                    transition: 'opacity 1s ease-in-out',
                }}
            />

            {/* Night Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${nightImageUrl || '/images/hero/hero-night-cinematic.png'})`,
                    opacity: isNight ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                }}
            />

            {/* CSS animated ambient glow orbs — zero JS cost */}
            <div className="glow-orb glow-orb-1" />
            <div className="glow-orb glow-orb-2" />
            <div className="glow-orb glow-orb-3" />
            <div className="glow-orb glow-orb-4" />

            {/* Rain + interactive cursor glow (capped at 80 drops) */}
            <TsParticleNetwork />

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent dark:from-black/60 dark:via-[#02040a]/30 dark:to-transparent pointer-events-none" />
        </div>
    );
}
