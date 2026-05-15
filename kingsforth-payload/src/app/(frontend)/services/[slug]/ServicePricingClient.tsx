'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type BillingPeriod = 'monthly' | 'semiAnnual' | 'annual';

interface Plan {
    name: string;
    monthlyPrice: number;
    semiAnnualPrice?: number;
    annualPrice?: number;
    description?: string;
    isPopular?: boolean;
    badge?: string;
    planFeatures?: { feature: string; included?: boolean }[];
}

interface Props {
    plans: Plan[];
    serviceTitle: string;
}

export function ServicePricingSection({ plans, serviceTitle }: Props) {
    const [billing, setBilling] = useState<BillingPeriod>('monthly');

    const getPrice = (plan: Plan): number => {
        switch (billing) {
            case 'semiAnnual':
                return plan.semiAnnualPrice || plan.monthlyPrice * 6;
            case 'annual':
                return plan.annualPrice || plan.monthlyPrice * 12;
            default:
                return plan.monthlyPrice;
        }
    };

    const getLabel = (): string => {
        switch (billing) {
            case 'semiAnnual': return '/6 mo';
            case 'annual': return '/yr';
            default: return '/mo';
        }
    };

    const checkSavingsForPeriod = (plan: Plan, period: BillingPeriod): number | null => {
        if (period === 'monthly' || plan.monthlyPrice === 0) return null;
        const fullPrice = plan.monthlyPrice * (period === 'semiAnnual' ? 6 : 12);
        const discounted = period === 'semiAnnual' 
            ? (plan.semiAnnualPrice || plan.monthlyPrice * 6)
            : (plan.annualPrice || plan.monthlyPrice * 12);
            
        if (discounted >= fullPrice || discounted === 0) return null;
        return Math.round(((fullPrice - discounted) / fullPrice) * 100);
    };

    const getSavings = (plan: Plan): number | null => {
        return checkSavingsForPeriod(plan, billing);
    };

    const hasAnyAnnualSavings = plans.some(p => checkSavingsForPeriod(p, 'annual') !== null);
    const hasAnySemiAnnualSavings = plans.some(p => checkSavingsForPeriod(p, 'semiAnnual') !== null);

    return (
        <section className="max-w-350 mx-auto px-6 py-12">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black text-[#111827] dark:text-white mb-4">
                    Choose Your Plan
                </h2>
                <p className="text-[#6b7280] dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Flexible pricing for {serviceTitle}. Scale as your operations grow.
                </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-14">
                <div className="inline-flex bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-full p-1.5 border border-[#e5e7eb] dark:border-white/10 shadow-lg dark:shadow-2xl">
                    {[
                        { key: 'monthly' as BillingPeriod, label: 'Monthly' },
                        { key: 'semiAnnual' as BillingPeriod, label: '6 Months' },
                        { key: 'annual' as BillingPeriod, label: 'Yearly' },
                    ].map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setBilling(opt.key)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                billing === opt.key
                                    ? 'bg-[#111827] dark:bg-white text-white dark:text-black shadow-md'
                                    : 'text-[#6b7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white'
                            }`}
                        >
                            {opt.label}
                            {opt.key === 'annual' && hasAnyAnnualSavings && (
                                <span className="ml-1.5 text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase">Save</span>
                            )}
                            {opt.key === 'semiAnnual' && hasAnySemiAnnualSavings && (
                                <span className="ml-1.5 text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase">Save</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pricing Cards */}
            <div className={`grid gap-6 ${plans.length === 3 ? 'grid-cols-1 md:grid-cols-3' : plans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 max-w-lg mx-auto'}`}>
                <AnimatePresence>
                    {plans.map((plan, i) => {
                        const price = getPrice(plan);
                        const savings = getSavings(plan);

                        return (
                                <motion.div
                                key={`${plan.name}-${billing}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className={`relative rounded-3xl p-8 md:p-10 flex flex-col border transition-all duration-500 ${
                                    plan.isPopular
                                        ? 'bg-white dark:bg-white/[0.08] border-[#22d3ee] dark:border-cyan-500/40 shadow-2xl dark:shadow-[0_0_40px_rgba(34,211,238,0.1)] md:-translate-y-4 relative z-10'
                                        : 'bg-gray-50/80 dark:bg-black/40 border-[#e5e7eb] dark:border-white/10 hover:border-[#d1d5db] dark:hover:border-white/20 hover:bg-white dark:hover:bg-black/60'
                                } backdrop-blur-xl`}
                            >
                                {/* Badge */}
                                {(plan.badge || plan.isPopular) && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-5 rounded-full shadow-lg">
                                            {plan.badge || 'Recommended'}
                                        </span>
                                    </div>
                                )}

                                {/* Plan name */}
                                <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">{plan.name}</h3>
                                {plan.description && (
                                    <p className="text-[#6b7280] dark:text-gray-500 text-sm mb-6 leading-relaxed">{plan.description}</p>
                                )}

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-[#111827] dark:text-white">
                                            {price === 0 ? 'Custom' : `$${price.toLocaleString()}`}
                                        </span>
                                        {price !== 0 && <span className="text-[#6b7280] dark:text-gray-500 font-medium">{getLabel()}</span>}
                                    </div>
                                    {savings && (
                                        <span className="inline-block mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                                            Save {savings}%
                                        </span>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3.5 mb-10 flex-1">
                                    {plan.planFeatures?.map((f, fi) => (
                                        <li key={fi} className="flex items-start gap-3">
                                            {f.included !== false ? (
                                                <Check className="w-5 h-5 text-cyan-500 dark:text-cyan-400 mt-0.5 shrink-0" />
                                            ) : (
                                                <X className="w-5 h-5 text-[#9ca3af] dark:text-gray-600 mt-0.5 shrink-0" />
                                            )}
                                            <span className={`text-sm ${f.included !== false ? 'text-[#4b5563] dark:text-gray-300' : 'text-[#9ca3af] dark:text-gray-600 line-through'}`}>
                                                {f.feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button — always routes to /contact */}
                                <Link
                                    href="/contact"
                                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                                        plan.isPopular
                                            ? 'bg-[#111827] dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 shadow-xl'
                                            : 'bg-white dark:bg-white/5 text-[#111827] dark:text-white border border-[#d1d5db] dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm dark:shadow-none'
                                    }`}
                                >
                                    {price === 0 || plan.name?.toLowerCase().includes('enterprise')
                                        ? <><PhoneCall className="w-4 h-4" /> Contact Sales</>
                                        : <><ArrowRight className="w-4 h-4" /> Get Started</>
                                    }
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
}
