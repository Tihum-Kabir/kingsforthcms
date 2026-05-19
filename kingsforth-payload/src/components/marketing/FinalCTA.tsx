'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';

export function FinalCTA({ settings }: { settings?: any }) {
    const title             = settings?.title             || 'Ready to Secure\nYour Future?';
    const subtitle          = settings?.subtitle          || 'Join hundreds of organizations already protecting their assets with autonomous intelligence.';
    const subtitleSize      = settings?.subtitleSize      || 17;
    const primaryButtonText = settings?.primaryButtonText || 'Book a Demo';
    const primaryButtonLink = settings?.primaryButtonLink || '/contact';
    const secondaryButtonText = settings?.secondaryButtonText || 'View Pricing';
    const secondaryButtonLink = settings?.secondaryButtonLink || '/pricing';

    return (
        <section className="relative py-28 sm:py-36 overflow-hidden bg-[#05080f] transition-colors duration-500">
            {/* Subtle radial glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-150 h-100 rounded-full cta-glow" />
            </div>

            {/* Top edge gradient blend */}
            <div className="pointer-events-none absolute top-0 inset-x-0 h-24 bg-linear-to-b from-white dark:from-transparent to-transparent" />

            <motion.div
                className="relative z-10 max-w-3xl mx-auto px-6 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 border border-white/10 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#9ca3af]">Get started today</span>
                </div>

                {/* Headline */}
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-white mb-6 whitespace-pre-line">
                    {title}
                </h2>

                {/* Subtitle */}
                {typeof subtitle === 'object' ? (
                    <div
                        className="prose prose-p:text-[#8898b0] max-w-xl mx-auto mb-12 prose-p:leading-relaxed prose-p:m-0 text-center cta-subtitle"
                        data-size={subtitleSize}
                    >
                        <RichText data={subtitle} />
                    </div>
                ) : (
                    <p
                        className="text-[#8898b0] max-w-xl mx-auto mb-12 leading-relaxed cta-subtitle"
                        data-size={subtitleSize}
                    >
                        {subtitle}
                    </p>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-14">
                    <Link
                        href={primaryButtonLink}
                        className="group inline-flex items-center gap-2 h-13 px-8 bg-white hover:bg-[#f0f4ff] text-[#0f172a] text-sm font-bold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    >
                        {primaryButtonText}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                        href={secondaryButtonLink}
                        className="inline-flex items-center gap-2 h-13 px-8 bg-transparent border border-white/15 hover:border-white/30 text-white text-sm font-semibold rounded-full transition-all duration-200"
                    >
                        {secondaryButtonText}
                    </Link>
                </div>

                {/* Trust bar */}
                <div className="flex flex-wrap justify-center items-center gap-8 text-[15px] text-slate-400">
                    {['No credit card required', 'Free consultation', '24/7 support'].map(text => (
                        <span key={text} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#22d3ee]" />
                            {text}
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
