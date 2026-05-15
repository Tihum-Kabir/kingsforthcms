import { motion } from 'motion/react';
import { Bell, MapPin, Radio, Activity } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HowItWorks() {
  const colorClasses: Record<string, { gradient: string; glow: string }> = {
    violet: { gradient: 'from-violet-600 to-violet-700', glow: 'bg-violet-500' },
    purple: { gradient: 'from-purple-600 to-purple-700', glow: 'bg-purple-500' },
    pink:   { gradient: 'from-pink-600 to-pink-700',     glow: 'bg-pink-500'   },
    cyan:   { gradient: 'from-cyan-600 to-cyan-700',     glow: 'bg-cyan-500'   },
  };

  const steps = [
    {
      icon: Activity,
      title: 'Continuous Monitoring',
      description: 'AI algorithms analyze multiple data streams from cameras, sensors, and access control systems in real-time.',
      color: 'violet',
    },
    {
      icon: Bell,
      title: 'Instant Detection',
      description: 'When an anomaly is detected, the system generates a priority-coded alert with full contextual information.',
      color: 'purple',
    },
    {
      icon: MapPin,
      title: 'Spatial Mapping',
      description: 'Precise location data is overlaid on facility maps, providing responders with exact incident coordinates.',
      color: 'pink',
    },
    {
      icon: Radio,
      title: 'Coordinated Response',
      description: 'Automated workflows notify relevant personnel, initiate lockdowns, and coordinate multi-team responses.',
      color: 'cyan',
    },
  ];

  return (
    <section className="relative py-32 bg-black">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-[64px] font-bold text-white mb-5 tracking-tight">
            How It Works
          </h2>
          <p className="text-[19px] text-gray-400 max-w-[680px] mx-auto font-light leading-relaxed">
            From detection to resolution in seconds
          </p>
        </motion.div>

        {/* Workflow Visualization */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[step.color].gradient} flex items-center justify-center relative group hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                      <div className={`absolute inset-0 rounded-2xl ${colorClasses[step.color].glow} blur-xl opacity-30`}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[11px] font-mono font-semibold text-gray-600 tracking-wider">
                        STEP {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>
                    <h3 className="text-[22px] font-bold text-white mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1766788467067-d443f19314b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMG9wZXJhdGlvbnMlMjBjZW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2OTc3NjY2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Security operations center"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Alert Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 left-8 right-8 p-5 rounded-2xl bg-black/90 backdrop-blur-2xl border border-red-500/20 shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-2 animate-pulse shadow-lg shadow-red-500/50"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-mono font-semibold text-red-500 tracking-wider">PRIORITY ALERT</span>
                    <span className="text-[12px] text-gray-500">Building A - Sector 3</span>
                  </div>
                  <p className="text-[15px] text-white font-medium">Unauthorized access detected</p>
                </div>
                <span className="text-[12px] text-gray-500">2s ago</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}