'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
    Shield, User, LogOut, LayoutDashboard, ChevronDown,
    GraduationCap, Building2, MapPin, Crosshair, Heart,
    AlertTriangle, Radio, FileText, BookOpen, Users, Info,
    Database, Eye, Cpu, Bot, Network, TrendingUp, Globe,
    HelpCircle, Library, Award, School,
    Briefcase, Scan, Stethoscope, Siren, MonitorPlay,
    Sparkles, MessageSquare, Brain, BookMarked, BarChart3,
    FileCode2, LucideIcon, Menu, X
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavigationProps {
    user?: any;
    services?: any[];
    solutions?: any[];
    resources?: any[];
    logoUrl?: string | null;
    siteName?: string | null;
    llmLinks?: any[];
    llmSectionHeading?: string;
}

const iconMap: Record<string, LucideIcon> = {
    database: Database, eye: Eye, cpu: Cpu, bot: Bot, network: Network,
    'trending-up': TrendingUp, 'file-text': FileText, 'file-code': FileCode2,
    'download': Library, 'award': Award, 'help-circle': HelpCircle,
    'info': Info, 'users': Users, 'graduation-cap': GraduationCap,
    'building-2': Building2, 'map-pin': MapPin, 'crosshair': Crosshair,
    'heart': Heart, 'alert-triangle': AlertTriangle, 'radio': Radio,
    'school': School, 'briefcase': Briefcase, 'scan': Scan,
    'stethoscope': Stethoscope, 'siren': Siren, 'monitor-play': MonitorPlay,
    'library': Library, 'globe': Globe, 'shield': Shield,
    'book-open': BookOpen, 'book-marked': BookMarked, 'bar-chart': BarChart3,
    'sparkles': Sparkles, 'message-square': MessageSquare, 'brain': Brain,
};

export function Navigation({ user, services = [], solutions = [], resources = [], logoUrl, siteName, llmLinks = [], llmSectionHeading = 'Start a conversation to research Kingsforth on LLMs:' }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const menuTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const lastScrollY = useRef(0);

    useEffect(() => {
        let rafId: number | undefined;
        const handleScroll = () => {
            if (rafId !== undefined) return;
            rafId = requestAnimationFrame(() => {
                rafId = undefined;
                const currentScrollY = window.scrollY;
                setIsScrolled(currentScrollY > 60);
                if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                    if (!activeMenu && !mobileMenuOpen) setIsHidden(true);
                } else {
                    setIsHidden(false);
                }
                lastScrollY.current = currentScrollY;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId !== undefined) cancelAnimationFrame(rafId);
        };
    }, [activeMenu, mobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuEnter = (menu: string) => {
        if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
        setActiveMenu(menu);
    };

    const handleMenuLeave = () => {
        menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
    };

    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    // Map services
    const serviceItems = services.length > 0 ? services.map(service => ({
        href: `/services/${service.slug}`,
        title: service.title,
        description: service.subtitle || service.description?.substring(0, 80) || '',
        iconName: service.icon || 'database'
    })) : [
        { href: '/services/big-data-forensic', title: 'Big Data Forensic', description: 'Search terabytes of historical data', iconName: 'database' },
        { href: '/services/cognitive-surveillance', title: 'Cognitive Surveillance', description: 'Real-time video analysis', iconName: 'eye' },
        { href: '/services/autonomous-field-ops', title: 'Autonomous Field Ops', description: 'Robotic process automation', iconName: 'cpu' },
        { href: '/services/ai-agentic-saas', title: 'AI Agentic SaaS', description: 'Self-evolving software agents', iconName: 'bot' },
        { href: '/services/iot-orchestration', title: 'IoT Orchestration', description: 'Unifying fragmented sensors', iconName: 'network' },
        { href: '/services/go-to-market', title: 'Go-to-Market Expert', description: 'Strategic guidance', iconName: 'trending-up' },
    ];

    // Map Solutions
    const solutionItems = solutions.length > 0 ? solutions.map(sol => ({
        href: `/solutions/${sol.slug}`,
        title: sol.title,
        description: sol.subtitle || sol.category || 'Solution',
        iconName: sol.category === 'Industry' ? 'building-2' : 'crosshair'
    })) : [
        { href: '/solutions/education', title: 'Education', description: 'K-12 and Higher Education Safety', iconName: 'graduation-cap' },
        { href: '/solutions/corporate', title: 'Corporate', description: 'Enterprise Security Intelligence', iconName: 'briefcase' },
        { href: '/solutions/perimeter', title: 'Perimeter Security', description: 'Real-time Threat Detection', iconName: 'scan' },
        { href: '/solutions/medical', title: 'Medical Emergencies', description: 'Instant Medical Response', iconName: 'stethoscope' },
        { href: '/solutions/weapons', title: 'Weapons Detection', description: 'AI-Powered Identification', iconName: 'crosshair' },
        { href: '/solutions/vsoc', title: 'VSOC', description: 'Virtual Security Operations', iconName: 'monitor-play' },
    ];

    // Only show resources explicitly marked as featured in nav
    const displayResources = resources.filter(res => res.featuredInNav).slice(0, 6);
    const resourceItems = displayResources.map(res => ({
        href: res.externalLink || `/resources/${res.slug}`,
        title: res.title,
        description: res.summary || res.category || '',
        iconName: res.pdfFile ? 'file-text' : 'library',
        external: !!res.externalLink,
        hasPdf: !!res.pdfFile,
        hasVideo: !!res.videoUrl,
    }));

    const NAV_LINKS = [
        { label: 'Services', key: 'services', href: '/services' },
        { label: 'Solutions', key: 'solutions', href: '/solutions' },
        { label: 'Resources', key: 'resources', href: '/resources' },
        { label: 'Company', key: 'company', href: '#' },
        { label: 'Pricing', key: null, href: '/pricing' },
    ];

    // Navbar background: completely transparent when at top, solid when scrolled.
    // When a dropdown is open, also use solid background.
    const showSolid = isScrolled || activeMenu !== null || mobileMenuOpen;

    return (
        <>
            <nav
                className={`h-20 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isHidden ? '-translate-y-full' : 'translate-y-0'
                } ${
                    showSolid
                        ? 'bg-white/92 dark:bg-[#060d1a]/90 backdrop-blur-xl border-b border-black/6 dark:border-white/5'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="max-w-350 mx-auto px-4 lg:px-8 h-full">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group shrink-0 relative transition-all duration-300">
                            <div className="flex items-center gap-2.5 relative z-10">
                                <img
                                    src={logoUrl || '/images/logos/kingsforth-icon.svg'}
                                    alt={siteName || 'Kingsforth'}
                                    style={{ height: '36px', width: 'auto', maxWidth: '240px', objectFit: 'contain' }}
                                    className="shrink-0 drop-shadow-sm"
                                />
                                <span className="text-[26px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-r from-[#9b72fa] via-[#4292f5] to-[#26cceb] mt-0.5 drop-shadow-sm">
                                    {siteName?.toUpperCase() || 'KINGSFORTH'}
                                </span>
                            </div>
                        </Link>

                        {/* Navigation Links — Center */}
                        <div className="hidden lg:flex items-center gap-0.5">
                            {NAV_LINKS.map((link) => (
                                <div 
                                    key={link.label}
                                    className="relative h-full flex items-center"
                                    onMouseEnter={() => link.key && handleMenuEnter(link.key)}
                                    onMouseLeave={handleMenuLeave}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center text-[16.5px] font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 tracking-wide ${
                                            showSolid
                                                ? (link.key && activeMenu === link.key)
                                                    ? 'text-[#111827] dark:text-white bg-[#f3f4f6] dark:bg-white/6'
                                                    : 'text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white hover:bg-[#f3f4f6] dark:hover:bg-white/6'
                                                : (link.key && activeMenu === link.key)
                                                    ? 'text-[#111827] dark:text-white bg-black/6 dark:bg-white/15 backdrop-blur-sm shadow-[0_0_0_1px_rgba(0,0,0,0.12)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]'
                                                    : 'text-[#111827] dark:text-white hover:bg-black/5 dark:hover:bg-white/8 hover:backdrop-blur-sm hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18)] drop-shadow-sm'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Right Side: Theme toggle, Login, Book a demo */}
                        <div className="hidden lg:flex items-center gap-3">
                            <ThemeToggle />
                            {user ? (
                                <div className="relative" ref={userDropdownRef}>
                                    <button
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
                                            showSolid
                                                ? 'border-[#e5e7eb] dark:border-white/10 hover:bg-[#f9fafb] dark:hover:bg-white/4'
                                                : 'border-white/20 hover:bg-white/10'
                                        }`}
                                    >
                                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#9b72fa] to-[#26cceb] flex items-center justify-center">
                                            <User className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-black dark:text-white">
                                            {user.name || 'Account'}
                                        </span>
                                        <ChevronDown className={`w-3.5 h-3.5 ${showSolid ? 'text-[#9ca3af]' : 'text-white/60'}`} />
                                    </button>

                                    {userDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-[#111111] border border-[#e5e7eb] dark:border-white/6 rounded-xl shadow-lg overflow-hidden z-100">
                                            <div className="p-3 border-b border-[#e5e7eb] dark:border-white/6">
                                                <p className="text-sm font-semibold text-[#111827] dark:text-white">{user.name || 'User'}</p>
                                                <p className="text-xs text-[#6b7280] dark:text-[#9ca3af]">{user.email}</p>
                                            </div>
                                            <div className="p-1">
                                                <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-[#374151] dark:text-[#d1d5db] hover:bg-[#f3f4f6] dark:hover:bg-white/4 rounded-lg">
                                                    <User className="w-4 h-4" /> Profile
                                                </Link>
                                                <Link href={isSuperAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2 px-3 py-2 text-sm text-[#374151] dark:text-[#d1d5db] hover:bg-[#f3f4f6] dark:hover:bg-white/4 rounded-lg">
                                                    <LayoutDashboard className="w-4 h-4" /> {isSuperAdmin ? 'Admin Panel' : 'Dashboard'}
                                                </Link>
                                            </div>
                                            <div className="p-1 border-t border-[#e5e7eb] dark:border-white/6">
                                                <button
                                                    onClick={() => { fetch('/api/users/logout', { method: 'POST' }).then(() => window.location.reload()); }}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/8 rounded-lg"
                                                >
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className={`text-[16.5px] font-semibold transition-all duration-200 px-6 py-2.5 rounded-lg ${
                                        showSolid
                                            ? 'text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white hover:bg-[#f3f4f6] dark:hover:bg-white/6'
                                            : 'text-[#111827] dark:text-white hover:bg-black/5 dark:hover:bg-white/8 hover:backdrop-blur-sm hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18)] drop-shadow-sm'
                                    }`}>
                                        Login
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="text-[16.5px] font-bold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg relative overflow-hidden group text-white bg-linear-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30 border border-cyan-400/50"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative z-10 tracking-wide">Book a demo</span>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${
                                showSolid
                                    ? 'text-[#111827] dark:text-white hover:bg-[#f3f4f6] dark:hover:bg-white/6'
                                    : 'text-white hover:bg-white/10'
                            }`}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ═══ FULL-WIDTH MEGA MENU DROPDOWN ═══ */}
            {activeMenu && (
                <div
                    className="fixed top-20 left-0 right-0 z-40 animate-mega-slide-down"
                    onMouseEnter={() => { if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current); }}
                    onMouseLeave={handleMenuLeave}
                >
                    {/* Frosted glass panel */}
                    <div className="bg-white/80 dark:bg-[#03060f]/85 backdrop-blur-2xl border-b border-slate-200/60 dark:border-white/6 shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_60px_rgba(0,0,0,0.6)]">
                    {/* Cyan accent line at very top */}
                    <div className="h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
                    <div className="max-w-350 mx-auto px-4 lg:px-8 py-8">
                        {activeMenu === 'services' && (
                            <div>
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#9ca3af] mb-6">Our Services</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {serviceItems.map((item, i) => (
                                        <MegaMenuItem key={i} href={item.href} icon={iconMap[item.iconName] || Database} title={item.title} description={item.description} colorScheme="purple" />
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeMenu === 'solutions' && (
                            <div>
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#9ca3af] mb-6">Solutions by Sector</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {solutionItems.map((item, i) => (
                                        <MegaMenuItem key={i} href={item.href} icon={iconMap[item.iconName] || Crosshair} title={item.title} description={item.description} colorScheme="blue" />
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeMenu === 'resources' && (
                            <div>
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#9ca3af] mb-6">Featured Resources</p>
                                {resourceItems.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-4">
                                        {resourceItems.map((item, i) => (
                                            <MegaMenuItem key={i} href={(item as any).href} icon={iconMap[(item as any).iconName] || FileText} title={item.title} description={item.description} colorScheme="emerald" />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[#9ca3af]">No featured resources yet. Tick "Featured in Nav" on any resource in the admin.</p>
                                )}
                                {/* View all link */}
                                <div className="mt-6 pt-5 border-t border-[#e5e7eb] dark:border-white/[0.06] flex items-center justify-between">
                                    <Link href="/resources" className="text-sm font-semibold text-[#2563eb] dark:text-cyan-400 hover:underline flex items-center gap-1.5">
                                        View All Resources →
                                    </Link>
                                </div>
                                {llmLinks.length > 0 && (
                                    <>
                                        <div className="mt-8 mb-5 flex items-center gap-3">
                                            <div className="h-px flex-1 bg-[#e5e7eb] dark:bg-white/[0.06]" />
                                            <p className="text-xs font-semibold text-[#9ca3af] whitespace-nowrap">{llmSectionHeading}</p>
                                            <div className="h-px flex-1 bg-[#e5e7eb] dark:bg-white/[0.06]" />
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {llmLinks.map((llm: any, i: number) => {
                                                const color = llm.iconColor || '#6b7280';
                                                const letter = llm.iconLetter || (llm.name?.[0] || '?');
                                                const rgb = color.startsWith('#') && color.length >= 7
                                                    ? `${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}`
                                                    : '107, 114, 128';
                                                return (
                                                    <a
                                                        key={i}
                                                        href={llm.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] dark:border-white/[0.08] bg-white dark:bg-[#0d0d0d] hover:border-[#d1d5db] dark:hover:border-white/20 hover:shadow-sm transition-all duration-200"
                                                    >
                                                        <div
                                                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                                                            style={{ background: `rgba(${rgb}, 0.15)`, border: `1px solid rgba(${rgb}, 0.3)` }}
                                                        >
                                                            <span className="text-[10px] font-black" style={{ color }}>{letter}</span>
                                                        </div>
                                                        <span className="text-xs font-semibold text-[#374151] dark:text-[#d1d5db] group-hover:text-[#111827] dark:group-hover:text-white transition-colors">{llm.name}</span>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        {activeMenu === 'company' && (
                            <div>
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#9ca3af] mb-6">Company</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <MegaMenuItem href="/company/about" icon={Info} title="About Us" description="Our mission, values, and the story behind Kingsforth." colorScheme="amber" />
                                    <MegaMenuItem href="/company/team" icon={Users} title="Team" description="Meet the engineers and researchers building the future." colorScheme="amber" />
                                    <MegaMenuItem href="/contact" icon={FileText} title="Contact" description="Get in touch with our team for demos and inquiries." colorScheme="amber" />
                                    <MegaMenuItem href="/company/faqs" icon={HelpCircle} title="FAQs" description="Get answers to common questions." colorScheme="amber" />
                                    <MegaMenuItem href="/pricing" icon={BarChart3} title="Pricing" description="View our flexible pricing plans and tiers." colorScheme="amber" />
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <>
                    <div className="lg:hidden fixed inset-0 z-60 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
                    <div className="lg:hidden fixed top-16 left-0 right-0 z-70 bg-white dark:bg-[#0a0a0a] border-b border-[#e5e7eb] dark:border-white/6 shadow-lg overflow-y-auto max-h-[75vh]">
                        <div className="px-4 py-4 space-y-2">
                            {user && (
                                <div className="border-b border-[#e5e7eb] dark:border-white/6 pb-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-linear-to-br from-[#9b72fa] to-[#26cceb] rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-[#111827] dark:text-white">{user.name || 'User'}</div>
                                            <div className="text-xs text-[#6b7280] dark:text-[#9ca3af]">{user.email}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <MobileMenuSection title="Services" items={serviceItems} />
                            <MobileMenuSection title="Solutions" items={solutionItems} />
                            <MobileMenuSection title="Resources" items={resourceItems as any} />
                            <MobileMenuSection title="Company" items={[
                                { href: '/company/about', title: 'About Us', description: 'Our mission and values', iconName: 'info' },
                                { href: '/company/team', title: 'Team', description: 'Meet the team', iconName: 'users' },
                                { href: '/contact', title: 'Contact', description: 'Get in touch', iconName: 'file-text' },
                                { href: '/company/faqs', title: 'FAQs', description: 'Common questions', iconName: 'help-circle' }
                            ]} />

                            <div className="pt-4 border-t border-[#e5e7eb] dark:border-white/6 space-y-2">
                                <div className="flex justify-center mb-3">
                                    <ThemeToggle />
                                </div>
                                {!user && (
                                    <>
                                        <Link href="/login" className="block w-full text-center py-2.5 text-sm font-medium text-[#374151] dark:text-[#d1d5db] border border-[#e5e7eb] dark:border-white/10 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                                            Login
                                        </Link>
                                        <Link href="/contact" className="relative group overflow-hidden block w-full text-center py-3 text-[15px] font-bold text-white bg-linear-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 active:scale-95" onClick={() => setMobileMenuOpen(false)}>
                                            <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <span className="relative z-10">Book a demo</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

/* ═══ Mega Menu Item ═══ */
const COLOR_SCHEMES = {
    purple: {
        bg:      'bg-purple-50 dark:bg-purple-500/[0.08]',
        icon:    'text-purple-600 dark:text-purple-400',
        hoverBg: 'group-hover:bg-purple-100 dark:group-hover:bg-purple-500/[0.14]',
        text:    'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    },
    blue: {
        bg:      'bg-blue-50 dark:bg-blue-500/[0.08]',
        icon:    'text-blue-600 dark:text-blue-400',
        hoverBg: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-500/[0.14]',
        text:    'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    },
    emerald: {
        bg:      'bg-emerald-50 dark:bg-emerald-500/[0.08]',
        icon:    'text-emerald-600 dark:text-emerald-400',
        hoverBg: 'group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/[0.14]',
        text:    'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    },
    amber: {
        bg:      'bg-amber-50 dark:bg-amber-500/[0.08]',
        icon:    'text-amber-600 dark:text-amber-400',
        hoverBg: 'group-hover:bg-amber-100 dark:group-hover:bg-amber-500/[0.14]',
        text:    'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    },
} as const;
type ColorScheme = keyof typeof COLOR_SCHEMES;

function MegaMenuItem({ href, icon: Icon, title, description, external = false, colorScheme = 'blue' }: any) {
    const Wrapper = external ? 'a' : Link;
    const extraProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    const c = COLOR_SCHEMES[colorScheme as ColorScheme] ?? COLOR_SCHEMES.blue;

    return (
        <Wrapper
            href={href}
            {...extraProps}
            className="group flex items-start gap-4 p-4 rounded-xl hover:bg-[#f9fafb] dark:hover:bg-white/3 transition-all duration-200"
        >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${c.bg} ${c.hoverBg}`}>
                <Icon className={`w-5 h-5 transition-colors ${c.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold text-[#111827] dark:text-white transition-colors ${c.text}`}>{title}</h4>
                <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-0.5 leading-relaxed line-clamp-2">{description}</p>
            </div>
        </Wrapper>
    );
}

/* ═══ Mobile Menu Section ═══ */
function MobileMenuSection({ title, items }: { title: string; items: Array<{ href: string; title: string; description?: string; iconName?: string }> }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#f3f4f6] dark:border-white/6 pb-2">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-3 text-[#111827] dark:text-white hover:bg-[#f9fafb] dark:hover:bg-white/4 rounded-lg transition-colors text-sm font-semibold"
            >
                {title}
                <ChevronDown className={`w-4 h-4 text-[#9ca3af] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-1 space-y-0.5 pl-2">
                    {items.map((item, index) => {
                        const Icon = item.iconName ? (iconMap[item.iconName] || Shield) : Shield;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f3f4f6] dark:hover:bg-white/4 transition-colors"
                            >
                                <Icon className="w-4 h-4 text-[#9ca3af] shrink-0" />
                                <div>
                                    <div className="text-sm font-medium text-[#374151] dark:text-[#d1d5db]">{item.title}</div>
                                    {item.description && <div className="text-xs text-[#9ca3af] mt-0.5">{item.description}</div>}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
