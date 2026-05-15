import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Shield, Target, Eye, Zap } from 'lucide-react';

export const metadata = {
    title: 'About Us | Kingsforth',
    description: 'Architecting the autonomous future — built for sovereign-grade intelligence.',
};

export default async function AboutPage() {
    let aboutContent: any = null;
    try {
        const payload = await getPayload({ config: configPromise });
        try {
            aboutContent = await payload.findGlobal({ slug: 'about-content', depth: 1 });
        } catch {}
    } catch {}

    const missionTitle   = aboutContent?.mission?.title   || 'Our Mission';
    const missionContent = aboutContent?.mission?.content || 'To eliminate operational inefficiency through sovereign-grade AI intelligence that turns raw inputs into decisive autonomous actions across every critical environment.';
    const visionTitle    = aboutContent?.vision?.title    || 'Our Vision';
    const visionContent  = aboutContent?.vision?.content  || 'We serve the autonomous future where systems adapt, predict, and protect with zero latency — making human oversight a choice, not a requirement.';

    const cmsStats: { value: string; label: string }[] = Array.isArray(aboutContent?.stats) && aboutContent.stats.length > 0
        ? aboutContent.stats.map((s: any) => ({ value: s.value, label: s.label }))
        : [
            { value: '<2ms',  label: 'Processing Latency'    },
            { value: '99.9%', label: 'Detection Accuracy'    },
            { value: '24/7',  label: 'Autonomous Operation'  },
        ];

    const statColors = ['text-violet-600 dark:text-violet-400', 'text-cyan-600 dark:text-cyan-400', 'text-indigo-600 dark:text-indigo-400'];

    const storyTitle   = aboutContent?.story?.title;
    const storyContent = aboutContent?.story?.content;

    return (
        <main className="min-h-screen text-foreground relative z-10 pt-32 pb-24">
            <div className="max-w-350 mx-auto px-6">
                {/* Hero */}
                <div className="text-center mb-20 max-w-4xl mx-auto bg-white/70 dark:bg-black/75 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 p-12 transition-colors duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-lg mb-6">
                        <Shield className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-gray-200 tracking-wide uppercase">About Kingsforth</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 transition-colors duration-700">
                        Architecting the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400">
                            Autonomous Future
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-700">
                        We are building the neural fabric of enterprise security, where intelligence is sovereign and response is instantaneous.
                    </p>
                </div>

                {/* Mission & Vision from CMS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="group relative p-10 rounded-3xl bg-white/70 dark:bg-black/60 border border-slate-200 dark:border-white/10 hover:border-violet-500/40 overflow-hidden transition-all duration-500 hover:shadow-2xl backdrop-blur-xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                            <Target className="w-40 h-40 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20">
                            <Target className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-700">{missionTitle}</h2>
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-lg transition-colors duration-700">
                            {missionContent}
                        </p>
                    </div>

                    <div className="group relative p-10 rounded-3xl bg-white/70 dark:bg-black/60 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 overflow-hidden transition-all duration-500 hover:shadow-2xl backdrop-blur-xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                            <Eye className="w-40 h-40 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
                            <Eye className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-700">{visionTitle}</h2>
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-lg transition-colors duration-700">
                            {visionContent}
                        </p>
                    </div>
                </div>

                {/* Story section — only rendered when set in CMS */}
                {storyTitle && storyContent && (
                    <div className="mb-16 p-10 rounded-3xl bg-white/70 dark:bg-black/60 border border-slate-200 dark:border-white/10 backdrop-blur-xl transition-colors duration-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-700">{storyTitle}</h2>
                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-gray-400">
                            {typeof storyContent === 'string'
                                ? <p>{storyContent}</p>
                                : null}
                        </div>
                    </div>
                )}

                {/* Stats — from CMS or fallback */}
                <div className="bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10 dark:from-violet-900/30 dark:to-cyan-900/30 rounded-3xl border border-white/50 dark:border-white/10 p-16 text-center backdrop-blur-xl relative overflow-hidden transition-colors duration-700">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Designed for Critical Scale</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                            {cmsStats.map((stat, i) => (
                                <div key={stat.label} className="space-y-3">
                                    <div className={`text-5xl md:text-6xl font-black font-mono ${statColors[i % statColors.length]} transition-colors duration-700`}>{stat.value}</div>
                                    <p className="text-slate-500 dark:text-gray-500 uppercase tracking-widest text-sm font-semibold transition-colors duration-700">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
