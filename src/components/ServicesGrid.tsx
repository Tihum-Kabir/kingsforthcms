import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Database, Eye, Zap, Bot, Cpu, TrendingUp, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services';

const SERVICE_ICONS = [Database, Eye, Zap, Bot, Cpu, TrendingUp];

export function ServicesGrid() {
  return (
    <section className="relative py-36 bg-linear-to-b from-black via-zinc-950 to-black">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-7">
            <span className="text-[13px] font-semibold text-violet-300 uppercase tracking-widest">
              Core Capabilities
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
            Everything We Deploy
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-[680px] mx-auto font-light leading-relaxed">
            Six sovereign-grade intelligence products for surveillance, forensics, autonomous response, and enterprise AI.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Database;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group"
              >
                <Link to={`/services/${service.slug}`} className="block h-full">
                  <div className="relative h-full p-10 rounded-3xl bg-linear-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.09] hover:border-white/[0.17] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 flex flex-col">
                    {/* Gradient hover glow */}
                    <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.07] blur-2xl transition-opacity duration-500`} />

                    {/* Icon */}
                    <div className={`relative inline-flex p-4 rounded-2xl bg-linear-to-br ${service.gradient} mb-8 w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${service.gradient} blur-xl opacity-40`} />
                    </div>

                    {/* Category label */}
                    <div className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-3">
                      {service.category}
                    </div>

                    <h3 className="text-[28px] lg:text-[32px] font-bold text-white mb-4 tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[15px] text-gray-400 mb-8 leading-relaxed flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Key metrics (first 2) */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.keyMetrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                          <div className={`text-[20px] font-bold mb-1 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`}>
                            {m.value}
                          </div>
                          <div className="text-[11px] text-gray-500 leading-snug">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className={`flex items-center gap-2 text-[15px] font-semibold group-hover:gap-3 transition-all duration-200 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      Explore Capabilities
                      <ArrowRight className="w-4 h-4 text-violet-400 shrink-0" strokeWidth={2} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-[15px] font-semibold text-white border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.04] transition-all duration-200"
          >
            View All Services
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
