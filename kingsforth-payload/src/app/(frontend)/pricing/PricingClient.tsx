'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

type Billing = 'monthly' | 'semiAnnual' | 'annual';

interface Feature { label: string; included: boolean; note?: string }
interface Tier {
    name: string; tagline?: string; description?: string;
    monthlyPrice: number; isCustomPrice?: boolean;
    semiAnnualDiscount?: number; annualDiscount?: number;
    isPopular?: boolean; badge?: string;
    ctaLabel?: string; ctaLink?: string;
    features?: Feature[];
}
interface AddOn {
    serviceSlug: string; serviceTitle: string;
    monthlyAddOnPrice: number; description?: string;
}
interface Props { tiers: Tier[]; addOns: AddOn[]; billingNote?: string }

export function PricingClient({ tiers, addOns, billingNote }: Props) {
    const [billing, setBilling] = useState<Billing>('monthly');
    const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

    const getDiscount = (tier: Tier) =>
        billing === 'semiAnnual' ? (tier.semiAnnualDiscount ?? 10) / 100
        : billing === 'annual' ? (tier.annualDiscount ?? 20) / 100
        : 0;

    const effectiveMonthly = (monthly: number, discount: number) =>
        Math.round(monthly * (1 - discount));

    const toggleAddOn = (slug: string) => {
        const next = new Set(selectedAddOns);
        next.has(slug) ? next.delete(slug) : next.add(slug);
        setSelectedAddOns(next);
    };

    const globalDiscount = billing === 'semiAnnual' ? 0.1 : billing === 'annual' ? 0.2 : 0;
    const selectedList = addOns.filter(a => selectedAddOns.has(a.serviceSlug));
    const addOnMonthlyTotal = selectedList.reduce((s, a) => s + a.monthlyAddOnPrice, 0);
    const effectiveAddOnTotal = Math.round(addOnMonthlyTotal * (1 - globalDiscount));

    return (
        <div className="max-w-5xl mx-auto px-6">

            {/* ── Billing Toggle ── */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex items-center bg-[#f4f4f5] dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-lg p-1 gap-0.5">
                    {(['monthly', 'semiAnnual', 'annual'] as Billing[]).map((b) => {
                        const label = b === 'monthly' ? 'Monthly' : b === 'semiAnnual' ? '6 Months' : 'Yearly';
                        const pct   = b === 'semiAnnual' ? 10 : b === 'annual' ? 20 : 0;
                        const active = billing === b;
                        return (
                            <button
                                key={b}
                                type="button"
                                onClick={() => setBilling(b)}
                                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                                    active
                                        ? 'bg-white dark:bg-[#27272a] text-[#09090b] dark:text-white shadow-sm'
                                        : 'text-[#71717a] hover:text-[#09090b] dark:hover:text-white'
                                }`}
                            >
                                {label}
                                {pct > 0 && (
                                    <span className={`ml-1.5 text-[10px] font-bold ${active ? 'text-emerald-500' : 'text-emerald-500/70'}`}>
                                        -{pct}%
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Plan Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                {tiers.map((tier, i) => {
                    const discount  = getDiscount(tier);
                    const monthly   = effectiveMonthly(tier.monthlyPrice, discount);
                    const isPopular = tier.isPopular;
                    return (
                        <div
                            key={i}
                            className={`relative flex flex-col rounded-xl border p-7 transition-all duration-200 ${
                                isPopular
                                    ? 'bg-[#09090b] dark:bg-white border-[#09090b] dark:border-white text-white dark:text-[#09090b]'
                                    : 'bg-white dark:bg-[#09090b] border-[#e4e4e7] dark:border-[#27272a] text-[#09090b] dark:text-white hover:border-[#a1a1aa] dark:hover:border-[#52525b]'
                            }`}
                        >
                            {tier.badge && (
                                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow ${
                                    isPopular
                                        ? 'bg-white dark:bg-[#09090b] text-[#09090b] dark:text-white'
                                        : 'bg-[#09090b] dark:bg-white text-white dark:text-[#09090b]'
                                }`}>{tier.badge}</span>
                            )}

                            {/* Header */}
                            <div className="mb-5">
                                {tier.tagline && (
                                    <p className={`text-[11px] font-semibold uppercase tracking-widest mb-1.5 ${isPopular ? 'text-[#a1a1aa] dark:text-[#71717a]' : 'text-[#a1a1aa]'}`}>
                                        {tier.tagline}
                                    </p>
                                )}
                                <h3 className="text-xl font-bold">{tier.name}</h3>
                                {tier.description && (
                                    <p className={`text-sm mt-1 leading-snug ${isPopular ? 'text-[#a1a1aa] dark:text-[#71717a]' : 'text-[#71717a]'}`}>
                                        {tier.description}
                                    </p>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-5">
                                {tier.isCustomPrice ? (
                                    <p className="text-3xl font-black">Custom</p>
                                ) : (
                                    <>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black">${monthly.toLocaleString()}</span>
                                            <span className={`text-sm font-medium ${isPopular ? 'text-[#a1a1aa] dark:text-[#71717a]' : 'text-[#a1a1aa]'}`}>/mo</span>
                                        </div>
                                        {billing !== 'monthly' && (
                                            <p className={`text-xs mt-1 ${isPopular ? 'text-[#71717a] dark:text-[#52525b]' : 'text-[#a1a1aa]'}`}>
                                                Billed {billing === 'semiAnnual' ? '6-monthly' : 'annually'} · Save {Math.round(discount * 100)}%
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* CTA */}
                            <Link
                                href={tier.ctaLink || '/contact'}
                                className={`w-full text-center py-2.5 rounded-lg font-semibold text-sm mb-6 transition-opacity hover:opacity-80 block ${
                                    isPopular
                                        ? 'bg-white dark:bg-[#09090b] text-[#09090b] dark:text-white'
                                        : 'bg-[#09090b] dark:bg-white text-white dark:text-[#09090b]'
                                }`}
                            >
                                {tier.ctaLabel || 'Get Started'}
                            </Link>

                            {/* Features */}
                            <ul className="space-y-2.5 flex-1">
                                {tier.features?.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-2.5 text-sm">
                                        {f.included ? (
                                            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isPopular ? 'text-white dark:text-[#09090b]' : 'text-[#09090b] dark:text-white'}`} />
                                        ) : (
                                            <X className={`w-4 h-4 mt-0.5 shrink-0 ${isPopular ? 'text-[#52525b] dark:text-[#a1a1aa]' : 'text-[#d4d4d8] dark:text-[#3f3f46]'}`} />
                                        )}
                                        <span className={!f.included ? (isPopular ? 'text-[#52525b] dark:text-[#a1a1aa]' : 'text-[#d4d4d8] dark:text-[#3f3f46]') : ''}>
                                            {f.label}
                                            {f.note && <span className={`ml-1 text-xs ${isPopular ? 'text-[#71717a] dark:text-[#52525b]' : 'text-[#a1a1aa]'}`}>({f.note})</span>}
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
                <div className="mb-16">
                    <div className="mb-2">
                        <h2 className="text-2xl font-bold text-[#09090b] dark:text-white">Add AI Modules</h2>
                        <p className="text-[#71717a] text-sm mt-1">
                            Bundle any combination of our AI services. Pricing auto-adjusts to your selected billing period.
                        </p>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-[#e4e4e7] dark:border-[#27272a] mb-6 mt-5" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {addOns.map((addon) => {
                            const selected = selectedAddOns.has(addon.serviceSlug);
                            const price    = Math.round(addon.monthlyAddOnPrice * (1 - globalDiscount));
                            return (
                                <button
                                    key={addon.serviceSlug}
                                    type="button"
                                    onClick={() => toggleAddOn(addon.serviceSlug)}
                                    className={`group text-left p-4 rounded-xl border transition-all duration-150 ${
                                        selected
                                            ? 'border-[#09090b] dark:border-white bg-[#09090b]/[0.03] dark:bg-white/[0.04]'
                                            : 'border-[#e4e4e7] dark:border-[#27272a] hover:border-[#a1a1aa] dark:hover:border-[#52525b]'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-[#09090b] dark:text-white truncate">{addon.serviceTitle}</p>
                                            {addon.description && (
                                                <p className="text-xs text-[#71717a] mt-0.5 leading-snug">{addon.description}</p>
                                            )}
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-bold text-[#09090b] dark:text-white">+${price}</p>
                                            <p className="text-[10px] text-[#a1a1aa]">/mo</p>
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                        selected
                                            ? 'bg-[#09090b] dark:bg-white border-[#09090b] dark:border-white'
                                            : 'border-[#d4d4d8] dark:border-[#52525b]'
                                    }`}>
                                        {selected && <Check className="w-2.5 h-2.5 text-white dark:text-[#09090b]" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Add-on summary */}
                    {selectedList.length > 0 && (
                        <div className="mt-4 rounded-xl border border-[#e4e4e7] dark:border-[#27272a] divide-y divide-[#e4e4e7] dark:divide-[#27272a] overflow-hidden">
                            {selectedList.map(a => {
                                const price = Math.round(a.monthlyAddOnPrice * (1 - globalDiscount));
                                return (
                                    <div key={a.serviceSlug} className="flex items-center justify-between px-5 py-3 bg-white dark:bg-[#09090b]">
                                        <span className="text-sm text-[#71717a]">{a.serviceTitle}</span>
                                        <span className="text-sm font-semibold text-[#09090b] dark:text-white">+${price}/mo</span>
                                    </div>
                                );
                            })}
                            <div className="flex items-center justify-between px-5 py-3 bg-[#fafafa] dark:bg-[#18181b]">
                                <span className="text-sm font-bold text-[#09090b] dark:text-white">Add-ons subtotal</span>
                                <div className="text-right">
                                    <span className="text-base font-black text-[#09090b] dark:text-white">+${effectiveAddOnTotal}/mo</span>
                                    {billing !== 'monthly' && (
                                        <p className="text-[10px] text-emerald-500">{Math.round(globalDiscount * 100)}% discount applied</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedList.length === 0 && (
                        <p className="mt-4 text-sm text-[#a1a1aa] text-center py-4">
                            Select modules above to see your add-on subtotal.
                        </p>
                    )}
                </div>
            )}

            {/* ── Billing note ── */}
            {billingNote && (
                <p className="text-center text-xs text-[#a1a1aa] mt-2 max-w-xl mx-auto">{billingNote}</p>
            )}
        </div>
    );
}
