import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link';
import { Shield, Zap, ArrowRight, Building2, GraduationCap, Monitor, Lock, Activity, Cpu } from 'lucide-react';
import { PageHero } from '@/components/marketing/PageHero';
import { ALL_SOLUTIONS } from '@/data/solutions-data';

export const revalidate = 300;

const SLUG_ICONS: Record<string, React.ElementType> = {
    'education': GraduationCap,
    'corporate': Building2,
    'cities-government': Monitor,
    'perimeter-security': Shield,
    'medical-emergencies': Activity,
    'weapons-violence': Lock,
    'vsoc': Cpu,
};

export const metadata = {
    title: 'Solutions | Kingsforth',
    description: 'Enterprise intelligence systems and tailored solutions for cities, education, corporate environments, and critical infrastructure by Kingsforth.',
    openGraph: {
        title: 'AI Intelligence Solutions | Kingsforth',
        description: 'Enterprise AI solutions for education, corporate, perimeter security, medical emergencies, and VSOC by Kingsforth.',
        url: 'https://kingsforth.net/solutions',
        siteName: 'Kingsforth',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Kingsforth Solutions' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Intelligence Solutions | Kingsforth',
        description: 'Enterprise AI solutions for education, corporate, perimeter security and more from Kingsforth.',
        images: ['/og-image.jpg'],
    },
};

export default async function SolutionsPage() {
    let allSolutions: any[] = [];

    try {
        const payload = await getPayload({ config: configPromise });
        try {
            const result = await payload.find({
                collection: 'solutions',
                where: { isPublished: { equals: true } },
                limit: 100,
            });
            allSolutions = result.docs;
        } catch {}
    } catch {}

    // Static fallback — always show content even if DB empty
    if (allSolutions.length === 0) {
        allSolutions = ALL_SOLUTIONS.map((sol) => ({
            id: sol.slug,
            slug: sol.slug,
            title: sol.title,
            subtitle: sol.subtitle,
            shortDescription: sol.shortDescription,
            category: sol.category,
            isPublished: true,
        }));
    }

    const industry = allSolutions.filter((s) => s.category === 'industry');
    const useCases = allSolutions.filter((s) => s.category === 'use-case');

    return (
        <div className="min-h-screen relative z-10">
            <PageHero
                dayImage={null}
                nightImage={null}
                headline="Tailored Intelligence"
                subtitle="We deploy advanced security infrastructures for cities, governments, and critical environments."
                noCard
            />

            {/* Industry Solutions */}
            {industry.length > 0 && (
                <section className="max-w-350 mx-auto px-6 py-16">
                    <div className="mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-600 dark:text-cyan-400 mb-3">
                            By Industry
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Industry Solutions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {industry.map((sol: any) => {
                            const Icon = SLUG_ICONS[sol.slug] ?? Zap;
                            return (
                                <Link
                                    key={sol.id}
                                    href={`/solutions/${sol.slug}`}
                                    className="group relative bg-white/60 dark:bg-white/4 backdrop-blur-xl border border-white/80 dark:border-white/8 rounded-2xl p-10 overflow-hidden hover:border-blue-400/60 dark:hover:border-cyan-500/30 hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] dark:hover:shadow-[0_8px_32px_rgba(34,211,238,0.08)] transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/6 border border-slate-200 dark:border-white/8 flex items-center justify-center mb-6 group-hover:bg-blue-50 dark:group-hover:bg-cyan-500/10 transition-colors">
                                        <Icon className="w-7 h-7 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/6 mb-4">
                                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">Industry</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{sol.title}</h3>
                                    {sol.subtitle && (
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{sol.subtitle}</p>
                                    )}
                                    {sol.shortDescription && (
                                        <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">{sol.shortDescription}</p>
                                    )}
                                    <span className="inline-flex items-center gap-2 font-semibold text-sm text-blue-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform mt-auto">
                                        Explore Solution <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Use Case Solutions */}
            {useCases.length > 0 && (
                <section className="max-w-350 mx-auto px-6 pb-16">
                    <div className="mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-[10px] font-bold tracking-[0.18em] uppercase text-violet-600 dark:text-violet-400 mb-3">
                            By Use Case
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Use Case Solutions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {useCases.map((sol: any) => {
                            const Icon = SLUG_ICONS[sol.slug] ?? Zap;
                            return (
                                <Link
                                    key={sol.id}
                                    href={`/solutions/${sol.slug}`}
                                    className="group relative bg-white/60 dark:bg-white/4 backdrop-blur-xl border border-white/80 dark:border-white/8 rounded-2xl p-10 overflow-hidden hover:border-violet-400/60 dark:hover:border-violet-500/30 hover:shadow-[0_8px_32px_rgba(124,58,237,0.10)] dark:hover:shadow-[0_8px_32px_rgba(124,58,237,0.08)] transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/6 border border-slate-200 dark:border-white/8 flex items-center justify-center mb-6 group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-colors">
                                        <Icon className="w-7 h-7 text-slate-500 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/6 mb-4">
                                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">Use Case</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{sol.title}</h3>
                                    {sol.subtitle && (
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{sol.subtitle}</p>
                                    )}
                                    {sol.shortDescription && (
                                        <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">{sol.shortDescription}</p>
                                    )}
                                    <span className="inline-flex items-center gap-2 font-semibold text-sm text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform mt-auto">
                                        Explore Solution <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {allSolutions.length === 0 && (
                <div className="max-w-350 mx-auto px-6 py-20 text-center">
                    <p className="text-slate-400 dark:text-slate-500 text-xl">Solutions coming soon.</p>
                </div>
            )}

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="bg-white/60 dark:bg-white/4 backdrop-blur-xl border border-white/80 dark:border-white/8 rounded-2xl p-12 md:p-16 text-center shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                        Need a custom deployment?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                        Our architects will build a tailored solution for your operational environment.
                    </p>
                    <Link href="/contact" className="inline-flex items-center justify-center h-14 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:scale-[1.02] transition-transform shadow-lg">
                        Initialize Contact
                    </Link>
                </div>
            </section>
        </div>
    );
}
