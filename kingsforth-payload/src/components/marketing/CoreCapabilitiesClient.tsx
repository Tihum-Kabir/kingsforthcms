'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { ArrowRight, Database, Eye, Cpu, Bot, Network, TrendingUp, Shield, Lock, Search, Fingerprint, Activity, Zap, Mic, Ear, Terminal, Layers, Camera, AlertTriangle, Crosshair, Map, Globe, Scan, Cloud, Video, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    database: Database, Database: Database,
    eye: Eye, Eye: Eye,
    cpu: Cpu, Cpu: Cpu,
    bot: Bot, Bot: Bot,
    network: Network, Network: Network,
    'trending-up': TrendingUp, TrendingUp: TrendingUp,
    shield: Shield, Shield: Shield,
    lock: Lock, Lock: Lock,
    search: Search, Search: Search,
    fingerprint: Fingerprint, Fingerprint: Fingerprint,
    activity: Activity, Activity: Activity,
    zap: Zap, Zap: Zap,
    mic: Mic, Mic: Mic,
    ear: Ear, Ear: Ear,
    terminal: Terminal, Terminal: Terminal,
    layers: Layers, Layers: Layers,
    camera: Camera, Camera: Camera,
    alert: AlertTriangle, AlertTriangle: AlertTriangle,
    crosshair: Crosshair, Crosshair: Crosshair,
    map: Map, Map: Map,
    globe: Globe, Globe: Globe,
    scan: Scan, Scan: Scan,
    cloud: Cloud, Cloud: Cloud,
    video: Video, Video: Video,
};

interface Capability {
    iconName: string;
    title: string;
    description?: string;
    href: string;
    gradient: string;
    mediaUrl?: string;
}

interface CoreCapabilitiesClientProps {
    capabilities: Capability[];
    settings?: any;
}

export function CoreCapabilitiesClient({ capabilities, settings }: CoreCapabilitiesClientProps) {
    const title = settings?.title || 'Core Capabilities';
    const subtitle = settings?.subtitle || 'Empowering your enterprise with cutting-edge technology stacks';
    const subtitleSize = settings?.subtitleSize || 18;

    return (
        <section className="relative py-20 md:py-28 overflow-hidden transition-colors duration-500">
            <div className="-z-10 absolute inset-0 bg-linear-to-b from-white/92 to-white/96 dark:from-[#030915]/92 dark:to-[#030915]/96" />
            <div className="relative max-w-350 mx-auto px-4 sm:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 mx-auto max-w-4xl"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-5 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-[length:200%_auto] bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-500 dark:from-emerald-400 dark:via-cyan-400 dark:to-emerald-400 animate-text-shimmer drop-shadow-sm">
                            {title}
                        </span>
                    </h2>
                    {typeof subtitle === 'object' ? (
                        <div
                            className="prose prose-p:text-[#6b7280] dark:prose-p:text-[#9ca3af] max-w-3xl mx-auto prose-p:m-0 text-center capabilities-subtitle"
                            data-size={subtitleSize}
                        >
                            <RichText data={subtitle} />
                        </div>
                    ) : (
                        <p
                            className="text-[#6b7280] dark:text-[#9ca3af] max-w-3xl mx-auto whitespace-pre-line text-center capabilities-subtitle"
                            data-size={subtitleSize}
                        >
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {capabilities.map((capability, index) => (
                        <CapabilityCard key={index} {...capability} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CapabilityCard({ iconName, title, description, href, gradient, mediaUrl, index }: Capability & { index: number }) {
    const Icon = iconMap[iconName] || Database;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <Link href={href} className="block h-full">
                <div className="group relative h-full bg-white/60 dark:bg-white/4 overflow-hidden border border-white/80 dark:border-white/10 rounded-2xl hover:border-blue-400/60 dark:hover:border-[#22d3ee]/30 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 min-h-75">
                    
                    {/* Media Background Overlay */}
                    {mediaUrl && (
                        <div className="absolute inset-0 z-0">
                            {mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video src={mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-15 dark:opacity-[0.12] group-hover:opacity-30 dark:group-hover:opacity-20 transition-opacity duration-500" />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={mediaUrl} alt={title} className="w-full h-full object-cover opacity-15 dark:opacity-[0.12] group-hover:opacity-30 dark:group-hover:opacity-20 blur-[2px] transition-opacity duration-500" />
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-white/10 dark:from-[#111] dark:via-[#111]/80 dark:to-[#111]/10"></div>
                        </div>
                    )}
                    
                    <div className="relative z-10 p-8 flex flex-col h-full">
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center p-4 rounded-xl bg-linear-to-br ${gradient} w-16 h-16 shadow-sm mb-6`}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3 group-hover:text-[#2563eb] dark:group-hover:text-[#22d3ee] transition-colors">
                        {title}
                    </h3>
                    <p className="text-[#6b7280] dark:text-[#9ca3af] leading-relaxed mb-6">
                        {description}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto flex items-center pt-6 text-[#2563eb] dark:text-[#22d3ee] group-hover:translate-x-1 transition-transform">
                        <span className="font-medium text-sm">Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                </div>
            </div>
            </Link>
        </motion.div>
    );
}
