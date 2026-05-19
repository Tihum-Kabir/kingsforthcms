import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Cpu } from 'lucide-react';
import { Button } from './ui/button';
import { SERVICES } from '../data/services';
import { INDUSTRY_SOLUTIONS, USECASE_SOLUTIONS } from '../data/solutions';

const SERVICE_ICON_COLORS = ['cyan', 'violet', 'rose', 'emerald', 'amber', 'indigo'];

export function Navigation() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/92 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="max-w-[1500px] mx-auto px-8 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Cpu className="w-7 h-7 text-violet-500 group-hover:text-violet-400 transition-colors" strokeWidth={2} />
            <div className="absolute inset-0 bg-violet-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          </div>
          <span className="text-[18px] font-semibold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-[Bevan]">
            KINGSFORTH
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-10">

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button type="button" className={`flex items-center gap-1.5 text-[15px] transition-colors duration-200 py-2 ${isActive('/services') ? 'text-violet-400' : 'text-gray-300 hover:text-white'}`}>
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isActive('/services') && (
              <motion.div
                className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-linear-to-r from-violet-500 via-purple-500 to-cyan-500"
                layoutId="nav-underline-services"
              />
            )}

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[780px] bg-zinc-950/98 backdrop-blur-2xl border border-white/[0.09] rounded-2xl p-8 shadow-2xl shadow-black/60"
                >
                  <div className="mb-5">
                    <h3 className="text-[11px] font-bold text-violet-400 uppercase tracking-widest mb-4">
                      Deployable Assets
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="block px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-colors duration-150 group border border-transparent hover:border-white/[0.08]"
                        >
                          <div className="text-[14px] font-semibold text-white group-hover:text-violet-400 transition-colors mb-1 truncate">
                            {service.title}
                          </div>
                          <div className="text-[12px] text-gray-600 truncate">{service.category}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06]">
                    <Link
                      to="/services"
                      onClick={() => setServicesOpen(false)}
                      className="inline-flex items-center gap-2 text-[13px] font-medium text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      View all services →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solutions dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button type="button" className={`flex items-center gap-1.5 text-[15px] transition-colors duration-200 py-2 ${isActive('/solutions') ? 'text-violet-400' : 'text-gray-300 hover:text-white'}`}>
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isActive('/solutions') && (
              <motion.div
                className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-linear-to-r from-violet-500 via-purple-500 to-cyan-500"
                layoutId="nav-underline-solutions"
              />
            )}

            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[680px] bg-zinc-950/98 backdrop-blur-2xl border border-white/[0.09] rounded-2xl p-8 shadow-2xl shadow-black/60"
                >
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-[11px] font-bold text-violet-400 uppercase tracking-widest mb-4">
                        By Industry
                      </h3>
                      <div className="space-y-1">
                        {INDUSTRY_SOLUTIONS.map((sol) => (
                          <Link
                            key={sol.slug}
                            to={`/solutions/${sol.slug}`}
                            onClick={() => setSolutionsOpen(false)}
                            className="block px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-150 group"
                          >
                            <div className="text-[14px] font-medium text-white group-hover:text-violet-400 transition-colors mb-0.5">
                              {sol.title}
                            </div>
                            <div className="text-[12px] text-gray-600 leading-snug line-clamp-1">{sol.heroTagline}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest mb-4">
                        By Use Case
                      </h3>
                      <div className="space-y-1">
                        {USECASE_SOLUTIONS.map((sol) => (
                          <Link
                            key={sol.slug}
                            to={`/solutions/${sol.slug}`}
                            onClick={() => setSolutionsOpen(false)}
                            className="block px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-150 group"
                          >
                            <div className="text-[14px] font-medium text-white group-hover:text-cyan-400 transition-colors mb-0.5">
                              {sol.title}
                            </div>
                            <div className="text-[12px] text-gray-600 leading-snug line-clamp-1">{sol.heroTagline}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/#resources" className="text-[15px] text-gray-300 hover:text-white transition-colors duration-200 py-2">
            Resources
          </a>

          <a href="/#pricing" className="text-[15px] text-gray-300 hover:text-white transition-colors duration-200 py-2">
            Pricing
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <a href="mailto:info@kingsforth.net">
            <Button
              variant="ghost"
              className="text-[15px] text-gray-300 hover:text-white hover:bg-white/[0.05] h-11 px-5 transition-all duration-200"
            >
              Contact
            </Button>
          </a>
          <a href="mailto:info@kingsforth.net">
            <Button className="text-[15px] h-11 px-7 bg-linear-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-violet-500/25 transition-all duration-200">
              Book a Demo
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
