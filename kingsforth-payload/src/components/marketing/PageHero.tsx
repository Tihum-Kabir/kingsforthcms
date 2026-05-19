'use client';

import { useState, useEffect } from 'react';

interface PageHeroProps {
    dayImage?: string | null;
    nightImage?: string | null;
    headline: string;
    subtitle?: string;
    badge?: string;
    noCard?: boolean;
}

export function PageHero({ dayImage, nightImage, headline, subtitle, badge, noCard }: PageHeroProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkDark();
        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const heroImage = isDark ? nightImage : dayImage;

    return (
        <div className={`hero-section ${!heroImage ? 'pt-32 pb-8' : ''}`}>
            {heroImage ? (
                <div className="hero-image-container hero-image-container-page">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroImage} alt={headline} fetchPriority="high" />
                    <div className="hero-image-fade" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-transparent pointer-events-none" />
            )}

            <div className={`hero-content pb-8 ${!heroImage ? '!relative !bottom-auto pt-10' : ''}`}>
                <div className={`max-w-300 mx-auto px-6 sm:px-8 ${noCard ? 'text-center' : ''}`}>
                    {noCard ? (
                        <div className="max-w-4xl mx-auto">
                            {badge && (
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22d3ee]/30 dark:border-[#22d3ee]/30 bg-[#22d3ee]/5 mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
                                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#22d3ee]">{badge}</span>
                                </div>
                            )}
                            <h1 className="text-[2.5rem] sm:text-[4rem] lg:text-[5rem] font-black tracking-[-0.03em] leading-[1.05] text-[#111827] dark:text-white">
                                {headline}
                            </h1>
                            {subtitle && (
                                <p className="mt-5 text-base sm:text-lg text-[#4b5563] dark:text-[#9ca3af] font-normal leading-relaxed max-w-2xl mx-auto">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="max-w-3xl bg-white/60 dark:bg-white/4 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-8 py-8">
                            {badge && (
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/6 border border-[#e5e7eb] dark:border-white/8 mb-5">
                                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#2563eb] dark:text-[#22d3ee]">{badge}</span>
                                </div>
                            )}
                            <h1 className="text-[2rem] sm:text-[3rem] lg:text-[3.5rem] font-black tracking-[-0.03em] leading-[1.1] text-[#111827] dark:text-white">
                                {headline}
                            </h1>
                            {subtitle && (
                                <p className="mt-4 text-base sm:text-lg text-[#4b5563] dark:text-[#d1d5db] font-normal leading-relaxed max-w-2xl">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
