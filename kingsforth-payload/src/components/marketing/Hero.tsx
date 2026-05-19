'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Eye, Database } from 'lucide-react';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';

// Partner Data
const PARTNERS = [
    { name: 'Robi', img: '/images/logos/Robi.png' },
    { name: 'ACI', img: '/images/logos/ACI.png' },
    { name: 'Banglalink', img: '/images/logos/Banglalink.png' },
    { name: 'NSU', img: '/images/logos/NSU.png' },
    { name: 'Robi', img: '/images/logos/Robi.png' },
    { name: 'ACI', img: '/images/logos/ACI.png' },
    { name: 'Banglalink', img: '/images/logos/Banglalink.png' },
    { name: 'NSU', img: '/images/logos/NSU.png' },
];

function InfiniteLogoScrollInline({ partnerLogos, settings }: { partnerLogos?: any[], settings?: { headline?: string } }) {
    const logos = partnerLogos?.length ? partnerLogos : PARTNERS;
    const headlineText = settings?.headline ?? '';

    return (
        <div className="w-full relative flex flex-col items-center gap-4 mb-4 mt-10 sm:mt-12 group/scroll pointer-events-none">
            {/* Context Label with modern glassmorphism pill */}
            <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-gray-400 dark:to-gray-600" />
                <div className="px-4 py-2 mt-[-8px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white/30 dark:bg-[#030915]/30 backdrop-blur-md px-6 py-2.5 rounded-full border border-gray-200/50 dark:border-white/10 shadow-sm"
                    >
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-[0.25em] uppercase whitespace-nowrap">
                            {headlineText}
                        </p>
                    </motion.div>
                </div>
                <div className="h-px w-12 bg-linear-to-l from-transparent to-gray-400 dark:to-gray-600" />
            </div>

            <div className="relative w-full max-w-[1200px] mx-auto mt-4 px-4 sm:px-8 group/gallery cursor-pointer">
                {/* Vibrant ambient glow behind the logos */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-linear-to-r from-blue-600/0 via-cyan-400/20 to-violet-600/0 blur-3xl pointer-events-none opacity-60 group-hover/gallery:opacity-100 transition-opacity duration-700 mix-blend-screen" />
                {/* Secondary accent glow */}
                <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 h-16 bg-linear-to-r from-transparent via-fuchsia-500/10 to-transparent blur-2xl pointer-events-none mix-blend-screen" />

                <div className="infinite-gallery-row relative">
                    <div className="loop-slider loop-slider-40s transition-transform duration-700 ease-out">
                        <div className="inner group-hover/gallery:[animation-play-state:paused] flex items-center">
                            {logos.map((partner, idx) => (
                                <div className="partner-box flex items-center justify-center h-[72px] sm:h-[84px] px-8 bg-white dark:bg-[#0f172a] rounded-xl sm:rounded-2xl mx-3 hover:scale-105 transition-transform duration-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-800" key={`p1-${idx}`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={partner.logo?.url || partner.img} alt={partner.name} className="max-h-10 sm:max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                            {logos.map((partner, idx) => (
                                <div className="partner-box flex items-center justify-center h-[72px] sm:h-[84px] px-8 bg-white dark:bg-[#0f172a] rounded-xl sm:rounded-2xl mx-3 hover:scale-105 transition-transform duration-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-800" key={`p2-${idx}`} aria-hidden="true">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={partner.logo?.url || partner.img} alt="" className="max-h-10 sm:max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Vertical Connection Line */}
            <div className="w-px h-8 sm:h-10 bg-linear-to-b from-gray-500/50 via-gray-500/20 to-transparent mt-2 opacity-70 relative">
                <div className="absolute top-0 left-[-2px] w-[5px] h-[5px] bg-[#38bdf8] rounded-full shadow-[0_0_10px_#38bdf8] animate-pulse" />
            </div>
        </div>
    );
}


const HeroDashboardUI = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-[760px] mx-auto mt-12 lg:mt-0 group/db cursor-default z-20"
        >
            {/* Outer Cybernetic Glow */}
            <div className="absolute -inset-1 bg-linear-to-b from-cyan-500/20 to-blue-600/0 rounded-xl blur-xl opacity-0 group-hover/db:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            {/* Background design elements (the subtle brackets in the reference) */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl shadow-[-8px_-8px_20px_rgba(34,211,238,0.1)] pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-blue-500/30 rounded-br-3xl shadow-[8px_8px_20px_rgba(59,130,246,0.1)] pointer-events-none" />

            <div
                className="hero-dashboard-grid w-full aspect-16/10 sm:aspect-video bg-white dark:bg-[#030712] border border-gray-200 dark:border-[#1e293b] rounded-xl overflow-hidden font-mono flex flex-col shadow-2xl relative z-10 ring-1 ring-black/5 dark:ring-white/5"
            >
                {/* Top Bar (Mac Style) */}
                <div className="h-10 border-b border-gray-200 dark:border-[#1e293b] flex items-center px-4 justify-between bg-gray-50/80 dark:bg-[#030712]/80 backdrop-blur-md">
                    <div className="flex gap-2.5">
                        <div className="w-[11px] h-[11px] rounded-full bg-rose-500/80 shadow-[0_0_8px_#f43f5e]" />
                        <div className="w-[11px] h-[11px] rounded-full bg-amber-500/80 shadow-[0_0_8px_#f59e0b]" />
                        <div className="w-[11px] h-[11px] rounded-full bg-emerald-500/80 shadow-[0_0_8px_#10b981]" />
                    </div>
                    <div className="flex gap-5 text-[10px] text-cyan-600/70 dark:text-cyan-500/50 font-bold dark:font-medium tracking-widest hidden sm:flex">
                        <span>CPU: 12%</span>
                        <span>MEM: 4.2GB</span>
                        <span>NET: 1.2TB/s</span>
                    </div>
                </div>

                {/* Main Inside Area */}
                <div className="flex-1 flex flex-col p-5 sm:p-6 gap-5 sm:gap-6 relative z-10">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />
                    {/* Upper Half: Two columns */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 relative z-10">

                        {/* Left: Optical Feed Grid */}
                        <div className="border border-gray-200 dark:border-[#1e293b] rounded-lg bg-gray-50/98 dark:bg-[#0a0f1c]/85 p-4 flex flex-col gap-3 shadow-[inset_0_0_20px_rgba(34,211,238,0.03)] group/feed">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                    <Eye className="w-3.5 h-3.5" /> OPTICAL FEED
                                </div>
                                <div className="text-emerald-500 dark:text-emerald-400 text-[10px] font-bold tracking-wide drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">LIVE</div>
                            </div>

                            {/* Grid Simulation with Scan */}
                            <div className="flex-1 border border-cyan-500/20 dark:border-cyan-900/40 rounded bg-black/5 dark:bg-[#020617] overflow-hidden relative flex flex-col justify-center items-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                                {/* Grid Lines */}
                                <div className="hero-feed-grid absolute inset-0" />

                                {/* Animated Sweep */}
                                <motion.div
                                    className="absolute inset-x-0 h-[40px] bg-linear-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none mix-blend-screen"
                                    animate={{ y: ['-100px', '200px'] }}
                                    transition={{ duration: 2.5, ease: 'linear', repeat: Infinity }}
                                />

                                {/* Signal Text */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                    <motion.span
                                        className="text-[11px] font-bold text-cyan-500 tracking-[0.2em] mix-blend-screen drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        INTERCEPT SYS_01
                                    </motion.span>
                                </div>

                                {/* Data Points */}
                                <motion.div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }} />
                                <motion.div className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 bg-red-400 rounded-full shadow-[0_0_8px_#f87171]" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 3.1, repeat: Infinity, delay: 1 }} />
                            </div>

                            <div className="flex justify-between text-[9px] text-slate-400 tracking-widest font-semibold pt-1">
                                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />CAM_01: ACQ</span>
                                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />CAM_04: ACQ</span>
                            </div>
                        </div>

                        {/* Right: Data Forensics Terminal */}
                        <div className="border border-gray-200 dark:border-[#1e293b] rounded-lg bg-gray-50/98 dark:bg-[#0a0f1c]/85 p-4 flex flex-col gap-3 shadow-[inset_0_0_20px_rgba(139,92,246,0.03)]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-[11px] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                                    <Database className="w-3.5 h-3.5" /> DATA FORENSICS
                                </div>
                                <div className="text-amber-500 dark:text-amber-400 text-[10px] font-bold tracking-wide animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">PROCESSING</div>
                            </div>

                            {/* Terminal Logs (Animated Text) */}
                            <div className="flex-1 font-mono text-[11px] space-y-2 border-l border-gray-300 dark:border-[#1e293b] pl-3 pt-2 relative overflow-hidden">
                                <motion.div animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-emerald-600 dark:text-emerald-400">
                                    <span className="text-emerald-500/50 mr-1">{'>'}</span> System Nominal...
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.2 }} className="text-cyan-400">
                                    <span className="text-cyan-500/50 mr-1">{'>'}</span> Pattern match: 98.4%
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.2 }} className="text-amber-400 mt-1 flex items-center">
                                    <span className="text-amber-500/50 mr-1">{'>'}</span> Decrypting stream...
                                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }} className="inline-block w-1.5 h-3 bg-amber-400 ml-1.5 shadow-[0_0_5px_#fbbf24]" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats Row */}
                    <div className="h-[96px] border border-gray-200 dark:border-[#1e293b] rounded-lg bg-gray-50/98 dark:bg-[#0a0f1c]/85 p-5 flex items-center justify-between shadow-[inset_0_0_20px_rgba(59,130,246,0.03)]">
                        <div className="flex gap-10 lg:gap-14">
                            <div>
                                <div className="text-[10px] text-cyan-600 dark:text-cyan-500 tracking-widest mb-1 font-semibold">UPTIME</div>
                                <div className="text-3xl font-bold text-slate-800 dark:text-white flex items-baseline tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                    99.99<span className="text-sm font-normal text-cyan-600/80 dark:text-cyan-400/80 ml-0.5">%</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-emerald-600 dark:text-emerald-500 tracking-widest mb-1 font-semibold">THREATS</div>
                                <div className="text-3xl font-bold text-emerald-500 dark:text-emerald-400 tracking-tight drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">0</div>
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-[10px] text-violet-600 dark:text-violet-500 tracking-widest mb-1 font-semibold">NODES</div>
                                <div className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">8,421</div>
                            </div>
                        </div>

                        {/* Thick Solid Blue Bar Chart (Slow Breathing) */}
                        <div className="flex items-end gap-[5px] h-full pt-2">
                            {[40, 70, 45, 90, 60, 80, 50, 75, 40].map((h, i) => (
                                <motion.div
                                    key={i}
                                    className="w-[12px] sm:w-[14px] rounded-t-sm bg-linear-to-t from-blue-700 via-cyan-500 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                                    animate={{ height: [`${h}%`, `${Math.max(20, h - 25 + Math.random() * 15)}%`, `${h}%`] }}
                                    transition={{ duration: 2.5 + (i * 0.15), repeat: Infinity, ease: 'easeInOut' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

interface HeroProps {
    partnerLogos?: any[];
    heroSettings?: {
        heroImageDay?: any;
        heroImageNight?: any;
        heroHeadline?: any;
        heroHighlightText?: any;
        heroSubtitle?: any;
        heroSubtitleSize?: number;
        heroCTAText?: any;
        heroCTALink?: any;
        heroSecondaryCTAText?: any;
        heroSecondaryCTALink?: string;
        partnerHeadline?: string;
    };
    logoScrollSettings?: {
        enabled?: boolean;
        headline?: string;
    };
}

export function Hero({ partnerLogos, heroSettings, logoScrollSettings }: HeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "center start"]
    });

    // Smooth zoom out and fade as you scroll down
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={sectionRef} className="hero-root min-h-screen flex flex-col justify-center overflow-hidden pt-36 sm:pt-40 pb-8 sm:pb-16 transition-colors duration-300">
            {/* Focused radial bloom behind text — keeps background art visible */}
            <div className="pointer-events-none absolute inset-0 hero-text-bloom" />
            {/* Subtle bottom vignette */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-48 bg-linear-to-t from-white/20 dark:from-black/35 to-transparent" />
            {/* Background Orbs — reduced blur + hidden on mobile for GPU savings */}
            <div className="hidden sm:block absolute top-20 left-10 w-125 h-125 bg-secondary/12 rounded-full blur-[80px] animate-pulse pointer-events-none will-change-[opacity]" />
            <div className="hidden sm:block absolute bottom-20 right-10 w-125 h-125 bg-primary/8 rounded-full blur-[80px] animate-pulse hero-orb-delay pointer-events-none will-change-[opacity]" />

            <div className="relative z-10 w-full max-w-350 mx-auto px-6 sm:px-8 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-6 lg:pt-10">

                    {/* Left: Text Content */}
                    <div className="flex flex-col items-start text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full relative z-20"
                        >
                            <div className="relative rounded-2xl p-[1.5px] overflow-hidden w-full shadow-[0_8px_40px_rgba(0,0,0,0.07)] dark:shadow-[0_8px_40px_rgba(34,211,238,0.04)]">
                                {/* Animated conic gradient border */}
                                <div className="hero-card-spin absolute inset-0" />
                                {/* Glass interior */}
                                <div className="relative z-10 rounded-[14.5px] bg-white/82 dark:bg-[#030912]/82 backdrop-blur-md p-7 sm:p-8 flex flex-col items-start space-y-6 sm:space-y-7">
                            {/* Live System Badge — Modern & Minimal */}
                            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                                <div className="relative flex items-center justify-center h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                </div>
                                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-[0.08em] uppercase select-none pt-[1px]">
                                    System Online
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-black tracking-tighter leading-[1.05] break-words uppercase whitespace-pre-line">
                                <span className="animate-text-shimmer bg-size-[200%_auto] bg-linear-to-r from-slate-900 via-slate-600 to-slate-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent drop-shadow-[0_2px_28px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_2px_16px_rgba(255,255,255,0.2)] tracking-tight block pb-1">
                                    {heroSettings?.heroHeadline || 'AUTONOMOUS\nSECURITY'}
                                </span>
                                <span className="animate-text-shimmer bg-size-[200%_auto] bg-linear-to-r from-[#2563eb] via-[#22d3ee] to-[#2563eb] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(34,211,238,0.85)] dark:drop-shadow-[0_0_30px_rgba(34,211,238,0.6)] tracking-tight">
                                    {heroSettings?.heroHighlightText || 'INTELLIGENCE'}
                                </span>
                            </h1>

                            <div className="relative pl-5 sm:pl-6 border-l-2 border-[#1e3a8a]/60">
                                {heroSettings?.heroSubtitle && typeof heroSettings.heroSubtitle === 'object' ? (
                                    <div
                                        className="prose prose-p:text-slate-700 dark:prose-p:text-gray-400 prose-p:font-normal prose-p:leading-relaxed prose-p:m-0 max-w-[540px] hero-subtitle"
                                        data-size={heroSettings.heroSubtitleSize || 19}
                                    >
                                        <RichText data={heroSettings.heroSubtitle} />
                                    </div>
                                ) : (
                                    <p
                                        className="text-slate-700 dark:text-gray-400 font-normal leading-relaxed max-w-[540px] whitespace-pre-line hero-subtitle"
                                        data-size={heroSettings?.heroSubtitleSize || 19}
                                    >
                                        {(heroSettings?.heroSubtitle && typeof heroSettings.heroSubtitle === 'string')
                                            ? heroSettings.heroSubtitle
                                            : 'Enterprise AI surveillance and intelligent security operations for critical environments.'}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">

                                {/* ── Primary CTA ── */}
                                <Link
                                    href={heroSettings?.heroCTALink || '/contact'}
                                    className="group relative flex items-center justify-center gap-2 h-[52px] sm:h-[56px] px-7 sm:px-9 text-white text-[15px] font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                                >
                                    {/* Glow halo */}
                                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-[#4f46e5] via-[#3b82f6] to-[#06b6d4] opacity-50 blur-lg scale-105 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                                    {/* Fill */}
                                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-[#4338ca] via-[#3b82f6] to-[#0ea5e9]" />
                                    {/* Top gloss */}
                                    <span className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
                                    {/* Shimmer */}
                                    <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-[650ms] ease-in-out bg-linear-to-r from-transparent via-white/15 to-transparent skew-x-[-15deg]" />
                                    {/* Border */}
                                    <span className="absolute inset-0 rounded-full border border-white/15 group-hover:border-white/25 transition-colors duration-300" />

                                    <span className="relative z-10 flex items-center gap-2">
                                        {heroSettings?.heroCTAText || 'Book a Demo'}
                                        <Zap className="w-4 h-4 fill-white group-hover:scale-110 transition-transform duration-300" />
                                    </span>
                                </Link>

                                {/* ── Secondary CTA (YouTube) — hidden only if admin saves an empty string ── */}
                                {(heroSettings?.heroSecondaryCTAText || 'Watch Demo') && (
                                <a
                                    href={heroSettings?.heroSecondaryCTALink || 'https://www.youtube.com/@kingsforth'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center justify-center gap-3 h-[52px] sm:h-[56px] px-7 sm:px-9 text-slate-900 dark:text-white/90 text-[15px] font-bold rounded-full transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                                >
                                    <span className="absolute inset-0 rounded-full bg-slate-100 dark:bg-white/[0.04] group-hover:bg-slate-200 dark:group-hover:bg-white/[0.08] transition-colors duration-300" />
                                    <span className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                    <span className="absolute inset-0 rounded-full border border-black/8 dark:border-white/10 group-hover:border-black/15 dark:group-hover:border-white/20 transition-colors duration-300" />
                                    <span className="relative z-10 flex items-center gap-3">
                                        <svg className="w-[30px] h-[21px] shrink-0 drop-shadow-sm group-hover:scale-105 transition-transform duration-300" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30" height="21" rx="5" fill="#FF0000" />
                                            <path d="M12 6.5L20 10.5L12 14.5V6.5Z" fill="white" />
                                        </svg>
                                        {heroSettings?.heroSecondaryCTAText || 'Watch Demo'}

                                    </span>
                                </a>
                                )}

                            </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="w-full flex justify-center lg:justify-end perspective-[1000px] z-20 relative"
                    >
                        {/* Scroll-linked zoom wrapper */}
                        <motion.div
                            style={{ scale, opacity, transformOrigin: 'center center' }}
                            className="w-full max-w-[650px] xl:max-w-[700px]"
                        >
                            <HeroDashboardUI />
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="pt-16 sm:pt-24 lg:pt-32 pb-4"
                >
                    <InfiniteLogoScrollInline partnerLogos={partnerLogos} settings={logoScrollSettings} />
                </motion.div>
            </div>
        </section>
    );
}
