import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link';
import { Shield, Zap, ArrowRight, Building2, GraduationCap, Monitor } from 'lucide-react';
import { PageHero } from '@/components/marketing/PageHero';

const solutionIcons: any = {
    'cities-government': Building2,
    'education-systems': GraduationCap,
    'vsoc': Monitor,
};

export const metadata = {
    title: 'Solutions | Kingsforth',
    description: 'Enterprise intelligence systems and tailored solutions for cities, education, and critical infrastructure.',
};

export default async function SolutionsPage() {
    let solutions: any[] = [];
    let siteSettings: any = null;

    try {
        const payload = await getPayload({ config: configPromise });

        try {
            const result = await payload.find({
                collection: 'solutions',
                where: { isPublished: { equals: true } },
                limit: 100,
            });
            solutions = result.docs;
        } catch {}

        try {
            siteSettings = await payload.findGlobal({ slug: 'site-settings' });
        } catch {}
    } catch {}

    const pageHero = siteSettings?.pageHeroes?.find((ph: any) => ph.pageSlug === 'solutions');

    return (
        <div className="min-h-screen relative z-10">
            {/* Page Hero — Text-only, no background image */}
            <PageHero
                dayImage={null}
                nightImage={null}
                headline="Tailored Intelligence"
                subtitle="We deploy advanced security infrastructures for cities, governments, and critical environments."
            />

            {/* Solutions Grid */}
            <section className="max-w-350 mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {solutions.map((sol: any) => {
                        const Icon = solutionIcons[sol.slug] || Zap;
                        let descText = '';
                        if (sol.description?.root?.children) {
                            for (const block of sol.description.root.children) {
                                if (block.children) {
                                    for (const child of block.children) {
                                        if (child.text) descText += child.text + ' ';
                                    }
                                }
                            }
                        }
                        const excerpt = descText.trim().length > 180 ? descText.trim().substring(0, 180) + '...' : descText.trim();

                        return (
                            <Link
                                key={sol.id}
                                href={`/solutions/${sol.slug}`}
                                className="group relative bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-white/80 dark:border-white/[0.08] rounded-2xl p-10 overflow-hidden hover:border-blue-400/60 dark:hover:border-[#22d3ee]/30 hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] dark:hover:shadow-[0_8px_32px_rgba(34,211,238,0.08)] transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#f3f4f6] dark:bg-white/[0.06] border border-[#e5e7eb] dark:border-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-[#eff6ff] dark:group-hover:bg-[#2563eb]/[0.1] transition-colors">
                                    <Icon className="w-7 h-7 text-[#6b7280] dark:text-[#9ca3af] group-hover:text-[#2563eb] dark:group-hover:text-[#22d3ee] transition-colors" />
                                </div>
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#f9fafb] dark:bg-white/[0.04] border border-[#e5e7eb] dark:border-white/[0.06] mb-4">
                                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#9ca3af]">{sol.category || 'Solution'}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-3 group-hover:text-[#2563eb] dark:group-hover:text-[#22d3ee] transition-colors">{sol.title}</h3>
                                {sol.subtitle && (
                                    <p className="text-[#4b5563] dark:text-[#d1d5db] text-sm mb-3 font-medium">{sol.subtitle}</p>
                                )}
                                <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm leading-relaxed mb-8">
                                    {excerpt || 'Explore how our cognitive infrastructure secures and optimizes operations.'}
                                </p>
                                <span className="inline-flex items-center gap-2 font-semibold text-sm text-[#2563eb] dark:text-[#22d3ee] group-hover:translate-x-1 transition-transform">
                                    Explore Solution <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        );
                    })}

                    {solutions.length === 0 && (
                        <div className="col-span-full p-16 text-center bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-white/80 dark:border-white/[0.08] rounded-2xl">
                            <p className="text-[#6b7280] dark:text-[#9ca3af] text-xl">Solutions coming soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-white/80 dark:border-white/[0.08] rounded-2xl p-12 md:p-16 text-center shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-black text-[#111827] dark:text-white mb-4">
                        Need a custom deployment?
                    </h2>
                    <p className="text-[#6b7280] dark:text-[#9ca3af] text-lg mb-8 max-w-2xl mx-auto">
                        Our architects will build a tailored solution for your operational environment.
                    </p>
                    <Link href="/contact" className="inline-flex items-center justify-center h-14 px-10 bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-bold rounded-full hover:scale-[1.02] transition-transform shadow-lg">
                        Initialize Contact
                    </Link>
                </div>
            </section>
        </div>
    );
}
