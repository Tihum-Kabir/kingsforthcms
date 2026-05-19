import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Building2, Building, Shield, Heart, AlertTriangle, Eye } from 'lucide-react';
import { INDUSTRY_SOLUTIONS, USECASE_SOLUTIONS } from '../data/solutions';

const INDUSTRY_ICONS = [GraduationCap, Building2, Building];
const USECASE_ICONS = [Shield, Heart, AlertTriangle, Eye];

type Tab = 'industry' | 'use-case';

export function SolutionsPage() {
  const [tab, setTab] = useState<Tab>('industry');

  const currentSolutions = tab === 'industry' ? INDUSTRY_SOLUTIONS : USECASE_SOLUTIONS;
  const currentIcons = tab === 'industry' ? INDUSTRY_ICONS : USECASE_ICONS;

  return (
    <section className="relative min-h-screen pt-36 pb-32 bg-linear-to-b from-black via-zinc-950 to-black">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <span className="text-[13px] font-semibold text-violet-300 uppercase tracking-widest">
              Intelligence by Context
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-[88px] font-bold text-white mb-6 tracking-tight leading-none">
            Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-[700px] mx-auto font-light leading-relaxed">
            Tailored AI intelligence systems for your industry and specific operational requirements.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-16"
        >
          <div className="flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
            {(['industry', 'use-case'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                  tab === t
                    ? 'bg-linear-to-r from-violet-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t === 'industry' ? 'By Industry' : 'By Use Case'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Solutions grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentSolutions.map((solution, index) => {
              const Icon = currentIcons[index] ?? Shield;
              return (
                <motion.div
                  key={solution.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group"
                >
                  <Link to={`/solutions/${solution.slug}`} className="block h-full">
                    <div className="relative h-full p-10 rounded-3xl bg-linear-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.09] hover:border-white/[0.18] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40">
                      <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${solution.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${solution.gradient} mb-8 relative group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                        <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${solution.gradient} blur-xl opacity-40`} />
                      </div>

                      {/* Category label */}
                      <div className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-3">
                        {tab === 'industry' ? 'Industry Solution' : 'Use Case'}
                      </div>

                      <h2 className="text-[30px] lg:text-[34px] font-bold text-white mb-4 tracking-tight leading-tight">
                        {solution.title}
                      </h2>
                      <p className="text-[16px] text-gray-400 mb-8 leading-relaxed">
                        {solution.shortDescription}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {solution.stats.slice(0, 2).map((stat) => (
                          <div key={stat.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className={`text-[20px] font-bold mb-1 bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                              {stat.value}
                            </div>
                            <div className="text-[12px] text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Key benefits pills */}
                      <div className="space-y-2 mb-8">
                        {solution.keyBenefits.map((b) => (
                          <div key={b.title} className="flex items-center gap-2 text-[13px] text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${solution.gradient} shrink-0`} />
                            {b.title}
                          </div>
                        ))}
                      </div>

                      <div className={`flex items-center gap-2 text-[15px] font-medium group-hover:gap-3 transition-all duration-200 bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                        Explore Solution
                        <ArrowRight className="w-4 h-4 text-violet-400 shrink-0" strokeWidth={2} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

