import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Shield, Zap, Eye } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black pt-20">
      {/* Animated Background */}
      <AnimatedBackground intensity={1} />

      {/* Gradient Orbs */}
      <div className="absolute top-32 left-20 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-cyan-500/10 border border-violet-500/20 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4 text-violet-400" strokeWidth={2.5} />
            <span className="text-[13px] font-medium text-violet-300 tracking-wide">ENTERPRISE INTELLIGENCE SYSTEMS</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-[80px] lg:text-[96px] font-bold tracking-tight leading-[1.1]">
            <span className="text-white">Real-Time Threat</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Detection & Response
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-[19px] leading-[1.6] text-gray-400 max-w-[760px] mx-auto font-light">
            Advanced intelligence platform for high-stakes environments. Integrate, detect, and respond to critical incidents in real-time with military-grade precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              className="h-12 px-8 text-[15px] font-medium bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-violet-500/25 transition-all duration-200"
            >
              Book a Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-[15px] font-medium border-white/10 text-gray-300 hover:bg-white/[0.04] hover:border-white/20 hover:text-white transition-all duration-200"
            >
              View Solutions
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-12 pt-20 max-w-[800px] mx-auto"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2.5">
                <Zap className="w-5 h-5 text-violet-400" strokeWidth={2.5} />
                <div className="text-[42px] font-bold text-white leading-none">&lt;2s</div>
              </div>
              <div className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">Alert Response Time</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2.5">
                <Eye className="w-5 h-5 text-cyan-400" strokeWidth={2.5} />
                <div className="text-[42px] font-bold text-white leading-none">24/7</div>
              </div>
              <div className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">Continuous Monitoring</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2.5">
                <Shield className="w-5 h-5 text-purple-400" strokeWidth={2.5} />
                <div className="text-[42px] font-bold text-white leading-none">99.9%</div>
              </div>
              <div className="text-[13px] font-medium text-gray-500 uppercase tracking-wider">System Uptime</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}