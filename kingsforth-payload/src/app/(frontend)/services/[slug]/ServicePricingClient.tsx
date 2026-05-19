'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, PhoneCall, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type BillingPeriod = 'monthly' | 'annual';

interface Plan {
    name: string;
    monthlyPrice: number;
    annualPrice?: number;
    description?: string;
    isPopular?: boolean;
    badge?: string;
    discountNote?: string;
    ctaLabel?: string;
    planFeatures?: { feature: string; included?: boolean }[];
}

interface Props {
    plans: Plan[];
    serviceTitle: string;
}

export function ServicePricingSection({ plans, serviceTitle }: Props) {
    const [billing, setBilling] = useState<BillingPeriod>('monthly');

    const isEnterprise = (plan: Plan) =>
        plan.monthlyPrice === 0 || plan.name?.toLowerCase() === 'enterprise';

    const getPrice = (plan: Plan): number | null => {
        if (isEnterprise(plan)) return null;
        if (billing === 'annual') return plan.annualPrice ?? plan.monthlyPrice * 12;
        return plan.monthlyPrice;
    };

    const getAutoSavings = (plan: Plan): number | null => {
        if (isEnterprise(plan) || billing !== 'annual') return null;
        if (!plan.annualPrice || plan.monthlyPrice === 0) return null;
        const full = plan.monthlyPrice * 12;
        if (plan.annualPrice >= full) return null;
        return Math.round(((full - plan.annualPrice) / full) * 100);
    };

    const hasAnyAnnualSavings = plans.some(
        (p) => !isEnterprise(p) && p.annualPrice && p.annualPrice < p.monthlyPrice * 12,
    );

    return (
        <section className="max-w-350 mx-auto px-6 py-16">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-600 dark:text-cyan-400">Pricing</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                    Choose Your Plan
                </h2>
                <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Flexible pricing for {serviceTitle}. Scale as your operations grow.
                </p>
            </div>

            {/* Billing Toggle — Monthly / Annual */}
            <div className="flex justify-center mb-14">
                <div className="inline-flex bg-slate-100 dark:bg-white/5 rounded-full p-1.5 border border-slate-200 dark:border-white/10 shadow-lg">
                    {([
                        { key: 'monthly' as BillingPeriod, label: 'Monthly' },
                        { key: 'annual' as BillingPeriod, label: 'Annual' },
                    ] as const).map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setBilling(opt.key)}
                            className={`relative px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                billing === opt.key
                                    ? 'bg-white text-black shadow-md'
                                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            {opt.label}
                            {opt.key === 'annual' && hasAnyAnnualSavings && (
                                <span className="ml-1.5 text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wide">
                                    Save
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cards */}
            <div
                className={`grid gap-6 ${
                    plans.length === 3
                        ? 'grid-cols-1 md:grid-cols-3'
                        : plans.length === 2
                        ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                        : 'grid-cols-1 max-w-lg mx-auto'
                }`}
            >
                <AnimatePresence mode="wait">
                    {plans.map((plan, i) => {
                        const enterprise = isEnterprise(plan);
                        const price = getPrice(plan);
                        const autoSavings = getAutoSavings(plan);
                        const featured = plan.isPopular;

                        return (
                            <motion.div
                                key={`${plan.name}-${billing}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.28, delay: i * 0.08 }}
                                className={`relative rounded-3xl p-8 md:p-10 flex flex-col border transition-all duration-500 ${
                                    featured
                                        ? 'bg-white/7 border-cyan-500/40 shadow-[0_0_50px_rgba(34,211,238,0.12)] md:-translate-y-5 z-10'
                                        : 'bg-white dark:bg-white/3 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/6'
                                }`}
                            >
                                {/* Featured badge */}
                                {(plan.badge || featured) && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-linear-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold uppercase tracking-widest py-1.5 px-5 rounded-full shadow-lg whitespace-nowrap">
                                            {plan.badge || 'Recommended'}
                                        </span>
                                    </div>
                                )}

                                {/* Plan name + description */}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">{plan.name}</h3>
                                {plan.description && (
                                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">{plan.description}</p>
                                )}

                                {/* Price block */}
                                <div className="mb-8">
                                    {enterprise ? (
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-black text-slate-900 dark:text-white">Custom</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-5xl font-black text-slate-900 dark:text-white">
                                                ৳{(price ?? 0).toLocaleString()}
                                            </span>
                                            <span className="text-gray-500 font-medium">
                                                {billing === 'annual' ? '/yr' : '/mo'}
                                            </span>
                                        </div>
                                    )}

                                    {/* Auto-calculated savings badge */}
                                    {autoSavings !== null && (
                                        <span className="inline-flex items-center gap-1 mt-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                                            Save {autoSavings}% vs monthly
                                        </span>
                                    )}

                                    {/* Admin-set discount note (shows regardless of billing period) */}
                                    {plan.discountNote && !autoSavings && (
                                        <span className="inline-flex items-center gap-1 mt-2.5 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-500/20">
                                            {plan.discountNote}
                                        </span>
                                    )}
                                </div>

                                {/* Feature list */}
                                {plan.planFeatures && plan.planFeatures.length > 0 && (
                                    <ul className="space-y-3.5 mb-10 flex-1">
                                        {plan.planFeatures.map((f, fi) => (
                                            <li key={fi} className="flex items-start gap-3">
                                                {f.included !== false ? (
                                                    <Check className="w-5 h-5 text-cyan-500 dark:text-cyan-400 mt-0.5 shrink-0" />
                                                ) : (
                                                    <X className="w-5 h-5 text-slate-400 dark:text-gray-600 mt-0.5 shrink-0" />
                                                )}
                                                <span
                                                    className={`text-sm leading-relaxed ${
                                                        f.included !== false
                                                            ? 'text-slate-700 dark:text-gray-300'
                                                            : 'text-slate-400 dark:text-gray-600 line-through'
                                                    }`}
                                                >
                                                    {f.feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* CTA */}
                                <Link
                                    href="/contact"
                                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${
                                        featured
                                            ? 'bg-white text-black hover:bg-gray-100 shadow-xl'
                                            : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 shadow-sm'
                                    }`}
                                >
                                    {enterprise ? (
                                        <><PhoneCall className="w-4 h-4" /> {plan.ctaLabel || 'Contact Sales'}</>
                                    ) : (
                                        <><ArrowRight className="w-4 h-4" /> {plan.ctaLabel || 'Get Started'}</>
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
}
