import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link';
import { ArrowRight, Database, Eye, Cpu, Bot, Network, TrendingUp, Shield, Users, Mic, Search, CalendarCheck, Brain, ShieldAlert, Smile, Siren } from 'lucide-react';
import { SERVICES_DATA } from '@/data/services-data';

export const revalidate = 300;

const iconMap: any = {
    database: Database, eye: Eye, cpu: Cpu, bot: Bot, network: Network,
    'trending-up': TrendingUp, shield: Shield, 'shield-alert': ShieldAlert,
    users: Users, mic: Mic, search: Search, 'calendar-check': CalendarCheck,
    brain: Brain, smile: Smile, siren: Siren,
    default: Database,
};

const COLOR_PALETTES = [
    { name: 'cyan', icon: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-500/10', border: 'border-cyan-100 dark:border-cyan-500/20', hoverBorder: 'group-hover:border-cyan-500/50 dark:group-hover:border-cyan-400/50', glow: 'from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/[0.04] group-hover:to-transparent dark:group-hover:from-cyan-500/[0.08]' },
    { name: 'violet', icon: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10', border: 'border-violet-100 dark:border-violet-500/20', hoverBorder: 'group-hover:border-violet-500/50 dark:group-hover:border-violet-400/50', glow: 'from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/[0.04] group-hover:to-transparent dark:group-hover:from-violet-500/[0.08]' },
    { name: 'emerald', icon: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20', hoverBorder: 'group-hover:border-emerald-500/50 dark:group-hover:border-emerald-400/50', glow: 'from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/[0.04] group-hover:to-transparent dark:group-hover:from-emerald-500/[0.08]' },
    { name: 'amber', icon: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20', hoverBorder: 'group-hover:border-amber-500/50 dark:group-hover:border-amber-400/50', glow: 'from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/[0.04] group-hover:to-transparent dark:group-hover:from-amber-500/[0.08]' },
    { name: 'rose', icon: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-100 dark:border-rose-500/20', hoverBorder: 'group-hover:border-rose-500/50 dark:group-hover:border-rose-400/50', glow: 'from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/[0.04] group-hover:to-transparent dark:group-hover:from-rose-500/[0.08]' },
    { name: 'indigo', icon: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10', border: 'border-indigo-100 dark:border-indigo-500/20', hoverBorder: 'group-hover:border-indigo-500/50 dark:group-hover:border-indigo-400/50', glow: 'from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/[0.04] group-hover:to-transparent dark:group-hover:from-indigo-500/[0.08]' },
];

export const metadata = {
    title: 'Services | Kingsforth',
    description: "Explore Kingsforth's comprehensive suite of AI-driven security and intelligence services including cognitive surveillance, big data forensics, IoT orchestration, and autonomous field operations.",
    openGraph: {
        title: 'AI Security Services | Kingsforth',
        description: "Explore Kingsforth's AI-driven security services: cognitive surveillance, big data forensics, IoT orchestration, and more.",
        url: 'https://kingsforth.net/services',
        siteName: 'Kingsforth',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Kingsforth Services' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Security Services | Kingsforth',
        description: "Cognitive surveillance, big data forensics, IoT orchestration and more from Kingsforth.",
        images: ['/og-image.jpg'],
    },
};

export default async function ServicesPage() {
    let services: any[] = [];
    let siteSettings: any = null;

    try {
        const payload = await getPayload({ config: configPromise });
        try {
            const result = await payload.find({
                collection: 'services',
                where: { isPublished: { equals: true } },
                sort: 'orderIndex',
                limit: 100,
            });
            services = result.docs;
        } catch { }
        try {
            siteSettings = await payload.findGlobal({ slug: 'site-settings' });
        } catch { }
    } catch { }

    // Static fallback — pages always show content even if DB is empty
    if (services.length === 0) {
        services = SERVICES_DATA.map((svc) => ({
            id: svc.slug,
            slug: svc.slug,
            title: svc.title,
            subtitle: svc.subtitle,
            description: null,
            colorTheme: svc.colorTheme,
            icon: svc.iconName,
            features: svc.features,
            isPublished: true,
        }));
    }

    const pageHero = siteSettings?.pageHeroes?.find((ph: any) => ph.pageSlug === 'services');
    const rawHeadline: string = pageHero?.headline || 'Deployable Assets';
    const parts = rawHeadline.trim().split(' ');
    const headlineFirst = parts.slice(0, -1).join(' ');
    const headlineLast = parts[parts.length - 1];
    const subtitle = pageHero?.subtitle || 'A comprehensive suite of sovereign-grade intelligence tools designed for the autonomous enterprise.';

    return (
        <div className="min-h-screen relative z-10 overflow-x-hidden">

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center pt-40 pb-24 px-6 text-center overflow-hidden">
                {/* Ambient blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-violet-500/8 dark:bg-violet-500/6 rounded-full blur-[100px] pointer-events-none" />

                {/* Badge */}
                <div className="relative inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-cyan-600 dark:text-cyan-400">
                        Operational Capabilities
                    </span>
                </div>

                {/* Title — two tone, no box */}
                <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1] mb-6">
                    {headlineFirst && (
                        <span className="text-slate-900 dark:text-white">{headlineFirst} </span>
                    )}
                    <span className="text-cyan-500">{headlineLast}</span>
                </h1>

                <p className="relative text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                    {subtitle}
                </p>
            </section>

            {/* ── SERVICES GRID ─────────────────────────────────────────── */}
            <section className="max-w-350 mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service: any, index: number) => {
                        const uploadedIconUrl = service.icon && typeof service.icon === 'object' ? service.icon.url : null;
                        const Icon = (!uploadedIconUrl && service.icon && iconMap[service.icon]) ? iconMap[service.icon] : iconMap.default;
                        
                        const colorTheme = service.colorTheme;
                        const palette = colorTheme 
                            ? COLOR_PALETTES.find(p => p.name === colorTheme) || COLOR_PALETTES[index % COLOR_PALETTES.length]
                            : COLOR_PALETTES[index % COLOR_PALETTES.length];

                        let descText = '';
                        if (service.description?.root?.children) {
                            for (const block of service.description.root.children) {
                                if (block.children) {
                                    for (const child of block.children) {
                                        if (child.text) descText += child.text + ' ';
                                    }
                                }
                            }
                        }
                        const excerpt = descText.trim();
                        const displayDesc = service.subtitle || excerpt;

                        return (
                            <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                className={`group relative flex flex-col bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-white/[0.07] rounded-3xl p-7 md:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-none ${palette.hoverBorder}`}
                            >
                                {/* Hover glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 rounded-3xl pointer-events-none ${palette.glow}`} />

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl ${palette.bg} ${palette.border} border flex items-center justify-center mb-6 overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                    {uploadedIconUrl
                                        ? <img src={uploadedIconUrl} alt={service.title} className="w-7 h-7 object-contain" />
                                        : <Icon className={`w-7 h-7 ${palette.icon}`} />
                                    }
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-800 dark:group-hover:text-gray-100 transition-colors">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                {displayDesc && (
                                    <p className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1 line-clamp-3 font-medium">
                                        {displayDesc}
                                    </p>
                                )}

                                {/* Features */}
                                {service.features?.length > 0 && (
                                    <ul className="space-y-2.5 mb-7">
                                        {service.features.slice(0, 3).map((feat: any, i: number) => (
                                            <li key={i} className="flex items-start gap-2.5 text-[13px] md:text-sm text-slate-600 dark:text-slate-300 font-medium">
                                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${palette.bg.split(' ')[0].replace('50', '400')} dark:${palette.icon.split(' ')[1].replace('text-', 'bg-')}`} />
                                                {feat.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* CTA */}
                                <div className="mt-auto pt-5 border-t border-slate-100 dark:border-white/[0.05]">
                                    <span className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase transition-colors ${palette.icon}`}>
                                        Deploy Solution
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-slate-400 dark:text-slate-500">Service catalog is currently being updated.</p>
                    </div>
                )}
            </section>

            {/* ── CTA BANNER ────────────────────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 pb-28">
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Cyan gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-teal-400 dark:from-[#0a2a35] dark:via-[#0d3340] dark:to-[#0a2a35]" />
                    {/* Noise / mesh overlay */}
                    <div className="services-cta-noise absolute inset-0 opacity-10 dark:opacity-20" />

                    <div className="relative z-10 px-10 py-16 md:py-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-4 tracking-tight">
                            Ready to Upgrade Your<br />Infrastructure?
                        </h2>
                        <p className="text-black/60 dark:text-white/60 text-base md:text-lg mb-10 max-w-lg mx-auto">
                            Consult with our architects to build a custom solution for your specific operational needs.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2.5 h-13 px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-sm tracking-wide hover:scale-[1.03] transition-transform shadow-xl"
                        >
                            Initialize Contact <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
