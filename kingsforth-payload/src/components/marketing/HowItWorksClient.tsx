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
            <div className="-z-10 absolute inset-0 bg-gradient-to-b from-white/[.87] to-white/[.92] dark:from-[#030915]/[.87] dark:to-[#030915]/[.92] backdrop-blur-xl" />
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
                <div className={`relative inline-block bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl p-8 rounded-2xl border border-white/80 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${isEven ? 'lg:float-right' : ''}`}>
                    <div className="flex items-center gap-5 mb-5">
                        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                        </div>
                        <div className={`text-5xl font-extrabold bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
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
                <div className="aspect-video bg-[#f3f4f6] dark:bg-gradient-to-br dark:from-[#111] dark:to-[#1a1a1a] rounded-2xl overflow-hidden border border-[#e5e7eb] dark:border-white/[0.06] shadow-sm">
                    <div className="h-full w-full relative group">
                        {mediaUrl ? (
                            mediaType === 'video' ? (
                                <video src={mediaUrl} className={`w-full h-full object-${mediaFit}`} autoPlay muted loop playsInline />
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={mediaUrl} alt={title} className={`w-full h-full object-${mediaFit}`} />
                            )
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <Icon className="w-20 h-20 text-[#d1d5db] dark:text-white/10" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Center Node */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 bg-gradient-to-br ${color} rounded-full shadow-lg`} />
            </div>
        </motion.div>
    );
}
