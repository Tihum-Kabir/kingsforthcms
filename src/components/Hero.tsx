import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, Zap, Eye } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-black via-zinc-950 to-black pt-24">
      <AnimatedBackground intensity={1} />

      {/* Gradient orbs — larger for bigger screens */}
      <div className="absolute top-28 left-16 w-[700px] h-[700px] bg-violet-600/12 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-28 right-16 w-[700px] h-[700px] bg-cyan-600/12 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1.2s' }} />

      <div className="relative z-10 max-w-[1500px] mx-auto px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="space-y-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-linear-to-r from-violet-500/10 via-purple-500/10 to-cyan-500/10 border border-violet-500/20 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4 text-violet-400" strokeWidth={2.5} />
            <span className="text-[13px] font-semibold text-violet-300 tracking-widest uppercase">
              Sovereign-Grade Intelligence Systems
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-7xl md:text-[92px] lg:text-[108px] font-bold tracking-tight leading-[1.02]">
            <span className="text-white">Real-Time Threat</span>
            <br />
            <span className="bg-linear-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Detection & Response
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl leading-relaxed text-gray-400 max-w-[820px] mx-auto font-light">
            Advanced intelligence platform for high-stakes environments. Integrate, detect, and respond to critical incidents in real time with military-grade precision.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <a href="mailto:info@kingsforth.net">
              <Button
                size="lg"
                className="h-14 px-10 text-[17px] font-semibold bg-linear-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white shadow-xl shadow-violet-500/25 transition-all duration-200"
              >
                Book a Demo
              </Button>
            </a>
            <Link to="/solutions">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 text-[17px] font-medium border-white/10 text-gray-300 hover:bg-white/[0.05] hover:border-white/20 hover:text-white transition-all duration-200"
              >
                Explore Solutions
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.65 }}
            className="grid grid-cols-3 gap-12 lg:gap-20 pt-20 max-w-[900px] mx-auto"
          >
            {[
              { icon: Zap, value: '<2s', label: 'Alert Response Time', color: 'text-violet-400' },
              { icon: Eye, value: '24/7', label: 'Continuous Monitoring', color: 'text-cyan-400' },
              { icon: Shield, value: '99.9%', label: 'System Uptime SLA', color: 'text-purple-400' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="space-y-3.5">
                <div className="flex items-center justify-center gap-2.5">
                  <Icon className={`w-6 h-6 ${color}`} strokeWidth={2.5} />
                  <div className="text-[48px] font-bold text-white leading-none">{value}</div>
                </div>
                <div className="text-[14px] font-medium text-gray-500 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
