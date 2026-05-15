import { motion } from 'motion/react';
import { GraduationCap, Building2, Building, Shield, Heart, AlertTriangle, Eye } from 'lucide-react';

export function SolutionsGrid() {
  const industries = [
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'K-12 and higher education security solutions',
      features: ['Campus-wide monitoring', 'Emergency lockdown', 'Visitor management'],
      gradient: 'from-violet-600 to-purple-600',
    },
    {
      icon: Building2,
      title: 'Corporate',
      description: 'Enterprise facility protection and intelligence',
      features: ['Multi-site coordination', 'Executive protection', 'Asset security'],
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      icon: Building,
      title: 'Cities & Government',
      description: 'Public sector safety and infrastructure',
      features: ['Critical infrastructure', 'Public space monitoring', 'Emergency services'],
      gradient: 'from-pink-600 to-cyan-600',
    },
  ];

  const useCases = [
    {
      icon: Shield,
      title: 'Perimeter Security',
      description: 'Advanced boundary detection and intrusion alerts',
    },
    {
      icon: Heart,
      title: 'Medical Emergencies',
      description: 'Rapid health incident detection and response',
    },
    {
      icon: AlertTriangle,
      title: 'Weapons & Violence',
      description: 'Real-time threat detection and neutralization',
    },
    {
      icon: Eye,
      title: 'VSOC Integration',
      description: 'Virtual security operations center connectivity',
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* By Industry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-[64px] font-bold text-white mb-5 tracking-tight">
              Solutions by Industry
            </h2>
            <p className="text-[19px] text-gray-400 font-light leading-relaxed">
              Tailored intelligence systems for your sector
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-full p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-300">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-[0.08] blur-2xl transition-opacity duration-500`}></div>

                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${industry.gradient} mb-8 relative group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.gradient} blur-xl opacity-40`}></div>
                    </div>

                    <h3 className="text-[26px] font-bold text-white mb-4 tracking-tight">
                      {industry.title}
                    </h3>
                    <p className="text-[15px] text-gray-400 mb-8 leading-relaxed">
                      {industry.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {industry.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-[14px] text-gray-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="text-[14px] text-violet-400 group-hover:text-violet-300 transition-colors flex items-center gap-2">
                      Learn more 
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* By Use Case */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-[64px] font-bold text-white mb-5 tracking-tight">
              Solutions by Use Case
            </h2>
            <p className="text-[19px] text-gray-400 font-light leading-relaxed">
              Specialized capabilities for every security scenario
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-sm hover:border-violet-500/20 hover:bg-white/[0.06] transition-all duration-300">
                    <Icon className="w-11 h-11 text-violet-400 mb-6 group-hover:text-violet-300 group-hover:scale-110 transition-all duration-300" strokeWidth={2} />
                    <h3 className="text-[20px] font-bold text-white mb-3 tracking-tight">
                      {useCase.title}
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}