import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Eye, Zap, Bot, Cpu, TrendingUp } from 'lucide-react';
import { SERVICES } from '../data/services';

const SERVICE_ICONS = [Database, Eye, Zap, Bot, Cpu, TrendingUp];

const ACCENT_MAP: Record<string, string> = {
  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
};

export function ServicesPage() {
  return (
    <section className="relative min-h-screen pt-36 pb-32 bg-linear-to-b from-black via-zinc-950 to-black">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <span className="text-[13px] font-semibold text-violet-300 uppercase tracking-widest">
              Deployable Assets
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-[88px] font-bold text-white mb-6 tracking-tight leading-none">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-[720px] mx-auto font-light leading-relaxed">
            A comprehensive suite of sovereign-grade intelligence tools designed for the autonomous enterprise.
          </p>
        </motion.div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Database;
            const accentClass = ACCENT_MAP[service.accentColor] ?? ACCENT_MAP.violet;

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group"
              >
                <Link to={`/services/${service.slug}`} className="block h-full">
                  <div className="relative h-full p-10 rounded-3xl bg-linear-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.09] hover:border-white/[0.18] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40">
                    {/* Gradient glow */}
                    <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

                    {/* Category badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-semibold uppercase tracking-wider mb-7 ${accentClass}`}>
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                      {service.category}
                    </div>

                    <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-3 tracking-tight leading-snug">
                      {service.title}
                    </h2>
                    <p className="text-[16px] text-gray-400 mb-8 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Key metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.keyMetrics.slice(0, 2).map((metric) => (
                        <div key={metric.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                          <div className={`text-[22px] font-bold mb-1 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`}>
                            {metric.value}
                          </div>
                          <div className="text-[12px] text-gray-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.features.slice(0, 3).map((f) => (
                        <span key={f.title} className="px-3 py-1.5 rounded-full text-[12px] text-gray-400 bg-white/[0.04] border border-white/[0.06]">
                          {f.title}
                        </span>
                      ))}
                    </div>

                    <div className={`flex items-center gap-2 text-[15px] font-medium group-hover:gap-3 transition-all duration-200 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      Deploy Solution
                      <ArrowRight className={`w-4 h-4 shrink-0 bg-linear-to-r ${service.gradient} bg-clip-text`} strokeWidth={2} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

