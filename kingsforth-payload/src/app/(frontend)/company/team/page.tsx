import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Users, Linkedin, Twitter } from '@/components/ui/icons';
import Link from 'next/link';

export const revalidate = 60;

const STATIC_TEAM = [
    { id: 's1', name: 'Tihum Kabir', role: 'CEO & Co-Founder', motto: 'Intelligence without surveillance is just noise.', bio: 'Leading Kingsforth\'s vision for autonomous enterprise intelligence. Deep expertise in cognitive AI, enterprise security architecture, and scalable infrastructure across South Asia.', sortOrder: 1, image: null, socialLinkedin: null, socialTwitter: null },
    { id: 's2', name: 'Rifat Hossain', role: 'CTO & Co-Founder', motto: 'The best security system is one that never sleeps.', bio: 'Architect of Kingsforth\'s core AI inference engine. Specialist in real-time video analytics, distributed sensor networks, and edge computing deployments.', sortOrder: 2, image: null, socialLinkedin: null, socialTwitter: null },
    { id: 's3', name: 'Nadia Islam', role: 'Head of AI Research', motto: 'Data tells the story. We just learn to listen.', bio: 'Leading the R&D division with focus on behavioral pattern recognition, threat classification models, and next-generation autonomous response systems.', sortOrder: 3, image: null, socialLinkedin: null, socialTwitter: null },
    { id: 's4', name: 'Arif Rahman', role: 'Head of Enterprise Operations', motto: 'Execution separates vision from reality.', bio: 'Overseeing enterprise client deployments, partner integrations, and operational excellence across all active Kingsforth installations in the region.', sortOrder: 4, image: null, socialLinkedin: null, socialTwitter: null },
];

export const metadata = {
    title: 'Our Team | Kingsforth',
    description: 'The minds behind the machine — experts in cognitive AI, autonomous hardware, and enterprise security.',
};

const AVATAR_GRADS = [
    'from-violet-600 to-indigo-700',
    'from-cyan-600 to-blue-700',
    'from-emerald-600 to-teal-700',
    'from-rose-600 to-pink-700',
    'from-orange-600 to-amber-700',
    'from-sky-600 to-indigo-700',
];

function getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

export default async function TeamPage() {
    let teamMembers: any[] = [];

    try {
        const payload = await getPayload({ config: configPromise });
        const result = await payload.find({
            collection: 'team-members',
            sort: 'sortOrder',
            limit: 50,
            depth: 1,
        }).catch(() => ({ docs: [] as any[] }));
        teamMembers = result.docs;
    } catch {}

    // Static fallback — always show team content even if DB empty or query fails
    if (teamMembers.length === 0) teamMembers = STATIC_TEAM;

    return (
        <main className="min-h-screen relative z-10 pt-36 pb-24 overflow-x-hidden">

            {/* ── HERO ──────────────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center pb-20 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-100 bg-violet-500/8 dark:bg-violet-500/6 rounded-full blur-[140px] pointer-events-none" />

                <div className="relative inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 dark:bg-violet-500/8">
                    <Users className="w-3.5 h-3.5 text-violet-500" />
                    <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-violet-600 dark:text-violet-400">The Team</span>
                </div>

                <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
                    <span className="text-slate-900 dark:text-white">Built by </span>
                    <span className="text-violet-500">Experts</span>
                </h1>

                <p className="relative text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                    Specialists in cognitive AI, autonomous hardware, and enterprise security — united by a mission to secure the future.
                </p>
            </section>

            {/* ── TEAM GRID ─────────────────────────────── */}
            <section className="max-w-350 mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member, index) => {
                            const avatarUrl = member.image && typeof member.image === 'object' ? member.image.url : null;
                            const grad = AVATAR_GRADS[index % AVATAR_GRADS.length];

                            return (
                                <div key={member.id} className="group relative bg-white dark:bg-[#0d0d0d] border border-slate-200 dark:border-white/7 rounded-2xl overflow-hidden hover:border-violet-400/40 dark:hover:border-violet-500/25 hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1.5">

                                    {/* ── Photo / Avatar ── */}
                                    <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-black/40">
                                        {avatarUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={avatarUrl}
                                                alt={member.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className={`w-full h-full bg-linear-to-br ${grad} flex items-center justify-center`}>
                                                <span className="text-6xl font-black text-white/20 select-none">
                                                    {getInitials(member.name)}
                                                </span>
                                            </div>
                                        )}
                                        {/* Role badge — overlaid bottom-left */}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-white/80 border border-white/10">
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── Content ── */}
                                    <div className="p-6">
                                        {/* Name */}
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">
                                            {member.name}
                                        </h3>

                                        {/* Chat-style motto */}
                                        {member.motto && (
                                            <div className="flex items-start gap-2 mb-3">
                                                <span className="text-violet-400 dark:text-violet-500 text-lg leading-none mt-0.5 select-none">&ldquo;</span>
                                                <p className="text-sm italic text-slate-500 dark:text-slate-400 leading-relaxed">{member.motto}</p>
                                            </div>
                                        )}

                                        {/* Bio */}
                                        {member.bio && (
                                            <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-3 mt-2">
                                                {member.bio}
                                            </p>
                                        )}

                                        {/* Social links */}
                                        {(member.socialLinkedin || member.socialTwitter) && (
                                            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-white/5">
                                                {member.socialLinkedin && (
                                                    <Link
                                                        href={member.socialLinkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                                                    >
                                                        <Linkedin className="w-4 h-4" />
                                                    </Link>
                                                )}
                                                {member.socialTwitter && (
                                                    <Link
                                                        href={member.socialTwitter}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                                    >
                                                        <Twitter className="w-4 h-4" />
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            </section>
        </main>
    );
}
