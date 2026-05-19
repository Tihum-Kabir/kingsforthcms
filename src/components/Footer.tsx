import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Cpu, Linkedin, Twitter, Youtube, Github, ArrowUpRight } from 'lucide-react';

const NAV_COLUMNS = [
  {
    title: 'Services',
    links: [
      { name: 'Big Data Forensic', href: '/services/big-data-forensic' },
      { name: 'Cognitive Surveillance', href: '/services/cognitive-surveillance' },
      { name: 'Autonomous Field Ops', href: '/services/autonomous-field-ops' },
      { name: 'AI Agentic SaaS', href: '/services/ai-agentic-saas' },
      { name: 'IoT Orchestration', href: '/services/iot-orchestration' },
      { name: 'Go-to-Market Expert', href: '/services/go-to-market-expert' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Education', href: '/solutions/education' },
      { name: 'Corporate', href: '/solutions/corporate' },
      { name: 'Cities & Government', href: '/solutions/cities-government' },
      { name: 'Perimeter Security', href: '/solutions/perimeter-security' },
      { name: 'VSOC Integration', href: '/solutions/vsoc' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Contact', href: 'mailto:info@kingsforth.net' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Compliance', href: '#' },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Github, href: '#', label: 'GitHub' },
];

const LEGAL_LINKS = ['Privacy Policy', 'Terms', 'Cookies'];

export function Footer() {
  return (
    <footer className="relative bg-black px-5 md:px-10 lg:px-14 pt-6 pb-10 overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute bottom-0 right-[18%] w-[700px] h-[500px] bg-violet-700/[0.07] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-[8%] w-[500px] h-[400px] bg-cyan-700/[0.05] rounded-full blur-[110px] pointer-events-none" />

      {/* Layered depth cards behind main container */}
      <div className="relative">
        <div className="absolute inset-x-3 top-3 bottom-0 rounded-[30px] bg-zinc-900/60 blur-[2px]" />
        <div className="absolute inset-x-1.5 top-1.5 bottom-0 rounded-[30px] bg-zinc-800/25" />

        {/* Main container */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-zinc-950 border border-white/[0.07] rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.75)] overflow-hidden"
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-violet-500/35 to-transparent" />

          {/* Security-grid texture — defined in globals.css */}
          <div className="absolute inset-0 footer-grid-texture" />

          {/* Radial glow on the right hero zone */}
          <div className="absolute right-0 top-0 bottom-0 w-[42%] bg-linear-to-l from-violet-950/25 via-violet-950/10 to-transparent pointer-events-none" />

          <div className="relative z-10 p-8 md:p-12 lg:p-14">
            {/* ── Upper section ── */}
            <div className="flex flex-col lg:flex-row gap-12 mb-12">

              {/* LEFT — Brand + Navigation */}
              <div className="flex-1 flex flex-col gap-10">

                {/* Brand */}
                <div>
                  <Link to="/" className="flex items-center gap-3 mb-3 group w-fit">
                    <div className="relative shrink-0">
                      <Cpu className="w-6 h-6 text-violet-500 group-hover:text-violet-400 transition-colors" strokeWidth={2} />
                      <div className="absolute inset-0 bg-violet-500 blur-xl opacity-50" />
                    </div>
                    <span className="font-bevan text-[16px] font-semibold tracking-tight bg-linear-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      KINGSFORTH
                    </span>
                  </Link>
                  <p className="text-[13px] text-gray-500 leading-relaxed max-w-[260px]">
                    Enterprise intelligence systems for mission-critical security environments.
                  </p>
                </div>

                {/* Nav columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
                  {NAV_COLUMNS.map((col, i) => (
                    <motion.div
                      key={col.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
                    >
                      <h3 className="text-[10px] font-bold text-violet-400/75 uppercase tracking-[0.16em] mb-3.5">
                        {col.title}
                      </h3>
                      <ul className="space-y-2.5">
                        {col.links.map((link) => (
                          <li key={link.name}>
                            {link.href.startsWith('/') ? (
                              <Link
                                to={link.href}
                                className="group inline-flex items-center gap-1 text-[13px] text-gray-500 hover:text-white transition-colors duration-150"
                              >
                                <span className="group-hover:translate-x-[2px] transition-transform duration-150 inline-block">
                                  {link.name}
                                </span>
                                <ArrowUpRight className="w-3 h-3 -translate-y-px opacity-0 group-hover:opacity-40 transition-all duration-150 shrink-0" strokeWidth={2.5} />
                              </Link>
                            ) : (
                              <a
                                href={link.href}
                                className="group inline-flex items-center gap-1 text-[13px] text-gray-500 hover:text-white transition-colors duration-150"
                              >
                                <span className="group-hover:translate-x-[2px] transition-transform duration-150 inline-block">
                                  {link.name}
                                </span>
                                <ArrowUpRight className="w-3 h-3 -translate-y-px opacity-0 group-hover:opacity-40 transition-all duration-150 shrink-0" strokeWidth={2.5} />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Hero statement */}
              <div className="lg:w-[400px] flex items-center">
                <div className="relative w-full pl-6 lg:pl-10">
                  {/* Vertical separator */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/[0.08] to-transparent" />

                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5"
                  >
                    {/* Pill badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/[0.09] border border-violet-500/[0.22]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-70" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-400" />
                      </span>
                      <span className="text-[10px] font-semibold text-violet-300/80 uppercase tracking-[0.15em]">
                        Always Active
                      </span>
                    </div>

                    {/* Giant headline */}
                    <div className="font-bevan">
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.32, duration: 0.7 }}
                        className="text-[58px] md:text-[66px] lg:text-[74px] xl:text-[82px] font-bold leading-none tracking-tight text-white"
                      >
                        Intelligence.
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.44, duration: 0.7 }}
                        className="text-[58px] md:text-[66px] lg:text-[74px] xl:text-[82px] font-bold leading-none tracking-tight bg-linear-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                      >
                        Always On.
                      </motion.div>
                    </div>

                    {/* Accent underline */}
                    <div className="h-px w-28 bg-linear-to-r from-violet-500/50 to-transparent" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Soft divider */}
            <div className="h-px bg-linear-to-r from-transparent via-white/[0.06] to-transparent mb-7" />

            {/* ── Bottom bar ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Copyright + legal links */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 text-[12px] text-gray-600">
                <span className="sm:mr-4">© 2026 Kingsforth Intelligence Systems.</span>
                <div className="flex items-center gap-3">
                  {LEGAL_LINKS.map((item, i) => (
                    <span key={item} className="flex items-center gap-3">
                      {i > 0 && <span className="text-gray-800">·</span>}
                      <a href="#" className="hover:text-gray-400 transition-colors duration-150">
                        {item}
                      </a>
                    </span>
                  ))}
                </div>
              </div>

              {/* Compliance + social */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-[11px] text-gray-700 border-r border-white/[0.05] pr-4">
                  <span>SOC 2 Type II</span>
                  <span className="text-gray-800">·</span>
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="group w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.07] text-gray-600 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/[0.08] transition-all duration-200"
                    >
                      <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
