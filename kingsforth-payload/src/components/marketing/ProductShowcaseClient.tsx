'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, Search, Shield, Eye, CheckCircle, Video, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';

export interface ProductFeature {
    id: string;
    title: string;
    description: string;
    media_url?: string;
    media_type?: 'image' | 'video';
    media_fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    features_list: string[];
    image_position: 'left' | 'right';
}

export function ProductShowcaseClient({ features, settings }: { features: ProductFeature[], settings?: any }) {
    const badge = settings?.badge || 'Featured Product';
    const title = settings?.title || 'KINGSEYE';
    const subtitle = settings?.subtitle || 'Turn Passive Footage into Actionable Intelligence';
    const description = settings?.description || 'Legacy security cameras are reactive—they only record. Kingseye is active. It watches, understands, and alerts you instantly.';
    const descriptionSize = settings?.descriptionSize || 16;
    const getIcon = (title: string, index: number) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('cognitive') || lowerTitle.includes('analytics')) return Brain;
        if (lowerTitle.includes('search') || lowerTitle.includes('forensic')) return Search;
        if (lowerTitle.includes('compliance') || lowerTitle.includes('automated')) return Shield;
        return [Brain, Search, Shield][index % 3];
    };

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden transition-colors duration-500">
            <div className="-z-10 absolute inset-0 bg-linear-to-b from-white/50 to-white/85 dark:from-[#030915]/50 dark:to-[#030915]/85" />
            <div className="relative max-w-350 mx-auto px-4 sm:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 relative z-10 mx-auto max-w-5xl"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-orange-50 dark:bg-orange-500/[0.05] border border-orange-200 dark:border-orange-500/20 mb-6">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 duration-1000"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400 tracking-[0.15em] uppercase">
                            {badge}
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-[length:200%_auto] bg-linear-to-r from-orange-500 via-rose-500 to-orange-500 dark:from-orange-400 dark:via-rose-400 dark:to-orange-400 animate-text-shimmer drop-shadow-[0_2px_10px_rgba(249,115,22,0.2)]">
                            {title}
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-[#374151] dark:text-[#d1d5db] max-w-3xl mx-auto font-medium">
                        {subtitle}
                    </p>
                    {typeof description === 'object' ? (
                        <div
                            className="prose prose-p:text-[#6b7280] dark:prose-p:text-[#9ca3af] max-w-3xl mx-auto mt-4 prose-p:m-0 text-center product-description"
                            data-size={descriptionSize}
                        >
                            <RichText data={description} />
                        </div>
                    ) : (
                        <p
                            className="text-[#6b7280] dark:text-[#9ca3af] max-w-3xl mx-auto mt-4 whitespace-pre-line text-center product-description"
                            data-size={descriptionSize}
                        >
                            {description}
                        </p>
                    )}
                </motion.div>

                {/* Main Showcase Image/Video */}
                {settings?.showcaseMedia && typeof settings.showcaseMedia === 'object' && settings.showcaseMedia.url && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative max-w-5xl mx-auto mt-16 mb-24 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#e5e7eb] dark:border-white/[0.08] aspect-video"
                    >
                        <div className="absolute inset-0 bg-linear-to-tr from-orange-500/5 to-rose-500/5 mix-blend-overlay z-10 pointer-events-none"></div>
                        {settings.showcaseMedia.mimeType?.includes('video') ? (
                            <video
                                src={settings.showcaseMedia.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-auto object-cover aspect-video"
                            />
                        ) : (
                            <Image
                                src={settings.showcaseMedia.url}
                                alt={settings.showcaseMedia.alt || 'Kingseye Dashboard'}
                                fill className="object-cover"
                                sizes="(max-width: 1280px) 100vw, 1024px"
                            />
                        )}
                    </motion.div>
                )}

                {/* Features Loop */}
                {features.map((feature, index) => (
                    <FeatureBlock
                        key={feature.id}
                        icon={getIcon(feature.title, index)}
                        title={feature.title}
                        description={feature.description}
                        features={feature.features_list.map((f: any) => typeof f === 'string' ? f : f?.feature || '')}
                        imagePosition={feature.image_position}
                        delay={0.2 * (index + 1)}
                        mediaUrl={feature.media_url}
                        mediaType={feature.media_type}
                        mediaFit={feature.media_fit}
                    />
                ))}

            </div>
        </section>
    );
}

function AnimatedFeatureSVG({ icon: Icon }: { icon: any }) {
    const bars = [0.55, 0.85, 0.45, 0.95, 0.65, 0.75, 0.50, 0.80];
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-50/20 dark:from-[#060d1a] dark:to-[#040a14] overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-20 dark:opacity-15" style={{
                backgroundImage: 'linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)',
                backgroundSize: '28px 28px'
            }} />

            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 bg-cyan-400/5 dark:bg-cyan-400/8 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center gap-5 p-6 z-10">
                {/* Icon with pulse rings */}
                <div className="relative flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.7, 1], opacity: [0.25, 0, 0.25] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute w-20 h-20 rounded-full border border-cyan-500/30"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                        className="absolute w-20 h-20 rounded-full border border-cyan-400/40"
                    />
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#0b1526] border border-cyan-200/80 dark:border-cyan-500/25 flex items-center justify-center shadow-[0_4px_24px_rgba(34,211,238,0.12)] dark:shadow-[0_4px_24px_rgba(34,211,238,0.18)] relative z-10">
                        <Icon className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
                    </div>
                </div>

                {/* Animated bar chart */}
                <div className="flex items-end gap-[5px] h-10">
                    {bars.map((h, i) => (
                        <motion.div
                            key={i}
                            className="w-[10px] rounded-t-sm bg-linear-to-t from-blue-600 via-cyan-500 to-cyan-300 dark:from-blue-700 dark:via-cyan-500 dark:to-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.4)]"
                            animate={{ height: [`${h * 40}px`, `${Math.max(8, h * 40 - 12 + (i % 3) * 6)}px`, `${h * 40}px`] }}
                            transition={{ duration: 2 + i * 0.18, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                        />
                    ))}
                </div>

                {/* Status row */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <motion.span
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"
                        />
                        <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 tracking-widest">LIVE</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <motion.span
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
                            className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
                        />
                        <span className="text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest">PROCESSING</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FeatureBlockProps {
    icon: any;
    title: string;
    description: string;
    features: string[];
    imagePosition: 'left' | 'right';
    delay: number;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    mediaFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

function FeatureBlock({ icon: Icon, title, description, features, imagePosition, delay, mediaUrl, mediaType, mediaFit = 'cover' }: FeatureBlockProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="mb-16 last:mb-0 group"
        >
            <div className={`grid md:grid-cols-2 gap-10 items-center ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
                {/* Text Content */}
                <div className={`${imagePosition === 'right' ? 'md:order-2' : ''} bg-white/60 dark:bg-white/4 p-8 sm:p-10 rounded-2xl border border-white/80 dark:border-white/10 shadow-xl hover:shadow-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-blue-400/60 dark:hover:border-cyan-500/30 transition-all duration-500 flex flex-col justify-center h-full`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-cyan-50 dark:bg-custom-gradient dark:from-cyan-500/10 dark:to-blue-500/10 rounded-xl flex items-center justify-center border border-cyan-100 dark:border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                            <Icon className="w-7 h-7 text-[#2563eb] dark:text-cyan-400" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight">{title}</h3>
                    </div>

                    <p className="text-[17px] text-[#4b5563] dark:text-slate-400 mb-8 leading-relaxed font-medium">
                        {description}
                    </p>

                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#2563eb] dark:text-cyan-400 flex-shrink-0" />
                                <span className="text-[15px] font-medium text-[#374151] dark:text-slate-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image/Visual */}
                <div className={imagePosition === 'right' ? 'md:order-1' : ''}>
                    <div className="relative aspect-video bg-[#f3f4f6] dark:bg-linear-to-br dark:from-[#111] dark:to-[#1a1a1a] rounded-2xl overflow-hidden border border-[#e5e7eb] dark:border-white/[0.06] shadow-sm group">
                        {mediaUrl ? (
                            mediaType === 'video' ? (
                                <video
                                    src={mediaUrl}
                                    className={`w-full h-full object-${mediaFit}`}
                                    autoPlay muted loop playsInline
                                />
                            ) : (
                                <Image
                                    src={mediaUrl}
                                    alt={title}
                                    fill className={`object-${mediaFit} transition-transform duration-700 group-hover:scale-105`}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )
                        ) : (
                            <AnimatedFeatureSVG icon={Icon} />
                        )}

                        {/* Live indicator */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-xl rounded-full border border-red-500/30">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-xs text-red-500 font-medium">LIVE</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
