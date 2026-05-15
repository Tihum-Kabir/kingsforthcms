import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function Navigation() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const solutions = [
    {
      category: 'By Industry',
      items: [
        { name: 'Education', desc: 'K-12 and Higher Education security' },
        { name: 'Corporate', desc: 'Enterprise facility protection' },
        { name: 'Cities & Government', desc: 'Public sector safety solutions' },
      ],
    },
    {
      category: 'By Use Case',
      items: [
        { name: 'Perimeter Security', desc: 'Advanced boundary detection' },
        { name: 'Medical Emergencies', desc: 'Rapid health incident response' },
        { name: 'Weapons & Violence', desc: 'Threat detection systems' },
        { name: 'VSOC Integration', desc: 'Virtual security operations' },
      ],
    },
  ];

  const resources = [
    { name: 'White Papers', desc: 'Industry insights and research' },
    { name: 'Case Studies', desc: 'Real-world deployment examples' },
    { name: 'Documentation', desc: 'Technical specifications' },
    { name: 'Blog', desc: 'Latest security trends' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-7 h-7 text-violet-500" strokeWidth={2} />
            <div className="absolute inset-0 bg-violet-500 blur-lg opacity-40"></div>
          </div>
          <span className="text-[17px] font-semibold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-[Bevan]">
            KINGSFORTH
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[15px] text-gray-300 hover:text-white transition-colors duration-200 py-1.5">
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            <motion.div
              className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: solutionsOpen ? 1 : 0, opacity: solutionsOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: 'left' }}
            />

            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] bg-zinc-950/98 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl shadow-black/40"
                >
                  <div className="grid grid-cols-2 gap-10">
                    {solutions.map((section) => (
                      <div key={section.category}>
                        <h3 className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider mb-4">
                          {section.category}
                        </h3>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <a
                              key={item.name}
                              href="#"
                              className="block px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-150 group"
                            >
                              <div className="text-[14px] font-medium text-white group-hover:text-violet-400 transition-colors mb-0.5">
                                {item.name}
                              </div>
                              <div className="text-[13px] text-gray-500 leading-snug">
                                {item.desc}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[15px] text-gray-300 hover:text-white transition-colors duration-200 py-1.5">
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            <motion.div
              className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: resourcesOpen ? 1 : 0, opacity: resourcesOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: 'left' }}
            />

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[340px] bg-zinc-950/98 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl shadow-black/40"
                >
                  <div className="space-y-1">
                    {resources.map((item) => (
                      <a
                        key={item.name}
                        href="#"
                        className="block px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-150 group"
                      >
                        <div className="text-[14px] font-medium text-white group-hover:text-cyan-400 transition-colors mb-0.5">
                          {item.name}
                        </div>
                        <div className="text-[13px] text-gray-500 leading-snug">{item.desc}</div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#pricing" className="text-[15px] text-gray-300 hover:text-white transition-colors duration-200 py-1.5">
            Pricing
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="text-[15px] text-gray-300 hover:text-white hover:bg-white/[0.04] h-10 px-5 transition-all duration-200"
          >
            Login
          </Button>
          <Button className="text-[15px] h-10 px-6 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white font-medium shadow-lg shadow-violet-500/25 transition-all duration-200">
            Book a Demo
          </Button>
        </div>
      </div>
    </nav>
  );
}