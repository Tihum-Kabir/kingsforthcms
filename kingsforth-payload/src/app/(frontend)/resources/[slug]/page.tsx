import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Download, Calendar, Clock, FileText, Play, File } from 'lucide-react';
import { RichText } from '@payloadcms/richtext-lexical/react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const payload = await getPayload({ config: configPromise });
        const result = await payload.find({
            collection: 'resources',
            where: { slug: { equals: slug } },
            limit: 1, depth: 1,
        });
        const r = result.docs[0];
        if (!r) return {};
        return {
            title: `${r.title} | Kingsforth Resources`,
            description: r.summary || '',
            openGraph: {
                images: r.coverImage && typeof r.coverImage === 'object' ? [{ url: (r.coverImage as any).url }] : [],
            },
        };
    } catch { return {}; }
}

/** Convert YouTube/Vimeo URLs to embed URLs */
function getEmbedUrl(url: string): string | null {
    if (!url) return null;
    // YouTube: watch?v=, youtu.be, shorts
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`;
    // Vimeo
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}?dnt=1`;
    // Already an embed URL
    if (url.includes('/embed/') || url.includes('player.vimeo')) return url;
    return null;
}

function formatDate(d: string) {
    try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch { return d; }
}

function readingTime(content: any): string {
    try {
        const allText = (content?.root?.children ?? [])
            .flatMap((c: any) => c.children ?? [])
            .map((n: any) => n.text ?? '')
            .join(' ');
        const words = allText.split(/\s+/).filter(Boolean).length;
        const mins = Math.max(1, Math.round(words / 200));
        return `${mins} min read`;
    } catch { return ''; }
}

const CATEGORY_COLORS: Record<string, string> = {
    'Blog':             'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
    'Documentation':    'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200 dark:border-purple-500/30',
    'Case Study':       'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
    'White Paper':      'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30',
    'Library':          'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 border-violet-200 dark:border-violet-500/30',
    'Customer Story':   'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
    'Partner':          'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border-rose-200 dark:border-rose-500/30',
};

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let resource: any = null;
    try {
        const payload = await getPayload({ config: configPromise });
        const result = await payload.find({
            collection: 'resources',
            where: { slug: { equals: slug }, isPublished: { equals: true } },
            limit: 1,
            depth: 2,
        });
        resource = result.docs[0] ?? null;
    } catch {}

    if (!resource) notFound();

    const coverImageUrl: string | null =
        resource.coverImage && typeof resource.coverImage === 'object'
            ? (resource.coverImage as any).url ?? null
            : null;

    const pdfUrl: string | null =
        resource.pdfFile && typeof resource.pdfFile === 'object'
            ? (resource.pdfFile as any).url ?? null
            : null;

    const pdfFilename: string =
        resource.pdfFile && typeof resource.pdfFile === 'object'
            ? (resource.pdfFile as any).filename ?? 'document.pdf'
            : 'document.pdf';

    const pdfSize: string | null =
        resource.pdfFile && typeof resource.pdfFile === 'object'
            ? (() => {
                const bytes = (resource.pdfFile as any).filesize ?? 0;
                if (!bytes) return null;
                if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
                return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
              })()
            : null;

    const docxUrl: string | null =
        resource.docxFile && typeof resource.docxFile === 'object'
            ? (resource.docxFile as any).url ?? null
            : null;

    const docxFilename: string =
        resource.docxFile && typeof resource.docxFile === 'object'
            ? (resource.docxFile as any).filename ?? 'document.docx'
            : 'document.docx';

    const docxSize: string | null =
        resource.docxFile && typeof resource.docxFile === 'object'
            ? (() => {
                const bytes = (resource.docxFile as any).filesize ?? 0;
                if (!bytes) return null;
                if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
                return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
              })()
            : null;

    const embedUrl = resource.videoUrl ? getEmbedUrl(resource.videoUrl) : null;
    const catColor = CATEGORY_COLORS[resource.category] ?? 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-gray-300 border-slate-200 dark:border-white/10';
    const readTime = readingTime(resource.content);
    const hasRichContent = (resource.content?.root?.children?.length ?? 0) > 0 &&
        resource.content.root.children.some((c: any) => c.children?.some((n: any) => n.text?.trim()));

    return (
        <div className="min-h-screen text-foreground relative z-10 pt-24 pb-24">
            <div className="max-w-5xl mx-auto px-6">

                {/* Back link */}
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 hover:text-[#2563eb] dark:hover:text-cyan-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Resources
                </Link>

                <article className="space-y-8">

                    {/* ── HERO CARD ─────────────────────────────────────────── */}
                    <div className="bg-white/90 dark:bg-[#0a0a0a]/90 rounded-3xl shadow-xl border border-slate-200 dark:border-white/[0.07] overflow-hidden">

                        {/* Cover image */}
                        {coverImageUrl && (
                            <div className="w-full aspect-[21/9] overflow-hidden bg-slate-100 dark:bg-black/40">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={coverImageUrl}
                                    alt={resource.title}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                            </div>
                        )}

                        <div className="p-10 md:p-14">
                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {resource.category && (
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${catColor}`}>
                                        {resource.category}
                                    </span>
                                )}
                                {resource.publishedAt && (
                                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-gray-500">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {formatDate(resource.publishedAt)}
                                    </span>
                                )}
                                {readTime && (
                                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-gray-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        {readTime}
                                    </span>
                                )}
                                {pdfUrl && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                                        <FileText className="w-3 h-3" /> PDF
                                    </span>
                                )}
                                {docxUrl && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                                        <File className="w-3 h-3" /> DOCX
                                    </span>
                                )}
                                {embedUrl && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20">
                                        <Play className="w-3 h-3 fill-current" /> Video
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
                                {resource.title}
                            </h1>

                            {/* Summary */}
                            {resource.summary && (
                                <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed border-l-4 border-[#2563eb] dark:border-cyan-500 pl-5 mb-8">
                                    {resource.summary}
                                </p>
                            )}

                            {/* CTA buttons */}
                            <div className="flex flex-wrap items-center gap-3">
                                {pdfUrl && (
                                    <a
                                        href={pdfUrl}
                                        download={pdfFilename}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-linear-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download PDF{pdfSize ? ` (${pdfSize})` : ''}
                                    </a>
                                )}
                                {docxUrl && (
                                    <a
                                        href={docxUrl}
                                        download={docxFilename}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-linear-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download DOCX{docxSize ? ` (${docxSize})` : ''}
                                    </a>
                                )}
                                {resource.externalLink && (
                                    <a
                                        href={resource.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-linear-to-r from-[#2563eb] to-[#06b6d4] hover:from-[#1d4ed8] hover:to-[#0891b2] text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Access Resource <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── VIDEO EMBED ────────────────────────────────────────── */}
                    {embedUrl && (
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/[0.07] bg-black aspect-video">
                            <iframe
                                src={embedUrl}
                                title={`${resource.title} — video`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                                className="w-full h-full border-0"
                            />
                        </div>
                    )}

                    {/* ── RICH TEXT BODY ─────────────────────────────────────── */}
                    {hasRichContent && (
                        <div className="bg-white/90 dark:bg-[#0a0a0a]/90 rounded-3xl shadow-xl border border-slate-200 dark:border-white/[0.07] p-10 md:p-14">
                            <div className="prose prose-slate dark:prose-invert max-w-none
                                prose-headings:font-black prose-headings:tracking-tight
                                prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl
                                prose-p:text-slate-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                                prose-a:text-[#2563eb] dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-slate-900 dark:prose-strong:text-white
                                prose-blockquote:border-l-[#2563eb] dark:prose-blockquote:border-l-cyan-500
                                prose-code:bg-slate-100 dark:prose-code:bg-white/[0.06] prose-code:rounded prose-code:px-1
                                prose-img:rounded-xl prose-img:shadow-lg
                                prose-ul:list-disc prose-ol:list-decimal
                            ">
                                <RichText data={resource.content} />
                            </div>
                        </div>
                    )}

                    {/* ── TAGS ───────────────────────────────────────────────── */}
                    {resource.tags && resource.tags.length > 0 && (
                        <div className="bg-white/80 dark:bg-[#0a0a0a]/80 rounded-2xl border border-slate-200 dark:border-white/[0.07] p-7">
                            <p className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {resource.tags.map((tagItem: any, i: number) => (
                                    <span
                                        key={tagItem.id || i}
                                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/[0.07] hover:border-[#2563eb] dark:hover:border-cyan-500/50 transition-colors cursor-default"
                                    >
                                        {tagItem.tag || tagItem}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </article>
            </div>
        </div>
    );
}
