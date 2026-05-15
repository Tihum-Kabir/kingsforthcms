import { Shield, Linkedin, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { name: 'Education', href: '#' },
        { name: 'Corporate', href: '#' },
        { name: 'Cities & Government', href: '#' },
        { name: 'Perimeter Security', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'White Papers', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Partners', href: '#' },
        { name: 'Contact', href: '#' },
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

  return (
    <footer className="relative bg-black border-t border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <Shield className="w-7 h-7 text-violet-500" strokeWidth={2} />
                <div className="absolute inset-0 bg-violet-500 blur-lg opacity-40"></div>
              </div>
              <span className="text-[17px] font-semibold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Kingsforth.net
              </span>
            </div>
            <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
              Enterprise intelligence systems for mission-critical environments.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 hover:text-violet-400 transition-colors duration-200">
                <Linkedin className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="#" className="text-gray-600 hover:text-violet-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="#" className="text-gray-600 hover:text-violet-400 transition-colors duration-200">
                <Youtube className="w-5 h-5" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[13px] font-semibold text-white mb-5 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[14px] text-gray-500 hover:text-violet-400 transition-colors duration-200 block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-gray-600">
            © 2026 Kingsforth Intelligence Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-gray-600">
            <span>SOC 2 Type II Certified</span>
            <span className="text-gray-800">•</span>
            <span>ISO 27001 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}