'use client';

import { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Billing = 'monthly' | 'annual';

interface Feature { label: string; included: boolean; note?: string }
interface Tier {
    name: string; tagline?: string; description?: string;
    monthlyPrice: number; isCustomPrice?: boolean;
    annualDiscount?: number;
    isPopular?: boolean; badge?: string;
    ctaLabel?: string; ctaLink?: string;
    features?: Feature[];
}
interface AddOn {
    serviceSlug: string; serviceTitle: string;
    monthlyAddOnPrice: number; annualAddOnPrice?: number;
    description?: string;
}
interface Props { tiers: Tier[]; addOns: AddOn[]; billingNote?: string }

export function PricingClient({ tiers, addOns, billingNote }: Props) {
    const [billing, setBilling] = useState<Billing>('monthly');
    const [selectedPlanIdx, setSelectedPlanIdx] = useState<number | null>(null);
    const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

    const getTierMonthlyPrice = (tier: Tier): number => {
        if (billing === 'annual') {
            const disc = (tier.annualDiscount ?? 20) / 100;
            return Math.round(tier.monthlyPrice * (1 - disc));
        }
        return tier.monthlyPrice;
    };

    const getAddOnPrice = (addon: AddOn): number => {
        if (billing === 'annual') {
            return addon.annualAddOnPrice ?? Math.round(addon.monthlyAddOnPrice * 0.8);
        }
        return addon.monthlyAddOnPrice;
    };

    const toggleAddOn = (slug: string) => {
        setSelectedAddOns(prev => {
            const next = new Set(prev);
            next.has(slug) ? next.delete(slug) : next.add(slug);
            return next;
        });
    };

    const selectPlan = (i: number) => {
        setSelectedPlanIdx(prev => (prev === i ? null : i));
    };

    const selectedTier = selectedPlanIdx !== null ? tiers[selectedPlanIdx] : null;
    const selectedAddOnList = addOns.filter(a => selectedAddOns.has(a.serviceSlug));
    const planMonthly = selectedTier && !selectedTier.isCustomPrice ? getTierMonthlyPrice(selectedTier) : null;
    const addOnTotal = selectedAddOnList.reduce((s, a) => s + getAddOnPrice(a), 0);
    const grandTotal = (planMonthly ?? 0) + addOnTotal;
    const showSummary = selectedTier !== null || selectedAddOns.size > 0;

    return (
        <div className="max-w-5xl mx-auto px-6">

            {/* ── Billing Toggle ── */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex bg-slate-100 dark:bg-white/5 rounded-full p-1.5 border border-slate-200 dark:border-white/10 shadow-lg">
                    {(['monthly', 'annual'] as Billing[]).map((b) => (
                        <button
                            key={b}
                            type="button"
                            onClick={() => setBilling(b)}
                            className={`relative px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                billing === b
                                    ? 'bg-white text-black shadow-md'
                                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            {b === 'monthly' ? 'Monthly' : 'Annual'}
                            {b === 'annual' && (
                                <span className="ml-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                                    Save 20%
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Plan Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                {tiers.map((tier, i) => {
                    const monthly = getTierMonthlyPrice(tier);
                    const isSelected = selectedPlanIdx === i;
                    const isCustom = tier.isCustomPrice;

                    return (
                        <div
                            key={i}
                            onClick={() => !isCustom && selectPlan(i)}
                            className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 ${
                                isCustom ? 'cursor-default' : 'cursor-pointer'
                            } ${
                                isSelected
                                    ? 'border-cyan-500/60 bg-cyan-500/5 shadow-[0_0_40px_rgba(34,211,238,0.08)]'
                                    : tier.isPopular
                                    ? 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 hover:border-slate-400 dark:hover:border-white/30'
                                    : 'border-slate-200 dark:border-white/8 bg-white dark:bg-white/3 hover:border-slate-300 dark:hover:border-white/15 hover:bg-slate-50 dark:hover:bg-white/5'
                            }`}
                        >
                            {isSelected && (
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-500/60 pointer-events-none" />
                            )}

                            {tier.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
                                    {tier.badge}
                                </span>
                            )}

                            {/* Header */}
                            <div className="mb-5">
                                {tier.tagline && (
                                    <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5 text-slate-500 dark:text-gray-500">
                                        {tier.tagline}
                                    </p>
                                )}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                                {tier.description && (
                                    <p className="text-sm mt-1 leading-snug text-slate-600 dark:text-gray-400">{tier.description}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-5">
                                {isCustom ? (
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">Custom</p>
                                ) : (
                                    <>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-slate-900 dark:text-white">৳{monthly.toLocaleString()}</span>
                                            <span className="text-sm font-medium text-slate-500 dark:text-gray-500">/mo</span>
                                        </div>
                                        {billing === 'annual' && (
                                            <p className="text-xs mt-1 text-emerald-600 dark:text-emerald-400">
                                                Save {tier.annualDiscount ?? 20}% vs monthly
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* CTA */}
                            {isCustom ? (
                                <Link
                                    href={tier.ctaLink || '/contact'}
                                    className="w-full text-center py-3 rounded-xl font-semibold text-sm mb-6 transition-all bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 block"
                                >
                                    {tier.ctaLabel || 'Contact Sales'}
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); selectPlan(i); }}
                                    className={`w-full py-3 rounded-xl font-semibold text-sm mb-6 transition-all duration-200 ${
                                        isSelected
                                            ? 'bg-cyan-500 text-black'
                                            : tier.isPopular
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-700 dark:hover:bg-gray-100'
                                            : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10'
                                    }`}
                                >
                                    {isSelected ? '✓ Plan Selected' : (tier.ctaLabel || 'Select Plan')}
                                </button>
                            )}

                            {/* Features */}
                            <ul className="space-y-2.5 flex-1">
                                {tier.features?.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-2.5 text-sm">
                                        {f.included ? (
                                            <Check className="w-4 h-4 mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                                        ) : (
                                            <X className="w-4 h-4 mt-0.5 shrink-0 text-slate-400 dark:text-gray-600" />
                                        )}
                                        <span className={f.included ? 'text-slate-700 dark:text-gray-300' : 'text-slate-400 dark:text-gray-600 line-through'}>
                                            {f.label}
                                            {f.note && <span className="ml-1 text-xs text-slate-500 dark:text-gray-500">({f.note})</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* ── Service Add-Ons ── */}
            {addOns.length > 0 && (
                <div className="mb-10">
                    <div className="mb-2">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add AI Modules</h2>
                        <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">
                            Bundle any combination with your plan.{' '}
                            {billing === 'annual'
                                ? 'Annual prices shown — 20% off monthly rates.'
                                : 'Switch to Annual billing to save 20% on add-ons.'}
                        </p>
                    </div>
                    <div className="border-t border-slate-200 dark:border-white/8 mb-6 mt-4" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {addOns.map((addon) => {
                            const selected = selectedAddOns.has(addon.serviceSlug);
                            const price = getAddOnPrice(addon);
                            return (
                                <button
                                    key={addon.serviceSlug}
                                    type="button"
                                    onClick={() => toggleAddOn(addon.serviceSlug)}
                                    className={`group text-left p-4 rounded-xl border transition-all duration-150 ${
                                        selected
                                            ? 'border-cyan-500/50 bg-cyan-500/5'
                                            : 'border-slate-200 dark:border-white/8 bg-white dark:bg-white/3 hover:border-slate-300 dark:hover:border-white/15 hover:bg-slate-50 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{addon.serviceTitle}</p>
                                            {addon.description && (
                                                <p className="text-xs text-slate-500 dark:text-gray-500 mt-0.5 leading-snug">{addon.description}</p>
                                            )}
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">+৳{price.toLocaleString()}</p>
                                            <p className="text-[10px] text-slate-500 dark:text-gray-500">/mo</p>
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                        selected
                                            ? 'bg-cyan-500 border-cyan-500'
                                            : 'border-slate-300 dark:border-white/20'
                                    }`}>
                                        {selected && <Check className="w-2.5 h-2.5 text-black" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Order Summary ── */}
            <AnimatePresence>
                {showSummary && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="mb-16 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-white/3"
                    >
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/8">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Configuration</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-500 mt-0.5">
                                {billing === 'annual' ? 'Annual billing · 20% savings applied' : 'Monthly billing · cancel anytime'}
                            </p>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {selectedTier && (
                                <div className="flex items-center justify-between px-6 py-3.5">
                                    <div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedTier.name} Plan</span>
                                        {selectedTier.tagline && (
                                            <span className="text-xs text-slate-500 dark:text-gray-500 ml-2">({selectedTier.tagline})</span>
                                        )}
                                    </div>
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                        {selectedTier.isCustomPrice
                                            ? 'Custom'
                                            : `৳${(planMonthly ?? 0).toLocaleString()}/mo`
                                        }
                                    </span>
                                </div>
                            )}
                            {selectedAddOnList.map(a => (
                                <div key={a.serviceSlug} className="flex items-center justify-between px-6 py-3.5">
                                    <span className="text-sm text-slate-700 dark:text-gray-300">{a.serviceTitle}</span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">+৳{getAddOnPrice(a).toLocaleString()}/mo</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between px-6 py-5 bg-slate-50 dark:bg-white/3 border-t border-slate-200 dark:border-white/10">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-gray-500 mb-0.5">Estimated total</p>
                                {selectedTier?.isCustomPrice && selectedAddOnList.length === 0 ? (
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">Custom pricing</span>
                                ) : (
                                    <>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white">
                                                ৳{grandTotal.toLocaleString()}
                                            </span>
                                            <span className="text-slate-500 dark:text-gray-500 text-sm">/mo</span>
                                        </div>
                                        {billing === 'annual' && grandTotal > 0 && (
                                            <p className="text-xs text-slate-500 dark:text-gray-500 mt-0.5">
                                                ৳{(grandTotal * 12).toLocaleString()} billed annually
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:bg-slate-700 dark:hover:bg-gray-100 transition-all shadow-lg shrink-0"
                            >
                                Book Now <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Billing note ── */}
            {billingNote && (
                <p className="text-center text-xs text-slate-500 dark:text-gray-500 mt-2 max-w-xl mx-auto">{billingNote}</p>
            )}
        </div>
    );
}
