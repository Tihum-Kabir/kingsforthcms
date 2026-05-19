'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, ChevronDown, ArrowRight, ExternalLink, Globe, FileText, Play } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
const TYPES = ['All Types', 'Blog', 'Documentation', 'Case Study', 'White Paper', 'Library', 'Customer Story', 'Partner'];
const TOPICS = ['All Topics', 'AI Surveillance', 'Threat Detection', 'Access Control', 'Perimeter Security', 'Weapons Detection', 'VSOC', 'Analytics', 'Compliance'];
const INDUSTRIES = ['All Industries', 'Education', 'Corporate', 'Government', 'Healthcare', 'Retail', 'Manufacturing'];

const SORTS = [
    { label: 'Newest first', value: 'newest' },
    { label: 'Oldest first', value: 'oldest' },
    { label: 'A–Z', value: 'az' },
];

interface LLMLink {
    name: string;
    description?: string;
    url: string;
    iconColor?: string;
    iconLetter?: string;
    enabled?: boolean;
}

interface ResourcesClientProps {
    resources: any[];
    llmLinks?: LLMLink[];
    llmSectionHeading?: string;
    heroHeading?: string;
    heroSubheading?: string;
}

function formatDate(dateStr: string) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ── Dropdown ───────────────────────────────────────────────────────────────────
function Dropdown({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    const current = value || options[0];
    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-[#e5e7eb] dark:border-white/10 rounded-lg bg-white dark:bg-[#111111] text-[#374151] dark:text-[#d1d5db] hover:border-[#9ca3af] dark:hover:border-white/20 transition-all duration-200 font-medium"
            >
                {current} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1.5 z-30 min-w-[170px] bg-white dark:bg-[#1a1a1a] border border-[#e5e7eb] dark:border-white/10 rounded-xl shadow-xl overflow-hidden">
                    {options.map(opt => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                current === opt
                                    ? 'bg-[#f3f4f6] dark:bg-white/[0.06] text-[#111827] dark:text-white font-semibold'
                                    : 'text-[#374151] dark:text-[#d1d5db] hover:bg-[#f9fafb] dark:hover:bg-white/[0.04]'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Category Badge ─────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
    'Blog': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Documentation': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Case Study': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'White Paper': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Library': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'Customer Story': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    'Partner': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    'Grant': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'AI Agent': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
};

// ── Card ───────────────────────────────────────────────────────────────────────
function ResourceCard({ resource }: { resource: any }) {
    const isExternal = !!resource.externalLink;
    const href = resource.externalLink || `/resources/${resource.slug}`;
    const coverUrl = resource.coverImage && typeof resource.coverImage === 'object' ? resource.coverImage.url : null;
    const hasPdf = !!resource.pdfFile;
    const hasVideo = !!resource.videoUrl;
    const badgeCls = CATEGORY_COLORS[resource.category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';

    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group flex flex-col bg-white dark:bg-[#0d0d0d] border border-[#e5e7eb] dark:border-white/[0.07] rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-black/60 hover:border-[#d1d5db] dark:hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-0.5"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-[#f3f4f6] dark:bg-white/[0.03]">
                {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={coverUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] dark:from-[#0a0f1c] dark:via-[#1a2332] dark:to-[#0a0f1c] flex items-center justify-center relative">
                        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#334155] dark:text-[#2d3e56] relative z-10">{resource.category}</span>
                    </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm ${badgeCls}`}>
                        {resource.category}
                    </span>
                </div>
                {/* Media type badges (PDF / Video) */}
                {(hasPdf || hasVideo) && (
                    <div className="absolute top-3 right-3 flex gap-1.5">
                        {hasPdf && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/80 text-white backdrop-blur-sm">
                                <FileText className="w-2.5 h-2.5" /> PDF
                            </span>
                        )}
                        {hasVideo && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/80 text-white backdrop-blur-sm">
                                <Play className="w-2.5 h-2.5 fill-current" /> Video
                            </span>
                        )}
                    </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-end justify-end p-3">
                    <span className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#111827] text-xs font-bold rounded-full shadow-lg">
                        {isExternal ? 'Visit' : 'Read more'} <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-sm font-semibold text-[#111827] dark:text-white leading-snug line-clamp-3 group-hover:text-[#22d3ee] transition-colors duration-200">
                    {resource.title}
                </h3>
                {resource.summary && (
                    <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] leading-relaxed line-clamp-2">{resource.summary}</p>
                )}
                <div className="flex items-center gap-2 mt-auto pt-2">
                    {resource.publishedAt && (
                        <span className="text-[11px] text-[#9ca3af]">{formatDate(resource.publishedAt)}</span>
                    )}
                    {isExternal && <ExternalLink className="w-3 h-3 text-[#9ca3af] ml-auto" />}
                </div>
            </div>
        </Link>
    );
}

// ── LLM Card ──────────────────────────────────────────────────────────────────
function LLMCard({ link }: { link: LLMLink }) {
    const color = link.iconColor || '#6b7280';
    const letter = link.iconLetter || (link.name?.[0] || '?');
    // Convert hex to rgb for background tint
    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };
    const rgb = color.startsWith('#') && color.length >= 7 ? hexToRgb(color) : '107, 114, 128';

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 rounded-xl border border-[#e5e7eb] dark:border-white/[0.08] bg-white dark:bg-[#0d0d0d] hover:border-[#d1d5db] dark:hover:border-white/20 hover:shadow-md dark:hover:shadow-black/40 transition-all duration-200 hover:-translate-y-0.5"
            style={{ '--llm-color': color, '--llm-rgb': rgb } as any}
        >
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:scale-110"
                style={{
                    background: `rgba(${rgb}, 0.12)`,
                    borderColor: `rgba(${rgb}, 0.3)`,
                }}
            >
                <span className="text-sm font-black" style={{ color }}>{letter}</span>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-[#111827] dark:text-white group-hover:text-[#22d3ee] transition-colors">{link.name}</p>
                    <ExternalLink className="w-3 h-3 text-[#9ca3af] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {link.description && (
                    <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-0.5 leading-relaxed">{link.description}</p>
                )}
            </div>
        </a>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export function ResourcesClient({
    resources,
    llmLinks = [],
    llmSectionHeading = '',
    heroHeading = '',
    heroSubheading = '',
}: ResourcesClientProps) {
    const [showFilters, setShowFilters] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Newest first');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [topicFilter, setTopicFilter] = useState('All Topics');
    const [industryFilter, setIndustryFilter] = useState('All Industries');
    const [page, setPage] = useState(1);
    const PER_PAGE = 9;

    const filtered = useMemo(() => {
        let arr = resources.filter(r => {
            const q = search.toLowerCase();
            const matchesSearch = !q || r.title?.toLowerCase().includes(q) || r.summary?.toLowerCase().includes(q);
            const matchesType = typeFilter === 'All Types' || r.category === typeFilter;
            const matchesTopic = topicFilter === 'All Topics' || (r.tags || []).some((t: any) => t.tag === topicFilter);
            const matchesIndustry = industryFilter === 'All Industries' || (r.tags || []).some((t: any) => t.tag === industryFilter);
            return matchesSearch && matchesType && matchesTopic && matchesIndustry;
        });

        if (sort === 'Oldest first') arr = [...arr].sort((a, b) => new Date(a.publishedAt || 0).getTime() - new Date(b.publishedAt || 0).getTime());
        else if (sort === 'Newest first') arr = [...arr].sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
        else if (sort === 'A–Z') arr = [...arr].sort((a, b) => a.title.localeCompare(b.title));

        return arr;
    }, [resources, search, typeFilter, topicFilter, industryFilter, sort]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const resetPage = () => setPage(1);
    const hasActiveFilters = search || typeFilter !== 'All Types' || topicFilter !== 'All Topics' || industryFilter !== 'All Industries';

    return (
        <div className="min-h-screen relative z-10">

            {/* ── Hero ─────────────────────────────────────── */}
            <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-8">
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#22d3ee] mb-4">Resources</p>
                {heroHeading && (
                    <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] text-[#0f172a] dark:text-white leading-[1.05] mb-5 max-w-2xl">
                        {heroHeading}
                    </h1>
                )}
                {heroSubheading && (
                    <p className="text-[#6b7280] dark:text-[#9ca3af] text-base leading-relaxed max-w-xl">
                        {heroSubheading}
                    </p>
                )}
            </div>

            {/* ── Divider ──────────────────────────────────── */}
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="h-px bg-[#e5e7eb] dark:bg-white/[0.06]" />
            </div>

            {/* ── Filter bar ──────────────────────────────── */}
            <div className="max-w-[1200px] mx-auto px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                    <button
                        type="button"
                        onClick={() => setShowFilters(f => !f)}
                        className="flex items-center gap-2 text-sm font-medium text-[#374151] dark:text-[#d1d5db] hover:text-[#111827] dark:hover:text-white transition-colors"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        {showFilters ? 'Hide filters' : 'Show filters'}
                    </button>
                    {filtered.length > 0 && (
                        <span className="text-xs text-[#9ca3af]">{filtered.length} resource{filtered.length !== 1 ? 's' : ''}</span>
                    )}
                </div>

                {showFilters && (
                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9ca3af]" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); resetPage(); }}
                                className="w-[200px] pl-9 pr-4 py-2 text-sm rounded-lg border border-[#e5e7eb] dark:border-white/10 bg-white dark:bg-[#111111] text-[#111827] dark:text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#374151] dark:focus:border-white/30 transition-colors font-medium"
                            />
                        </div>

                        <div className="w-px h-5 bg-[#e5e7eb] dark:bg-white/10" />

                        <Dropdown label="Sort" options={SORTS.map(s => s.label)} value={sort} onChange={v => { setSort(v); resetPage(); }} />
                        <Dropdown label="All Types" options={TYPES} value={typeFilter} onChange={v => { setTypeFilter(v); resetPage(); }} />
                        <Dropdown label="All Topics" options={TOPICS} value={topicFilter} onChange={v => { setTopicFilter(v); resetPage(); }} />
                        <Dropdown label="All Industries" options={INDUSTRIES} value={industryFilter} onChange={v => { setIndustryFilter(v); resetPage(); }} />

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={() => { setSearch(''); setTypeFilter('All Types'); setTopicFilter('All Topics'); setIndustryFilter('All Industries'); resetPage(); }}
                                className="text-xs text-[#9ca3af] hover:text-[#374151] dark:hover:text-white transition-colors underline underline-offset-2"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ── Grid ────────────────────────────────────── */}
            <div className="max-w-[1200px] mx-auto px-6 pb-16">
                {paged.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paged.map(r => <ResourceCard key={r.id} resource={r} />)}
                    </div>
                ) : (
                    <div className="py-28 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#f3f4f6] dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
                            <Search className="w-6 h-6 text-[#9ca3af]" />
                        </div>
                        <p className="text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">No resources found</p>
                        <p className="text-xs text-[#9ca3af] mt-1">Try adjusting your filters or search term</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-1 mt-14 justify-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
                            const show = n === 1 || n === totalPages || Math.abs(n - page) <= 1;
                            const showEllipsisBefore = n === page - 2 && page > 4;
                            const showEllipsisAfter = n === page + 2 && page < totalPages - 3;
                            if (showEllipsisBefore || showEllipsisAfter) return <span key={n} className="px-1 text-[#9ca3af] text-sm">…</span>;
                            if (!show) return null;
                            return (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                                        page === n
                                            ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-sm'
                                            : 'text-[#374151] dark:text-[#d1d5db] hover:bg-[#f3f4f6] dark:hover:bg-white/[0.06]'
                                    }`}
                                >
                                    {n}
                                </button>
                            );
                        })}
                        {page < totalPages && (
                            <button
                                type="button"
                                onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="px-3 h-9 flex items-center gap-1 text-sm font-medium text-[#374151] dark:text-[#d1d5db] hover:text-[#111827] dark:hover:text-white transition-colors"
                            >
                                Next <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ── LLM Section ─────────────────────────────── */}
            {llmLinks.length > 0 && (
                <div className="border-t border-[#e5e7eb] dark:border-white/[0.06]">
                    <div className="max-w-[1200px] mx-auto px-6 py-14">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                                <Globe className="w-4 h-4 text-cyan-500" />
                            </div>
                            <p className="text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">
                                {llmSectionHeading}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {llmLinks.map((link, i) => (
                                <LLMCard key={i} link={link} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
