import { motion } from 'motion/react';
import { Network, Zap, Radio } from 'lucide-react';

export function WhyUs() {
  const pillars = [
    {
      icon: Network,
      title: 'Seamless Integration',
      description: 'Connect with any VMS, access control, or IoT system. Our open API architecture ensures compatibility with your existing infrastructure.',
      features: [
        'Universal protocol support',
        'Legacy system compatibility',
        'Cloud & on-premise deployment',
      ],
      gradient: 'from-violet-600 to-purple-600',
    },
    {
      icon: Zap,
      title: 'Real-Time Recognition',
      description: 'Advanced AI-powered analytics detect threats instantly. Pattern recognition algorithms process thousands of data points per second.',
      features: [
        'Sub-second alert generation',
        'Multi-source correlation',
        'Predictive threat modeling',
      ],
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      icon: Radio,
      title: 'Improved Response',
      description: 'Automated workflows route alerts to the right personnel. Integrated communication ensures coordinated incident management.',
      features: [
        'Automated escalation protocols',
        'Multi-channel notifications',
        'Audit trail & compliance',
      ],
      gradient: 'from-pink-600 to-cyan-600',
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-[64px] font-bold text-white mb-5 tracking-tight">
            Why Kingsforth?
          </h2>
          <p className="text-[19px] text-gray-400 max-w-[680px] mx-auto font-light leading-relaxed">
            The only intelligence platform built for mission-critical environments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-300">
                  {/* Gradient Glow */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-[0.08] blur-2xl transition-opacity duration-500`}></div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${pillar.gradient} mb-8 relative group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.gradient} blur-xl opacity-40`}></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-[26px] font-bold text-white mb-4 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] text-gray-400 mb-8 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {pillar.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[14px] text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}