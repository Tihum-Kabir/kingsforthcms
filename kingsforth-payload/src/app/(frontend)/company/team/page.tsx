import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Users, Linkedin, Twitter } from '@/components/ui/icons';
import Link from 'next/link';

export const metadata = {
    title: 'Our Team | Kingsforth',
    description: 'The minds behind the machine — experts in cognitive AI, autonomous hardware, and enterprise security.',
};

const avatarColors = [
    'from-violet-600 to-indigo-600',
    'from-cyan-600 to-blue-600',
    'from-emerald-600 to-teal-600',
    'from-pink-600 to-rose-600',
    'from-orange-600 to-amber-600',
    'from-sky-600 to-indigo-600',
];

function getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

export default async function TeamPage() {
    let teamMembers: any[] = [];
    let siteSettings: any = null;

    try {
        const payload = await getPayload({ config: configPromise });

        try {
            const result = await payload.find({
                collection: 'team-members',
                sort: 'sortOrder',
                limit: 50,
                depth: 1,
            });
            teamMembers = result.docs;
        } catch {}

        try {
            siteSettings = await payload.findGlobal({ slug: 'site-settings' });
        } catch {}
    } catch {}

    const heading = siteSettings?.teamSectionHeading ?? '';

    return (
        <main className="min-h-screen text-foreground relative z-10 pt-32 pb-24">
            <div className="max-w-350 mx-auto px-6">
                {/* Hero */}
                <div className="text-center mb-20 max-w-4xl mx-auto bg-white/70 dark:bg-black/75 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 p-12 transition-colors duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-lg mb-6">
                        <Users className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-gray-200 tracking-wide uppercase">Our Team</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 transition-colors duration-700">
                        {heading ? (
                            <>
                                {heading.split(' ').slice(0, -2).join(' ')}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400">
                                    {heading.split(' ').slice(-2).join(' ')}
                                </span>
                            </>
                        ) : null}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-700">
                        Expertise ranging from cognitive AI to autonomous hardware, united by a mission to secure the future.
                    </p>
                </div>

                {/* Team Grid */}
                {teamMembers.length === 0 ? (
                    <div className="text-center p-16 bg-white/70 dark:bg-black/75 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10">
                        <p className="text-slate-500 dark:text-gray-400 text-xl">Team profiles coming soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => {
                            const avatarColor = avatarColors[index % avatarColors.length];
                            const avatarUrl = member.image && typeof member.image === 'object' ? member.image.url : null;

                            return (
                                <div key={member.id} className="group relative">
                                    <div className="relative bg-white/80 dark:bg-[#08080C]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-violet-500/30 group-hover:shadow-2xl overflow-hidden">
                                        {/* Avatar */}
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={member.name}
                                                className="w-20 h-20 mx-auto mb-6 rounded-full object-cover shadow-lg"
                                            />
                                        ) : (
                                            <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-2xl font-black shadow-lg`}>
                                                {getInitials(member.name)}
                                            </div>
                                        )}

                                        <div className="text-center">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-700">{member.name}</h3>
                                            <p className="text-violet-600 dark:text-violet-400 font-semibold mb-4 text-sm uppercase tracking-wider">{member.role}</p>
                                            {member.bio && (
                                                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-700">{member.bio}</p>
                                            )}

                                            {/* Social links */}
                                            {(member.socialLinkedin || member.socialTwitter) && (
                                                <div className="flex items-center justify-center gap-3 mt-5">
                                                    {member.socialLinkedin && (
                                                        <Link href={member.socialLinkedin} target="_blank" rel="noopener noreferrer"
                                                            className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                                                            <Linkedin className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                    {member.socialTwitter && (
                                                        <Link href={member.socialTwitter} target="_blank" rel="noopener noreferrer"
                                                            className="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                                                            <Twitter className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
