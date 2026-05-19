import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, ArrowRight, CheckCircle, PhoneCall, MessageSquare,
    MonitorPlay, Crosshair, Building2, GraduationCap, Stethoscope,
    Scan, Shield, Zap, Brain, Network, Eye, Bot,
} from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getEmbedUrl } from '@/components/marketing/DetailPageLayout';
import { ALL_SOLUTIONS } from '@/data/solutions-data';

export const revalidate = 300;

const ICON_MAP: Record<string, React.ElementType> = {
    'monitor-play': MonitorPlay, crosshair: Crosshair, 'building-2': Building2,
    'graduation-cap': GraduationCap, stethoscope: Stethoscope, scan: Scan,
    shield: Shield, zap: Zap, brain: Brain, network: Network, eye: Eye, bot: Bot,
};

/* Violet-anchored theme — matches solutions brand color */
const THEME = {
    from: 'from-violet-950', via: 'via-slate-950', to: 'to-slate-950',
    ring: 'ring-violet-500/20',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    badge: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
    badgeDot: 'bg-violet-400',
    statBorder: 'border-violet-500/20 hover:border-violet-500/40',
    featBorder: 'hover:border-violet-500/40',
};

function lex(text: string) {
    return {
        root: {
            type: 'root', format: '' as const, indent: 0, version: 1, direction: null,
            children: text.split('\n\n').filter(Boolean).map((p) => ({
                type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: null,
                children: [{ mode: 'normal', text: p.trim(), type: 'text', style: '', detail: 0, format: 0, version: 1 }],
            })),
        },
    };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const staticSol = ALL_SOLUTIONS.find((s) => s.slug === slug);
    try {
        const payload = await getPayload({ config: configPromise });
        const { docs } = await payload.find({ collection: 'solutions', where: { slug: { equals: slug } }, limit: 1 });
        const s = docs[0] as any;
        if (s) return { title: `${s.title} | Kingsforth Solutions`, description: s.subtitle || '' };
    } catch {}
    if (staticSol) return { title: `${staticSol.title} | Kingsforth Solutions`, description: staticSol.subtitle };
    return { title: 'Solutions | Kingsforth' };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let sol: any;
    try {
        const payload = await getPayload({ config: configPromise });
        const { docs } = await payload.find({
            collection: 'solutions',
            where: { slug: { equals: slug }, isPublished: { equals: true } },
            limit: 1, depth: 2,
        });
        sol = docs[0] ?? null;
    } catch {}

    if (!sol) {
        const staticSol = ALL_SOLUTIONS.find((s) => s.slug === slug);
        if (!staticSol) notFound();
        sol = {
            id: staticSol.slug, slug: staticSol.slug,
            title: staticSol.title, subtitle: staticSol.subtitle,
            category: staticSol.category, isPublished: true,
            shortDescription: staticSol.shortDescription,
            longDescription: lex(staticSol.longDescription),
            keyBenefits: staticSol.keyBenefits,
            stats: staticSol.stats,
            featureSections: staticSol.featureSections.map((fs) => ({
                title: fs.title, description: fs.description,
                points: fs.points.map((p) => ({ point: p })),
            })),
            faqs: staticSol.faqs,
            heroImage: null, heroVideoUrl: null,
        };
    }

    const heroImageUrl = sol.heroImage && typeof sol.heroImage === 'object'
        ? (sol.heroImage.url ?? null) : null;
    const embedUrl = getEmbedUrl(sol.heroVideoUrl);
    const features: { title: string; description: string }[] = (sol.keyBenefits ?? []).map((b: any) => ({ title: b.title, description: b.description }));
    const stats: { value: string; label: string }[] = sol.stats ?? [];
    const descriptionRich = sol.longDescription;

    const BADGE_MAP: Record<string, string> = {
        industry: 'Industry Solution', 'use-case': 'Use Case', Industry: 'Industry Solution', 'Use Case': 'Use Case',
    };
    const MainIcon = ICON_MAP[slug] ?? Crosshair;

    return (
        <main className="min-h-screen bg-slate-950 relative z-10 pb-24">

            {/* ── BACK ── */}
            <div className="max-w-7xl mx-auto px-6 pt-28 pb-6">
                <Link href="/solutions"
                    className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors group">
                    <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" />
                    </div>
                    All Solutions
                </Link>
            </div>

            {/* ── HERO ── */}
            <section className={`relative overflow-hidden bg-linear-to-br ${THEME.from} ${THEME.via} ${THEME.to}`}>
                {/* Glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 rounded-full blur-[120px] opacity-20 ${THEME.bg}`} />

                {/* Grid lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute inset-0 service-grid-lines" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 ${THEME.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${THEME.badgeDot}`} />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                            {BADGE_MAP[sol.category] ?? sol.category ?? 'Solution'}
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-12">
                        <div className="flex-1 max-w-3xl">
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-2xl ${THEME.bg} border ${THEME.border} flex items-center justify-center mb-6`}>
                                <MainIcon className={`w-8 h-8 ${THEME.text}`} />
                            </div>
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-5">
                                {sol.title}
                            </h1>
                            <p className="text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
                                {sol.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact"
                                    className="inline-flex items-center gap-2.5 h-13 px-8 py-3.5 bg-white text-slate-900 font-bold rounded-full hover:scale-[1.03] transition-transform shadow-xl">
                                    <PhoneCall className="w-4 h-4" /> Book a Demo
                                </Link>
                                <Link href="#capabilities"
                                    className={`inline-flex items-center gap-2 text-sm font-semibold ${THEME.text} hover:text-white transition-colors`}>
                                    Explore Details <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        {stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 lg:w-72">
                                {stats.map((s, i) => (
                                    <div key={i} className={`bg-white/5 rounded-2xl p-5 border ${THEME.statBorder} transition-colors`}>
                                        <div className={`text-3xl font-black ${THEME.text} mb-1`}>{s.value}</div>
                                        <div className="text-xs text-white/50 uppercase tracking-wider font-semibold leading-tight">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── HERO IMAGE ── */}
            {heroImageUrl && (
                <div className="max-w-7xl mx-auto px-6 -mt-4">
                    <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={heroImageUrl} alt={sol.title} className="w-full aspect-21/9 object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />
                    </div>
                </div>
            )}

            {/* ── VIDEO ── */}
            {embedUrl && (
                <section className="max-w-5xl mx-auto px-6 py-14">
                    <div className="relative group">
                        <div className={`absolute -inset-3 ${THEME.bg} rounded-4xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none`} />
                        <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl">
                            <iframe src={embedUrl} title={`${sol.title} Overview`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen loading="lazy" className="w-full h-full border-0" />
                        </div>
                    </div>
                </section>
            )}

            {/* ── OVERVIEW ── */}
            {descriptionRich?.root?.children?.length > 0 && (
                <section className="max-w-5xl mx-auto px-6 py-14">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${THEME.badge}`}>
                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase">Overview</span>
                    </div>
                    <div className="prose prose-lg prose-invert max-w-none prose-p:text-white/60 prose-p:leading-relaxed prose-headings:text-white prose-a:text-violet-400">
                        <RichText data={descriptionRich} />
                    </div>
                </section>
            )}

            {/* ── KEY CAPABILITIES / BENEFITS ── */}
            {features.length > 0 && (
                <section id="capabilities" className="max-w-7xl mx-auto px-6 py-14 scroll-mt-24">
                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 ${THEME.badge}`}>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Capabilities</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Key Capabilities</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {features.map((feat, i) => (
                            <div key={i} className={`group bg-white/2 border border-white/[0.07] rounded-2xl p-8 ${THEME.featBorder} hover:bg-white/5 transition-all duration-300`}>
                                <div className={`w-12 h-12 rounded-xl ${THEME.bg} border ${THEME.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    <CheckCircle className={`w-5 h-5 ${THEME.text}`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{feat.title}</h3>
                                {feat.description && (
                                    <p className="text-sm text-white/50 leading-relaxed">{feat.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── FEATURE SECTIONS ── */}
            {sol.featureSections?.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 space-y-20 mb-20">
                    {sol.featureSections.map((section: any, i: number) => (
                        <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-start`}>
                            <div className="w-full md:w-1/2 space-y-5">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-[0.15em] uppercase ${THEME.badge}`}>
                                    Feature {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">{section.title}</h3>
                                {section.description && (
                                    <p className="text-white/50 leading-relaxed">{section.description}</p>
                                )}
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="bg-white/3 border border-white/8 rounded-2xl p-7">
                                    <ul className="space-y-3">
                                        {(section.points ?? []).map((p: any, pi: number) => (
                                            <li key={pi} className="flex items-start gap-3 text-white/60 text-sm">
                                                <CheckCircle className={`w-4 h-4 ${THEME.text} mt-0.5 shrink-0`} />
                                                <span>{p.point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* ── FAQs ── */}
            {sol.faqs?.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 mb-16">
                    <h2 className="text-3xl font-black text-white mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {sol.faqs.map((faq: any, i: number) => (
                            <details key={i} className="group bg-white/2 border border-white/[0.07] rounded-2xl overflow-hidden">
                                <summary className="px-7 py-5 cursor-pointer text-white font-semibold flex items-center justify-between hover:text-violet-400 transition-colors list-none">
                                    {faq.question}
                                    <span className="text-white/40 group-open:rotate-180 transition-transform duration-300 ml-4 shrink-0">▾</span>
                                </summary>
                                <div className="px-7 pb-6 text-white/50 leading-relaxed border-t border-white/5 pt-4">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            )}

            {/* ── CTA ── */}
            <section className="max-w-5xl mx-auto px-6 mt-8">
                <div className={`relative rounded-3xl overflow-hidden bg-linear-to-br ${THEME.from} ${THEME.via} ${THEME.to} border border-white/8 p-12 md:p-20 text-center`}>
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full blur-[80px] opacity-15 ${THEME.bg} pointer-events-none`} />
                    <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 ${THEME.badge}`}>
                            <MessageSquare className={`w-3.5 h-3.5 ${THEME.text}`} />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Talk to an Expert</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                            See {sol.title} in action?
                        </h2>
                        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
                            {`Talk to our architects and get a live walkthrough of Kingsforth ${sol.title} for your organization.`}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact"
                                className="inline-flex items-center justify-center gap-2.5 h-14 px-8 bg-white text-slate-900 font-bold text-base rounded-full shadow-xl hover:scale-105 transition-all duration-300">
                                <PhoneCall className="w-4 h-4" /> Book a Demo
                            </Link>
                            <Link href="/contact"
                                className="inline-flex items-center justify-center gap-2.5 h-14 px-8 bg-white/10 text-white font-bold text-base rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <MessageSquare className="w-4 h-4" /> Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
