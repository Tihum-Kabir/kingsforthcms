import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Building, Shield, Heart, AlertTriangle, Eye } from 'lucide-react';
import { INDUSTRY_SOLUTIONS, USECASE_SOLUTIONS } from '../data/solutions';

const INDUSTRY_ICONS = [GraduationCap, Building2, Building];
const USECASE_ICONS = [Shield, Heart, AlertTriangle, Eye];

export function SolutionsGrid() {
  return (
    <section className="relative py-36 bg-linear-to-b from-black via-zinc-950 to-black">
      <div className="max-w-[1500px] mx-auto px-8 lg:px-12">

        {/* By Industry */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-36"
        >
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-5 tracking-tight">
              Solutions by Industry
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Tailored AI intelligence systems for your sector
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {INDUSTRY_SOLUTIONS.map((solution, index) => {
              const Icon = INDUSTRY_ICONS[index] ?? GraduationCap;
              return (
                <motion.div
                  key={solution.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/solutions/${solution.slug}`} className="block h-full">
                    <div className="relative h-full p-10 rounded-3xl bg-linear-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.09] hover:border-white/[0.16] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40">
                      <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${solution.gradient} opacity-0 group-hover:opacity-[0.07] blur-2xl transition-opacity duration-500`} />

                      <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${solution.gradient} mb-8 relative group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-9 h-9 text-white" strokeWidth={2} />
                        <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${solution.gradient} blur-xl opacity-40`} />
                      </div>

                      <h3 className="text-[28px] font-bold text-white mb-4 tracking-tight">
                        {solution.title}
                      </h3>
                      <p className="text-[16px] text-gray-400 mb-8 leading-relaxed">
                        {solution.shortDescription}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {solution.keyBenefits.map((benefit) => (
                          <li key={benefit.title} className="flex items-center gap-3 text-[15px] text-gray-500">
                            <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${solution.gradient} shrink-0`} />
                            {benefit.title}
                          </li>
                        ))}
                      </ul>

                      <div className={`text-[15px] font-medium group-hover:gap-3 transition-all duration-200 flex items-center gap-2 bg-linear-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                        Explore Solution
                        <span className="group-hover:translate-x-1 transition-transform inline-block text-violet-400">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* By Use Case */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-5 tracking-tight">
              Solutions by Use Case
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Specialized capabilities for every security scenario
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {USECASE_SOLUTIONS.map((solution, index) => {
              const Icon = USECASE_ICONS[index] ?? Shield;
              return (
                <motion.div
                  key={solution.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/solutions/${solution.slug}`} className="block h-full">
                    <div className="h-full p-8 rounded-2xl bg-linear-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-violet-500/25 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1">
                      <Icon className="w-12 h-12 text-violet-400 mb-7 group-hover:text-violet-300 group-hover:scale-110 transition-all duration-300" strokeWidth={2} />
                      <h3 className="text-[22px] font-bold text-white mb-3 tracking-tight">
                        {solution.title}
                      </h3>
                      <p className="text-[15px] text-gray-500 leading-relaxed mb-5">
                        {solution.heroTagline}
                      </p>
                      <div className="text-[14px] text-violet-400 group-hover:text-violet-300 transition-colors flex items-center gap-1.5 font-medium">
                        Learn more
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
