import { motion } from 'motion/react';
import { Network, Zap, Radio } from 'lucide-react';

const pillars = [
  {
    icon: Network,
    title: 'Seamless Integration',
    description:
      'Connect with any VMS, access control, or IoT system. Our open API architecture ensures full compatibility with your existing infrastructure — no rip-and-replace required.',
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
    description:
      'Advanced AI-powered analytics detect threats the moment they emerge. Pattern recognition algorithms process thousands of data points per second across every connected feed.',
    features: [
      'Sub-2-second alert generation',
      'Multi-source data correlation',
      'Predictive threat modeling',
    ],
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    icon: Radio,
    title: 'Coordinated Response',
    description:
      'Automated workflows route actionable intelligence to the right personnel instantly. Integrated communication ensures every incident receives a synchronized, documented response.',
    features: [
      'Automated escalation protocols',
      'Multi-channel notifications',
      'Full audit trail & compliance',
    ],
    gradient: 'from-pink-600 to-cyan-600',
  },
];

export function WhyUs() {
  return (
    <section className="relative py-36 bg-linear-to-b from-black via-zinc-950 to-black">
      <div className="max-w-[1500px] mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Why Kingsforth?
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-[700px] mx-auto font-light leading-relaxed">
            The only intelligence platform built for mission-critical environments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-9">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative h-full p-12 rounded-3xl bg-linear-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.09] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40">
                  <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${pillar.gradient} opacity-0 group-hover:opacity-[0.07] blur-2xl transition-opacity duration-500`} />

                  <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${pillar.gradient} mb-9 relative group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${pillar.gradient} blur-xl opacity-40`} />
                  </div>

                  <h3 className="text-[28px] font-bold text-white mb-5 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[17px] text-gray-400 mb-9 leading-relaxed">
                    {pillar.description}
                  </p>

                  <ul className="space-y-3.5">
                    {pillar.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3.5 text-[15px] text-gray-500">
                        <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${pillar.gradient} mt-2 shrink-0`} />
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
