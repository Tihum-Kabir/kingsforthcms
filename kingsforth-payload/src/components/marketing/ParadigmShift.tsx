'use client';

import { motion } from 'framer-motion';
import { X, Check, AlertTriangle, Zap } from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';

export function ParadigmShift({ settings }: { settings?: any }) {
    const title = settings?.title || 'Why Kingsforth';
    const subtitle = settings?.subtitle || "Moving from legacy fragmentation to unified autonomy. The future isn't about more software; it's about intelligence.";
    const subtitleSize = settings?.subtitleSize || 18;

    return (
        <section className="relative py-20 sm:py-28 overflow-visible transition-colors duration-500">
            <div className="absolute inset-0 -z-10 paradigm-bg bg-linear-to-b from-white/1 via-white/20 to-white/50 dark:from-[#030915]/1 dark:via-[#030915]/20 dark:to-[#030915]/50" />

            {/* Header */}
            <div className="relative flex flex-col items-center justify-center pb-12 px-4 sm:px-6 z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-5xl mx-auto px-8 py-10 sm:px-12 sm:py-12"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-[length:200%_auto] bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600 dark:from-cyan-400 dark:via-purple-400 dark:to-cyan-400 animate-text-shimmer drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                            {title}
                        </span>
                    </h2>
                    {typeof subtitle === 'object' ? (
                        <div
                            className="prose prose-p:text-gray-900 dark:prose-p:text-gray-100 max-w-2xl mx-auto px-4 prose-p:leading-relaxed prose-p:m-0 text-center font-normal paradigm-subtitle"
                            data-size={subtitleSize}
                        >
                            <RichText data={subtitle} />
                        </div>
                    ) : (
                        <p
                            className="text-gray-900 dark:text-gray-100 max-w-2xl mx-auto px-4 leading-relaxed whitespace-pre-line text-center font-normal drop-shadow-sm paradigm-subtitle"
                            data-size={subtitleSize}
                        >
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Comparison Grid */}
            <div className="relative max-w-350 mx-auto px-4 md:px-8 pb-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative items-stretch">

                    {/* ── OLD WAY ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <div className="flex-1 relative bg-[#fef2f2] dark:bg-[#111111] rounded-2xl p-8 border border-red-200 dark:border-red-500/20 transition-all duration-500 overflow-hidden">
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="w-11 h-11 bg-red-100 dark:bg-red-500/15 rounded-xl flex items-center justify-center border border-red-200 dark:border-red-500/20">
                                    <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono tracking-[0.25em] text-red-400 dark:text-red-500/70 uppercase mb-0.5">Legacy</div>
                                    <h3 className="text-xl font-bold text-[#111827] dark:text-white/90">Reactive Systems</h3>
                                </div>
                            </div>

                            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-7 leading-relaxed relative z-10">
                                Disparate sensors, human latency, and data silos. Security alerts trigger only after the breach.
                            </p>

                            <div className="space-y-3.5 relative z-10">
                                <ProblemItem icon={X} text="High Latency" subtext="Manual response delays" />
                                <ProblemItem icon={X} text="Data Silos Detected" subtext="Fragmented information" />
                                <ProblemItem icon={X} text="Manual Intervention Required" subtext="Human bottlenecks" />
                                <ProblemItem icon={X} text="Reactive Alerts" subtext="Post-breach notifications" />
                            </div>

                            <div className="mt-8 pt-6 border-t border-red-200 dark:border-red-500/15 relative z-10">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-black text-red-500 dark:text-red-400 tabular-nums">5-10min</div>
                                        <div className="text-[11px] text-[#9ca3af] mt-1 tracking-wide uppercase">Response Time</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-red-500 dark:text-red-400 tabular-nums">60%</div>
                                        <div className="text-[11px] text-[#9ca3af] mt-1 tracking-wide uppercase">False Positives</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── NEW WAY ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col"
                    >
                        <div className="flex-1 relative bg-[#f0fdfa] dark:bg-[#111111] rounded-2xl p-8 border border-cyan-200 dark:border-cyan-400/20 transition-all duration-500 overflow-hidden">
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="w-11 h-11 bg-cyan-100 dark:bg-linear-to-br dark:from-cyan-500/20 dark:to-violet-500/20 rounded-xl flex items-center justify-center border border-cyan-200 dark:border-cyan-400/20">
                                    <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-600 dark:text-cyan-400/70 uppercase mb-0.5">Kingsforth</div>
                                    <h3 className="text-xl font-bold text-[#111827] dark:text-white">Autonomous Action</h3>
                                </div>
                            </div>

                            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-7 leading-relaxed relative z-10">
                                A unified nervous system. Agents detect, analyze, and execute protocols in real-time. Threats are neutralized before they materialize.
                            </p>

                            <div className="space-y-3.5 relative z-10">
                                <SolutionItem icon={Check} text="Zero Latency" subtext="Instant AI response" />
                                <SolutionItem icon={Check} text="Unified Intelligence" subtext="Connected ecosystem" />
                                <SolutionItem icon={Check} text="Automated Defense" subtext="Proactive protection" />
                                <SolutionItem icon={Check} text="Predictive Alerts" subtext="Pre-breach detection" />
                            </div>

                            <div className="mt-8 pt-6 border-t border-cyan-200 dark:border-cyan-400/15 relative z-10">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-black text-cyan-600 dark:text-transparent dark:bg-linear-to-r dark:from-cyan-400 dark:to-violet-400 dark:bg-clip-text tabular-nums">&lt;60s</div>
                                        <div className="text-[11px] text-[#9ca3af] mt-1 tracking-wide uppercase">Response Time</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-cyan-600 dark:text-transparent dark:bg-linear-to-r dark:from-cyan-400 dark:to-violet-400 dark:bg-clip-text tabular-nums">99.9%</div>
                                        <div className="text-[11px] text-[#9ca3af] mt-1 tracking-wide uppercase">Accuracy</div>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-center gap-2">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
                                    </span>
                                    <span className="text-[11px] font-mono tracking-[0.2em] text-cyan-600 dark:text-cyan-400/80 uppercase">System Active</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Arrow between cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20"
                    >
                        <div className="relative w-14 h-14">
                            <span className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500 to-violet-500 animate-ping opacity-20" />
                            <div className="relative w-14 h-14 bg-linear-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ProblemItem({ icon: Icon, text, subtext }: { icon: any; text: string; subtext: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-red-100 dark:bg-red-500/15 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-red-200 dark:border-red-500/20">
                <Icon className="w-3 h-3 text-red-500 dark:text-red-400" />
            </div>
            <div>
                <div className="text-[14px] text-[#374151] dark:text-white/80 font-medium leading-tight">{text}</div>
                <div className="text-[12px] text-[#9ca3af] mt-0.5">{subtext}</div>
            </div>
        </div>
    );
}

function SolutionItem({ icon: Icon, text, subtext }: { icon: any; text: string; subtext: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-cyan-100 dark:bg-cyan-500/15 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-cyan-200 dark:border-cyan-400/20">
                <Icon className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
                <div className="text-[14px] text-[#111827] dark:text-white font-medium leading-tight">{text}</div>
                <div className="text-[12px] text-[#9ca3af] mt-0.5">{subtext}</div>
            </div>
        </div>
    );
}
