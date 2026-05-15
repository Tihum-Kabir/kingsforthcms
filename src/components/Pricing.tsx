import { motion } from 'motion/react';
import { Check, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';

export function Pricing() {
  const tiers = [
    {
      name: 'Essential',
      tagline: 'For small facilities',
      startingPrice: '$2,999',
      period: '/month',
      features: [
        'Up to 25 camera integrations',
        'Real-time threat detection',
        'Basic facility mapping',
        'Email & SMS alerts',
        '8x5 support',
        'Standard SLA',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
    {
      name: 'Professional',
      tagline: 'Most popular for enterprises',
      startingPrice: '$7,499',
      period: '/month',
      features: [
        'Up to 100 camera integrations',
        'Advanced AI analytics',
        'Interactive facility maps',
        'Multi-channel alerting',
        'VSOC integration',
        '24/7 priority support',
        'Custom workflows',
        'API access',
      ],
      cta: 'Book a Demo',
      highlighted: true,
      badge: 'RECOMMENDED',
    },
    {
      name: 'Enterprise',
      tagline: 'For multi-site deployments',
      startingPrice: 'Custom',
      period: '',
      features: [
        'Unlimited camera integrations',
        'Dedicated AI model training',
        'GIS mapping integration',
        'White-label options',
        'Dedicated account team',
        '99.99% uptime SLA',
        'On-premise deployment option',
        'Advanced compliance tools',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-[64px] font-bold text-white mb-5 tracking-tight">
            Consultative Pricing
          </h2>
          <p className="text-[19px] text-gray-400 max-w-[680px] mx-auto mb-8 font-light leading-relaxed">
            Enterprise-grade security tailored to your infrastructure
          </p>
          
          {/* Education Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <GraduationCap className="w-4 h-4 text-cyan-400" strokeWidth={2} />
            <span className="text-[13px] font-medium text-cyan-300">Special pricing available for educational institutions</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${tier.highlighted ? 'md:-mt-6 md:mb-6' : ''}`}
            >
              {tier.badge && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 text-[11px] font-bold text-white uppercase tracking-wider">
                    {tier.badge}
                  </div>
                </div>
              )}

              <div
                className={`relative h-full p-10 rounded-3xl backdrop-blur-sm transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-cyan-500/10 border-2 border-violet-500/30 shadow-2xl shadow-violet-500/10'
                    : 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-white/[0.12]'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/5 to-cyan-600/5 blur-2xl"></div>
                )}

                <div className="relative">
                  <h3 className="text-[28px] font-bold text-white mb-2 tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="text-[14px] text-gray-500 mb-8">
                    {tier.tagline}
                  </p>

                  <div className="mb-10">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[13px] text-gray-500 uppercase tracking-wider">Starting at</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[48px] font-bold text-white leading-none">
                        {tier.startingPrice}
                      </span>
                      <span className="text-[16px] text-gray-500">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-[15px] text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full h-12 text-[15px] font-medium ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-500/25'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] hover:border-white/[0.12]'
                    } transition-all duration-200`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[13px] text-gray-600 leading-relaxed max-w-[900px] mx-auto">
          All plans include secure data encryption, compliance reporting, and quarterly system reviews. 
          <br />
          Custom solutions available for unique requirements.
        </p>
      </div>
    </section>
  );
}