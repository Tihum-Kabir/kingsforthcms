'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const defaultStats = [
    { value: '1M+',   label: 'Threats Detected' },
    { value: '<60s',  label: 'Response Time' },
    { value: '99.9%', label: 'System Uptime' },
    { value: '500+',  label: 'Clients Protected' },
];

export function StatsSection({ settings }: { settings?: any }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const displayStats = settings?.stats?.length > 0
        ? settings.stats.map((s: any) => ({ value: s.value, label: s.label }))
        : defaultStats;

    return (
        <section ref={ref} className="relative py-20 sm:py-24 overflow-hidden transition-colors duration-500 bg-white dark:bg-[#050a12] border-y border-slate-100 dark:border-white/7">
            <div className="max-w-350 mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-slate-100 dark:divide-white/7">
                    {displayStats.map((stat: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center justify-center py-10 px-6 text-center"
                        >
                            <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none tabular-nums mb-3">
                                {stat.value}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
