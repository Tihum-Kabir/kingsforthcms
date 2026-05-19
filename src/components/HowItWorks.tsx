import { motion } from 'motion/react';
import { Bell, MapPin, Radio, Activity } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const steps = [
  {
    icon: Activity,
    title: 'Continuous Monitoring',
    description:
      'AI algorithms analyze multiple data streams from cameras, sensors, and access control systems simultaneously — 24 hours a day, with no fatigue or blind spots.',
    color: 'violet' as const,
  },
  {
    icon: Bell,
    title: 'Instant Detection',
    description:
      'When an anomaly is detected, the system generates a priority-coded alert within 2 seconds — with full contextual information, visual evidence, and location data.',
    color: 'purple' as const,
  },
  {
    icon: MapPin,
    title: 'Spatial Mapping',
    description:
      'Precise location data is overlaid on your facility maps in real time, providing responders with exact incident coordinates and the fastest route to the scene.',
    color: 'pink' as const,
  },
  {
    icon: Radio,
    title: 'Coordinated Response',
    description:
      'Automated workflows notify relevant personnel, initiate lockdowns, dispatch assets, and coordinate multi-team responses — all within the critical response window.',
    color: 'cyan' as const,
  },
];

const colorClasses = {
  violet: { gradient: 'from-violet-600 to-violet-700', glow: 'bg-violet-500' },
  purple: { gradient: 'from-purple-600 to-purple-700', glow: 'bg-purple-500' },
  pink:   { gradient: 'from-pink-600 to-pink-700',     glow: 'bg-pink-500'   },
  cyan:   { gradient: 'from-cyan-600 to-cyan-700',     glow: 'bg-cyan-500'   },
};

export function HowItWorks() {
  return (
    <section className="relative py-36 bg-black">
      <div className="max-w-[1500px] mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-[700px] mx-auto font-light leading-relaxed">
            From detection to coordinated response in seconds
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="space-y-10"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const { gradient, glow } = colorClasses[step.color];
              return (
                <div key={step.title} className="flex gap-7">
                  <div className="shrink-0">
                    <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center relative group hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      <div className={`absolute inset-0 rounded-2xl ${glow} blur-xl opacity-30`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[11px] font-mono font-semibold text-gray-600 tracking-widest uppercase">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
                    </div>
                    <h3 className="text-[24px] font-bold text-white mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[16px] text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.09] shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1766788467067-d443f19314b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG9wZXJhdGlvbnMlMjBjZW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2OTc3NjY2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Security operations center"
                className="w-full h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Floating alert card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/92 backdrop-blur-2xl border border-red-500/20 shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 animate-pulse shadow-lg shadow-red-500/50 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-mono font-bold text-red-500 tracking-widest uppercase">Priority Alert</span>
                    <span className="text-[12px] text-gray-500">Building A — Sector 3</span>
                  </div>
                  <p className="text-[16px] text-white font-semibold">Unauthorized perimeter access detected</p>
                </div>
                <span className="text-[12px] text-gray-500 shrink-0">2s ago</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
