import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Tag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface Plan {
  name: string;
  tagline: string;
  price: number | 'Custom';
  features: string[];
  isRecommended?: boolean;
  badge?: string;
  cta: string;
  ctaLink: string;
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: 'Plus',
    tagline: 'For focused deployments',
    price: 799,
    features: [
      'Core AI module (single service)',
      'Up to 50 camera feeds or sensors',
      'Standard alert workflows',
      'Basic analytics dashboard',
      '5 user seats',
      'Email & SMS notifications',
      '99.5% uptime SLA',
      'Business hours support',
    ],
    isRecommended: false,
    cta: 'Get Started',
    ctaLink: '/services',
  },
  {
    name: 'Pro',
    tagline: 'For enterprise operations',
    price: 2999,
    features: [
      'Up to 3 AI modules',
      'Up to 200 camera feeds or sensors',
      'Custom alert & response workflows',
      'Advanced analytics & reporting',
      '25 user seats',
      'REST API access',
      'VMS & access control integration',
      '24/7 priority support',
      '99.9% uptime SLA',
    ],
    isRecommended: true,
    badge: 'Most Popular',
    cta: 'Get Started',
    ctaLink: '/services',
  },
  {
    name: 'Enterprise',
    tagline: 'For mission-critical systems',
    price: 'Custom',
    features: [
      'All AI modules included',
      'Unlimited cameras & sensors',
      'Dedicated AI model training',
      'On-premise deployment option',
      'Unlimited user seats',
      'Custom SLA up to 99.99%',
      'Dedicated account & support team',
      'White-label options',
    ],
    isRecommended: false,
    cta: 'Contact Sales',
    ctaLink: 'mailto:info@kingsforth.net',
  },
];

export function Pricing() {
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [editingDiscount, setEditingDiscount] = useState<string | null>(null);
  const [discountInput, setDiscountInput] = useState('');

  const applyDiscount = (planName: string) => {
    const val = Math.min(90, Math.max(0, Number(discountInput) || 0));
    setDiscounts((prev) => ({ ...prev, [planName]: val }));
    setEditingDiscount(null);
    setDiscountInput('');
  };

  const displayPrice = (price: number | 'Custom', planName: string) => {
    if (price === 'Custom') return null;
    const disc = discounts[planName] ?? 0;
    return disc > 0 ? Math.round(price * (1 - disc / 100)) : price;
  };

  return (
    <section id="pricing" className="relative py-36 bg-linear-to-b from-black via-zinc-950 to-black">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-violet-700/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1300px] mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <span className="text-[13px] font-semibold text-violet-300 uppercase tracking-widest">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Simple, Monthly Plans
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-[680px] mx-auto font-light leading-relaxed">
            Start with a base plan, add the AI modules your operation needs. Scale up or down at any time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {DEFAULT_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col ${plan.isRecommended ? 'md:-mt-6 md:mb-6' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-5 py-1.5 rounded-full bg-linear-to-r from-violet-600 via-purple-600 to-cyan-600 text-[11px] font-bold text-white uppercase tracking-widest shadow-lg shadow-violet-500/20">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className={`relative flex flex-col flex-1 p-10 rounded-3xl backdrop-blur-sm transition-all duration-300 ${
                plan.isRecommended
                  ? 'bg-linear-to-br from-violet-500/10 via-purple-500/5 to-cyan-500/10 border-2 border-violet-500/30 shadow-2xl shadow-violet-500/10'
                  : 'bg-linear-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.09] hover:border-white/[0.15]'
              }`}>
                {plan.isRecommended && (
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-violet-600/5 to-cyan-600/5 blur-3xl" />
                )}

                <div className="relative flex flex-col flex-1">
                  <h3 className="text-[36px] font-bold text-white mb-1.5 tracking-tight">{plan.name}</h3>
                  <p className="text-[15px] text-gray-500 mb-10">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.price === 'Custom' ? (
                      <div className="text-[48px] font-bold text-white leading-none mb-1">Custom</div>
                    ) : (
                      <>
                        {(discounts[plan.name] ?? 0) > 0 && (
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[20px] text-gray-600 line-through">${(plan.price as number).toLocaleString()}</span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-linear-to-r from-violet-600 to-cyan-600 text-white">
                              <Tag className="w-3 h-3" />
                              {discounts[plan.name]}% OFF
                            </span>
                          </div>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span className="text-[52px] font-bold text-white leading-none">
                            ${displayPrice(plan.price, plan.name)!.toLocaleString()}
                          </span>
                          <span className="text-[17px] text-gray-500">/month</span>
                        </div>
                      </>
                    )}
                    <div className="text-[13px] text-gray-600 mt-2">Billed monthly · Cancel anytime</div>
                  </div>

                  {/* Discount setter */}
                  {plan.price !== 'Custom' && (
                    <div className="mb-8">
                      {editingDiscount === plan.name ? (
                        <div className="flex items-center gap-2 flex-wrap">
                          <input
                            type="number"
                            min="0"
                            max="90"
                            value={discountInput}
                            onChange={(e) => setDiscountInput(e.target.value)}
                            placeholder="0–90"
                            className="w-20 h-9 px-3 rounded-lg bg-white/[0.07] border border-white/10 text-white text-[14px] focus:outline-none focus:border-violet-500/50"
                            autoFocus
                          />
                          <span className="text-gray-500 text-[13px]">% off</span>
                          <button
                            type="button"
                            onClick={() => applyDiscount(plan.name)}
                            className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-white bg-linear-to-r from-violet-600 to-cyan-600"
                          >
                            Apply
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingDiscount(null)}
                            className="text-gray-600 text-[12px] hover:text-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => { setEditingDiscount(plan.name); setDiscountInput(String(discounts[plan.name] ?? 0)); }}
                          className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          <Tag className="w-3.5 h-3.5" />
                          {(discounts[plan.name] ?? 0) > 0 ? `${discounts[plan.name]}% discount applied · Edit` : 'Set Discount'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3.5">
                        <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-[15px] text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.ctaLink.startsWith('mailto:') ? (
                    <a href={plan.ctaLink}>
                      <Button
                        className={`w-full h-13 text-[16px] font-semibold tracking-wide transition-all duration-200 ${
                          plan.isRecommended
                            ? 'bg-linear-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-500/25'
                            : 'bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/[0.1] hover:border-white/[0.18]'
                        }`}
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                      </Button>
                    </a>
                  ) : (
                    <Link to={plan.ctaLink}>
                      <Button
                        className={`w-full h-13 text-[16px] font-semibold tracking-wide transition-all duration-200 ${
                          plan.isRecommended
                            ? 'bg-linear-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-500/25'
                            : 'bg-white/[0.05] hover:bg-white/[0.09] text-white border border-white/[0.1] hover:border-white/[0.18]'
                        }`}
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-[14px] text-gray-600 leading-relaxed max-w-[800px] mx-auto"
        >
          All plans include AES-256 encryption, onboarding support, and compliance reporting.
          Custom solutions available for unique operational requirements.{' '}
          <a href="mailto:info@kingsforth.net" className="text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors">
            Contact us
          </a>{' '}
          for volume discounts and multi-year agreements.
        </motion.p>
      </div>
    </section>
  );
}
