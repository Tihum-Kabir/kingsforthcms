'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Zap, Shield, CheckCircle } from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';

const iconMap: Record<string, any> = {
    'AlertCircle': AlertCircle,
    'Zap': Zap,
    'Shield': Shield,
    'CheckCircle': CheckCircle
};

interface HowItWorksClientProps {
    steps: any[];
    settings?: any;
}

export function HowItWorksClient({ steps, settings }: HowItWorksClientProps) {
    const getIcon = (name: string) => iconMap[name] || AlertCircle;
    
    const title = settings?.title || 'How It Works';
    const subtitle = settings?.subtitle || "True digitization isn't about buying new tools; it's about making them talk to each other.";
    const subtitleSize = settings?.subtitleSize || 18;

    return (
        <section id="features" className="relative py-24 sm:py-32 overflow-hidden transition-colors duration-500">
            <div className="-z-10 absolute inset-0 bg-linear-to-b from-white/87 to-white/92 dark:from-[#030915]/87 dark:to-[#030915]/92" />
            <div className="relative max-w-350 mx-auto px-4 sm:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 relative z-10 mx-auto max-w-4xl"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-5 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 dark:from-cyan-400 dark:via-purple-400 dark:to-cyan-400 animate-text-shimmer drop-shadow-sm">
                            {title}
                        </span>
                    </h2>
                    {typeof subtitle === 'object' ? (
                        <div
                            className="prose prose-p:text-[#6b7280] dark:prose-p:text-[#9ca3af] max-w-3xl mx-auto prose-p:m-0 text-center howitworks-subtitle"
                            data-size={subtitleSize}
                        >
                            <RichText data={subtitle} />
                        </div>
                    ) : (
                        <p
                            className="text-[#6b7280] dark:text-[#9ca3af] max-w-3xl mx-auto whitespace-pre-line text-center howitworks-subtitle"
                            data-size={subtitleSize}
                        >
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Timeline Steps */}
                <div className="relative">
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2563eb]/30 via-[#a855f7]/30 to-[#22d3ee]/30 dark:from-cyan-500/30 dark:via-violet-500/30 dark:to-green-500/30" />

                    <div className="space-y-16">
                        {steps.map((step: any, index: number) => (
                                <ProcessStep
                                    key={step.id || index}
                                    number={step.step_number}
                                    icon={getIcon(step.icon_name)}
                                    title={step.title}
                                    description={step.description}
                                    color={step.color_theme || "from-cyan-500 to-blue-500"}
                                    index={index}
                                    delay={index * 0.2}
                                    mediaUrl={step.mediaUrl}
                                    mediaType={step.mediaType}
                                    mediaFit={step.mediaFit}
                                />
                        ))}
                    </div>
                </div>

                {/* Result Highlight */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block px-8 py-6 bg-green-50 dark:bg-green-500/[0.05] border border-green-200 dark:border-green-500/30 rounded-2xl">
                        <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-transparent dark:bg-gradient-to-r dark:from-green-400 dark:to-emerald-400 dark:bg-clip-text mb-2">
                            &lt; 60 seconds
                        </div>
                        <div className="text-[#6b7280] dark:text-[#9ca3af]">Average Threat Response Time</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function StepIllustration({ index, icon: Icon, color }: { index: number; icon: any; color: string }) {
    const type = index % 3;

    if (type === 0) {
        // Radar / detection sweep
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-cyan-50/30 dark:from-[#060d1a] dark:to-[#040b17] overflow-hidden">
                <div className="absolute inset-0 opacity-10 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="relative flex items-center justify-center w-40 h-40">
                    {/* Expanding radar rings */}
                    {[1, 1.5, 2.1, 2.8].map((scale, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full border border-cyan-400/30 dark:border-cyan-500/25"
                            style={{ width: `${scale * 48}px`, height: `${scale * 48}px` }}
                            animate={{ opacity: [0.6, 0.1, 0.6], scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                        />
                    ))}
                    {/* Sweep arc */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.18) 60deg, transparent 60deg)' }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Center icon */}
                    <div className="relative z-10 w-14 h-14 rounded-full bg-white dark:bg-[#0b1a2e] border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                        <Icon className="w-7 h-7 text-cyan-500 dark:text-cyan-400" />
                    </div>
                    {/* Detected blips */}
                    {[[30, -48], [-52, 18], [48, 32]].map(([x, y], i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                        />
                    ))}
                </div>
                {/* Status */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
                        <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest">SCANNING</span>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 1) {
        // Neural / analysis processing
        const nodes = [[50, 20], [20, 55], [80, 55], [35, 82], [65, 82]];
        const edges = [[0,1],[0,2],[1,3],[1,4],[2,3],[2,4]];
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-50 to-violet-50/20 dark:from-[#07060f] dark:to-[#050412] overflow-hidden">
                <div className="absolute inset-0 opacity-10 dark:opacity-8" style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.2) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <svg width="220" height="160" viewBox="0 0 100 100" className="relative z-10" aria-hidden>
                    {edges.map(([a, b], i) => (
                        <motion.line
                            key={i}
                            x1={nodes[a][0]} y1={nodes[a][1]}
                            x2={nodes[b][0]} y2={nodes[b][1]}
                            stroke="rgba(139,92,246,0.35)"
                            strokeWidth="0.8"
                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                        />
                    ))}
                    {/* Data packets traveling edges */}
                    {edges.slice(0, 3).map(([a, b], i) => (
                        <motion.circle
                            key={`p${i}`}
                            cx={nodes[a][0]}
                            cy={nodes[a][1]}
                            r="1.5"
                            fill="#a78bfa"
                            filter="url(#glow)"
                            animate={{
                                cx: [nodes[a][0], nodes[b][0]],
                                cy: [nodes[a][1], nodes[b][1]],
                                opacity: [0, 1, 0],
                            }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                        />
                    ))}
                    {nodes.map(([x, y], i) => (
                        <motion.circle
                            key={`n${i}`}
                            cx={x} cy={y} r={i === 0 ? 5 : 3.5}
                            fill={i === 0 ? '#7c3aed' : '#8b5cf6'}
                            animate={{ r: [i === 0 ? 5 : 3.5, (i === 0 ? 5 : 3.5) + 1.2, i === 0 ? 5 : 3.5] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                        />
                    ))}
                    <defs>
                        <filter id="glow"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    </defs>
                </svg>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        <span className="text-[10px] font-mono font-semibold text-violet-600 dark:text-violet-400 tracking-widest">PROCESSING</span>
                    </div>
                </div>
            </div>
        );
    }

    // type === 2: Shield / action
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-50 to-emerald-50/20 dark:from-[#040e0a] dark:to-[#030a07] overflow-hidden">
            <div className="absolute inset-0 opacity-8 dark:opacity-8 bg-[radial-gradient(circle,rgba(52,211,153,0.2)_1px,transparent_1px)] bg-size-[20px_20px]" />
            <div className="relative flex items-center justify-center w-40 h-40">
                {/* Expanding shield glow */}
                <motion.div
                    className="absolute w-32 h-32 rounded-full bg-emerald-400/8 dark:bg-emerald-400/10"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Shield SVG */}
                <div className="relative z-10 flex flex-col items-center">
                    <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
                        <motion.path
                            d="M36 4L8 16v24c0 14.4 12 28 28 36 16-8 28-21.6 28-36V16L36 4z"
                            fill="none"
                            stroke="url(#sg)"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            animate={{ pathLength: [0, 1] }}
                            initial={{ pathLength: 0 }}
                            transition={{ duration: 1.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }}
                        />
                        <motion.path
                            d="M24 40l8 8 16-16"
                            stroke="#34d399"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            animate={{ pathLength: [0, 1], opacity: [0, 1] }}
                            initial={{ pathLength: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: 1, repeat: Infinity, repeatDelay: 2.2 }}
                        />
                        <defs>
                            <linearGradient id="sg" x1="8" y1="4" x2="64" y2="80" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#10b981" />
                                <stop offset="1" stopColor="#059669" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
                    <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 tracking-widest">SECURED</span>
                </div>
            </div>
        </div>
    );
}

interface ProcessStepProps {
    number: string;
    icon: any;
    title: string;
    description: string;
    color: string;
    index: number;
    delay: number;
    mediaUrl?: string;
    mediaType?: string;
    mediaFit?: string;
}

function ProcessStep({ number, icon: Icon, title, description, color, index, delay, mediaUrl, mediaType, mediaFit = 'cover' }: ProcessStepProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={`relative grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
        >
            {/* Content */}
            <div className={`${isEven ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'} z-10`}>
                <div className={`relative inline-block bg-white/60 dark:bg-white/4 p-8 rounded-2xl border border-white/80 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${isEven ? 'lg:float-right' : ''}`}>
                    <div className="flex items-center gap-5 mb-5">
                        <div className={`w-16 h-16 bg-linear-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                        </div>
                        <div className={`text-5xl font-extrabold bg-linear-to-br ${color} bg-clip-text text-transparent`}>
                            {number}
                        </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white mb-3">{title}</h3>
                    <p className="text-base text-[#6b7280] dark:text-[#9ca3af] leading-relaxed max-w-md">
                        {description}
                    </p>
                </div>
            </div>

            {/* Visual */}
            <div className={`${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`}>
                <div className="aspect-video bg-[#f3f4f6] dark:bg-linear-to-br dark:from-[#111] dark:to-[#1a1a1a] rounded-2xl overflow-hidden border border-[#e5e7eb] dark:border-white/6 shadow-sm">
                    <div className="h-full w-full relative group">
                        {mediaUrl ? (
                            mediaType === 'video' ? (
                                <video src={mediaUrl} className={`w-full h-full object-${mediaFit}`} autoPlay muted loop playsInline />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={mediaUrl} alt={title} className={`w-full h-full object-${mediaFit}`} />
                            )
                        ) : (
                            <StepIllustration index={index} icon={Icon} color={color} />
                        )}
                    </div>
                </div>
            </div>

            {/* Center Node */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 bg-linear-to-br ${color} rounded-full shadow-lg`} />
            </div>
        </motion.div>
    );
}
