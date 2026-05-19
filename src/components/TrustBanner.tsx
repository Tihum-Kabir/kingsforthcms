import { motion } from 'motion/react';

const partners = [
  'CISCO SYSTEMS',
  'MICROSOFT AZURE',
  'GENETEC',
  'MILESTONE SYSTEMS',
  'AXIS COMMUNICATIONS',
  'HANWHA VISION',
  'VERKADA',
  'MOTOROLA SOLUTIONS',
  'HONEYWELL',
  'BOSCH SECURITY',
];

const allPartners = [...partners, ...partners];

export function TrustBanner() {
  return (
    <section className="relative py-20 bg-zinc-950/40 backdrop-blur-sm border-y border-white/[0.07] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-violet-500/[0.04] via-transparent to-cyan-500/[0.04]" />

      <div className="relative">
        <p className="text-center text-[12px] font-bold text-gray-600 uppercase tracking-[0.25em] mb-10">
          Trusted by Leading Security Integrators &amp; Enterprises
        </p>

        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-zinc-950/60 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-zinc-950/60 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-24"
            animate={{ x: [0, '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {allPartners.map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="shrink-0 text-gray-700 font-bold tracking-[0.18em] text-[16px] whitespace-nowrap hover:text-violet-400 transition-colors duration-300 cursor-default"
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
