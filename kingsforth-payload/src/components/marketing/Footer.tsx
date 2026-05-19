'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
    showAdminPortal?: boolean;
    logoUrl?: string | null;
    siteName?: string | null;
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
}

const NAV_COLS = [
    {
        label: 'Product',
        links: [
            { label: 'Services', href: '/services' },
            { label: 'Solutions', href: '/solutions' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Resources', href: '/resources' },
        ],
    },
    {
        label: 'Company',
        links: [
            { label: 'About', href: '/company/about' },
            { label: 'Team', href: '/company/team' },
            { label: 'FAQs', href: '/company/faqs' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        label: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
        ],
    },
];

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 text-white/35 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/6 transition-all duration-200"
        >
            {children}
        </a>
    );
}

export function Footer({ showAdminPortal = false, logoUrl, siteName, socialLinks, contactInfo }: FooterProps) {
    const year = new Date().getFullYear();
    const name = siteName || 'Kingsforth';

    const email = contactInfo?.email || 'info@kingsforth.net';
    const phone = contactInfo?.phone || '+880 1833-183436';
    const address = contactInfo?.address || 'Gulshan 1, Dhaka-1212, Bangladesh';

    const hasSocial = socialLinks && Object.values(socialLinks).some(Boolean);

    return (
        <footer className="relative z-10 bg-[#020810]">
            {/* Cyan gradient rule */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-cyan-500/35 to-transparent" />

            <div className="max-w-[1400px] mx-auto px-6 sm:px-10">

                {/* ── Upper section ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] gap-12 py-14 border-b border-white/5">

                    {/* Brand + tagline */}
                    <div className="space-y-5">
                        <Link href="/" className="inline-flex items-center gap-2.5 group">
                            {logoUrl && (
                                <img
                                    src={logoUrl}
                                    alt={name}
                                    style={{ height: '28px', width: 'auto', maxWidth: '180px', objectFit: 'contain' }}
                                    className="shrink-0"
                                />
                            )}
                            <span className="text-lg font-black tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-r from-[#9b72fa] via-[#4292f5] to-[#26cceb]">
                                {name.toUpperCase()}
                            </span>
                        </Link>
                        <p className="text-[13px] text-white/35 leading-relaxed max-w-65">
                            Enterprise AI surveillance and intelligent security operations for critical environments.
                        </p>
                        {/* Social icons */}
                        {hasSocial && (
                            <div className="flex items-center gap-2 pt-1">
                                {socialLinks?.linkedin && (
                                    <SocialIcon href={socialLinks.linkedin} label="LinkedIn">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </SocialIcon>
                                )}
                                {socialLinks?.twitter && (
                                    <SocialIcon href={socialLinks.twitter} label="Twitter / X">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </SocialIcon>
                                )}
                                {socialLinks?.youtube && (
                                    <SocialIcon href={socialLinks.youtube} label="YouTube">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                    </SocialIcon>
                                )}
                                {socialLinks?.facebook && (
                                    <SocialIcon href={socialLinks.facebook} label="Facebook">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </SocialIcon>
                                )}
                                {socialLinks?.instagram && (
                                    <SocialIcon href={socialLinks.instagram} label="Instagram">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                    </SocialIcon>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Nav columns */}
                    <div className="grid grid-cols-3 gap-6">
                        {NAV_COLS.map((col) => (
                            <div key={col.label}>
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 mb-4">
                                    {col.label}
                                </p>
                                <ul className="space-y-2.5">
                                    {col.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-[13px] text-white/40 hover:text-white/80 transition-colors duration-150"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 mb-4">Contact</p>
                        <a href={`mailto:${email}`} className="flex items-start gap-3 group">
                            <div className="mt-0.5 w-7 h-7 rounded-md bg-white/4 border border-white/6 flex items-center justify-center shrink-0 group-hover:border-cyan-500/25 group-hover:bg-cyan-500/5 transition-all duration-200">
                                <Mail className="w-3.5 h-3.5 text-white/30 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <span className="text-[13px] text-white/40 group-hover:text-white/70 transition-colors leading-snug">{email}</span>
                        </a>
                        <a href={`tel:${phone}`} className="flex items-start gap-3 group">
                            <div className="mt-0.5 w-7 h-7 rounded-md bg-white/4 border border-white/6 flex items-center justify-center shrink-0 group-hover:border-cyan-500/25 group-hover:bg-cyan-500/5 transition-all duration-200">
                                <Phone className="w-3.5 h-3.5 text-white/30 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <span className="text-[13px] text-white/40 group-hover:text-white/70 transition-colors leading-snug">{phone}</span>
                        </a>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 w-7 h-7 rounded-md bg-white/4 border border-white/6 flex items-center justify-center shrink-0">
                                <MapPin className="w-3.5 h-3.5 text-white/30" />
                            </div>
                            <span className="text-[13px] text-white/40 leading-snug">{address}</span>
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[12px] text-white/20 order-2 sm:order-1">
                        © {year} {name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3 order-1 sm:order-2">
                        {showAdminPortal && (
                            <Link
                                href="/admin"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] font-semibold rounded-lg border border-white/8 text-white/30 hover:text-white/70 hover:border-white/15 transition-all duration-200"
                            >
                                Admin <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
