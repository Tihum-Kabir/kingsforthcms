import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { DetailPageLayout, getEmbedUrl } from '@/components/marketing/DetailPageLayout';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const payload = await getPayload({ config: configPromise });
        const { docs } = await payload.find({ collection: 'solutions', where: { slug: { equals: slug } }, limit: 1 });
        const s = docs[0];
        if (!s) return { title: 'Solution Not Found' };
        return {
            title: (s as any).metaTitle || `${s.title} | Kingsforth Solutions`,
            description: (s as any).metaDescription || (s as any).subtitle || '',
        };
    } catch { return { title: 'Solutions | Kingsforth' }; }
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
        sol = docs[0];
    } catch { notFound(); }
    if (!sol) notFound();

    const heroImageUrl = sol.heroImage && typeof sol.heroImage === 'object'
        ? sol.heroImage.url ?? null
        : (typeof sol.heroImage === 'string' ? sol.heroImage : null);

    // Stats + Content Blocks + FAQs as extra sections
    const extras = (
        <>
            {/* Stats */}
            {sol.stats?.length > 0 && (
                <section className="max-w-5xl mx-auto px-6 mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {sol.stats.map((stat: any, i: number) => (
                            <div key={i} className="bg-white dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.06] rounded-2xl p-6 text-center shadow-sm">
                                <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-slate-400 dark:text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Content Blocks */}
            {sol.contentBlocks?.length > 0 && (
                <section className="max-w-350 mx-auto px-6 space-y-16 mb-16">
                    {sol.contentBlocks.map((block: any, i: number) => (
                        <div key={i} className={`flex flex-col ${block.align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                            {block.image && (
                                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06] shadow-lg">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={block.image} alt={block.title} className="w-full h-64 md:h-80 object-cover" />
                                </div>
                            )}
                            <div className={`w-full ${block.image ? 'md:w-1/2' : ''} space-y-4`}>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{block.title}</h3>
                                <p className="text-slate-500 dark:text-gray-400 leading-relaxed">{block.content}</p>
                                {block.listItems?.length > 0 && (
                                    <ul className="space-y-2 mt-4">
                                        {block.listItems.map((li: any, li_i: number) => (
                                            <li key={li_i} className="flex items-start gap-3 text-slate-600 dark:text-gray-300 text-sm">
                                                <CheckCircle className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                                                {li.item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* FAQs */}
            {sol.faqs?.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 mb-16">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {sol.faqs.map((faq: any, i: number) => (
                            <details key={i} className="group bg-white dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm">
                                <summary className="px-7 py-5 cursor-pointer text-slate-900 dark:text-white font-semibold flex items-center justify-between hover:text-blue-600 dark:hover:text-cyan-400 transition-colors list-none">
                                    {faq.question}
                                    <span className="text-slate-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300 ml-4 shrink-0">▾</span>
                                </summary>
                                <div className="px-7 pb-6 text-slate-500 dark:text-gray-400 leading-relaxed border-t border-slate-100 dark:border-white/[0.05] pt-4">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            )}
        </>
    );

    return (
        <DetailPageLayout
            backHref="/solutions"
            backLabel="All Solutions"
            accentColor="violet"
            badge={sol.category || 'Solution'}
            title={sol.title}
            subtitle={sol.subtitle}
            heroImageUrl={heroImageUrl}
            heroImageAlt={sol.title}
            embedUrl={getEmbedUrl(sol.heroVideoUrl)}
            embedLabel={`${sol.title} — Solution Overview`}
            description={sol.description}
            features={sol.features}
            extraSections={extras}
            ctaTitle={`Ready to deploy ${sol.title}?`}
            ctaSubtitle={`Talk to our team and get a live demo of ${sol.title}.`}
        />
    );
}
