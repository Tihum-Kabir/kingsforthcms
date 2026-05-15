'use client';

import Link from 'next/link';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
    showAdminPortal?: boolean;
    logoUrl?: string | null;
    contactInfo?: {
        email?: string;
        phone?: string;
        address?: string;
        map_embed?: string;
    };
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
    };
    siteName?: string | null;
}

export function Footer({ showAdminPortal = false, logoUrl, siteName, socialLinks, contactInfo }: FooterProps) {
    return (
        <footer className="border-t border-[#e5e7eb] dark:border-white/[0.06] bg-white dark:bg-[#030915] transition-colors duration-500 relative z-10">
            <div className="max-w-[1400px] mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2.5">
                            {/* Logo — uploaded or default */}
                            <img
                                src={logoUrl || '/images/logos/kingsforth-icon.svg'}
                                alt={siteName || 'Kingsforth'}
                                style={{ height: '38px', width: 'auto', maxWidth: '240px', objectFit: 'contain' }}
                                className="shrink-0"
                            />
                            <span className="text-2xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-r from-[#9b72fa] via-[#4292f5] to-[#26cceb] mt-0.5">
                                {siteName?.toUpperCase() || 'KINGSFORTH'}
                            </span>
                        </div>
                        <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm leading-relaxed">
                            Enterprise intelligence systems for critical response and threat detection.
                        </p>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="text-[#111827] dark:text-white font-semibold mb-4 text-sm">Solutions</h3>
                        <ul className="space-y-3">
                            <li><Link href="/solutions/education" className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors text-sm">Education</Link></li>
                            <li><Link href="/solutions/corporate" className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors text-sm">Corporate</Link></li>
                            <li><Link href="/solutions/cities-government" className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors text-sm">Cities & Government</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#111827] dark:text-white font-semibold mb-4 text-sm">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link href="/resources/docs" className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors text-sm">Documentation</Link></li>
                            <li><Link href="/resources/case-studies" className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors text-sm">Case Studies</Link></li>
                            <li><Link href="/resources/blog" className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors text-sm">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-[#111827] dark:text-white font-semibold mb-4 text-sm">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-[#6b7280] dark:text-[#9ca3af] text-sm">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span>{contactInfo?.email || 'contact@kingsforth.com'}</span>
                            </li>
                            <li className="flex items-center gap-2 text-[#6b7280] dark:text-[#9ca3af] text-sm">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>{contactInfo?.phone || '+1 (555) 123-4567'}</span>
                            </li>
                            <li className="flex items-center gap-2 text-[#6b7280] dark:text-[#9ca3af] text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <a
                                    href={contactInfo?.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}` : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#2563eb] dark:hover:text-white transition-colors underline underline-offset-4 decoration-[#d1d5db] dark:decoration-white/20"
                                >
                                    View Office Location
                                </a>
                            </li>
                        </ul>

                        {contactInfo?.map_embed && (
                            <div className="mt-6 w-full h-[180px] rounded-xl overflow-hidden border border-[#e5e7eb] dark:border-white/[0.06] grayscale hover:grayscale-0 transition-all duration-500 shadow-sm">
                                <iframe
                                    src={contactInfo.map_embed.includes('<iframe') ? contactInfo.map_embed.match(/src="([^"]+)"/)?.[1] : contactInfo.map_embed}
                                    width="100%"
                                    height="100%"
                                    className="border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    sandbox="allow-scripts allow-same-origin allow-popups"
                                    title="Office location map"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[#e5e7eb] dark:border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#9ca3af] text-sm">
                        © {new Date().getFullYear()} {siteName || "Kingsforth"}. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors text-sm">
                            Terms of Service
                        </Link>

                        {showAdminPortal && (
                            <Link
                                href="/admin"
                                className="px-4 py-2 bg-red-50 dark:bg-red-600/20 border border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-600/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-all duration-200"
                            >
                                🔐 Admin Portal
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
