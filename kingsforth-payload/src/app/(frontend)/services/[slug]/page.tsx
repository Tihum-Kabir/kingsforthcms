import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
    ArrowLeft, ArrowRight, PhoneCall, MessageSquare,
    Search, Database, Eye, Camera, Cpu, Brain, Bot,
    Network, Zap, ShieldAlert, Bell, FileCheck,
    ClipboardList, Settings, Plug, TrendingUp, BookOpen,
    CheckCircle, Layers, BarChart3, Workflow,
} from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ServicePricingSection } from './ServicePricingClient'
import { SERVICES_DATA } from '@/data/services-data'

export const revalidate = 300

/* ─── icon map ─────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
    search: Search, database: Database, eye: Eye, camera: Camera,
    cpu: Cpu, brain: Brain, bot: Bot, network: Network, zap: Zap,
    'shield-alert': ShieldAlert, bell: Bell, 'file-check': FileCheck,
    'clipboard-list': ClipboardList, settings: Settings, plug: Plug,
    'trending-up': TrendingUp, 'book-open': BookOpen, workflow: Workflow,
    'bar-chart-3': BarChart3, layers: Layers,
}
const getIcon = (name: string) => ICON_MAP[name] ?? Zap

/* ─── color themes ──────────────────────────────────── */
const THEME: Record<string, {
    from: string; via: string; to: string
    ring: string; text: string; bg: string; border: string
    badge: string; badgeDot: string; stepBg: string
    statBorder: string; featBorder: string
}> = {
    cyan: {
        from: 'from-cyan-50 dark:from-cyan-950', via: 'via-white dark:via-slate-950', to: 'to-white dark:to-slate-950',
        ring: 'ring-cyan-500/20', text: 'text-cyan-600 dark:text-cyan-400',
        bg: 'bg-cyan-100 dark:bg-cyan-500/10', border: 'border-cyan-300 dark:border-cyan-500/20',
        badge: 'bg-cyan-100 border-cyan-300 text-cyan-600 dark:bg-cyan-500/10 dark:border-cyan-500/30 dark:text-cyan-400',
        badgeDot: 'bg-cyan-500 dark:bg-cyan-400',
        stepBg: 'bg-cyan-100 border-cyan-300 text-cyan-600 dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-400',
        statBorder: 'border-cyan-300 dark:border-cyan-500/20 hover:border-cyan-500 dark:hover:border-cyan-500/40',
        featBorder: 'hover:border-cyan-400/60 dark:hover:border-cyan-400/40',
    },
    violet: {
        from: 'from-violet-50 dark:from-violet-950', via: 'via-white dark:via-slate-950', to: 'to-white dark:to-slate-950',
        ring: 'ring-violet-500/20', text: 'text-violet-600 dark:text-violet-400',
        bg: 'bg-violet-100 dark:bg-violet-500/10', border: 'border-violet-300 dark:border-violet-500/20',
        badge: 'bg-violet-100 border-violet-300 text-violet-600 dark:bg-violet-500/10 dark:border-violet-500/30 dark:text-violet-400',
        badgeDot: 'bg-violet-500 dark:bg-violet-400',
        stepBg: 'bg-violet-100 border-violet-300 text-violet-600 dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-400',
        statBorder: 'border-violet-300 dark:border-violet-500/20 hover:border-violet-500 dark:hover:border-violet-500/40',
        featBorder: 'hover:border-violet-400/60 dark:hover:border-violet-400/40',
    },
    emerald: {
        from: 'from-emerald-50 dark:from-emerald-950', via: 'via-white dark:via-slate-950', to: 'to-white dark:to-slate-950',
        ring: 'ring-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-100 dark:bg-emerald-500/10', border: 'border-emerald-300 dark:border-emerald-500/20',
        badge: 'bg-emerald-100 border-emerald-300 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400',
        badgeDot: 'bg-emerald-500 dark:bg-emerald-400',
        stepBg: 'bg-emerald-100 border-emerald-300 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400',
        statBorder: 'border-emerald-300 dark:border-emerald-500/20 hover:border-emerald-500 dark:hover:border-emerald-500/40',
        featBorder: 'hover:border-emerald-400/60 dark:hover:border-emerald-400/40',
    },
    amber: {
        from: 'from-amber-50 dark:from-amber-950', via: 'via-white dark:via-slate-950', to: 'to-white dark:to-slate-950',
        ring: 'ring-amber-500/20', text: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-100 dark:bg-amber-500/10', border: 'border-amber-300 dark:border-amber-500/20',
        badge: 'bg-amber-100 border-amber-300 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400',
        badgeDot: 'bg-amber-500 dark:bg-amber-400',
        stepBg: 'bg-amber-100 border-amber-300 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400',
        statBorder: 'border-amber-300 dark:border-amber-500/20 hover:border-amber-500 dark:hover:border-amber-500/40',
        featBorder: 'hover:border-amber-400/60 dark:hover:border-amber-400/40',
    },
    rose: {
        from: 'from-rose-50 dark:from-rose-950', via: 'via-white dark:via-slate-950', to: 'to-white dark:to-slate-950',
        ring: 'ring-rose-500/20', text: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-100 dark:bg-rose-500/10', border: 'border-rose-300 dark:border-rose-500/20',
        badge: 'bg-rose-100 border-rose-300 text-rose-600 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400',
        badgeDot: 'bg-rose-500 dark:bg-rose-400',
        stepBg: 'bg-rose-100 border-rose-300 text-rose-600 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400',
        statBorder: 'border-rose-300 dark:border-rose-500/20 hover:border-rose-500 dark:hover:border-rose-500/40',
        featBorder: 'hover:border-rose-400/60 dark:hover:border-rose-400/40',
    },
    indigo: {
        from: 'from-indigo-50 dark:from-indigo-950', via: 'via-white dark:via-slate-950', to: 'to-white dark:to-slate-950',
        ring: 'ring-indigo-500/20', text: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-100 dark:bg-indigo-500/10', border: 'border-indigo-300 dark:border-indigo-500/20',
        badge: 'bg-indigo-100 border-indigo-300 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400',
        badgeDot: 'bg-indigo-500 dark:bg-indigo-400',
        stepBg: 'bg-indigo-100 border-indigo-300 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400',
        statBorder: 'border-indigo-300 dark:border-indigo-500/20 hover:border-indigo-500 dark:hover:border-indigo-500/40',
        featBorder: 'hover:border-indigo-400/60 dark:hover:border-indigo-400/40',
    },
}

function lex(text: string) {
    return {
        root: {
            type: 'root', format: '' as const, indent: 0, version: 1, direction: null,
            children: text.split('\n\n').filter(Boolean).map((p) => ({
                type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: null,
                children: [{ mode: 'normal', text: p.trim(), type: 'text', style: '', detail: 0, format: 0, version: 1 }],
            })),
        },
    }
}

function getEmbedUrl(url?: string | null): string | null {
    if (!url) return null
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/)
    if (yt?.[1]) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`
    const vm = url.match(/vimeo\.com\/(\d+)/)
    if (vm?.[1]) return `https://player.vimeo.com/video/${vm[1]}?dnt=1`
    return null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const staticSvc = SERVICES_DATA.find((s) => s.slug === slug)
    try {
        const payload = await getPayload({ config: configPromise })
        const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
        const s = docs[0] as any
        if (s) return { title: `${s.title} | Kingsforth`, description: s.subtitle || '' }
    } catch {}
    if (staticSvc) return { title: `${staticSvc.title} | Kingsforth`, description: staticSvc.subtitle }
    return { title: 'Service | Kingsforth' }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    /* ── Try Payload DB ─────────────────────────────── */
    let dbService: any = null
    try {
        const payload = await getPayload({ config: configPromise })
        const { docs } = await payload.find({
            collection: 'services',
            where: { slug: { equals: slug }, isPublished: { equals: true } },
            limit: 1, depth: 2,
        })
        dbService = docs[0] ?? null
    } catch {}

    /* ── Static fallback ────────────────────────────── */
    const staticSvc = SERVICES_DATA.find((s) => s.slug === slug)
    if (!dbService && !staticSvc) notFound()

    /* ── Merge: DB overrides static ─────────────────── */
    const title       = dbService?.title       ?? staticSvc!.title
    const subtitle    = dbService?.subtitle    ?? staticSvc!.subtitle
    const colorTheme  = (dbService?.colorTheme ?? staticSvc!.colorTheme) as string
    const category    = dbService?.category    ?? staticSvc!.category

    const descriptionRich = dbService?.description ?? (staticSvc ? lex(staticSvc.descriptionText) : null)
    const features    = (dbService?.features?.length   ? dbService.features   : staticSvc!.features)   as { title: string; description?: string }[]
    const howItWorks  = (dbService?.howItWorks?.length  ? dbService.howItWorks  : staticSvc!.howItWorks)  as { step?: number; title: string; description: string; iconName?: string }[]
    const stats       = (dbService?.stats?.length       ? dbService.stats       : staticSvc!.stats)       as { value: string; label: string }[]
    const plans       = (dbService?.plans       ?? [])   as any[]

    const heroImageUrl = dbService?.heroImage && typeof dbService.heroImage === 'object'
        ? dbService.heroImage.url ?? null : null
    const embedUrl = getEmbedUrl(dbService?.heroVideoUrl)

    const theme = THEME[colorTheme] ?? THEME.cyan
    const MainIcon = getIcon(staticSvc?.iconName ?? 'zap')

    return (
        <main className="min-h-screen bg-slate-950 relative z-10 pb-24">

            {/* ── BACK ───────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 pt-28 pb-6">
                <Link href="/services"
                    className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors group">
                    <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" />
                    </div>
                    All Services
                </Link>
            </div>

            {/* ── HERO ───────────────────────────────────────────── */}
            <section className={`relative overflow-hidden bg-linear-to-br ${theme.from} ${theme.via} ${theme.to}`}>
                {/* Decorative glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[120px] opacity-20 ${theme.bg}`} />

                {/* Decorative grid lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute inset-0 service-grid-lines" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 ${theme.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme.badgeDot}`} />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{category}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-12">
                        <div className="flex-1 max-w-3xl">
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center mb-6`}>
                                <MainIcon className={`w-8 h-8 ${theme.text}`} />
                            </div>
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-5">
                                {title}
                            </h1>
                            <p className="text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
                                {subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact"
                                    className="inline-flex items-center gap-2.5 h-13 px-8 py-3.5 bg-white text-slate-900 font-bold rounded-full hover:scale-[1.03] transition-transform shadow-xl">
                                    <PhoneCall className="w-4 h-4" /> Book a Demo
                                </Link>
                                <Link href="#capabilities"
                                    className={`inline-flex items-center gap-2 text-sm font-semibold ${theme.text} hover:text-white transition-colors`}>
                                    Explore Capabilities <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        {stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 lg:w-72">
                                {stats.map((s, i) => (
                                    <div key={i} className={`bg-white/5 rounded-2xl p-5 border ${theme.statBorder} transition-colors`}>
                                        <div className={`text-3xl font-black ${theme.text} mb-1`}>{s.value}</div>
                                        <div className="text-xs text-white/50 uppercase tracking-wider font-semibold leading-tight">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── HERO IMAGE (CMS) ────────────────────────────────── */}
            {heroImageUrl && (
                <div className="max-w-7xl mx-auto px-6 -mt-4">
                    <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl aspect-21/9">
                        <Image src={heroImageUrl} alt={title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />
                    </div>
                </div>
            )}

            {/* ── VIDEO EMBED (CMS) ───────────────────────────────── */}
            {embedUrl && (
                <section className="max-w-5xl mx-auto px-6 py-14">
                    <div className="relative group">
                        <div className={`absolute -inset-3 bg-linear-to-r ${theme.bg} rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none`} />
                        <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl">
                            <iframe src={embedUrl} title={`${title} Overview`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen loading="lazy" className="w-full h-full border-0" />
                        </div>
                    </div>
                </section>
            )}

            {/* ── OVERVIEW ────────────────────────────────────────── */}
            {descriptionRich?.root?.children?.length > 0 && (
                <section className="max-w-5xl mx-auto px-6 py-14">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${theme.badge}`}>
                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase">Overview</span>
                    </div>
                    <div className="prose prose-lg prose-invert max-w-none
                        prose-p:text-white/60 prose-p:leading-relaxed
                        prose-headings:text-white prose-a:text-cyan-400">
                        <RichText data={descriptionRich} />
                    </div>
                </section>
            )}

            {/* ── HOW IT WORKS ────────────────────────────────────── */}
            {howItWorks.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-14">
                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 ${theme.badge}`}>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Process</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">How It Works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {/* Connecting line (desktop only) */}
                        <div className="hidden md:block absolute top-12 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                        {howItWorks.map((step, i) => {
                            const StepIcon = getIcon(step.iconName ?? 'zap')
                            return (
                                <div key={i} className={`relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300`}>
                                    {/* Step number */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className={`w-10 h-10 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center shrink-0`}>
                                            <StepIcon className={`w-5 h-5 ${theme.text}`} />
                                        </div>
                                        <span className={`text-xs font-black tracking-[0.25em] uppercase ${theme.text} opacity-60`}>
                                            Step 0{step.step ?? i + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2.5">{step.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* ── KEY CAPABILITIES ────────────────────────────────── */}
            {features.length > 0 && (
                <section id="capabilities" className="max-w-7xl mx-auto px-6 py-14 scroll-mt-24">
                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 ${theme.badge}`}>
                            <Layers className={`w-3.5 h-3.5 ${theme.text}`} />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Capabilities</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Key Capabilities</h2>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-${Math.min(features.length, 3)} gap-5`}>
                        {features.map((feat, i) => {
                            const FeatIcon = ICON_MAP[Object.keys(ICON_MAP)[i % Object.keys(ICON_MAP).length]] ?? Zap
                            return (
                                <div key={i}
                                    className={`group bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 ${theme.featBorder} hover:bg-white/[0.05] transition-all duration-300`}>
                                    <div className={`w-12 h-12 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <CheckCircle className={`w-5 h-5 ${theme.text}`} />
                                    </div>
                                    <h3 className={`text-lg font-bold text-white mb-3 group-hover:${theme.text} transition-colors`}>
                                        {feat.title}
                                    </h3>
                                    {feat.description && (
                                        <p className="text-sm text-white/50 leading-relaxed">{feat.description}</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* ── PRICING ─────────────────────────────────────────── */}
            {plans.length > 0 && (
                <ServicePricingSection plans={plans} serviceTitle={title} />
            )}

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 mt-8">
                <div className={`relative rounded-3xl overflow-hidden bg-linear-to-br ${theme.from} ${theme.via} ${theme.to} border border-white/[0.08] p-12 md:p-20 text-center`}>
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[80px] opacity-15 ${theme.bg} pointer-events-none`} />
                    <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 ${theme.badge}`}>
                            <MessageSquare className={`w-3.5 h-3.5 ${theme.text}`} />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Talk to an Expert</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                            Ready to deploy {title}?
                        </h2>
                        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
                            Our architects will design a custom solution for your specific operational requirements.
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
    )
}
