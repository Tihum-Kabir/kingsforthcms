import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { ArrowRight, FileText, Globe, Play, BookOpen, File, ExternalLink } from 'lucide-react'

export const revalidate = 300;

export const metadata = {
    title: 'Resources | Kingsforth',
    description: 'White papers, case studies, blog articles, and technical documentation from the Kingsforth intelligence platform.',
    openGraph: {
        title: 'Intelligence Resources | Kingsforth',
        description: 'White papers, case studies, blog articles, and technical docs from the Kingsforth AI security platform.',
        url: 'https://kingsforth.net/resources',
        siteName: 'Kingsforth',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Kingsforth Resources' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Intelligence Resources | Kingsforth',
        description: 'White papers, case studies, and technical docs from the Kingsforth AI security platform.',
        images: ['/og-image.jpg'],
    },
};

const CATEGORY_GRAD: Record<string, string> = {
    'Blog': 'from-blue-950 via-indigo-950 to-slate-950',
    'Documentation': 'from-purple-950 via-violet-950 to-slate-950',
    'Case Study': 'from-emerald-950 via-green-950 to-slate-950',
    'White Paper': 'from-cyan-950 via-teal-950 to-slate-950',
    'Library': 'from-violet-950 via-purple-950 to-slate-950',
    'Customer Story': 'from-amber-950 via-yellow-950 to-slate-950',
    'Partner': 'from-rose-950 via-pink-950 to-slate-950',
    'Grant': 'from-orange-950 via-amber-950 to-slate-950',
    'AI Agent': 'from-teal-950 via-cyan-950 to-slate-950',
};

const CATEGORY_BADGE: Record<string, string> = {
    'Blog': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Documentation': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Case Study': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'White Paper': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'Library': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    'Customer Story': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Partner': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    'Grant': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'AI Agent': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
};

function formatDate(d: string) {
    try { return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); }
    catch { return ''; }
}

function ResourceCard({ resource }: { resource: any }) {
    const isExternal = !!resource.externalLink;
    const href = isExternal ? resource.externalLink : `/resources/${resource.slug}`;
    const coverUrl = resource.coverImage && typeof resource.coverImage === 'object' ? resource.coverImage.url : null;
    const hasPdf = !!resource.pdfFile;
    const hasDocx = !!resource.docxFile;
    const hasVideo = !!resource.videoUrl;
    const grad = CATEGORY_GRAD[resource.category] ?? 'from-slate-950 via-slate-900 to-slate-950';
    const badgeCls = CATEGORY_BADGE[resource.category] ?? 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    const ctaLabel = isExternal ? 'Visit' : hasPdf || hasDocx ? 'Download' : 'Read';

    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group flex flex-col bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/7 rounded-2xl overflow-hidden hover:shadow-2xl dark:hover:shadow-black/60 hover:border-slate-300 dark:hover:border-white/15 transition-all duration-300 hover:-translate-y-1.5"
        >
            {/* Cover */}
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-black/40">
                {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={coverUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        loading="lazy"
                    />
                ) : (
                    <div className={`resource-card-bg-overlay w-full h-full bg-linear-to-br ${grad} flex items-center justify-center`}>
                        <BookOpen className="w-14 h-14 text-white/15" />
                    </div>
                )}
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className={`text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm ${badgeCls}`}>
                        {resource.category}
                    </span>
                </div>
                {/* File type badges */}
                {(hasPdf || hasDocx || hasVideo) && (
                    <div className="absolute top-4 right-4 z-10 flex gap-1.5">
                        {hasPdf && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600/90 text-white backdrop-blur-sm shadow-sm">
                                <FileText className="w-3 h-3" /> PDF
                            </span>
                        )}
                        {hasDocx && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600/90 text-white backdrop-blur-sm shadow-sm">
                                <File className="w-3 h-3" /> DOCX
                            </span>
                        )}
                        {hasVideo && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-600/90 text-white backdrop-blur-sm shadow-sm">
                                <Play className="w-3 h-3 fill-current" /> Video
                            </span>
                        )}
                    </div>
                )}
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col gap-3.5 flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                    {resource.title}
                </h3>
                {resource.summary && (
                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{resource.summary}</p>
                )}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
                    <span className="text-[13px] text-slate-400 dark:text-slate-500">{formatDate(resource.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">
                        {ctaLabel} <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

function LLMCard({ link }: { link: { name: string; description?: string; url: string; iconColor?: string; iconLetter?: string } }) {
    const color = link.iconColor || '#6b7280';
    const letter = link.iconLetter || (link.name?.[0] || '?');
    const isHex = color.startsWith('#') && color.length >= 7;
    const r = isHex ? parseInt(color.slice(1, 3), 16) : 107;
    const g = isHex ? parseInt(color.slice(3, 5), 16) : 114;
    const b = isHex ? parseInt(color.slice(5, 7), 16) : 128;
    const rgb = `${r}, ${g}, ${b}`;

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 rounded-xl border border-slate-200 dark:border-white/7 bg-white dark:bg-[#0d0d0d] hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md dark:hover:shadow-black/40 transition-all duration-200 hover:-translate-y-0.5"
        >
            {/* Dynamic color — inline style required for per-item theming */}
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:scale-110"
                style={{ background: `rgba(${rgb}, 0.12)`, borderColor: `rgba(${rgb}, 0.3)` }}
            >
                <span className="text-sm font-black" style={{ color }}>{letter}</span>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{link.name}</p>
                    <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {link.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{link.description}</p>
                )}
            </div>
        </a>
    );
}

export default async function ResourcesPage() {
    let sections: any[] = [];
    let resources: any[] = [];
    let siteSettings: any = null;

    try {
        const payload = await getPayload({ config: configPromise });
        const [sectionsResult, resourcesResult, settingsResult] = await Promise.all([
            payload.find({
                collection: 'resource-sections',
                where: { isPublished: { equals: true } },
                sort: 'orderIndex',
                limit: 50,
                depth: 0,
            }).catch(() => ({ docs: [] as any[] })),
            payload.find({
                collection: 'resources',
                where: { isPublished: { equals: true } },
                sort: '-publishedAt',
                limit: 200,
                depth: 2,
            }).catch(() => ({ docs: [] as any[] })),
            payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null),
        ]);
        sections = sectionsResult.docs;
        resources = resourcesResult.docs;
        siteSettings = settingsResult;
    } catch {}

    const llmLinks = (siteSettings?.llmLinks ?? []).filter((l: any) => l.enabled !== false);
    const llmSectionHeading = siteSettings?.llmSectionHeading || 'Explore Kingsforth on AI platforms';

    // Group resources by section
    const resourcesBySection = new Map<string, any[]>();
    const unsectioned: any[] = [];

    for (const r of resources) {
        const sectionId = typeof r.section === 'object' && r.section !== null
            ? String(r.section.id)
            : r.section ? String(r.section) : null;
        if (sectionId) {
            if (!resourcesBySection.has(sectionId)) resourcesBySection.set(sectionId, []);
            resourcesBySection.get(sectionId)!.push(r);
        } else {
            unsectioned.push(r);
        }
    }

    const hasContent = resources.length > 0;

    return (
        <div className="min-h-screen relative z-10 overflow-x-hidden">

            {/* ── HERO ───────────────────────────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center pt-40 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 bg-cyan-500/8 dark:bg-cyan-500/6 rounded-full blur-[160px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-125 h-100 bg-violet-500/6 dark:bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-500/8">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-cyan-600 dark:text-cyan-400">Knowledge Base</span>
                </div>

                <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
                    <span className="text-slate-900 dark:text-white">Resource </span>
                    <span className="text-cyan-500">Library</span>
                </h1>

                <p className="relative text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                    White papers, case studies, blog articles, and technical documentation from the Kingsforth intelligence platform.
                </p>
            </section>

            {/* ── NAMED SECTIONS ─────────────────────────────────────── */}
            {sections.map((section) => {
                const sectionResources = resourcesBySection.get(String(section.id)) ?? [];
                if (sectionResources.length === 0) return null;

                return (
                    <section key={section.id} id={section.slug} className="max-w-360 mx-auto px-6 pb-20">
                        <div className="mb-10">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-600 dark:text-cyan-400 mb-4">
                                {sectionResources.length} {sectionResources.length === 1 ? 'resource' : 'resources'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{section.title}</h2>
                            {section.description && (
                                <p className="mt-3 text-slate-500 dark:text-slate-400 text-base max-w-2xl">{section.description}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sectionResources.map((r) => <ResourceCard key={r.id} resource={r} />)}
                        </div>
                    </section>
                );
            })}

            {/* Unsectioned resources */}
            {unsectioned.length > 0 && (
                <section className="max-w-360 mx-auto px-6 pb-20">
                    <div className="mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-[10px] font-bold tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-4">
                            {unsectioned.length} {unsectioned.length === 1 ? 'resource' : 'resources'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">All Resources</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {unsectioned.map((r) => <ResourceCard key={r.id} resource={r} />)}
                    </div>
                </section>
            )}

            {/* Empty state */}
            {!hasContent && (
                <div className="max-w-300 mx-auto px-6 py-28 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/4 border border-slate-200 dark:border-white/7 flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-7 h-7 text-slate-400 dark:text-slate-500" />
                    </div>
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Resources coming soon</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Upload documents and PDFs via the admin portal.</p>
                </div>
            )}

            {/* ── AI TOOLS SECTION ───────────────────────────────────── */}
            {llmLinks.length > 0 && (
                <div className="border-t border-slate-200 dark:border-white/6 mt-4">
                    <div className="max-w-300 mx-auto px-6 py-16">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                                <Globe className="w-4 h-4 text-cyan-500" />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500 mb-0.5">AI Platforms</p>
                                <p className="text-base font-semibold text-slate-900 dark:text-white">{llmSectionHeading}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {llmLinks.map((link: any, i: number) => (
                                <LLMCard key={i} link={link} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
