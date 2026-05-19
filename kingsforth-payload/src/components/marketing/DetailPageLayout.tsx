import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import {
    ArrowLeft, ArrowRight, Play, FileText, Layers,
    PhoneCall, MessageSquare, Zap, Shield, Brain,
    BarChart3, Globe, Search, Network, Lock, Eye, Cpu,
} from 'lucide-react';

const FALLBACK_ICONS = [Zap, Shield, Brain, BarChart3, Globe, Search, FileText, Network, Lock, Eye, Cpu, Layers];

/** Convert any YouTube/Vimeo URL to an embed URL */
export function getEmbedUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/);
    if (yt?.[1]) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm?.[1]) return `https://player.vimeo.com/video/${vm[1]}?dnt=1`;
    if (url.includes('/embed/') || url.includes('player.vimeo')) return url;
    return null;
}

interface DetailPageProps {
    backHref: string;
    backLabel: string;
    accentColor?: 'blue' | 'violet';
    badge?: string;
    title: string;
    subtitle?: string;
    heroImageUrl?: string | null;
    heroImageAlt?: string;
    embedUrl?: string | null;
    embedLabel?: string;
    description?: any;
    features?: Array<{ icon?: any; title: string; description?: string }>;
    extraSections?: React.ReactNode;
    ctaTitle?: string;
    ctaSubtitle?: string;
    showHeroActions?: boolean;
}

export function DetailPageLayout({
    backHref, backLabel,
    accentColor = 'blue',
    badge, title, subtitle,
    heroImageUrl, heroImageAlt,
    embedUrl, embedLabel,
    description, features,
    extraSections,
    ctaTitle, ctaSubtitle,
    showHeroActions = true,
}: DetailPageProps) {
    const accent = accentColor === 'violet'
        ? { bg: 'bg-violet-50 dark:bg-violet-500/10', border: 'border-violet-100 dark:border-violet-500/20', text: 'text-violet-600 dark:text-violet-400' }
        : { bg: 'bg-blue-50 dark:bg-cyan-500/10', border: 'border-blue-100 dark:border-cyan-500/20', text: 'text-blue-600 dark:text-cyan-400' };

    const hasDescription = !!description?.root?.children?.length;
    const hasFeatures = features && features.length > 0;

    return (
        <main className="min-h-screen relative z-10 pt-24 pb-24">
            {/* Back */}
            <div className="max-w-350 mx-auto px-6 mb-10">
                <Link href={backHref}
                    className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15] hover:shadow-sm px-4 py-2 rounded-full group">
                    <div className="bg-slate-100 dark:bg-white/[0.05] rounded-full p-1 group-hover:bg-slate-200 dark:group-hover:bg-white/[0.1] transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    {backLabel}
                </Link>
            </div>

            {/* ── HERO CARD ─────────────────────────────────────────── */}
            <section className="max-w-350 mx-auto px-6 mb-8">
                <div className="relative bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-3xl border border-slate-200/80 dark:border-white/[0.07] overflow-hidden shadow-lg dark:shadow-none">
                    {heroImageUrl && (
                        <div className="w-full aspect-[21/9] relative overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={heroImageUrl} alt={heroImageAlt || title}
                                className="w-full h-full object-cover" loading="eager" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-white/20 dark:via-transparent to-transparent" />
                        </div>
                    )}
                    <div className="p-10 md:p-16">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.bg} ${accent.border} border mb-6`}>
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${accentColor === 'violet' ? 'bg-violet-500' : 'bg-cyan-500'}`} />
                            <span className={`text-xs font-bold tracking-[0.2em] uppercase ${accent.text}`}>{badge || 'Platform Module'}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.05] text-slate-900 dark:text-white mb-6">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xl md:text-2xl text-slate-500 dark:text-gray-300 max-w-3xl font-light leading-relaxed mb-8">
                                {subtitle}
                            </p>
                        )}
                        {showHeroActions && (
                            <div className="flex flex-wrap items-center gap-4">
                                <Link href="/contact"
                                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#111827] dark:bg-white text-white dark:text-black font-bold rounded-full shadow-lg hover:scale-[1.02] transition-all duration-300">
                                    <PhoneCall className="w-4 h-4" /> Book a Demo
                                </Link>
                                <Link href="#capabilities"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Explore Capabilities <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── VIDEO ─────────────────────────────────────────────── */}
            {embedUrl && (
                <section className="max-w-4xl mx-auto px-6 mb-16">
                    {/* Glowing wrapper — no dark bg, just subtle glow */}
                    <div className="relative group">
                        {/* Ambient glow behind video */}
                        <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/20 via-violet-500/10 to-blue-500/20 rounded-[2rem] blur-2xl opacity-60 dark:opacity-40 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
                        {/* Video frame */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-white/[0.08] shadow-xl">
                            <iframe
                                src={embedUrl}
                                title={embedLabel || `${title} — Overview`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                    {/* Caption */}
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400 dark:text-gray-500 tracking-wide">
                        <Play className="w-3 h-3 fill-current" />
                        <span>{embedLabel || `${title} — Platform Overview`}</span>
                    </div>
                </section>
            )}

            {/* ── DESCRIPTION ───────────────────────────────────────── */}
            {hasDescription && (
                <section className="max-w-5xl mx-auto px-6 mb-16">
                    <div className="bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-white/[0.07] p-10 md:p-14 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className={`w-9 h-9 rounded-xl ${accent.bg} ${accent.border} border flex items-center justify-center shrink-0`}>
                                <FileText className={`w-4 h-4 ${accent.text}`} />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 dark:text-gray-500">Overview</p>
                                <h2 className="text-base font-bold text-slate-900 dark:text-white">About this {badge || 'Module'}</h2>
                            </div>
                        </div>
                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none
                            prose-p:text-slate-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-headings:text-slate-900 dark:prose-headings:text-white
                            prose-a:text-blue-600 dark:prose-a:text-cyan-400">
                            <RichText data={description} />
                        </div>
                    </div>
                </section>
            )}

            {/* ── FEATURES ──────────────────────────────────────────── */}
            {hasFeatures && (
                <section id="capabilities" className="max-w-350 mx-auto px-6 mb-20 scroll-mt-24">
                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.bg} ${accent.border} border mb-4`}>
                            <Layers className={`w-3.5 h-3.5 ${accent.text}`} />
                            <span className={`text-xs font-bold tracking-[0.2em] uppercase ${accent.text}`}>Capabilities</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                            Key Capabilities
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features!.map((feat, i) => {
                            const iconUrl = feat.icon && typeof feat.icon === 'object' ? feat.icon.url : null;
                            const FallbackIcon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
                            return (
                                <div key={i}
                                    className="group bg-white dark:bg-white/[0.02] backdrop-blur-xl border border-slate-200 dark:border-white/[0.06] rounded-2xl p-8 hover:border-blue-300 dark:hover:border-cyan-500/30 hover:shadow-md dark:hover:shadow-cyan-500/5 transition-all duration-300">
                                    <div className={`w-12 h-12 rounded-xl ${accent.bg} ${accent.border} border flex items-center justify-center mb-5 overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                                        {iconUrl
                                            ? <img src={iconUrl} alt={feat.title} className="w-7 h-7 object-contain" />
                                            : <FallbackIcon className={`w-5 h-5 ${accent.text}`} />
                                        }
                                    </div>
                                    <h3 className={`text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:${accentColor === 'violet' ? 'text-violet-600 dark:text-violet-400' : 'text-blue-600 dark:text-cyan-400'} transition-colors`}>
                                        {feat.title}
                                    </h3>
                                    {feat.description && (
                                        <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{feat.description}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Extra sections (stats, content blocks, FAQs, pricing, etc.) */}
            {extraSections}

            {/* ── CTA ───────────────────────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 mt-16">
                <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0c1a2e] rounded-3xl p-12 md:p-20 text-center overflow-hidden border border-white/[0.07]">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-violet-500/10 rounded-full blur-3xl" />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400">Talk to an Expert</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                            {ctaTitle || `Ready to deploy ${title}?`}
                        </h2>
                        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                            {ctaSubtitle || 'Our architects will design a custom solution for your specific operational requirements.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact"
                                className="inline-flex items-center justify-center gap-2.5 h-14 px-8 bg-white text-slate-900 font-bold text-base rounded-full shadow-xl hover:scale-105 transition-all duration-300">
                                <PhoneCall className="w-4 h-4" /> Book a Demo
                            </Link>
                            <Link href="/contact"
                                className="inline-flex items-center justify-center gap-2.5 h-14 px-8 bg-white/10 text-white font-bold text-base rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <MessageSquare className="w-4 h-4" /> Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
