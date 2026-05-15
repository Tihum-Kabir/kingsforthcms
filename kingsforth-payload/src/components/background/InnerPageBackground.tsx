'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function InnerPageBackground() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = !mounted || resolvedTheme === 'dark';

    return (
        <div
            className="fixed inset-0 z-[-50] pointer-events-none transition-colors duration-700"
            style={{ background: isDark ? '#020b1a' : '#fafafa' }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? 'radial-gradient(ellipse 70% 50% at 15% 40%, rgba(99,102,241,0.07) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 85% 15%, rgba(6,182,212,0.05) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse 70% 50% at 15% 40%, rgba(99,102,241,0.04) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 85% 15%, rgba(6,182,212,0.03) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}
