import { motion } from 'motion/react';

export function TrustBanner() {
  const partners = [
    'CISCO SYSTEMS',
    'MICROSOFT AZURE',
    'GENETEC',
    'MILESTONE SYSTEMS',
    'AXIS COMMUNICATIONS',
    'HANWHA VISION',
    'VERKADA',
    'MOTOROLA SOLUTIONS',
  ];

  // Duplicate for seamless loop
  const allPartners = [...partners, ...partners];

  return (
    <section className="relative py-16 bg-zinc-950/40 backdrop-blur-sm border-y border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.03] via-transparent to-cyan-500/[0.03]"></div>
      
      <div className="relative">
        <p className="text-center text-[11px] font-semibold text-gray-600 uppercase tracking-[0.2em] mb-8">
          Trusted by Leading Security Integrators
        </p>
        
        <div className="relative">
          <motion.div
            className="flex gap-20"
            animate={{
              x: [0, '-50%'],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {allPartners.map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 text-gray-700 font-bold tracking-[0.15em] text-[15px] whitespace-nowrap hover:text-violet-400 transition-colors duration-300 cursor-default"
              >
                {partner}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}